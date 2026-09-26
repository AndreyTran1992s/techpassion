import { PostModel, IPost } from './post.model';
import { isMongoDBConnected } from '../../config/mongodb';
import { logger } from '../../config/logger';

export const INITIAL_POSTS: Partial<IPost>[] = [
  {
    title: 'Building Production-Grade Clean Architecture with Node.js and TypeScript',
    slug: 'xay-dung-clean-architecture-nodejs-typescript',
    category_id: 4,
    category_slug: 'programming',
    category_path: ['programming'],
    summary: 'An in-depth guide to structuring Domain Entities, Use Cases, and Repositories for scalable enterprise Node.js systems.',
    content: `# Clean Architecture with Node.js and TypeScript\n\nIn modern software engineering, decoupling core business rules from external frameworks and databases is critical for long-term maintainability.\n\n\`\`\`typescript\nexport interface UserRepository {\n  findById(id: string): Promise<User | null>;\n  save(user: User): Promise<void>;\n}\n\`\`\`\n\n### Core Architectural Benefits\n1. Complete independence from UI layers and database engines.\n2. Effortless unit testing without complex infrastructure mocks.\n3. Sustainable scalability across multi-team engineering organizations.`,
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    author_id: 'adm-0000-0000-0000-000000000001',
    author_name: 'Tech Passion Lead',
    is_breaking: false,
    tags: ['TypeScript', 'Node.js', 'Clean Architecture', 'Software Patterns'],
    seo: {
      meta_title: 'Clean Architecture with Node.js and TypeScript | Tech Passion',
      meta_description: 'Comprehensive guide to building Clean Architecture for software engineers.',
    },
    metrics: { views: 1420, likes: 64, reading_time_minutes: 7 },
    status: 'PUBLISHED',
  },
  {
    title: 'High-Velocity E2E Automated Testing with Playwright in CI/CD Pipelines',
    slug: 'chien-luoc-kiem-thu-tu-dong-e2e-playwright',
    category_id: 6,
    sub_category_id: 11,
    category_slug: 'testing',
    sub_category_slug: 'auto-testing',
    category_path: ['testing', 'auto-testing'],
    summary: 'How to architect parallelized Playwright E2E test suites on GitHub Actions with sub-3-minute execution times.',
    content: `# Playwright E2E Testing in CI/CD\n\nPlaywright has established itself as the gold standard for browser automation thanks to deterministic auto-waiting and isolated browser contexts.\n\n\`\`\`typescript\nimport { test, expect } from '@playwright/test';\n\ntest('homepage renders breaking news hero', async ({ page }) => {\n  await page.goto('http://localhost:3000');\n  await expect(page).toHaveTitle(/Tech Passion/);\n});\n\`\`\``,
    cover_image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=1200&q=80',
    author_id: 'adm-0000-0000-0000-000000000001',
    author_name: 'Tech Passion Lead',
    is_breaking: false,
    tags: ['Playwright', 'Auto Testing', 'CI/CD', 'QA'],
    seo: {
      meta_title: 'E2E Automated Testing with Playwright | Tech Passion',
      meta_description: 'Architecting fast, reliable Playwright E2E test suites in CI/CD.',
    },
    metrics: { views: 890, likes: 45, reading_time_minutes: 5 },
    status: 'PUBLISHED',
  },
  {
    title: 'Mitigating XSS & CSRF Vulnerabilities in Modern Single-Page Applications',
    slug: 'phong-ngua-lo-hong-xss-csrf-spa',
    category_id: 5,
    sub_category_id: 10,
    category_slug: 'hacking-security',
    sub_category_slug: 'security',
    category_path: ['hacking-security', 'security'],
    summary: 'Defense-in-depth techniques for securing JWT tokens, enforcing strict Content Security Policy (CSP), and hardening SameSite cookies.',
    content: `# SPA Security: XSS & CSRF Prevention\n\nStoring raw session tokens in browser LocalStorage exposes web applications to severe token exfiltration if an XSS vector is triggered.\n\n\`\`\`http\nContent-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m';\nSet-Cookie: token=jwt; HttpOnly; Secure; SameSite=Strict\n\`\`\``,
    cover_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    author_id: 'adm-0000-0000-0000-000000000001',
    author_name: 'Tech Passion Lead',
    is_breaking: false,
    tags: ['Security', 'OWASP', 'JWT', 'Web Security'],
    seo: {
      meta_title: 'SPA Security: Mitigating XSS & CSRF | Tech Passion',
      meta_description: 'Hardening modern web applications against XSS and CSRF attacks.',
    },
    metrics: { views: 1850, likes: 98, reading_time_minutes: 6 },
    status: 'PUBLISHED',
  },
  {
    title: 'DeepSeek-V3 & The Next Wave of Agentic AI Engineering in 2026',
    slug: 'deepseek-v3-xu-huong-ai-engineering-2026',
    category_id: 2,
    category_slug: 'ai',
    category_path: ['ai'],
    summary: 'Breakthroughs in Mixture-of-Experts (MoE) inference efficiency and how engineering teams integrate multi-agent workflows into production.',
    content: `# AI Engineering Trends in 2026\n\nHigh-efficiency open-weight Mixture-of-Experts (MoE) models are reshaping enterprise AI architecture with dramatic reductions in inference latency and cost.\n\n\`\`\`python\nfrom transformers import AutoModelForCausalLM, AutoTokenizer\n\n# Load high-throughput reasoning model\ntokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V3")\n\`\`\``,
    cover_image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    author_id: 'adm-0000-0000-0000-000000000001',
    author_name: 'Tech Passion Lead',
    is_breaking: true,
    tags: ['AI', 'LLM', 'AI Engineering', 'Machine Learning'],
    seo: {
      meta_title: 'DeepSeek-V3 & AI Engineering Trends 2026 | Tech Passion',
      meta_description: 'Technical analysis of the latest breakthroughs in AI Engineering.',
    },
    metrics: { views: 3200, likes: 210, reading_time_minutes: 8 },
    status: 'PUBLISHED',
  },
];

export interface GetPostsParams {
  category?: string;
  sub_category?: string;
  is_breaking?: boolean;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export async function getPostsList(params: GetPostsParams) {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(50, Math.max(1, params.limit || 10));
  const skip = (page - 1) * limit;

  if (!isMongoDBConnected()) {
    let filtered = [...INITIAL_POSTS];
    if (params.category) {
      filtered = filtered.filter((p) => p.category_slug === params.category || p.category_path?.includes(params.category!));
    }
    if (params.sub_category) {
      filtered = filtered.filter((p) => p.sub_category_slug === params.sub_category || p.category_path?.includes(params.sub_category!));
    }
    if (params.is_breaking !== undefined) {
      filtered = filtered.filter((p) => p.is_breaking === params.is_breaking);
    }
    const total = filtered.length;
    const data = filtered.slice(skip, skip + limit);
    return {
      posts: data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  const query: any = { status: 'PUBLISHED' };

  if (params.sub_category) {
    query.category_path = params.sub_category;
  } else if (params.category) {
    query.category_path = params.category;
  }

  if (params.is_breaking !== undefined) {
    query.is_breaking = params.is_breaking;
  }

  if (params.tag) {
    query.tags = params.tag;
  }

  if (params.search) {
    query.$or = [
      { title: { $regex: params.search, $options: 'i' } },
      { summary: { $regex: params.search, $options: 'i' } },
    ];
  }

  const [posts, total] = await Promise.all([
    PostModel.find(query).sort({ published_at: -1 }).skip(skip).limit(limit).lean(),
    PostModel.countDocuments(query),
  ]);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getPostDetailBySlug(slug: string) {
  if (!isMongoDBConnected()) {
    const post = INITIAL_POSTS.find((p) => p.slug === slug);
    return post || null;
  }

  const post = await PostModel.findOneAndUpdate(
    { slug, status: 'PUBLISHED' },
    { $inc: { 'metrics.views': 1 } },
    { new: true }
  ).lean();

  return post;
}

export async function createNewPost(postData: Partial<IPost>) {
  const readingTime = Math.max(1, Math.ceil((postData.content?.length || 500) / 500));

  if (!isMongoDBConnected()) {
    const newPost = {
      ...postData,
      metrics: { views: 0, likes: 0, reading_time_minutes: readingTime },
      created_at: new Date(),
      status: postData.status || 'PUBLISHED',
    };
    INITIAL_POSTS.unshift(newPost as any);
    return newPost;
  }

  const post = await PostModel.create({
    ...postData,
    metrics: { views: 0, likes: 0, reading_time_minutes: readingTime },
    published_at: postData.status === 'PUBLISHED' ? new Date() : undefined,
  });
  return post;
}
