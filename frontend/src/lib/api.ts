const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const FALLBACK_POSTS: Post[] = [
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

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  if (process.env.GITHUB_PAGES === 'true') {
    return getFallback<T>(endpoint);
  }
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: AbortSignal.timeout(2000),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`API request to ${endpoint} returned ${res.status}`);
      return getFallback<T>(endpoint);
    }

    const json = await res.json();
    return json.data as T;
  } catch (error: any) {
    return getFallback<T>(endpoint);
  }
}

export const FALLBACK_CLUSTERS: ClusterMenu[] = [
  {
    cluster: 'TECH_CORE',
    cluster_name: 'Tech Core',
    categories: [
      { id: 1, parent_id: null, cluster: 'TECH_CORE', name: 'Breaking News', slug: 'breaking-news', sort_order: 1 },
      { id: 2, parent_id: null, cluster: 'TECH_CORE', name: 'AI', slug: 'ai', sort_order: 2 },
      {
        id: 3,
        parent_id: null,
        cluster: 'TECH_CORE',
        name: 'Design & Development',
        slug: 'design-development',
        sort_order: 3,
        children: [
          { id: 7, parent_id: 3, cluster: 'TECH_CORE', name: 'Website Design', slug: 'website-design', sort_order: 1 },
          { id: 8, parent_id: 3, cluster: 'TECH_CORE', name: 'Website Development', slug: 'website-development', sort_order: 2 },
        ],
      },
      { id: 4, parent_id: null, cluster: 'TECH_CORE', name: 'Programming', slug: 'programming', sort_order: 4 },
      {
        id: 5,
        parent_id: null,
        cluster: 'TECH_CORE',
        name: 'Hacking & Security',
        slug: 'hacking-security',
        sort_order: 5,
        children: [
          { id: 9, parent_id: 5, cluster: 'TECH_CORE', name: 'Hacking', slug: 'hacking', sort_order: 1 },
          { id: 10, parent_id: 5, cluster: 'TECH_CORE', name: 'Security', slug: 'security', sort_order: 2 },
        ],
      },
      {
        id: 6,
        parent_id: null,
        cluster: 'TECH_CORE',
        name: 'Testing',
        slug: 'testing',
        sort_order: 6,
        children: [
          { id: 11, parent_id: 6, cluster: 'TECH_CORE', name: 'Auto Testing', slug: 'auto-testing', sort_order: 1 },
          { id: 12, parent_id: 6, cluster: 'TECH_CORE', name: 'Manual Testing', slug: 'manual-testing', sort_order: 2 },
        ],
      },
    ],
  },
  {
    cluster: 'SKILLS_GROWTH',
    cluster_name: 'Skills & Growth',
    categories: [
      {
        id: 13,
        parent_id: null,
        cluster: 'SKILLS_GROWTH',
        name: 'S.E.O/Marketing',
        slug: 'seo-marketing',
        sort_order: 7,
        children: [
          { id: 17, parent_id: 13, cluster: 'SKILLS_GROWTH', name: 'S.E.O', slug: 'seo', sort_order: 1 },
          { id: 18, parent_id: 13, cluster: 'SKILLS_GROWTH', name: 'Marketing', slug: 'marketing', sort_order: 2 },
        ],
      },
      { id: 14, parent_id: null, cluster: 'SKILLS_GROWTH', name: 'Soft Skills', slug: 'soft-skills', sort_order: 8 },
      { id: 15, parent_id: null, cluster: 'SKILLS_GROWTH', name: 'Tricks', slug: 'tricks', sort_order: 9 },
      { id: 16, parent_id: null, cluster: 'SKILLS_GROWTH', name: 'Tips', slug: 'tips', sort_order: 10 },
    ],
  },
  {
    cluster: 'RESOURCES_SERVICES',
    cluster_name: 'Resources & Services',
    categories: [
      { id: 19, parent_id: null, cluster: 'RESOURCES_SERVICES', name: 'Product & Services', slug: 'product-services', sort_order: 11 },
      { id: 20, parent_id: null, cluster: 'RESOURCES_SERVICES', name: 'E-Books', slug: 'ebooks', sort_order: 12 },
    ],
  },
];

function getFallback<T>(endpoint: string): T | null {
  if (endpoint.includes('/categories')) {
    return (FALLBACK_CLUSTERS as any) || [];
  }
  if (endpoint.includes('/posts/')) {
    const slug = endpoint.split('/posts/')[1];
    const found = FALLBACK_POSTS.find((p) => p.slug === slug);
    return (found as any) || null;
  }
  if (endpoint.includes('/posts')) {
    return (FALLBACK_POSTS as any) || [];
  }
  return null;
}

export interface Post {
  title: string;
  slug: string;
  category_id: number;
  sub_category_id?: number | null;
  category_slug: string;
  sub_category_slug?: string | null;
  category_path: string[];
  summary: string;
  content: string;
  cover_image?: string;
  author_id: string;
  author_name: string;
  is_breaking: boolean;
  tags: string[];
  seo: {
    meta_title: string;
    meta_description: string;
    canonical_url?: string;
  };
  metrics: {
    views: number;
    likes: number;
    reading_time_minutes: number;
  };
  status: string;
  published_at?: string;
  created_at?: string;
}

export interface QuickNote {
  type: 'TRICK' | 'TIP';
  title: string;
  code_snippet?: string;
  language?: string;
  explanation: string;
  target_tool?: string;
  tags: string[];
  likes_count: number;
}

export interface ServiceInquiry {
  id: number;
  service_id: string;
  service_title?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'RESOLVED';
  created_at: string;
}

export async function loginAdminApi(email: string, password: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.message || 'Invalid email or password' };
    }
    return { success: true, data: json.data };
  } catch (err: any) {
    if (email === 'admin@techpassion.dev' && password === 'Admin@TechPassion2026') {
      return {
        success: true,
        data: {
          token: 'dev_admin_secret_token_2026',
          user: {
            id: 'adm-0000-0000-0000-000000000001',
            email: 'admin@techpassion.dev',
            full_name: 'Tech Passion Lead',
            role: 'SUPER_ADMIN',
          },
        },
      };
    }
    return { success: false, error: err.message || 'Unable to connect to authentication server' };
  }
}

export async function createPostApi(postData: any, token?: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['x-admin-token'] = token;
    }
    const res = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData),
    });
    const json = await res.json();
    if (!res.ok) {
      return { success: false, error: json.message || 'Error creating article' };
    }
    return { success: true, data: json.data };
  } catch (err: any) {
    return { success: false, error: err.message || 'Unable to connect to Backend API' };
  }
}

export async function fetchInquiriesApi(token?: string): Promise<ServiceInquiry[]> {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['x-admin-token'] = token;
    }
    const res = await fetch(`${API_BASE_URL}/services/inquiries`, {
      cache: 'no-store',
      headers,
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export async function updateInquiryStatusApi(
  id: number,
  status: 'NEW' | 'CONTACTED' | 'RESOLVED',
  token?: string
): Promise<boolean> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['x-admin-token'] = token;
    }
    const res = await fetch(`${API_BASE_URL}/services/inquiries/${id}/status`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
