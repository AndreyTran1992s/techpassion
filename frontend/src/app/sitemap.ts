import { MetadataRoute } from 'next';
import { FALLBACK_POSTS } from '@/lib/api';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techpassion.dev';
  const lastModified = new Date();

  // 12 Pillars
  const pillars = [
    'breaking-news',
    'ai',
    'design-development',
    'programming',
    'hacking-security',
    'testing',
    'seo-marketing',
    'soft-skills',
    'tricks',
    'tips',
    'product-services',
    'ebooks',
  ];

  // 8 Sub-items
  const subItems = [
    { pillar: 'design-development', sub: 'website-design' },
    { pillar: 'design-development', sub: 'website-development' },
    { pillar: 'hacking-security', sub: 'hacking' },
    { pillar: 'hacking-security', sub: 'security' },
    { pillar: 'testing', sub: 'auto-testing' },
    { pillar: 'testing', sub: 'manual-testing' },
    { pillar: 'seo-marketing', sub: 'seo' },
    { pillar: 'seo-marketing', sub: 'marketing' },
  ];

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'always',
      priority: 1.0,
    },
    ...pillars.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
    ...subItems.map(({ pillar, sub }) => ({
      url: `${baseUrl}/${pillar}/${sub}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...FALLBACK_POSTS.map((post) => ({
      url: post.sub_category_slug
        ? `${baseUrl}/${post.category_slug}/${post.sub_category_slug}/${post.slug}`
        : `${baseUrl}/${post.category_slug}/post/${post.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];

  return routes;
}
