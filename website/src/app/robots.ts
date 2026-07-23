import type { MetadataRoute } from 'next';

/**
 * Robots — production base https://lastagency.com. Multi-page site: allow every
 * route (/, /seo, /social, /performance, /pricing) and let crawlers fetch the
 * Next static assets so pages render correctly. Sitemap pointer keeps crawl cheap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://lastagency.com/sitemap.xml',
    host: 'https://lastagency.com',
  };
}
