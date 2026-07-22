import type { MetadataRoute } from 'next';

/**
 * Robots — production base https://lastagency.com. Single-page site: allow the
 * root, block build chunks. Sitemap pointer keeps crawl cheap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next/'],
      },
    ],
    sitemap: 'https://lastagency.com/sitemap.xml',
    host: 'https://lastagency.com',
  };
}
