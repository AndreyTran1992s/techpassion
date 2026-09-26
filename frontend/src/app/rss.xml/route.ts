import { NextResponse } from 'next/server';
import { FALLBACK_POSTS } from '@/lib/api';

export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const buildDate = new Date().toUTCString();

  const itemsXml = FALLBACK_POSTS.map((post) => {
    const postUrl = post.sub_category_slug
      ? `${siteUrl}/${post.category_slug}/${post.sub_category_slug}/${post.slug}`
      : `${siteUrl}/${post.category_slug}/post/${post.slug}`;

    return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${postUrl}</link>
        <guid isPermaLink="true">${postUrl}</guid>
        <description><![CDATA[${post.summary}]]></description>
        <category>${post.category_slug.toUpperCase()}</category>
        <author>admin@techpassion.dev (${post.author_name})</author>
        <pubDate>${buildDate}</pubDate>
      </item>`;
  }).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TECH PASSION — WHERE YOU LIVE WITH YOUR PASSION</title>
    <link>${siteUrl}</link>
    <description>Breaking Tech News, AI Engineering, Clean Architecture, Cyber Security, Testing &amp; Software Engineering Magazine.</description>
    <language>vi-vn</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/logo-tech-passion.png</url>
      <title>TECH PASSION — WHERE YOU LIVE WITH YOUR PASSION</title>
      <link>${siteUrl}</link>
      <width>144</width>
      <height>90</height>
    </image>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
