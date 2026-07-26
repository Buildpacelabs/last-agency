import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Robots — base URL comes from SITE_URL so the canonical host is defined in one
 * place. Multi-page site: allow every route (/, /seo, /social, /performance,
 * /pricing) and let crawlers fetch the Next static assets so pages render
 * correctly. Sitemap pointer keeps crawl cheap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
