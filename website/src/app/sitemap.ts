import type { MetadataRoute } from 'next';
import { SITE_URL as BASE } from '@/lib/site';

// Bump when page content or canonical URLs change — crawlers use this to
// decide recrawl priority. Last change: canonical host moved to lastagencyhere.com.
const LASTMOD = new Date('2026-07-26');

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
