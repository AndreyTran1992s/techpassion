import { Request, Response, NextFunction } from 'express';
import { sendError } from './response';
import { logger } from '../config/logger';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const requestTrackers = new Map<string, RateLimitRecord>();

// Định kỳ dọn dẹp các IP đã hết hạn để tiết kiệm RAM
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of requestTrackers.entries()) {
    if (now > record.resetTime) {
      requestTrackers.delete(key);
    }
  }
}, 60000);

export interface RateLimiterOptions {
  windowMs: number; // Thời gian cửa sổ (milliseconds)
  maxRequests: number; // Số request tối đa trong cửa sổ
  message?: string;
  keyPrefix?: string;
}

export function createRateLimiter(options: RateLimiterOptions) {
  const { windowMs, maxRequests, message, keyPrefix = 'rate-limit' } = options;

  return (req: Request, res: Response, next: NextFunction): void => {
    // Lấy IP thật của client qua proxy hoặc socket
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown-ip';

    const trackKey = `${keyPrefix}:${clientIp}`;
    const now = Date.now();

    const record = requestTrackers.get(trackKey);

    if (!record || now > record.resetTime) {
      requestTrackers.set(trackKey, {
        count: 1,
        resetTime: now + windowMs,
      });
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', maxRequests - 1);
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', 0);

      logger.warn(
        { clientIp, path: req.originalUrl },
        `🚨 Đã chặn IP gửi request quá tần suất cho phép (Rate Limit Exceeded)`
      );

      sendError(
        res,
        message || `Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ${retryAfterSeconds} giây.`,
        429
      );
      return;
    }

    record.count += 1;
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', maxRequests - record.count);
    next();
  };
}

// 1. Rate Limiter tổng cho toàn bộ API (120 req / phút)
export const globalApiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 120,
  keyPrefix: 'global',
  message: 'Tần suất gửi yêu cầu quá nhanh. Vui lòng chậm lại một chút để bảo vệ hệ thống.',
});

// 2. Rate Limiter cho form gửi yêu cầu tư vấn (5 req / 10 phút) chống Spam/Bot
export const inquiryLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  maxRequests: 5,
  keyPrefix: 'inquiry',
  message: 'Bạn đã gửi yêu cầu tư vấn nhiều lần. Kỹ sư của chúng tôi sẽ liên hệ trong 24h, vui lòng không spam.',
});

// 3. Rate Limiter cho đăng nhập Admin (5 lần thử / 15 phút) chống Brute-Force
export const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
  keyPrefix: 'auth-login',
  message: 'Quá nhiều lần đăng nhập thất bại. Tài khoản bị tạm khóa trong 15 phút vì lý do an toàn.',
});
