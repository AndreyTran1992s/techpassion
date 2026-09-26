import { Router } from 'express';
import { getPosts, getPostBySlug, getBreakingNews, createPost } from './post.controller';
import { requireAdminAuth } from '../../common/authMiddleware';

const router = Router();

router.get('/breaking-news', getBreakingNews);
router.get('/', getPosts);
router.get('/:slug', getPostBySlug);
router.post('/', requireAdminAuth, createPost);

export default router;

