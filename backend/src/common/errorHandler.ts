import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { sendError } from './response';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error({ err, path: req.path, method: req.method }, 'Unhandled Exception');

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  sendError(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : undefined);
}
