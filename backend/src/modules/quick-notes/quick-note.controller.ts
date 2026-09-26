import { Request, Response, NextFunction } from 'express';
import { QuickNoteModel, IQuickNote } from './quick-note.model';
import { isMongoDBConnected } from '../../config/mongodb';
import { sendSuccess } from '../../common/response';

export const SAMPLE_QUICK_NOTES: Partial<IQuickNote>[] = [
  {
    type: 'TRICK',
    title: 'Undo the last Git commit while keeping all changes staged',
    code_snippet: 'git reset --soft HEAD~1',
    language: 'bash',
    explanation: 'Ideal when you committed with a typo in your message or forgot to include a small file before pushing.',
    target_tool: 'Git',
    tags: ['git', 'terminal'],
    likes_count: 142,
  },
  {
    type: 'TRICK',
    title: 'Purge all unused Docker containers, images, and volumes in one command',
    code_snippet: 'docker system prune -a --volumes -f',
    language: 'bash',
    explanation: 'Instantly reclaims gigabytes of disk space occupied by dangling images and stopped containers.',
    target_tool: 'Docker',
    tags: ['docker', 'devops'],
    likes_count: 98,
  },
  {
    type: 'TIP',
    title: 'Apply the Boy Scout Rule in Software Engineering',
    explanation: 'Always leave the codebase cleaner than you found it. Even renaming one ambiguous variable or removing dead code saves weeks of future debugging.',
    target_tool: 'Mindset',
    tags: ['clean-code', 'best-practices'],
    likes_count: 215,
  },
  {
    type: 'TIP',
    title: 'Favor Guard Clauses (Early Returns) over deeply nested if-else blocks',
    code_snippet: 'if (!user) return null;\nif (!hasPermission) return false;\nreturn processOrder(user);',
    language: 'typescript',
    explanation: 'Early returns drastically reduce cyclomatic complexity and make business logic twice as fast to read and audit.',
    target_tool: 'Refactoring',
    tags: ['typescript', 'clean-code'],
    likes_count: 180,
  },
];

export async function getQuickNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { type, tool } = req.query;

    if (!isMongoDBConnected()) {
      let data = [...SAMPLE_QUICK_NOTES];
      if (type) data = data.filter((n) => n.type === type);
      if (tool) data = data.filter((n) => n.target_tool?.toLowerCase() === (tool as string).toLowerCase());
      sendSuccess(res, data, 'Quick Notes retrieved successfully');
      return;
    }

    const query: any = {};
    if (type) query.type = type;
    if (tool) query.target_tool = new RegExp(tool as string, 'i');

    const notes = await QuickNoteModel.find(query).sort({ likes_count: -1, created_at: -1 }).lean();
    sendSuccess(res, notes.length > 0 ? notes : SAMPLE_QUICK_NOTES, 'Quick Notes retrieved successfully');
  } catch (error) {
    next(error);
  }
}
