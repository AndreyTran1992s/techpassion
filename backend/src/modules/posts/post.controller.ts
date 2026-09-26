import { Request, Response, NextFunction } from 'express';
import { getPostsList, getPostDetailBySlug, createNewPost } from './post.service';
import { sendSuccess, sendError } from '../../common/response';

export async function getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, sub_category, is_breaking, tag, search, page, limit } = req.query;

    const result = await getPostsList({
      category: category as string,
      sub_category: sub_category as string,
      is_breaking: is_breaking === 'true' ? true : is_breaking === 'false' ? false : undefined,
      tag: tag as string,
      search: search as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
    });

    sendSuccess(res, result.posts, 'Danh sách bài viết lấy thành công', 200, result.pagination);
  } catch (error) {
    next(error);
  }
}

export async function getPostBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const slug = req.params.slug as string;
    const post = await getPostDetailBySlug(slug);

    if (!post) {
      sendError(res, 'Không tìm thấy bài viết yêu cầu', 404);
      return;
    }

    sendSuccess(res, post, 'Chi tiết bài viết lấy thành công');
  } catch (error) {
    next(error);
  }
}

export async function getBreakingNews(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await getPostsList({
      is_breaking: true,
      limit: 5,
    });
    sendSuccess(res, result.posts, 'Tin tức Breaking News lấy thành công');
  } catch (error) {
    next(error);
  }
}

export async function createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { title, slug, category_slug, sub_category_slug, summary, content, cover_image, tags, is_breaking, status } = req.body;

    if (!title || !slug || !category_slug || !summary || !content) {
      sendError(res, 'Vui lòng điền đầy đủ tiêu đề, slug, danh mục, tóm tắt và nội dung bài viết', 400);
      return;
    }

    const category_path = [category_slug];
    if (sub_category_slug) {
      category_path.push(sub_category_slug);
    }

    const newPost = await createNewPost({
      title,
      slug,
      category_id: 1,
      category_slug,
      sub_category_slug: sub_category_slug || null,
      category_path,
      summary,
      content,
      cover_image: cover_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      author_id: 'adm-0000-0000-0000-000000000001',
      author_name: 'Tech Passion Lead',
      is_breaking: Boolean(is_breaking),
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : [],
      status: status || 'PUBLISHED',
      seo: {
        meta_title: title,
        meta_description: summary,
      },
    });

    sendSuccess(res, newPost, 'Tạo bài viết mới thành công', 201);
  } catch (error) {
    next(error);
  }
}

