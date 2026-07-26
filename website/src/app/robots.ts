import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Robots. Base URL comes from SITE_URL so the canonical host is defined once.
 *
 * Two deliberate calls here:
 *
 * 1. **AI crawlers are allowed, explicitly.** We sell AEO/GEO — getting cited
 *    by AI answers is part of the product. Blocking the crawlers that feed
 *    those answers would be selling something we opt out of ourselves. Named
 *    rather than left to the wildcard so the intent is unambiguous.
 *
 * 2. **Both sitemaps are listed.** /sitemap.xml is the complete file;
 *    /sitemaps/index.xml is the per-section index that gives Search Console
 *    coverage numbers per content family.
 */

const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'meta-externalagent',
  'Amazonbot',
  'DuckAssistBot',
  'cohere-ai',
  'MistralAI-User',
  'YouBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Query-string variants of real pages produce duplicate URLs with no
        // unique content. Canonicals already handle it; this saves crawl budget.
        disallow: ['/*?*utm_', '/*?*fbclid', '/*?*gclid'],
      },
      ...AI_AGENTS.map((ua) => ({ userAgent: ua, allow: '/' })),
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/sitemaps/index.xml`],
    host: SITE_URL,
  };
}
