import type { MetadataRoute } from 'next';
import { SITE_URL as BASE } from '@/lib/site';
import { getAllPages } from '@/content/loader';
import { pageHref, PAGE_TYPES, TYPE_PATH } from '@/content/types';

/* =========================================================================
   Complete sitemap — every indexable URL on the site.

   Google ignores <priority> and <changefreq>; it reads <lastmod> and only
   trusts it if it's honest. So lastmod comes from each page's own `updated`
   field rather than a build timestamp — a build does not modify content, and
   claiming otherwise is the fastest way to have Google stop believing the
   file entirely.

   Per-section sitemaps also exist at /sitemaps/<section>.xml so Search Console
   can report indexation per content family. Both are submitted; overlapping
   sitemaps are valid per the protocol.
   ========================================================================= */

// Marketing pages change when we edit them, not when content ships.
export const STATIC_LASTMOD = '2026-07-26';

/** The commercial pages. Exported so /sitemaps/core.xml covers them too — a
 *  sitemap index that omits the pages that earn money reports coverage for
 *  everything except the part you care about. */
export const STATIC_ROUTES: { path: string; priority: number; freq: 'weekly' | 'monthly' }[] = [
  { path: '/', priority: 1.0, freq: 'weekly' },
  { path: '/seo', priority: 0.9, freq: 'monthly' },
  { path: '/social', priority: 0.9, freq: 'monthly' },
  { path: '/performance', priority: 0.9, freq: 'monthly' },
  { path: '/pricing', priority: 0.9, freq: 'monthly' },
  { path: '/about', priority: 0.7, freq: 'monthly' },
  { path: '/contact', priority: 0.7, freq: 'monthly' },
  { path: '/privacy', priority: 0.3, freq: 'monthly' },
  { path: '/terms', priority: 0.3, freq: 'monthly' },
];

/** Priority band per content family — highest for money pages. */
const TYPE_PRIORITY: Record<string, number> = {
  services: 0.8,
  cost: 0.8,
  'seo-agency': 0.7,
  'seo-for': 0.7,
  compare: 0.7,
  answers: 0.6,
  journal: 0.6,
  glossary: 0.5,
};

export function sitemapEntries(): MetadataRoute.Sitemap {
  const statics: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date(`${STATIC_LASTMOD}T00:00:00Z`),
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  const hubs: MetadataRoute.Sitemap = PAGE_TYPES.map((t) => ({
    url: `${BASE}${TYPE_PATH[t]}`,
    lastModified: new Date(`${STATIC_LASTMOD}T00:00:00Z`),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const content: MetadataRoute.Sitemap = getAllPages().map((p) => ({
    url: `${BASE}${pageHref(p.type, p.slug)}`,
    lastModified: new Date(`${p.updated}T00:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: TYPE_PRIORITY[p.type] ?? 0.5,
  }));

  return [...statics, ...hubs, ...content];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries();
}
