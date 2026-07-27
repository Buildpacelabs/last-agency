import { SITE_URL as BASE } from '@/lib/site';
import { getPages } from '@/content/loader';
import { pageHref, PAGE_TYPES, TYPE_PATH, type PageType } from '@/content/types';
import { STATIC_ROUTES, STATIC_LASTMOD } from '../../sitemap';

/* =========================================================================
   Per-section sitemaps: /sitemaps/answers.xml, /sitemaps/glossary.xml, …

   Search Console reports coverage per submitted sitemap. Splitting by content
   family means "how much of the glossary is indexed?" is a number you can read
   off a screen instead of a question you have to guess at.

   /sitemaps/index.xml is the sitemap index that ties them together.
   ========================================================================= */

export const dynamicParams = false;

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function urlset(entries: { loc: string; lastmod: string }[]): string {
  const body = entries
    .map((e) => `  <url>\n    <loc>${xmlEscape(e.loc)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function sitemapIndex(entries: { loc: string; lastmod: string }[]): string {
  const body = entries
    .map(
      (e) =>
        `  <sitemap>\n    <loc>${xmlEscape(e.loc)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </sitemap>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

/** Most recent `updated` across a section, or the site epoch if it's empty. */
function sectionLastmod(type: PageType): string {
  const dates = getPages(type).map((p) => p.updated);
  return dates.length ? dates.sort().at(-1)! : '2026-07-26';
}

/** The commercial pages, as their own section. */
function coreEntries(): { loc: string; lastmod: string }[] {
  return STATIC_ROUTES.map((r) => ({ loc: `${BASE}${r.path}`, lastmod: STATIC_LASTMOD }));
}

export function generateStaticParams(): { file: string }[] {
  return [
    { file: 'index.xml' },
    { file: 'core.xml' },
    ...PAGE_TYPES.map((t) => ({ file: `${t}.xml` })),
  ];
}

export function GET(_req: Request, { params }: { params: { file: string } }): Response {
  const headers = {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
  };

  if (params.file === 'index.xml') {
    return new Response(
      sitemapIndex([
        { loc: `${BASE}/sitemaps/core.xml`, lastmod: STATIC_LASTMOD },
        ...PAGE_TYPES.map((t) => ({
          loc: `${BASE}/sitemaps/${t}.xml`,
          lastmod: sectionLastmod(t),
        })),
      ]),
      { headers }
    );
  }

  if (params.file === 'core.xml') {
    return new Response(urlset(coreEntries()), { headers });
  }

  const type = params.file.replace(/\.xml$/, '') as PageType;
  if (!PAGE_TYPES.includes(type)) {
    return new Response('Not found', { status: 404 });
  }

  const entries = [
    { loc: `${BASE}${TYPE_PATH[type]}`, lastmod: sectionLastmod(type) },
    ...getPages(type).map((p) => ({
      loc: `${BASE}${pageHref(p.type, p.slug)}`,
      lastmod: p.updated,
    })),
  ];

  return new Response(urlset(entries), { headers });
}
