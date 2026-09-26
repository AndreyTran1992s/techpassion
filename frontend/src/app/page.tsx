'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchApi, Post, FALLBACK_POSTS } from '@/lib/api';
import { Clock, Eye, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const [rawPosts, setRawPosts] = useState<Post[]>(FALLBACK_POSTS);
  const { t, getLocalizedPost, getLocalizedCategoryName } = useLanguage();

  useEffect(() => {
    async function loadPosts() {
      const fetched = await fetchApi<Post[]>('/posts');
      if (fetched && fetched.length > 0) {
        setRawPosts(fetched);
      }
    }
    loadPosts();
  }, []);

  const posts = rawPosts.map((p) => getLocalizedPost(p));

  const mainHero = posts[0] || getLocalizedPost(FALLBACK_POSTS[0]);
  const subHeroTop = posts[1] || getLocalizedPost(FALLBACK_POSTS[1]);
  const subHeroBottom1 = posts[2] || getLocalizedPost(FALLBACK_POSTS[2]);
  const subHeroBottom2 = posts[3] || getLocalizedPost(FALLBACK_POSTS[3]);

  const getPostUrl = (p: Post) =>
    p.sub_category_slug ? `/${p.category_slug}/${p.sub_category_slug}/${p.slug}` : `/${p.category_slug}/post/${p.slug}`;

  return (
    <div className="w-full max-w-[1180px] mx-auto bg-[#181818] border-x border-[#282828] px-4 sm:px-6 py-6 space-y-10">
      {/* 1. HERO MOSAIC BENTO GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-2">
        <Link
          href={getPostUrl(mainHero)}
          className="lg:col-span-7 relative h-[320px] sm:h-[390px] overflow-hidden group bg-[#111] border border-[#2a2a2a]"
        >
          <img
            src={mainHero.cover_image}
            alt={mainHero.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          <span className="absolute top-3 left-3 bg-[#e74c3c] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1">
            {getLocalizedCategoryName(mainHero.category_slug, mainHero.category_slug)}
          </span>
          <div className="absolute bottom-0 inset-x-0 p-5 text-center bg-black/60">
            <h1 className="text-lg sm:text-2xl font-extrabold text-white leading-snug group-hover:text-[#ff9900] transition-colors">
              {mainHero.title}
            </h1>
            <p className="text-xs text-neutral-300 line-clamp-2 mt-1.5 max-w-xl mx-auto">
              {mainHero.summary}
            </p>
          </div>
        </Link>

        <div className="lg:col-span-5 grid grid-rows-2 gap-2 h-[390px]">
          <Link
            href={getPostUrl(subHeroTop)}
            className="relative overflow-hidden group bg-[#111] border border-[#2a2a2a]"
          >
            <img
              src={subHeroTop.cover_image}
              alt={subHeroTop.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <span className="absolute top-2.5 left-2.5 bg-[#ff5722] text-white text-[10px] font-bold uppercase px-2 py-0.5">
              {getLocalizedCategoryName(subHeroTop.category_slug, subHeroTop.category_slug)}
            </span>
            <div className="absolute bottom-0 inset-x-0 p-3 bg-black/65">
              <h2 className="text-sm font-bold text-white line-clamp-2 group-hover:text-[#ff9900] transition-colors">
                {subHeroTop.title}
              </h2>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-2">
            {[subHeroBottom1, subHeroBottom2].map((item, i) => (
              <Link
                key={i}
                href={getPostUrl(item)}
                className="relative overflow-hidden group bg-[#111] border border-[#2a2a2a]"
              >
                <img
                  src={item.cover_image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <span className="absolute top-2 left-2 bg-[#e67e22] text-white text-[9px] font-bold uppercase px-2 py-0.5">
                  {getLocalizedCategoryName(item.category_slug, item.category_slug)}
                </span>
                <div className="absolute bottom-0 inset-x-0 p-2.5 bg-black/70">
                  <h3 className="text-xs font-bold text-white line-clamp-2 group-hover:text-[#ff9900] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN MAGAZINE AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-10">
          {/* BLOCK A: AI & PROGRAMMING */}
          <section>
            <div className="flex items-center justify-between border-b-2 border-[#2a2a2a] pb-2 mb-5 relative">
              <div className="flex items-center gap-4">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  {t.aiAndProgramming}
                </h2>
                <div className="hidden sm:flex items-center gap-3 text-[10px] font-bold uppercase text-neutral-500">
                  <Link href="/ai" className="text-[#ff9900]">{t.all}</Link>
                  <Link href="/ai" className="hover:text-white">{t.aiEngineering}</Link>
                  <Link href="/programming" className="hover:text-white">{t.architecture}</Link>
                </div>
              </div>
              <span className="absolute bottom-[-2px] left-0 w-28 h-[2px] bg-[#ff9900]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <Link
                href={getPostUrl(mainHero)}
                className="md:col-span-6 flex flex-col bg-[#f39c12] text-white group overflow-hidden border border-[#f39c12]"
              >
                <div className="h-48 overflow-hidden bg-black">
                  <img
                    src={mainHero.cover_image}
                    alt={mainHero.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-snug group-hover:underline">
                      {mainHero.title}
                    </h3>
                    <p className="text-xs text-white/90 mt-2 line-clamp-3 leading-relaxed">
                      {mainHero.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-white/20 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between">
                    <span>{mainHero.author_name}</span>
                    <span>{t.readMore} ▸</span>
                  </div>
                </div>
              </Link>

              <div className="md:col-span-6 space-y-4">
                {posts.slice(1, 4).map((p) => (
                  <Link
                    key={p.slug}
                    href={getPostUrl(p)}
                    className="flex gap-3.5 bg-[#1f1f1f] border border-[#2b2b2b] p-2.5 hover:border-[#ff9900]/50 transition-colors group"
                  >
                    <img
                      src={p.cover_image}
                      alt={p.title}
                      className="w-28 h-20 object-cover shrink-0 bg-black"
                    />
                    <div className="min-w-0 flex flex-col justify-between">
                      <h4 className="text-xs font-bold text-neutral-100 group-hover:text-[#ff9900] line-clamp-2 leading-snug transition-colors">
                        {p.title}
                      </h4>
                      <div className="text-[10px] text-neutral-500 flex items-center gap-2">
                        <span className="text-[#ff9900] uppercase font-bold">
                          {getLocalizedCategoryName(p.category_slug, p.category_slug)}
                        </span>
                        <span>• {p.metrics?.reading_time_minutes || 5} {t.minRead}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* BLOCK B: RECENT POSTS */}
          <section>
            <div className="flex items-center justify-between border-b-2 border-[#2a2a2a] pb-2 mb-5 relative">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-white">
                {t.recentPosts}
              </h2>
              <span className="absolute bottom-[-2px] left-0 w-28 h-[2px] bg-[#ff9900]" />
            </div>

            <div className="space-y-5">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="flex flex-col sm:flex-row gap-4 pb-5 border-b border-[#262626] group"
                >
                  <Link href={getPostUrl(post)} className="sm:w-52 sm:h-36 shrink-0 overflow-hidden bg-black border border-[#2d2d2d]">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="inline-block bg-[#252525] text-[#ff9900] border border-[#333] text-[10px] font-bold uppercase px-2 py-0.5 mb-1.5">
                        {getLocalizedCategoryName(post.category_slug, post.category_slug)}
                      </span>
                      <Link href={getPostUrl(post)}>
                        <h3 className="text-base font-bold text-neutral-100 group-hover:text-[#ff9900] transition-colors leading-snug">
                          {post.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-3 text-[11px] text-neutral-500 my-1.5">
                        <span>{t.byAuthor} {post.author_name}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.metrics?.reading_time_minutes || 5} {t.minRead}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {post.metrics?.views || 120} {t.views}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5">
              <Link
                href="/programming"
                className="block w-full py-2.5 bg-[#222222] hover:bg-[#ff9900] text-center text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white border border-[#303030] transition-colors"
              >
                {t.loadMorePosts}
              </Link>
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR COLUMN */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-[#1c1c1c] border border-[#2b2b2b]">
            <div className="grid grid-cols-3 text-[11px] font-extrabold uppercase text-center border-b border-[#2e2e2e]">
              <div className="bg-[#ff9900] text-white py-2.5">{t.popular}</div>
              <Link href="/tricks" className="bg-[#242424] text-neutral-400 hover:text-white py-2.5 border-x border-[#2e2e2e]">
                {t.tricks}
              </Link>
              <Link href="/ebooks" className="bg-[#242424] text-neutral-400 hover:text-white py-2.5">
                {t.ebooks}
              </Link>
            </div>

            <div className="p-4 divide-y divide-[#292929]">
              {posts.slice(0, 4).map((p) => (
                <Link
                  key={p.slug}
                  href={getPostUrl(p)}
                  className="py-3 first:pt-0 last:pb-0 flex gap-3 group"
                >
                  <img
                    src={p.cover_image}
                    alt={p.title}
                    className="w-16 h-16 object-cover shrink-0 bg-black border border-[#333]"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-neutral-200 group-hover:text-[#ff9900] line-clamp-2 leading-snug">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500 line-clamp-1 mt-1">
                      {p.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between border-b-2 border-[#2a2a2a] pb-2 mb-4 relative">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                {t.hackingAndSecurity}
              </h3>
              <span className="absolute bottom-[-2px] left-0 w-24 h-[2px] bg-[#ff9900]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {posts.slice(0, 3).map((p, idx) => (
                <Link
                  key={idx}
                  href={getPostUrl(p)}
                  className="bg-[#1e1e1e] border border-[#2b2b2b] p-3 block group hover:border-[#ff9900]/50 transition-colors"
                >
                  <div className="h-32 overflow-hidden bg-black mb-2.5">
                    <img
                      src={p.cover_image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-neutral-100 group-hover:text-[#ff9900] leading-snug mb-2">
                    {p.title}
                  </h4>
                  <span className="inline-block bg-[#ff5722] text-white text-[10px] font-bold px-2 py-0.5">
                    {getLocalizedCategoryName(p.category_slug, p.category_slug).toUpperCase()} • 2026
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between border-b-2 border-[#2a2a2a] pb-2 mb-4 relative">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                {t.corePillars12}
              </h3>
              <span className="absolute bottom-[-2px] left-0 w-24 h-[2px] bg-[#ff9900]" />
            </div>

            <div className="bg-[#1c1c1c] border border-[#2b2b2b] p-3 divide-y divide-[#262626] text-xs">
              {[
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
                'ebooks',
                'product-services',
              ].map((slug) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="py-2 flex items-center justify-between text-neutral-300 hover:text-[#ff9900] transition-colors"
                >
                  <span>▸ {getLocalizedCategoryName(slug, slug)}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 3. BOTTOM 3-COLUMN CATEGORY SILOS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {[
          { title: t.designAndDev, slug: '/design-development', main: posts[0] || mainHero },
          { title: t.testingAndQa, slug: '/testing', main: posts[1] || subHeroTop },
          { title: t.securityAndDevsecops, slug: '/hacking-security', main: posts[2] || subHeroBottom1 },
        ].map((col, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between border-b-2 border-[#2a2a2a] pb-2 mb-4 relative">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <span className="absolute bottom-[-2px] left-0 w-20 h-[2px] bg-[#ff9900]" />
            </div>

            <div className="bg-[#1d1d1d] border border-[#2b2b2b] p-3.5">
              <Link href={getPostUrl(col.main)} className="block group">
                <div className="h-40 overflow-hidden bg-black mb-3">
                  <img
                    src={col.main.cover_image}
                    alt={col.main.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#ff9900] line-clamp-2 leading-snug">
                  {col.main.title}
                </h4>
                <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
                  {col.main.summary}
                </p>
                <span className="inline-block mt-3 bg-[#ff9900] hover:bg-[#e68a00] text-white text-[10px] font-extrabold uppercase px-3 py-1">
                  {t.readMore}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
