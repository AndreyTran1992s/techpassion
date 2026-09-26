import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { BreakingNewsTicker } from '@/components/layout/BreakingNewsTicker';
import { Footer } from '@/components/layout/Footer';
import { fetchApi, ClusterMenu } from '@/lib/api';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Tech Passion — Where You Live With Your Passion',
  description: 'Breaking IT news, deep-dive engineering articles on AI, Programming, Web Design, Security, Automated Testing, and curated E-Books for Software Engineers.',
  keywords: ['software engineering', 'ai', 'programming', 'security', 'testing', 'tech news', 'ebooks'],
  authors: [{ name: 'Tech Passion Lead' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Tech Passion — Where You Live With Your Passion',
    description: 'Breaking IT news, AI, Programming, Security, Automated Testing, and E-Books for Software Engineers.',
    siteName: 'Tech Passion',
    locale: 'en_US',
    type: 'website',
  },
};

const DEFAULT_CLUSTERS: ClusterMenu[] = [
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clusters = (await fetchApi<ClusterMenu[]>('/categories/menu')) || DEFAULT_CLUSTERS;

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0a0d14] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <LanguageProvider>
          <BreakingNewsTicker />
          <Header clusters={clusters} />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
