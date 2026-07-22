import type { MetadataRoute } from 'next';

/**
 * Sitemap — single-page landing site. Only the root is indexable; the 404 is
 * excluded via robots + noindex.
 */
const BASE = 'https://lastagency.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/`,
      lastModified: new Date('2026-07-22'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
