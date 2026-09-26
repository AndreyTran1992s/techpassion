import { Request, Response, NextFunction } from 'express';
import { EbookModel, IEbook } from './ebook.model';
import { isMongoDBConnected } from '../../config/mongodb';
import { sendSuccess } from '../../common/response';

export const SAMPLE_EBOOKS: Partial<IEbook>[] = [
  {
    title: 'Designing Data-Intensive Applications',
    slug: 'designing-data-intensive-applications',
    author: 'Martin Kleppmann',
    description: 'The definitive guide to distributed systems, replication, partitioning, consensus, and high-throughput data architecture.',
    cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    pdf_stream_url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/',
    is_official_link: true,
    license_type: 'Official Free Chapters & Summary',
    file_size: '14.2 MB',
    category_tag: 'System Architecture',
    download_count: 1420,
  },
  {
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    slug: 'clean-code-robert-martin',
    author: 'Robert C. Martin',
    description: 'Core principles of writing maintainable code, meaningful naming, concise functions, and sustainable software refactoring.',
    cover_image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80',
    pdf_stream_url: 'https://archive.org/details/clean-code-handbook-of-agile-software-craftsmanship',
    is_official_link: true,
    license_type: 'Community Reference Edition',
    file_size: '8.5 MB',
    category_tag: 'Programming',
    download_count: 2850,
  },
  {
    title: 'The Web Application Hacker\'s Handbook',
    slug: 'web-application-hackers-handbook',
    author: 'Dafydd Stuttard & Marcus Pinto',
    description: 'Practical battle-tested methodologies for discovering, exploiting, and remediating web application security vulnerabilities.',
    cover_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    pdf_stream_url: 'https://portswigger.net/web-security',
    is_official_link: true,
    license_type: 'Reference Guide',
    file_size: '18.1 MB',
    category_tag: 'Security',
    download_count: 960,
  },
];

export async function getEbooks(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!isMongoDBConnected()) {
      sendSuccess(res, SAMPLE_EBOOKS, 'E-Books list retrieved successfully');
      return;
    }

    const books = await EbookModel.find().sort({ download_count: -1 }).lean();
    sendSuccess(res, books.length > 0 ? books : SAMPLE_EBOOKS, 'E-Books list retrieved successfully');
  } catch (error) {
    next(error);
  }
}
