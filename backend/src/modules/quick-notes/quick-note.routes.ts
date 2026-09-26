import { Router } from 'express';
import { getQuickNotes } from './quick-note.controller';

const router = Router();

router.get('/', getQuickNotes);

export default router;
