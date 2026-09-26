import React from 'react';
import { notFound } from 'next/navigation';
import { fetchApi, Post, FALLBACK_POSTS } from '@/lib/api';
import { ArticleView } from '@/components/reader/ArticleView';

export function generateStaticParams() {
  return FALLBACK_POSTS.filter((p) => p.sub_category_slug).map((post) => ({
    pillarSlug: post.category_slug,
    subSlug: post.sub_category_slug as string,
    postSlug: post.slug,
  }));
}

interface SubArticlePageProps {
  params: Promise<{
    pillarSlug: string;
    subSlug: string;
    postSlug: string;
  }>;
}

export default async function SubArticlePage({ params }: SubArticlePageProps) {
  const { postSlug } = await params;
  const post = await fetchApi<Post>(`/posts/${postSlug}`);

  if (!post) {
    notFound();
  }

  return <ArticleView post={post} />;
}
