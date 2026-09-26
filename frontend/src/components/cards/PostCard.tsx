'use client';

import React from 'react';
import Link from 'next/link';
import { Post } from '@/lib/api';
import { Clock, Eye, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post: rawPost }: PostCardProps) {
  const { t, getLocalizedPost, getLocalizedCategoryName } = useLanguage();
  const post = getLocalizedPost(rawPost);

  const articleUrl = post.sub_category_slug
    ? `/${post.category_slug}/${post.sub_category_slug}/${post.slug}`
    : `/${post.category_slug}/post/${post.slug}`;

  return (
    <article className="bg-[#111827] border border-[#1f293d] rounded-xl overflow-hidden hover:border-slate-500 transition-colors flex flex-col h-full">
      <Link href={articleUrl} className="relative block aspect-[16/9] overflow-hidden bg-slate-900">
        <img
          src={post.cover_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/80 text-indigo-300">
            {getLocalizedCategoryName(post.category_slug, post.category_slug)}
          </span>
          {post.sub_category_slug && (
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/80 text-slate-300">
              {getLocalizedCategoryName(post.sub_category_slug, post.sub_category_slug)}
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <Link href={articleUrl}>
            <h3 className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>
          </Link>

          <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {post.summary}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {post.metrics?.reading_time_minutes || 5} {t.minRead}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-slate-400" />
              {post.metrics?.views || 0}
            </span>
          </div>

          <Link
            href={articleUrl}
            className="flex items-center gap-0.5 text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {t.readArticle} <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
