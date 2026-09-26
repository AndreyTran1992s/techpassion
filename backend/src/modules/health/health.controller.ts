import { Request, Response } from 'express';
import { checkMySQLConnection } from '../../config/mysql';
import { isMongoDBConnected } from '../../config/mongodb';
import { isRedisConnected } from '../../config/redis';
import { sendSuccess } from '../../common/response';

export async function getHealthStatus(req: Request, res: Response): Promise<void> {
  const mysqlHealthy = await checkMySQLConnection();
  const mongoHealthy = isMongoDBConnected();
  const redisHealthy = isRedisConnected();

  const status = {
    service: 'Tech Passion API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    status: 'ONLINE',
    databases: {
      mysql: mysqlHealthy ? 'CONNECTED' : 'DISCONNECTED / STANDBY',
      mongodb: mongoHealthy ? 'CONNECTED' : 'DISCONNECTED / STANDBY',
      redis: redisHealthy ? 'CONNECTED' : 'DISCONNECTED / STANDBY',
    },
  };

  sendSuccess(res, status, 'Healthcheck status retrieved successfully');
}
