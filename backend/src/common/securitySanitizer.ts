import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

/**
 * Đệ quy loại bỏ các key NoSQL Injection (như $gt, $ne, $where, $regex)
 * khỏi body, query và params để ngăn chặn tấn công MongoDB.
 */
function sanitizeNoSqlObject(obj: any): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeNoSqlObject);
  }

  const cleanObj: any = {};
  for (const [key, value] of Object.entries(obj)) {
    // Chặn các MongoDB Operator bắt đầu bằng $
    if (key.startsWith('$')) {
      logger.warn({ suspiciousKey: key }, '⚠️ Phát hiện và ngăn chặn mã độc NoSQL Injection');
      continue;
    }

    if (typeof value === 'object' && value !== null) {
      cleanObj[key] = sanitizeNoSqlObject(value);
    } else if (typeof value === 'string') {
      // Làm sạch ký tự script XSS cơ bản
      cleanObj[key] = value
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '');
    } else {
      cleanObj[key] = value;
    }
  }

  return cleanObj;
}

export function securitySanitizer(req: Request, res: Response, next: NextFunction): void {
  try {
    if (req.body) {
      req.body = sanitizeNoSqlObject(req.body);
    }
    if (req.query) {
      req.query = sanitizeNoSqlObject(req.query);
    }
    if (req.params) {
      req.params = sanitizeNoSqlObject(req.params);
    }
    next();
  } catch (error) {
    logger.error({ error }, 'Lỗi trong bộ lọc bảo mật securitySanitizer');
    next();
  }
}
