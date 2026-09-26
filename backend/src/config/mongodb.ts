import mongoose from 'mongoose';
import { ENV } from './env';
import { logger } from './logger';

export async function connectMongoDB(): Promise<boolean> {
  try {
    await mongoose.connect(ENV.MONGODB.URI, {
      serverSelectionTimeoutMS: 5000,
    });
    logger.info('✅ MongoDB Connected successfully');
    return true;
  } catch (error: any) {
    logger.warn(`⚠️ MongoDB Connection Warning: ${error.message}`);
    return false;
  }
}

export function isMongoDBConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
