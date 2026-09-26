import React from 'react';
import { SubCategoryClientView } from './SubCategoryClientView';

export function generateStaticParams() {
  return [
    { pillarSlug: 'design-development', subSlug: 'website-design' },
    { pillarSlug: 'design-development', subSlug: 'website-development' },
    { pillarSlug: 'hacking-security', subSlug: 'hacking' },
    { pillarSlug: 'hacking-security', subSlug: 'security' },
    { pillarSlug: 'testing', subSlug: 'auto-testing' },
    { pillarSlug: 'testing', subSlug: 'manual-testing' },
    { pillarSlug: 'seo-marketing', subSlug: 'seo' },
    { pillarSlug: 'seo-marketing', subSlug: 'marketing' },
  ];
}

interface SubCategoryPageProps {
  params: Promise<{
    pillarSlug: string;
    subSlug: string;
  }>;
}

export default async function SubCategoryPage({ params }: SubCategoryPageProps) {
  const { pillarSlug, subSlug } = await params;
  return <SubCategoryClientView pillarSlug={pillarSlug} subSlug={subSlug} />;
}
