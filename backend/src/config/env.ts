import dotenv from 'dotenv';
import path from 'path';

// Nạp file .env từ thư mục gốc hoặc thư mục backend
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '4000', 10),
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  API_URL: process.env.API_URL || 'http://localhost:4000/api/v1',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET || 'tp_super_secure_jwt_secret_key_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // MySQL config
  MYSQL: {
    HOST: process.env.MYSQL_HOST || 'localhost',
    PORT: parseInt(process.env.MYSQL_PORT || '3306', 10),
    DATABASE: process.env.MYSQL_DATABASE || 'tech_passion_db',
    USER: process.env.MYSQL_USER || 'tp_user',
    PASSWORD: process.env.MYSQL_PASSWORD || 'tp_secret',
  },

  // MongoDB config
  MONGODB: {
    URI: process.env.MONGO_URI || 'mongodb://localhost:27017/tech_passion_content',
  },

  // Redis config
  REDIS: {
    HOST: process.env.REDIS_HOST || 'localhost',
    PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
    PASSWORD: process.env.REDIS_PASSWORD || undefined,
  },
};
