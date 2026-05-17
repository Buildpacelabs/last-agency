import type { Metadata } from 'next';
import {
  getAllCaseStudies,
  getAssetManifest,
  getSeoForRoute,
} from '@/lib/content';
import type { ClientLogoVariant } from '@/components/generated/ClientLogo';
import { WorkHero } from '@/components/sections/work/WorkHero';
import { WorkGrid } from '@/components/sections/work/WorkGrid';
import { WorkClosingCTA } from '@/components/sections/work/WorkClosingCTA';

export function generateMetadata(): Metadata {
  const seo = getSeoForRoute('/work');
  if (!seo) return {};
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      type: 'website',
    },
    keywords: seo.keywords,
  };
}

export default function WorkIndexPage(): JSX.Element {
  const caseStudies = getAllCaseStudies();
  const manifest = getAssetManifest();
  const seo = getSeoForRoute('/work');

  // We do NOT serve heroes from /public yet — heroSrc is left undefined so
  // each card renders the accent-tinted fallback block with the typographic
  // ClientLogo. When asset-manager ships the images into /public/case-studies/,
  // wire the mapping here.
  const heroByslug: Record<string, string | undefined> = Object.fromEntries(
    manifest.caseStudies.map((c) => [c.slug, undefined]),
  );

  const logoBySlug: Record<string, { name: string; variant: ClientLogoVariant }> =
    Object.fromEntries(
      manifest.caseStudies.map((c) => [
        c.slug,
        {
          name: c.clientLogoProps.name,
          variant: c.clientLogoProps.variant as ClientLogoVariant,
        },
      ]),
    );

  return (
    <>
      {seo?.schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema) }}
        />
      ) : null}
      <WorkHero />
      <WorkGrid
        caseStudies={caseStudies}
        heroByslug={heroByslug}
        logoBySlug={logoBySlug}
      />
      <WorkClosingCTA />
    </>
  );
}
