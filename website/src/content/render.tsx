import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { ArticleShell } from '@/components/ArticleShell';
import { FinalCta } from '@/components/FinalCta';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getPage, getPages, getSlugs, groupByCluster, resolveRelated } from './loader';
import { pageHref, TYPE_LABEL, TYPE_PATH, type ContentPage, type PageType } from './types';
import {
  articleNode,
  breadcrumbFor,
  definedTermNode,
  faqNodeFor,
  itemListFor,
  serviceFor,
  speakableFor,
} from './schema';

/* =========================================================================
   One renderer for all eight route families. Route files stay thin so a
   change to schema, breadcrumbs or canonical handling lands everywhere.
   ========================================================================= */

type FamilyConfig = {
  /** Hub H1 + intro. */
  hubH1: string;
  hubIntro: string;
  hubMetaTitle: string;
  hubMetaDescription: string;
  /** Eyebrow above the H1 on a detail page. */
  eyebrow: string;
  /** Label above the opening answer block. */
  answerLabel: string;
  /** serviceType passed to the Service node, when the family is commercial. */
  serviceType?: string;
  /** Human label for a cluster id, when we can do better than the raw slug. */
  clusterLabel?: (cluster: string) => string;
};

/** Families whose pages are genuinely articles, not commercial landing pages. */
const EDITORIAL = new Set<PageType>(['answers', 'journal', 'compare', 'glossary']);

function titleCase(slug: string): string {
  return slug
    .split('-')
    .map((w) => (w.length <= 2 ? w : w[0].toUpperCase() + w.slice(1)))
    .join(' ');
}

export const FAMILY: Record<PageType, FamilyConfig> = {
  answers: {
    hubH1: 'SEO questions, answered straight.',
    hubIntro:
      "Every question founders actually ask us about SEO and SEO agencies — answered without the hedging, the upsell or the 2,000-word warm-up. If an answer is 'it depends', we tell you what it depends on.",
    hubMetaTitle: 'SEO Answers — Straight Answers to Real SEO Questions',
    hubMetaDescription:
      'Direct answers to the questions founders ask about SEO agencies: how they work, what they cost, what they include, and how to tell a good one from an expensive one.',
    eyebrow: 'Answered straight',
    answerLabel: 'The short answer',
  },
  glossary: {
    hubH1: 'The SEO glossary, in plain English.',
    hubIntro:
      "Every term your agency puts in a report and never explains. One page per term, defined in a sentence, then explained properly — including whether it actually matters to your revenue or just fills a slide.",
    hubMetaTitle: 'SEO Glossary — Every SEO Term in Plain English',
    hubMetaDescription:
      'An SEO glossary written for founders, not for other SEOs. Every term defined in one sentence, then explained — plus whether it actually affects your revenue.',
    eyebrow: 'SEO glossary',
    answerLabel: 'Definition',
    clusterLabel: (c) => titleCase(c),
  },
  journal: {
    hubH1: 'The journal.',
    hubIntro:
      "What we think about agencies, retainers, rankings and the parts of this industry nobody puts in a pitch deck. Opinionated on purpose. Every claim carries a number or a reason.",
    hubMetaTitle: 'The Last Agency Journal — SEO Without the Pitch Deck',
    hubMetaDescription:
      'Opinionated long-form on SEO, agency economics and the Indian search market. What retainers really buy, why ranking guarantees are a lie, and what AI search actually breaks.',
    eyebrow: 'Journal',
    answerLabel: 'The argument, in short',
  },
  compare: {
    hubH1: 'X vs Y, with an actual recommendation.',
    hubIntro:
      "Every 'versus' post online ends with 'it depends on your goals'. Ours end with a recommendation, a budget in rupees, and who should pick the other one instead.",
    hubMetaTitle: 'SEO Comparisons — SEO vs PPC, Agency vs In-House & More',
    hubMetaDescription:
      'Head-to-head marketing comparisons that end in a real recommendation: SEO vs PPC, agency vs in-house, agency vs freelancer, and more — with budgets in INR.',
    eyebrow: 'Head to head',
    answerLabel: 'The verdict',
  },
  services: {
    hubH1: 'What we actually do.',
    hubIntro:
      "Every service we sell, what's inside it, what it costs, and what the guarantee covers. No 'bespoke packages' you have to book a call to decode.",
    hubMetaTitle: 'SEO Services — What Each One Includes and Costs',
    hubMetaDescription:
      'Every SEO and growth service Last Agency runs: what is included, what it costs in INR, who it suits, and exactly what the beat-your-baseline guarantee covers.',
    eyebrow: 'Service',
    answerLabel: 'What this is',
    serviceType: 'Search engine optimization',
  },
  cost: {
    hubH1: 'What SEO costs. Real numbers.',
    hubIntro:
      "Published prices, published bands, and an honest account of what changes them. If you have to book a call to find out the price, the price is 'as much as they think you'll pay'.",
    hubMetaTitle: 'SEO Cost & Pricing — Real Numbers, Published Upfront',
    hubMetaDescription:
      'What SEO actually costs in India: agency retainers, freelancer rates, per-service pricing and what moves the number. Real INR bands, published, no call required.',
    eyebrow: 'Pricing',
    answerLabel: 'The number',
  },
  'seo-agency': {
    hubH1: 'SEO, city by city.',
    hubIntro:
      "We're remote-first and we work across India and beyond. These pages cover what search competition actually looks like in each market — the industries that dominate it, the queries that convert, and what a realistic budget is there.",
    hubMetaTitle: 'SEO Agency by City — India & International Coverage',
    hubMetaDescription:
      'SEO agency coverage city by city: the industries that dominate each market, the queries that convert there, and a realistic monthly budget in local terms.',
    eyebrow: 'By city',
    answerLabel: 'The short answer',
    serviceType: 'Search engine optimization',
  },
  'seo-for': {
    hubH1: 'SEO, industry by industry.',
    hubIntro:
      "A dental clinic and a SaaS company have almost nothing in common in search. These pages cover what actually moves the number in each industry — and what the generic advice gets wrong about yours.",
    hubMetaTitle: 'SEO by Industry — Strategies That Fit Your Market',
    hubMetaDescription:
      'Industry-specific SEO: what actually ranks for SaaS, ecommerce, healthcare, real estate, exporters and more — and where the generic playbook fails each one.',
    eyebrow: 'By industry',
    answerLabel: 'The short answer',
    serviceType: 'Search engine optimization',
  },
};

/* --- Detail pages --------------------------------------------------------- */

export function detailParams(type: PageType): { slug: string }[] {
  return getSlugs(type).map((slug) => ({ slug }));
}

export function detailMetadata(type: PageType, slug: string): Metadata {
  const page = getPage(type, slug);
  if (!page) return {};
  const path = pageHref(type, slug);
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords].slice(0, 12),
    alternates: { canonical: path },
    openGraph: {
      type: EDITORIAL.has(type) ? 'article' : 'website',
      url: path,
      title: page.metaTitle,
      description: page.metaDescription,
      publishedTime: `${page.published ?? page.updated}T09:00:00+05:30`,
      modifiedTime: `${page.updated}T09:00:00+05:30`,
    },
    twitter: { title: page.metaTitle, description: page.metaDescription },
  };
}

function crumbsFor(page: ContentPage): { name: string; path: string }[] {
  return [
    { name: 'Home', path: '/' },
    { name: TYPE_LABEL[page.type], path: TYPE_PATH[page.type] },
    { name: page.h1, path: pageHref(page.type, page.slug) },
  ];
}

export function DetailPage({ type, slug }: { type: PageType; slug: string }): JSX.Element {
  const page = getPage(type, slug);
  if (!page) notFound();

  const cfg = FAMILY[type];
  const crumbs = crumbsFor(page);
  const related = resolveRelated(page);

  const graph: Record<string, unknown>[] = [speakableFor(page), breadcrumbFor(crumbs)];

  // Article/BlogPosting only on the editorial families. A service or pricing
  // page marked up as an Article is misrepresenting what it is — Google's
  // Article guidance is explicit that it's for news, blog and sports content,
  // and commercial pages get Service + WebPage instead.
  if (EDITORIAL.has(type)) graph.push(articleNode(page));

  const faq = faqNodeFor(page);
  if (faq) graph.push(faq);

  const term = definedTermNode(page);
  if (term) graph.push(term);

  if (cfg.serviceType) graph.push(serviceFor(page, cfg.serviceType));

  return (
    <>
      <JsonLd graph={graph} />
      <ArticleShell
        page={page}
        crumbs={crumbs}
        related={related}
        eyebrow={cfg.eyebrow}
        answerLabel={cfg.answerLabel}
      />
    </>
  );
}

/* --- Hub pages ------------------------------------------------------------ */

export function hubMetadata(type: PageType): Metadata {
  const cfg = FAMILY[type];
  return {
    title: cfg.hubMetaTitle,
    description: cfg.hubMetaDescription,
    alternates: { canonical: TYPE_PATH[type] },
    openGraph: {
      url: TYPE_PATH[type],
      title: cfg.hubMetaTitle,
      description: cfg.hubMetaDescription,
    },
  };
}

export function HubPage({ type }: { type: PageType }): JSX.Element {
  const cfg = FAMILY[type];
  const pages = getPages(type);
  const groups = groupByCluster(type);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: TYPE_LABEL[type], path: TYPE_PATH[type] },
  ];

  return (
    <>
      <JsonLd
        graph={[
          breadcrumbFor(crumbs),
          itemListFor(TYPE_PATH[type], cfg.hubMetaTitle, pages),
          {
            '@type': 'CollectionPage',
            // Absolute @id — a relative one doesn't resolve against the rest of
            // the graph, so the hub would sit disconnected from #website/#org.
            '@id': `${SITE_URL}${TYPE_PATH[type]}#collection`,
            url: `${SITE_URL}${TYPE_PATH[type]}`,
            name: cfg.hubMetaTitle,
            description: cfg.hubMetaDescription,
            inLanguage: 'en-IN',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#org` },
          },
        ]}
      />

      <header className="band-ink art-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <h1 className="art-h1">{cfg.hubH1}</h1>
          <p className="sub">{cfg.hubIntro}</p>
          <p className="art-meta">
            {pages.length} page{pages.length === 1 ? '' : 's'} · updated continuously
          </p>
        </div>
      </header>

      <div className="band-ink pad">
        <div className="wrap">
          {groups.map((g) => (
            <section className="hub-group" key={g.cluster} aria-labelledby={`c-${g.cluster}`}>
              <h2 className="hub-group-h" id={`c-${g.cluster}`}>
                {cfg.clusterLabel ? cfg.clusterLabel(g.cluster) : titleCase(g.cluster)}
                <span className="hub-count">{g.pages.length}</span>
              </h2>
              <ul className="hub-list">
                {g.pages.map((p) => (
                  <li key={p.slug}>
                    <Link href={pageHref(p.type, p.slug)}>
                      <span className="hl-title">{p.h1}</span>
                      <span className="hl-desc">{p.metaDescription}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {groups.length === 0 ? (
            <p className="sub">Nothing published here yet. Check back shortly.</p>
          ) : null}
        </div>
      </div>

      <FinalCta />
    </>
  );
}
