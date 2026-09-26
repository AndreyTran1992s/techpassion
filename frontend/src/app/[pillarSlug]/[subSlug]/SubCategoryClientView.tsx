'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchApi, ClusterMenu, Post, FALLBACK_POSTS } from '@/lib/api';
import { PostCard } from '@/components/cards/PostCard';
import { ChevronRight, Layers, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function SubCategoryClientView({
  pillarSlug,
  subSlug,
}: {
  pillarSlug: string;
  subSlug: string;
}) {
  const { t, getLocalizedCategoryName, getLocalizedCategoryDesc } = useLanguage();

  const [currentPillar, setCurrentPillar] = useState<any>(null);
  const [currentSub, setCurrentSub] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function load() {
      const [clusters, fetchedPosts] = await Promise.all([
        fetchApi<ClusterMenu[]>('/categories/menu'),
        fetchApi<Post[]>(`/posts?category=${pillarSlug}&sub_category=${subSlug}`),
      ]);

      if (clusters) {
        for (const cluster of clusters) {
          const foundPillar = cluster.categories.find((c) => c.slug === pillarSlug);
          if (foundPillar) {
            setCurrentPillar(foundPillar);
            if (foundPillar.children) {
              setCurrentSub(foundPillar.children.find((s) => s.slug === subSlug));
            }
            break;
          }
        }
      }

      if (fetchedPosts && fetchedPosts.length > 0) {
        setPosts(fetchedPosts);
      } else {
        setPosts(FALLBACK_POSTS.filter((p) => p.sub_category_slug === subSlug));
      }
    }
    load();
  }, [pillarSlug, subSlug]);

  const pillarTitle = getLocalizedCategoryName(
    pillarSlug,
    currentPillar ? currentPillar.name : pillarSlug.replace('-', ' ')
  );
  const subTitle = getLocalizedCategoryName(
    subSlug,
    currentSub ? currentSub.name : subSlug.replace('-', ' ')
  );
  const subDesc = getLocalizedCategoryDesc(subSlug, currentSub?.description);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-indigo-400 transition-colors">
          {t.breakingNews}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link href={`/${pillarSlug}`} className="hover:text-indigo-400 transition-colors capitalize">
          {pillarTitle}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-300 font-medium capitalize">
          {subTitle}
        </span>
      </nav>

      {/* Sub-category Header */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#121722] to-[#181f2e] border border-[#232d42] mb-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
          <Layers className="w-4 h-4" />
          {pillarTitle} › {t.specializedTopicBadge}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          {subTitle}
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl">
          {subDesc}
        </p>

        {currentPillar?.children && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-2">{t.filterTopicLabel}</span>
            <Link
              href={`/${pillarSlug}`}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800 transition-colors"
            >
              {t.all}
            </Link>
            {currentPillar.children.map((sub: any) => {
              const isActive = sub.slug === subSlug;
              return (
                <Link
                  key={sub.id}
                  href={`/${pillarSlug}/${sub.slug}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white font-bold shadow-sm'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {getLocalizedCategoryName(sub.slug, sub.name)}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/60 max-w-lg mx-auto">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">{t.noArticlesTitle}</h3>
          <p className="text-xs text-slate-400 mt-1">
            {t.noArticlesDesc}
          </p>
        </div>
      )}
    </div>
  );
}
