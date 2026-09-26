import React from 'react';
import { PillarClientView } from './PillarClientView';

export function generateStaticParams() {
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
  return pillars.map((pillarSlug) => ({ pillarSlug }));
}

interface PillarPageProps {
  params: Promise<{
    pillarSlug: string;
  }>;
}

export default async function PillarPage({ params }: PillarPageProps) {
  const { pillarSlug } = await params;
  return <PillarClientView pillarSlug={pillarSlug} />;
}
