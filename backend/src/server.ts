import { createApp } from './app';
import { ENV } from './config/env';
import { logger } from './config/logger';
import { checkMySQLConnection } from './config/mysql';
import { connectMongoDB } from './config/mongodb';
import { connectRedis } from './config/redis';

async function bootstrap() {
  logger.info('🚀 Đang khởi động Tech Passion Backend Engine...');

  // 1. Kết nối cơ sở dữ liệu song song (không block nếu DB chưa sẵn sàng)
  await Promise.allSettled([
    checkMySQLConnection(),
    connectMongoDB(),
    connectRedis(),
  ]);

  // 2. Khởi tạo Express Server
  const app = createApp();

  const server = app.listen(ENV.PORT, () => {
    logger.info(`✨ Tech Passion API đang chạy tại: http://localhost:${ENV.PORT}`);
    logger.info(`🩺 Health Check: http://localhost:${ENV.PORT}/api/v1/health`);
    logger.info(`📚 Categories Menu: http://localhost:${ENV.PORT}/api/v1/categories/menu`);
    logger.info(`📝 Posts List: http://localhost:${ENV.PORT}/api/v1/posts`);
  });

  // Graceful Shutdown
  const shutdown = () => {
    logger.info('🛑 Nhận tín hiệu tắt máy chủ. Đang đóng kết nối an toàn...');
    server.close(() => {
      logger.info('👋 Máy chủ đã đóng.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

bootstrap().catch((err) => {
  logger.fatal({ err }, '❌ Lỗi nghiêm trọng khi khởi động server');
  process.exit(1);
});
