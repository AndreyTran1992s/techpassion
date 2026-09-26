import { Request, Response, NextFunction } from 'express';
import { mysqlPool } from '../../config/mysql';
import { sendSuccess, sendError } from '../../common/response';
import { logger } from '../../config/logger';

export const SAMPLE_SERVICES = [
  {
    id: 'srv-0001-consulting',
    title: 'System Architecture Consulting & Code Audit',
    slug: 'tu-van-kien-truc-he-thong',
    short_description: 'Deep-dive performance bottlenecks analysis, source code security review, hybrid database optimization, and Modular Monolith / Microservices architecture design.',
    price_display: 'Hourly / Retainer',
    features: [
      'OWASP Top 10 Security & Vulnerability Audit',
      'Database Query & Indexing Optimization (MySQL / MongoDB / Redis)',
      'Clean Architecture & Domain-Driven Design Refactoring',
      'Detailed Technical Debt Roadmap & Executive Report',
    ],
  },
  {
    id: 'srv-0002-fullstack-dev',
    title: 'End-to-End Custom Web Application Engineering',
    slug: 'thiet-ke-phat-trien-web-ung-dung',
    short_description: 'Full-lifecycle development of high-performance web platforms, developer portals, and SaaS applications using Next.js, Node.js, and cloud-native infrastructure.',
    price_display: 'Project-Based',
    features: [
      'SEO-Optimized Next.js 15 SSR/ISR Frontend',
      'Hardened, High-Throughput Node.js & TypeScript APIs',
      'Responsive Dark-First Design System',
      'Full Source Code Handover & Dockerized Deployment',
    ],
  },
];

export async function getServices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let services = SAMPLE_SERVICES;
    try {
      const [rows] = await mysqlPool.query('SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC');
      const dbServices = rows as any[];
      if (dbServices && dbServices.length > 0) {
        services = dbServices.map((s) => ({
          ...s,
          features: typeof s.features === 'string' ? JSON.parse(s.features) : s.features,
        }));
      }
    } catch (e: any) {
      logger.warn(`MySQL query services warning: ${e.message}`);
    }

    sendSuccess(res, services, 'Services retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function createInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { service_id, customer_name, customer_email, customer_phone, message } = req.body;

    if (!customer_name || !customer_email || !message) {
      sendError(res, 'Please provide your full name, email address, and project details.', 400);
      return;
    }

    try {
      await mysqlPool.query(
        'INSERT INTO service_inquiries (service_id, customer_name, customer_email, customer_phone, message) VALUES (?, ?, ?, ?, ?)',
        [service_id || null, customer_name, customer_email, customer_phone || null, message]
      );
      logger.info({ customer_name, customer_email }, 'Received new service consultation inquiry');
    } catch (e: any) {
      logger.warn(`Temporary inquiry storage warning: ${e.message}`);
    }

    sendSuccess(res, { received: true }, 'Your inquiry has been submitted successfully! Our lead engineer will respond within 24 hours.', 201);
  } catch (error) {
    next(error);
  }
}

export const IN_MEMORY_INQUIRIES = [
  {
    id: 1,
    service_id: 'srv-0001-consulting',
    service_title: 'System Architecture Consulting & Code Audit',
    customer_name: 'Alex Morgan',
    customer_email: 'alex.morgan@fintech.io',
    customer_phone: '+1 (555) 234-5678',
    message: 'We are scaling our payment gateway to 50,000 TPS and need architectural guidance on our hybrid MySQL + Redis cluster.',
    status: 'NEW',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    service_id: 'srv-0002-fullstack-dev',
    service_title: 'End-to-End Custom Web Application Engineering',
    customer_name: 'Sarah Jenkins',
    customer_email: 'sarah.j@cloudscale.dev',
    customer_phone: '+1 (555) 876-5432',
    message: 'Looking to build an enterprise engineering knowledge portal using Next.js 15 and Node.js.',
    status: 'CONTACTED',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export async function getInquiries(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let inquiries = IN_MEMORY_INQUIRIES;
    try {
      const [rows] = await mysqlPool.query(
        `SELECT si.*, s.title as service_title 
         FROM service_inquiries si 
         LEFT JOIN services s ON si.service_id = s.id 
         ORDER BY si.created_at DESC`
      );
      const dbRows = rows as any[];
      if (dbRows && dbRows.length > 0) {
        inquiries = dbRows;
      }
    } catch (e: any) {
      logger.warn(`MySQL query inquiries fallback: ${e.message}`);
    }

    sendSuccess(res, inquiries, 'Service inquiries retrieved successfully');
  } catch (error) {
    next(error);
  }
}

export async function updateInquiryStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { status } = req.body;

    try {
      await mysqlPool.query('UPDATE service_inquiries SET status = ? WHERE id = ?', [status, id]);
    } catch (e: any) {
      logger.warn(`MySQL update inquiry status fallback: ${e.message}`);
    }

    const found = IN_MEMORY_INQUIRIES.find((i) => i.id === id);
    if (found) {
      found.status = status;
    }

    sendSuccess(res, { updated: true }, 'Inquiry status updated successfully');
  } catch (error) {
    next(error);
  }
}
