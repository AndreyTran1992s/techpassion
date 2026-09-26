import { Router } from 'express';
import { getEbooks } from './ebook.controller';

const router = Router();

router.get('/', getEbooks);

export default router;
