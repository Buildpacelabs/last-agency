import type { MetadataRoute } from 'next';
import { getAllCaseStudies } from '@/lib/content';

/**
 * Sitemap — see output/robots-and-sitemap.md for the canonical spec.
 *
 * Static routes:
 *   - /              priority 1.0
 *   - /work          priority 0.9, lastmod = max(handoffDate)
 *   - /services      priority 0.9
 *   - /about         priority 0.7
 *   - /get-in-touch  priority 0.7
 *
 * Plus one entry per case study at /work/[slug] with priority 0.8 and
 * lastmod = its handoffDate.
 *
 * Excluded: /get-in-touch/thanks (transient), /404 (soft-404).
 */
const BASE = 'https://lastagency.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  const caseStudies = getAllCaseStudies();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE}/services`,
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/about`,
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${BASE}/get-in-touch`,
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];

  const caseRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${BASE}/work/${cs.slug}`,
    lastModified: new Date(cs.handoffDate),
    changeFrequency: 'yearly',
    priority: 0.8,
  }));

  const latestHandoff = caseStudies
    .map((cs) => new Date(cs.handoffDate).getTime())
    .reduce((a, b) => Math.max(a, b), 0);

  const workIndex: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/work`,
      lastModified: latestHandoff ? new Date(latestHandoff) : buildDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...workIndex, ...caseRoutes];
}
