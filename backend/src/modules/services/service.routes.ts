import { Router } from 'express';
import { getServices, createInquiry, getInquiries, updateInquiryStatus } from './service.controller';
import { requireAdminAuth } from '../../common/authMiddleware';
import { inquiryLimiter } from '../../common/rateLimiter';

const router = Router();

router.get('/', getServices);
router.post('/inquiry', inquiryLimiter, createInquiry);
router.get('/inquiries', requireAdminAuth, getInquiries);
router.patch('/inquiries/:id', requireAdminAuth, updateInquiryStatus);

export default router;
