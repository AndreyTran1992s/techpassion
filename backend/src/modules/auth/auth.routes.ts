import { Router } from 'express';
import { loginAdmin, verifyToken } from './auth.controller';
import { loginLimiter } from '../../common/rateLimiter';

const router = Router();

// Áp dụng Rate Limiting 5 lần thử/15 phút để chống tấn công dò mật khẩu (Brute-Force Attack)
router.post('/login', loginLimiter, loginAdmin);
router.get('/verify', verifyToken);

export default router;
