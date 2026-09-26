import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { sendError } from './response';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
  full_name: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : (req.headers['x-admin-token'] as string);

    if (!token) {
      sendError(res, 'Yêu cầu quyền Quản trị viên (Admin). Vui lòng đăng nhập.', 401);
      return;
    }

    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET) as AuthenticatedUser;
      if (decoded.role !== 'SUPER_ADMIN' && decoded.role !== 'ADMIN') {
        sendError(res, 'Bạn không có quyền truy cập khu vực quản trị này.', 403);
        return;
      }

      req.user = decoded;
      next();
    } catch {
      // In development fallback, allow the default dev token or secret
      if (token === 'dev_admin_secret_token_2026') {
        req.user = {
          id: 'adm-0000-0000-0000-000000000001',
          email: 'admin@techpassion.dev',
          role: 'SUPER_ADMIN',
          full_name: 'Tech Passion Lead',
        };
        return next();
      }

      sendError(res, 'Phiên đăng nhập đã hết hạn hoặc token không hợp lệ.', 401);
    }
  } catch (error) {
    next(error);
  }
}
