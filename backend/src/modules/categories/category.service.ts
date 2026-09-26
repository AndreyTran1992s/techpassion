import { mysqlPool } from '../../config/mysql';
import { redisClient, isRedisConnected } from '../../config/redis';
import { logger } from '../../config/logger';
import { CategoryItem, ClusterMenu } from './category.model';

// Standard 12 Pillars + 8 Sub-items fallback data (in English)
export const FALLBACK_CATEGORIES: CategoryItem[] = [
  // CLUSTER 1: TECH CORE
  { id: 1, parent_id: null, cluster: 'TECH_CORE', name: 'Breaking News', slug: 'breaking-news', description: 'Latest breaking technology & software engineering news', icon: 'Zap', sort_order: 1 },
  { id: 2, parent_id: null, cluster: 'TECH_CORE', name: 'AI', slug: 'ai', description: 'Artificial Intelligence, LLMs, RAG, and Agentic AI engineering', icon: 'Bot', sort_order: 2 },
  { id: 3, parent_id: null, cluster: 'TECH_CORE', name: 'Design & Development', slug: 'design-development', description: 'Software & web design, architecture, and full-stack development', icon: 'Layout', sort_order: 3 },
  { id: 7, parent_id: 3, cluster: 'TECH_CORE', name: 'Website Design', slug: 'website-design', description: 'Modern Website Design, UI/UX Systems & Visual Architecture', icon: 'Palette', sort_order: 1 },
  { id: 8, parent_id: 3, cluster: 'TECH_CORE', name: 'Website Development', slug: 'website-development', description: 'Frontend & Full-stack Web Engineering with modern frameworks', icon: 'Globe', sort_order: 2 },
  { id: 4, parent_id: null, cluster: 'TECH_CORE', name: 'Programming', slug: 'programming', description: 'Clean Architecture, Algorithms, Design Patterns & Software Craftsmanship', icon: 'Code2', sort_order: 4 },
  { id: 5, parent_id: null, cluster: 'TECH_CORE', name: 'Hacking & Security', slug: 'hacking-security', description: 'Offensive Security, Ethical Hacking & Application Hardening', icon: 'ShieldAlert', sort_order: 5 },
  { id: 9, parent_id: 5, cluster: 'TECH_CORE', name: 'Hacking', slug: 'hacking', description: 'Ethical Hacking, Penetration Testing & Vulnerability Research', icon: 'Terminal', sort_order: 1 },
  { id: 10, parent_id: 5, cluster: 'TECH_CORE', name: 'Security', slug: 'security', description: 'Application Security, Web Defense, Zero-Trust & DevSecOps', icon: 'Lock', sort_order: 2 },
  { id: 6, parent_id: null, cluster: 'TECH_CORE', name: 'Testing', slug: 'testing', description: 'End-to-End Automated Testing & Quality Assurance Engineering', icon: 'CheckCircle2', sort_order: 6 },
  { id: 11, parent_id: 6, cluster: 'TECH_CORE', name: 'Auto Testing', slug: 'auto-testing', description: 'Automated Software Testing with Playwright, Cypress & CI/CD Pipelines', icon: 'Cpu', sort_order: 1 },
  { id: 12, parent_id: 6, cluster: 'TECH_CORE', name: 'Manual Testing', slug: 'manual-testing', description: 'Exploratory Testing, Test Case Design & QA Strategy', icon: 'FileCheck', sort_order: 2 },

  // CLUSTER 2: SKILLS & GROWTH
  { id: 13, parent_id: null, cluster: 'SKILLS_GROWTH', name: 'S.E.O/Marketing', slug: 'seo-marketing', description: 'Technical SEO, Core Web Vitals & Tech Product Growth', icon: 'TrendingUp', sort_order: 7 },
  { id: 17, parent_id: 13, cluster: 'SKILLS_GROWTH', name: 'S.E.O', slug: 'seo', description: 'Technical SEO, Structured Data, On-page Optimization & CWV', icon: 'Search', sort_order: 1 },
  { id: 18, parent_id: 13, cluster: 'SKILLS_GROWTH', name: 'Marketing', slug: 'marketing', description: 'Developer Relations, Product Positioning & Tech Growth Marketing', icon: 'Megaphone', sort_order: 2 },
  { id: 14, parent_id: null, cluster: 'SKILLS_GROWTH', name: 'Soft Skills', slug: 'soft-skills', description: 'Engineering Leadership, Communication & Career Growth for Developers', icon: 'Users', sort_order: 8 },
  { id: 15, parent_id: null, cluster: 'SKILLS_GROWTH', name: 'Tricks', slug: 'tricks', description: 'Actionable Command-Line, Git, Docker & IDE Power Tricks', icon: 'Sparkles', sort_order: 9 },
  { id: 16, parent_id: null, cluster: 'SKILLS_GROWTH', name: 'Tips', slug: 'tips', description: 'Proven Software Engineering Principles & Career Wisdom', icon: 'Lightbulb', sort_order: 10 },

  // CLUSTER 3: RESOURCES & SERVICES
  { id: 19, parent_id: null, cluster: 'RESOURCES_SERVICES', name: 'Product & Services', slug: 'product-services', description: 'System Architecture Consulting, Code Audits & Custom Web Engineering', icon: 'Briefcase', sort_order: 11 },
  { id: 20, parent_id: null, cluster: 'RESOURCES_SERVICES', name: 'E-Books', slug: 'ebooks', description: 'Curated Library of Official Software Engineering & Security E-Books', icon: 'BookOpen', sort_order: 12 },
];

export async function getCategoriesMenu(): Promise<ClusterMenu[]> {
  const CACHE_KEY = 'tp:categories:menu:en';

  if (isRedisConnected()) {
    try {
      const cached = await redisClient.get(CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e: any) {
      logger.warn(`Redis get cache error: ${e.message}`);
    }
  }

  let rawList: CategoryItem[] = [];
  try {
    const [rows] = await mysqlPool.query('SELECT * FROM categories ORDER BY sort_order ASC');
    rawList = rows as CategoryItem[];
  } catch (e: any) {
    logger.warn(`MySQL query categories failed, using fallback categories: ${e.message}`);
    rawList = FALLBACK_CATEGORIES;
  }

  if (!rawList || rawList.length === 0) {
    rawList = FALLBACK_CATEGORIES;
  }

  const pillars = rawList.filter((c) => c.parent_id === null);
  const subItems = rawList.filter((c) => c.parent_id !== null);

  const pillarsWithChildren = pillars.map((pillar) => {
    const children = subItems.filter((sub) => sub.parent_id === pillar.id);
    return {
      ...pillar,
      children,
    };
  });

  const clusters: ClusterMenu[] = [
    {
      cluster: 'TECH_CORE',
      cluster_name: 'Tech Core',
      categories: pillarsWithChildren.filter((p) => p.cluster === 'TECH_CORE'),
    },
    {
      cluster: 'SKILLS_GROWTH',
      cluster_name: 'Skills & Growth',
      categories: pillarsWithChildren.filter((p) => p.cluster === 'SKILLS_GROWTH'),
    },
    {
      cluster: 'RESOURCES_SERVICES',
      cluster_name: 'Resources & Services',
      categories: pillarsWithChildren.filter((p) => p.cluster === 'RESOURCES_SERVICES'),
    },
  ];

  if (isRedisConnected()) {
    try {
      await redisClient.set(CACHE_KEY, JSON.stringify(clusters), 'EX', 600);
    } catch (e: any) {
      logger.warn(`Redis set cache error: ${e.message}`);
    }
  }

  return clusters;
}
