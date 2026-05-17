import type { MetadataRoute } from 'next';

/**
 * Robots metadata — see output/robots-and-sitemap.md for the canonical spec.
 *
 * Production base: https://lastagency.com
 *
 * - `/api/`, `/_next/` blocked from indexers (server-only / build chunks).
 * - `/thanks` and `/404` blocked (transient / soft-404 surfaces, not landing
 *   pages).
 * - Sitemap pointer keeps crawl-budget cheap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/thanks', '/404'],
      },
    ],
    sitemap: 'https://lastagency.com/sitemap.xml',
    host: 'https://lastagency.com',
  };
}
