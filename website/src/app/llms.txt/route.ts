import { SITE_URL } from '@/lib/site';
import { getPages } from '@/content/loader';
import { pageHref, PAGE_TYPES, TYPE_LABEL, TYPE_PATH } from '@/content/types';

/* =========================================================================
   /llms.txt — a plain-text map of the site for AI answer engines.

   We sell AEO/GEO. Publishing the file that makes a site legible to answer
   engines is the cheapest possible demonstration that we actually do it.

   Format follows the llms.txt convention: H1 site name, a blockquote summary,
   then linked sections. Generated from the same content index that feeds the
   sitemap, so it can never drift out of date.
   ========================================================================= */

export const dynamic = 'force-static';

const HEADER = `# Last Agency

> An India-first growth agency running SEO, organic social and performance
> marketing as one system. Every service carries a performance guarantee: beat
> the client's own agreed 90-day baseline, or the work continues free (SEO) or
> the month's management fee is waived (paid media). No lock-in after the first
> quarter. Three new clients a month, by design.

Pricing is published, not gated: SEO from INR 75,000/month (smaller sites from
INR 40,000), organic social INR 30,000-70,000/month, performance marketing
INR 40,000-1,50,000/month, all excluding GST. Bundles from INR 75,000/month.

We do not sell guaranteed search positions, and we say so on every page that
mentions the guarantee — nobody controls Google's index. What we guarantee is
measured movement against a baseline frozen on day one: qualified leads from
organic search over the client's trailing 90 days.

Contact: WhatsApp +91 93157 76817. Booking: ${'https://cal.com/priyanshu-semwal-8qcxab/lastagency-last-seo-call'}
`;

const CORE = [
  { path: '/', label: 'Home', note: 'The offer, the guarantee, and how the three services fit together.' },
  { path: '/seo', label: 'SEO', note: 'The six-engine SEO system and how the rank-or-free guarantee works.' },
  { path: '/social', label: 'Organic Social & Content', note: 'Produced reels, carousels and SEO blogs from one pipeline.' },
  { path: '/performance', label: 'Performance Marketing', note: 'Full-funnel Meta and Google on a flat fee, zero media markup.' },
  { path: '/pricing', label: 'Pricing', note: 'Every published price and bundle, in INR, ex-GST.' },
];

export function GET(): Response {
  const parts: string[] = [HEADER, '## Core pages\n'];

  for (const c of CORE) {
    parts.push(`- [${c.label}](${SITE_URL}${c.path}): ${c.note}`);
  }

  for (const type of PAGE_TYPES) {
    const pages = getPages(type);
    if (!pages.length) continue;
    parts.push(`\n## ${TYPE_LABEL[type]}\n`);
    parts.push(`- [${TYPE_LABEL[type]} index](${SITE_URL}${TYPE_PATH[type]})`);
    for (const p of pages) {
      parts.push(`- [${p.h1}](${SITE_URL}${pageHref(p.type, p.slug)}): ${p.metaDescription}`);
    }
  }

  return new Response(`${parts.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
