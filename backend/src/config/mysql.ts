import mysql from 'mysql2/promise';
import { ENV } from './env';
import { logger } from './logger';

export const mysqlPool = mysql.createPool({
  host: ENV.MYSQL.HOST,
  port: ENV.MYSQL.PORT,
  user: ENV.MYSQL.USER,
  password: ENV.MYSQL.PASSWORD,
  database: ENV.MYSQL.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function checkMySQLConnection(): Promise<boolean> {
  try {
    const connection = await mysqlPool.getConnection();
    await connection.ping();
    connection.release();
    logger.info('✅ MySQL Connected successfully');
    return true;
  } catch (error: any) {
    logger.warn(`⚠️ MySQL Connection Warning: ${error.message}`);
    return false;
  }
}
