import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env';
import { logger } from './config/logger';
import { errorHandler } from './common/errorHandler';
import { securitySanitizer } from './common/securitySanitizer';
import { globalApiLimiter } from './common/rateLimiter';

// Import Routes
import healthRoutes from './modules/health/health.routes';
import categoryRoutes from './modules/categories/category.routes';
import postRoutes from './modules/posts/post.routes';
import quickNoteRoutes from './modules/quick-notes/quick-note.routes';
import ebookRoutes from './modules/ebooks/ebook.routes';
import serviceRoutes from './modules/services/service.routes';
import authRoutes from './modules/auth/auth.routes';

export function createApp(): Application {
  const app = express();

  // 1. Bảo mật Header qua Helmet (Tắt X-Powered-By, chặn clickjacking, chặn MIME sniffing)
  app.use(
    helmet({
      hidePoweredBy: true,
      frameguard: { action: 'deny' },
      noSniff: true,
      xssFilter: true,
    })
  );

  // 2. CORS kiểm soát chặt chẽ
  app.use(
    cors({
      origin: [ENV.CORS_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token'],
    })
  );

  // 3. Giới hạn dung lượng Payload tối đa 2MB (Chống cạn kiệt bộ nhớ / Buffer Overflow DoS)
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));

  // 4. Lớp phòng vệ NoSQL Injection & XSS (Lọc sạch các biến độc hại $gt, $ne, script)
  app.use(securitySanitizer);

  // 5. Rate Limiter toàn cục (Chống Spam / Quét lỗ hổng tự động / DDoS)
  app.use(globalApiLimiter);

  // 6. Request Logger
  app.use((req, res, next) => {
    logger.debug({ method: req.method, url: req.url }, 'Incoming Request');
    next();
  });

  // 7. API Routes
  app.use('/api/v1/health', healthRoutes);
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/categories', categoryRoutes);
  app.use('/api/v1/posts', postRoutes);
  app.use('/api/v1/quick-notes', quickNoteRoutes);
  app.use('/api/v1/ebooks', ebookRoutes);
  app.use('/api/v1/services', serviceRoutes);

  // 8. 404 Handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: `Route không tồn tại: ${req.method} ${req.originalUrl}`,
    });
  });

  // 9. Global Error Handler (Không làm lộ stack trace ra ngoài cho hacker)
  app.use(errorHandler);

  return app;
}
