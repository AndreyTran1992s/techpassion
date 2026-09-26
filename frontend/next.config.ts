import type { NextConfig } from 'next';

const isVercel = Boolean(process.env.VERCEL);
const isDev = process.env.NODE_ENV === 'development';
const isStaticExport = !isVercel && !isDev;

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://images.unsplash.com https://cdn.techpassion.dev",
      "font-src 'self'",
      "connect-src 'self' http://localhost:4000 http://127.0.0.1:4000 https://api.techpassion.dev",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: 'export',
        trailingSlash: true,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
      }
    : {
        ...(process.env.VERCEL ? {} : { distDir: '.next-app' }),
        async headers() {
          return [
            {
              source: '/:path*',
              headers: securityHeaders,
            },
          ];
        },
      }),
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.techpassion.dev',
      },
    ],
  },
};

export default nextConfig;
