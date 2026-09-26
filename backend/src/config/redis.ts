import Redis from 'ioredis';
import { ENV } from './env';
import { logger } from './logger';

export const redisClient = new Redis({
  host: ENV.REDIS.HOST,
  port: ENV.REDIS.PORT,
  password: ENV.REDIS.PASSWORD,
  maxRetriesPerRequest: 1,
  lazyConnect: true,
  retryStrategy: (times) => {
    if (times > 3) {
      return null; // Dừng retry nếu không có Redis chạy
    }
    return Math.min(times * 1000, 3000);
  },
});

let isRedisReady = false;

redisClient.on('connect', () => {
  isRedisReady = true;
  logger.info('✅ Redis Connected successfully');
});

redisClient.on('error', (err) => {
  isRedisReady = false;
  logger.warn(`⚠️ Redis Connection Notice: ${err.message}`);
});

export async function connectRedis(): Promise<boolean> {
  try {
    await redisClient.connect();
    return true;
  } catch {
    return false;
  }
}

export function isRedisConnected(): boolean {
  return isRedisReady;
}
