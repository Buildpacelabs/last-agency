import { SITE_URL } from '@/lib/site';
import { plain } from '@/components/RichText';
import { anchorId, pageHref, type ContentPage } from './types';

/* =========================================================================
   JSON-LD builders for the programmatic surface.

   Everything hangs off the two site-wide nodes declared in the root layout
   (#org and #website) by @id reference, so the whole domain resolves as one
   connected graph rather than ~500 disconnected islands. That connectivity is
   what lets Google — and the AI answer engines — attribute a page to a real
   publisher.
   ========================================================================= */

const ORG_REF = { '@id': `${SITE_URL}/#org` };

export function articleNode(page: ContentPage): Record<string, unknown> {
  const url = `${SITE_URL}${pageHref(page.type, page.slug)}`;
  const published = page.published ?? page.updated;

  return {
    '@type': page.type === 'journal' ? 'BlogPosting' : 'Article',
    '@id': `${url}#article`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    url,
    mainEntityOfPage: url,
    headline: plain(page.h1).slice(0, 110),
    name: plain(page.h1),
    description: page.metaDescription,
    abstract: plain(page.answer),
    inLanguage: 'en-IN',
    datePublished: `${published}T09:00:00+05:30`,
    dateModified: `${page.updated}T09:00:00+05:30`,
    author: ORG_REF,
    publisher: ORG_REF,
    // Section headings double as a machine-readable outline. Answer engines use
    // these to pull the right fragment rather than the whole page.
    articleSection: page.sections.map((s) => plain(s.h2)),
    keywords: [page.primaryKeyword, ...page.secondaryKeywords].join(', '),
    image: `${SITE_URL}/opengraph-image`,
    // Primary sources, machine-readable. This is the property that lets an
    // answer engine see the page is evidenced rather than asserted.
    ...(page.sources?.length
      ? {
          citation: page.sources.map((s) => ({
            '@type': 'CreativeWork',
            name: s.title,
            url: s.url,
            publisher: { '@type': 'Organization', name: s.publisher },
            ...(s.date ? { datePublished: s.date } : {}),
          })),
        }
      : {}),
  };
}

export function faqNodeFor(page: ContentPage): Record<string, unknown> | null {
  if (!page.faqs?.length) return null;
  const url = `${SITE_URL}${pageHref(page.type, page.slug)}`;
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: plain(f.q),
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
    })),
  };
}

export function breadcrumbFor(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function definedTermNode(page: ContentPage): Record<string, unknown> | null {
  if (page.type !== 'glossary') return null;
  const url = `${SITE_URL}${pageHref(page.type, page.slug)}`;
  return {
    '@type': 'DefinedTerm',
    '@id': `${url}#term`,
    name: page.term ?? plain(page.h1),
    description: plain(page.definition ?? page.answer),
    url,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      '@id': `${SITE_URL}/glossary#set`,
      name: 'Last Agency SEO Glossary',
      url: `${SITE_URL}/glossary`,
    },
  };
}

/**
 * Speakable marks the fragment a voice assistant should read aloud. We point it
 * at the answer block only — the whole article read aloud is useless.
 */
export function speakableFor(page: ContentPage): Record<string, unknown> {
  return {
    '@type': 'WebPage',
    '@id': `${SITE_URL}${pageHref(page.type, page.slug)}#webpage`,
    url: `${SITE_URL}${pageHref(page.type, page.slug)}`,
    name: page.metaTitle,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.art-h1', '.art-answer'],
    },
    dateModified: `${page.updated}T09:00:00+05:30`,
  };
}

/** Service node for /services/* and the two landing-page families. */
export function serviceFor(page: ContentPage, serviceType: string): Record<string, unknown> {
  const url = `${SITE_URL}${pageHref(page.type, page.slug)}`;
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    // The service's name, not the page's headline. `page.h1` put
    // "London SEO: pick a niche, not a city" in the name field.
    name: page.city
      ? `SEO services in ${page.city.name}`
      : page.industry
        ? `SEO services for ${page.industry}`
        : plain(page.h1),
    serviceType,
    description: page.metaDescription,
    provider: ORG_REF,
    areaServed: page.city
      ? {
          '@type': 'City',
          name: page.city.name,
          containedInPlace: { '@type': 'Country', name: page.city.country },
        }
      : 'IN',
    audience: page.industry ? { '@type': 'Audience', audienceType: page.industry } : undefined,
    url,
  };
}

/** ItemList for hub pages — tells Google the hub is a real index, not a doorway. */
export function itemListFor(
  path: string,
  name: string,
  pages: ContentPage[]
): Record<string, unknown> {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}${path}#list`,
    name,
    numberOfItems: pages.length,
    itemListElement: pages.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}${pageHref(p.type, p.slug)}`,
      name: plain(p.h1),
    })),
  };
}

/** Every section heading as a jump target, for sitelinks-style deep results. */
export function sectionAnchors(page: ContentPage): string[] {
  return page.sections.map((s) => `#${s.id ?? anchorId(s.h2)}`);
}
