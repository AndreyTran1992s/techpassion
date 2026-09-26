import React from 'react';
import { notFound } from 'next/navigation';
import { fetchApi, Post, FALLBACK_POSTS } from '@/lib/api';
import { ArticleView } from '@/components/reader/ArticleView';

export function generateStaticParams() {
  return FALLBACK_POSTS.map((post) => ({
    pillarSlug: post.category_slug,
    postSlug: post.slug,
  }));
}

interface PillarArticlePageProps {
  params: Promise<{
    pillarSlug: string;
    postSlug: string;
  }>;
}

export default async function PillarArticlePage({ params }: PillarArticlePageProps) {
  const { postSlug } = await params;
  const post = await fetchApi<Post>(`/posts/${postSlug}`);

  if (!post) {
    notFound();
  }

  return <ArticleView post={post} />;
}
