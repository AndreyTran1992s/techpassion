import { Request, Response, NextFunction } from 'express';
import { getCategoriesMenu } from './category.service';
import { sendSuccess } from '../../common/response';

export async function getMenu(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const menu = await getCategoriesMenu();
    sendSuccess(res, menu, 'Menu cây phân cấp 3 cụm lấy thành công');
  } catch (error) {
    next(error);
  }
}
