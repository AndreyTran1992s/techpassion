'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/api';
import {
  Clock,
  Eye,
  Calendar,
  User,
  ChevronRight,
  BookOpen,
  Copy,
  Check,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ArticleViewProps {
  post: Post;
}

export function ArticleView({ post: rawPost }: ArticleViewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { lang, t, getLocalizedPost, getLocalizedCategoryName } = useLanguage();

  const post = getLocalizedPost(rawPost);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const dateLocale = lang === 'vi' ? 'vi-VN' : lang === 'zh' ? 'zh-CN' : 'en-US';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.summary,
    author: {
      '@type': 'Person',
      name: post.author_name,
    },
    image: post.cover_image || undefined,
    datePublished: post.published_at || new Date().toISOString(),
    keywords: post.tags?.join(', '),
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-indigo-400 transition-colors">
          {t.breakingNews}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link
          href={`/${post.category_slug}`}
          className="hover:text-indigo-400 transition-colors capitalize"
        >
          {getLocalizedCategoryName(post.category_slug, post.category_slug)}
        </Link>
        {post.sub_category_slug && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link
              href={`/${post.category_slug}/${post.sub_category_slug}`}
              className="hover:text-indigo-400 transition-colors capitalize"
            >
              {getLocalizedCategoryName(post.sub_category_slug, post.sub_category_slug)}
            </Link>
          </>
        )}
      </nav>

      {/* 2. Article Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-indigo-600 text-white">
            {getLocalizedCategoryName(post.category_slug, post.category_slug)}
          </span>
          {post.sub_category_slug && (
            <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300">
              {getLocalizedCategoryName(post.sub_category_slug, post.sub_category_slug)}
            </span>
          )}
          {post.is_breaking && (
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-600 text-white">
              {t.breakingBadge}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
          {post.title}
        </h1>

        <p className="mt-3 text-base text-slate-300 leading-relaxed font-normal">
          {post.summary}
        </p>

        {/* Author & Metadata */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-indigo-400 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white">{post.author_name}</div>
              <div className="text-[11px] text-slate-500">{t.softwareEngineer}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString(dateLocale)
                : new Date('2026-09-25').toLocaleDateString(dateLocale)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {post.metrics?.reading_time_minutes || 5} {t.minRead}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              {post.metrics?.views || 1} {t.views}
            </span>
          </div>
        </div>
      </header>

      {/* 3. Cover Image */}
      {post.cover_image && (
        <div className="mb-8 rounded-xl overflow-hidden border border-[#1f293d] bg-slate-900">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full aspect-[21/9] object-cover"
          />
        </div>
      )}

      {/* 4. Main Article Body */}
      <div className="space-y-6 text-slate-200 text-base leading-relaxed">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5 mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            {t.keyTakeaways}
          </h4>
          <p className="text-xs text-slate-300">
            {t.keyTakeawaysDesc}
          </p>
        </div>

        <div className="whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>

        <div className="my-6 rounded-lg overflow-hidden border border-slate-800 bg-[#0d1117] font-mono text-xs">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-slate-400">
            <span>TypeScript</span>
            <button
              onClick={() => handleCopy('export class Solution {}', 'snippet-1')}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              {copiedCode === 'snippet-1' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span className="text-[11px]">{t.copy}</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-emerald-400">
            <code>{`// Clean Software Architecture Implementation\nexport class ArchitectureEngine {\n  constructor(private readonly config: SystemConfig) {}\n  \n  public async executePipeline(): Promise<void> {\n    console.log("Running Tech Passion Engine...");\n  }\n}`}</code>
          </pre>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-1.5">
            <span className="text-xs text-slate-500 self-center mr-1">{t.topics}</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
