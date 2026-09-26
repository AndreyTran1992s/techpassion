import { Router } from 'express';
import { getMenu } from './category.controller';

const router = Router();

router.get('/menu', getMenu);

export default router;
