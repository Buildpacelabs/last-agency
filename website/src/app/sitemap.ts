import type { MetadataRoute } from 'next';
import { SITE_URL as BASE } from '@/lib/site';

const LASTMOD = new Date('2026-07-23');

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: '/', priority: 1.0 },
    { path: '/seo', priority: 0.9 },
    { path: '/social', priority: 0.9 },
    { path: '/performance', priority: 0.9 },
    { path: '/pricing', priority: 0.8 },
  ];

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: LASTMOD,
    changeFrequency: 'monthly',
    priority: r.priority,
  }));
}
