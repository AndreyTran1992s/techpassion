'use client';

import React from 'react';
import Link from 'next/link';
import { Flame } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FALLBACK_POSTS } from '@/lib/api';

export function BreakingNewsTicker() {
  const { t, getLocalizedPost } = useLanguage();

  const localizedPosts = FALLBACK_POSTS.map((p) => getLocalizedPost(p));

  const getPostHref = (p: typeof FALLBACK_POSTS[0]) =>
    p.sub_category_slug
      ? `/${p.category_slug}/${p.sub_category_slug}/${p.slug}`
      : `/${p.category_slug}/post/${p.slug}`;

  return (
    <div className="w-full max-w-[1180px] mx-auto bg-[#141414] border-x border-b border-[#282828] px-4 sm:px-6 h-9 flex items-center gap-3 overflow-hidden text-xs">
      <div className="flex items-center gap-1.5 bg-[#222222] border border-[#333333] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#ff9900] shrink-0">
        <Flame className="w-3 h-3 fill-[#ff9900]" />
        <span>{t.latestNews}</span>
      </div>

      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-[11px] text-neutral-400">
        {localizedPosts.map((item, idx) => (
          <Link
            key={idx}
            href={getPostHref(item)}
            className="hover:text-[#ff9900] transition-colors flex items-center gap-1.5"
          >
            <span className="text-[#ff9900] font-bold">▸</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
