/* =========================================================================
   Content model for the programmatic surface (answers, glossary, journal,
   comparisons, services, cost, location and industry pages).

   Every page on the programmatic surface is one JSON file under
   src/content/data/<type>/<slug>.json. One file per page — writers can work
   in parallel without stepping on each other, and a bad file fails loudly at
   build time instead of silently shipping a blank page.
   ========================================================================= */

export const PAGE_TYPES = [
  'answers',
  'glossary',
  'journal',
  'compare',
  'services',
  'cost',
  'seo-agency',
  'seo-for',
] as const;

export type PageType = (typeof PAGE_TYPES)[number];

export type Intent = 'informational' | 'commercial' | 'transactional' | 'navigational';

/** A table inside a section. Kept deliberately simple — head + rows of plain strings. */
export type ContentTable = {
  caption?: string;
  head: string[];
  rows: string[][];
};

/** A pulled-out box. `stat` renders large, `warn` renders in the red band treatment. */
export type Callout = {
  kind: 'note' | 'warn' | 'stat';
  title?: string;
  body: string;
};

export type SubSection = {
  h3: string;
  /** Optional: a sub-section may be a heading plus bullets, with no prose. */
  body?: string[];
  bullets?: string[];
};

export type Section = {
  h2: string;
  /** Optional explicit anchor. Derived from h2 when omitted. */
  id?: string;
  body?: string[];
  bullets?: string[];
  numbered?: string[];
  table?: ContentTable;
  callout?: Callout;
  subs?: SubSection[];
};

export type Faq = { q: string; a: string };

/** A cross-link to another programmatic page. */
export type RelatedRef = {
  type: PageType;
  slug: string;
  /** Optional override for the link text. Defaults to the target's h1. */
  label?: string;
};

export type ContentPage = {
  slug: string;
  type: PageType;

  /* --- Search --- */
  primaryKeyword: string;
  secondaryKeywords: string[];
  cluster: string;
  intent: Intent;

  /* --- Page furniture --- */
  h1: string;
  metaTitle: string;
  metaDescription: string;

  /** ISO date (YYYY-MM-DD). Drives dateModified and the sitemap lastmod. */
  updated: string;
  /** ISO date (YYYY-MM-DD). Drives datePublished. Defaults to `updated`. */
  published?: string;

  /**
   * The 40–60 word direct answer that opens the page. Featured-snippet bait,
   * and the thing an AI answer engine will lift. Required on every page.
   */
  answer: string;

  /** Optional short bullets rendered as a "the short version" block. */
  takeaways?: string[];

  sections: Section[];
  faqs?: Faq[];
  related?: RelatedRef[];

  /* --- Type-specific extras --- */
  /** glossary: the term as a noun, for DefinedTerm schema. */
  term?: string;
  /** glossary: one-line definition, distinct from `answer`. */
  definition?: string;
  /** compare: the two things being compared, for the verdict block. */
  versus?: { a: string; b: string; verdict: string };
  /** seo-agency: the city, for LocalBusiness areaServed. */
  city?: { name: string; region: string; country: string };
  /** seo-for: the industry label. */
  industry?: string;
  /** services: price line shown in the offer block, e.g. "From ₹75,000 / mo". */
  priceFrom?: string;
};

/** Route prefix for a page type. */
export const TYPE_PATH: Record<PageType, string> = {
  answers: '/answers',
  glossary: '/glossary',
  journal: '/journal',
  compare: '/compare',
  services: '/services',
  cost: '/cost',
  'seo-agency': '/seo-agency',
  'seo-for': '/seo-for',
};

/** Human label for a page type, used in breadcrumbs and hub headings. */
export const TYPE_LABEL: Record<PageType, string> = {
  answers: 'Answers',
  glossary: 'Glossary',
  journal: 'Journal',
  compare: 'Comparisons',
  services: 'Services',
  cost: 'Costs',
  'seo-agency': 'SEO by city',
  'seo-for': 'SEO by industry',
};

export function pageHref(type: PageType, slug: string): string {
  return `${TYPE_PATH[type]}/${slug}`;
}

/** Stable anchor id from a heading. */
export function anchorId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}
