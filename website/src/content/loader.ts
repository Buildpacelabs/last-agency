import fs from 'node:fs';
import path from 'node:path';
import { PAGE_TYPES, type ContentPage, type PageType } from './types';

/* =========================================================================
   Build-time content loader.

   Reads src/content/data/<type>/*.json once per process and caches it. Every
   route that consumes this is statically generated, so this never runs on a
   request path.

   A malformed or incomplete file throws here rather than rendering an empty
   page — a silently blank page that Google has already crawled is far more
   expensive to fix than a failed build.
   ========================================================================= */

const DATA_DIR = path.join(process.cwd(), 'src', 'content', 'data');

const REQUIRED: (keyof ContentPage)[] = [
  'slug',
  'type',
  'primaryKeyword',
  'cluster',
  'h1',
  'metaTitle',
  'metaDescription',
  'updated',
  'answer',
  'sections',
];

function validate(page: unknown, file: string): ContentPage {
  if (typeof page !== 'object' || page === null) {
    throw new Error(`[content] ${file}: expected a JSON object`);
  }
  const p = page as Record<string, unknown>;
  const missing = REQUIRED.filter((k) => p[k] === undefined || p[k] === null || p[k] === '');
  if (missing.length) {
    throw new Error(`[content] ${file}: missing required field(s): ${missing.join(', ')}`);
  }
  if (!Array.isArray(p.sections) || p.sections.length === 0) {
    throw new Error(`[content] ${file}: "sections" must be a non-empty array`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(p.updated))) {
    throw new Error(`[content] ${file}: "updated" must be YYYY-MM-DD, got "${String(p.updated)}"`);
  }

  // Shape-check the nested structures. Catching these here produces a message
  // naming the file and section; letting them through produces an opaque
  // "cannot read properties of undefined" from deep inside React.
  (p.sections as Record<string, unknown>[]).forEach((s, i) => {
    const where = `${file}: sections[${i}] (${String(s?.h2 ?? '?')})`;
    if (!s || typeof s !== 'object') throw new Error(`${where}: not an object`);
    if (!s.h2) throw new Error(`${where}: missing "h2"`);

    const t = s.table as Record<string, unknown> | undefined;
    if (t !== undefined) {
      if (!Array.isArray(t.head) || !Array.isArray(t.rows)) {
        throw new Error(`${where}: "table" needs both "head" and "rows" arrays`);
      }
      const cols = (t.head as unknown[]).length;
      (t.rows as unknown[]).forEach((row, r) => {
        if (!Array.isArray(row)) throw new Error(`${where}: table row ${r} is not an array`);
        if (row.length !== cols) {
          throw new Error(
            `${where}: table row ${r} has ${row.length} cells, header has ${cols}`
          );
        }
      });
    }

    const c = s.callout as Record<string, unknown> | undefined;
    if (c !== undefined && !c.body) throw new Error(`${where}: "callout" needs "body"`);
  });

  // Sources are the page's evidence. A malformed or relative one is a broken
  // citation on a site whose argument is that it shows its working, so fail the
  // build rather than render it.
  if (p.sources !== undefined) {
    if (!Array.isArray(p.sources)) throw new Error(`[content] ${file}: "sources" must be an array`);
    (p.sources as Record<string, unknown>[]).forEach((s, i) => {
      const where = `${file}: sources[${i}]`;
      if (!s || typeof s !== 'object') throw new Error(`${where}: not an object`);
      for (const k of ['title', 'publisher', 'url'] as const) {
        if (typeof s[k] !== 'string' || !(s[k] as string).trim()) {
          throw new Error(`${where}: missing "${k}"`);
        }
      }
      if (!/^https:\/\//.test(s.url as string)) {
        throw new Error(`${where}: url must be absolute https, got "${String(s.url)}"`);
      }
      if (s.date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(String(s.date))) {
        throw new Error(`${where}: "date" must be YYYY-MM-DD, got "${String(s.date)}"`);
      }
    });
  }
  return {
    ...(p as unknown as ContentPage),
    secondaryKeywords: Array.isArray(p.secondaryKeywords) ? (p.secondaryKeywords as string[]) : [],
    intent: (p.intent as ContentPage['intent']) ?? 'informational',
  };
}

function readType(type: PageType): ContentPage[] {
  const dir = path.join(DATA_DIR, type);
  if (!fs.existsSync(dir)) return [];

  const pages = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const full = path.join(dir, f);
      let parsed: unknown;
      try {
        parsed = JSON.parse(fs.readFileSync(full, 'utf8'));
      } catch (err) {
        throw new Error(`[content] ${type}/${f}: invalid JSON — ${(err as Error).message}`);
      }
      const page = validate(parsed, `${type}/${f}`);
      const expected = f.replace(/\.json$/, '');
      if (page.slug !== expected) {
        throw new Error(`[content] ${type}/${f}: slug "${page.slug}" must match the filename`);
      }
      if (page.type !== type) {
        throw new Error(`[content] ${type}/${f}: type "${page.type}" must match its directory`);
      }
      return page;
    });

  return pages.filter(isPublished).sort((a, b) => a.slug.localeCompare(b.slug));
}

/**
 * An editorial schedule, not a trick.
 *
 * A page with a future `published` date is written and committed but does not
 * render, does not enter the sitemap, and cannot be linked to — it simply is not
 * part of the site until its date arrives. That lets a batch of pages be authored
 * in one pass and go live over weeks, which is what a publication normally does
 * and what a same-day dump of hundreds of URLs conspicuously is not.
 *
 * The date is honest either way: whenever the page appears, `datePublished` says
 * the day it actually appeared.
 *
 * Because the site is statically generated, a future-dated page needs a build on
 * or after its date to appear. `.github/workflows/publish-scheduled.yml` runs
 * daily and triggers one only when something is genuinely due.
 *
 * Override with PUBLISH_ALL=1 to build every page regardless of date.
 */
function isPublished(page: ContentPage): boolean {
  if (process.env.PUBLISH_ALL === '1') return true;
  const date = page.published ?? page.updated;
  // Compared as YYYY-MM-DD strings, which sort lexicographically and sidestep
  // every timezone question. The build's own clock decides the boundary.
  return date <= new Date().toISOString().slice(0, 10);
}

/* --- Cache (module scope: one read per build process) --------------------- */
let cache: Record<PageType, ContentPage[]> | null = null;

function all(): Record<PageType, ContentPage[]> {
  if (cache) return cache;
  const out = {} as Record<PageType, ContentPage[]>;
  for (const t of PAGE_TYPES) out[t] = readType(t);
  cache = out;
  return out;
}

/* --- Public API ----------------------------------------------------------- */

export function getPages(type: PageType): ContentPage[] {
  return all()[type];
}

export function getPage(type: PageType, slug: string): ContentPage | undefined {
  return all()[type].find((p) => p.slug === slug);
}

export function getSlugs(type: PageType): string[] {
  return all()[type].map((p) => p.slug);
}

export function getAllPages(): ContentPage[] {
  return PAGE_TYPES.flatMap((t) => all()[t]);
}

export function countByType(): Record<PageType, number> {
  const c = {} as Record<PageType, number>;
  for (const t of PAGE_TYPES) c[t] = all()[t].length;
  return c;
}

/** Pages in the same cluster, excluding the page itself. */
export function clusterSiblings(page: ContentPage, limit = 6): ContentPage[] {
  return getAllPages()
    .filter((p) => p.cluster === page.cluster && !(p.type === page.type && p.slug === page.slug))
    .slice(0, limit);
}

/**
 * Resolve a page's `related` refs to real pages, dropping any that point at
 * content that doesn't exist yet, then top up from the cluster so every page
 * ships with a usable set of onward links.
 */
export function resolveRelated(page: ContentPage, target = 8): ContentPage[] {
  const seen = new Set([`${page.type}/${page.slug}`]);
  const out: ContentPage[] = [];

  for (const ref of page.related ?? []) {
    const key = `${ref.type}/${ref.slug}`;
    if (seen.has(key)) continue;
    const found = getPage(ref.type, ref.slug);
    if (!found) continue;
    seen.add(key);
    out.push(found);
    // `break`, not `return` — a page that declares its full quota of refs still
    // needs to fall through, and an author-declared ref is worth more than a
    // cluster sibling. This cap silently deleted 133 declared links when it was
    // 6, which was the entire reason 67 pages had no editorial inbound links.
    if (out.length >= target) break;
  }

  if (out.length < target) {
    for (const sib of clusterSiblings(page, target * 2)) {
      const key = `${sib.type}/${sib.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(sib);
      if (out.length >= target) break;
    }
  }

  return out;
}

/** Group a type's pages by cluster, for hub pages. */
export function groupByCluster(type: PageType): { cluster: string; pages: ContentPage[] }[] {
  const map = new Map<string, ContentPage[]>();
  for (const p of getPages(type)) {
    const list = map.get(p.cluster) ?? [];
    list.push(p);
    map.set(p.cluster, list);
  }
  return [...map.entries()]
    .map(([cluster, pages]) => ({ cluster, pages }))
    .sort((a, b) => a.cluster.localeCompare(b.cluster));
}
