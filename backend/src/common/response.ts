import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200,
  pagination?: ApiResponse['pagination']
): void {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    pagination,
  };
  res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  error: string,
  statusCode = 500,
  details?: any
): void {
  res.status(statusCode).json({
    success: false,
    error,
    details,
  });
}
