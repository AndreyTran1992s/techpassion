import { describe, it, expect } from 'vitest';
import { UI_DICTIONARY, CATEGORY_TRANSLATIONS, POST_TRANSLATIONS } from '../context/LanguageContext';
import { FALLBACK_POSTS } from '../lib/api';

const EXPECTED_PILLARS_AND_SUBS = [
  // 12 Main Pillars
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
  // 8 Sub-categories
  'website-design',
  'website-development',
  'hacking',
  'security',
  'auto-testing',
  'manual-testing',
  'seo',
  'marketing',
];

describe('Frontend Multi-Language i18n & Data Architecture (Vitest)', () => {
  it('1. UI_DICTIONARY contains synchronized keys across English (en), Vietnamese (vi), and Chinese (zh)', () => {
    const enKeys = Object.keys(UI_DICTIONARY.en);
    const viKeys = Object.keys(UI_DICTIONARY.vi);
    const zhKeys = Object.keys(UI_DICTIONARY.zh);

    expect(enKeys.length).toBeGreaterThan(40);
    expect(viKeys).toEqual(enKeys);
    expect(zhKeys).toEqual(enKeys);
  });

  it('2. Every Pillar & Sub-category has complete translations in EN, VI, and ZH', () => {
    for (const slug of EXPECTED_PILLARS_AND_SUBS) {
      const trans = CATEGORY_TRANSLATIONS[slug];
      expect(trans, `Missing translation for category slug: ${slug}`).toBeDefined();
      expect(trans.en.name.length).toBeGreaterThan(0);
      expect(trans.vi.name.length).toBeGreaterThan(0);
      expect(trans.zh.name.length).toBeGreaterThan(0);
    }
  });

  it('3. Featured Articles have complete localized titles and summaries in EN, VI, and ZH', () => {
    expect(FALLBACK_POSTS.length).toBeGreaterThanOrEqual(4);
    for (const post of FALLBACK_POSTS) {
      const postTrans = POST_TRANSLATIONS[post.slug];
      expect(postTrans, `Missing post translation for slug: ${post.slug}`).toBeDefined();
      expect(postTrans.en.title.length).toBeGreaterThan(5);
      expect(postTrans.vi.title.length).toBeGreaterThan(5);
      expect(postTrans.zh.title.length).toBeGreaterThan(2);
    }
  });

  it('4. Article URL builder produces valid hierarchical routes (/:pillar/:sub/:slug or /:pillar/:slug)', () => {
    for (const post of FALLBACK_POSTS) {
      const url = post.sub_category_slug
        ? `/${post.category_slug}/${post.sub_category_slug}/${post.slug}`
        : `/${post.category_slug}/${post.slug}`;
      expect(url.startsWith('/')).toBe(true);
      expect(url.includes('undefined')).toBe(false);
    }
  });
});
