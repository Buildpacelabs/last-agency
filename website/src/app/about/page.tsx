import type { Metadata } from 'next';
import { AboutHero } from '@/components/sections/about/AboutHero';
import { WhyThisModel } from '@/components/sections/about/WhyThisModel';
import { PhotoSplit } from '@/components/sections/about/PhotoSplit';
import { Founders } from '@/components/sections/about/Founders';
import { WhatWeDontDo } from '@/components/sections/about/WhatWeDontDo';
import { WhereToFindUs } from '@/components/sections/about/WhereToFindUs';
import { AboutClosingCta } from '@/components/sections/about/AboutClosingCta';
import { getSeoForRoute } from '@/lib/content';

const ROUTE = '/about';

export function generateMetadata(): Metadata {
  const seo = getSeoForRoute(ROUTE);
  if (!seo) return {};
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: seo.ogImage
      ? {
          title: seo.title,
          description: seo.description,
          images: [{ url: seo.ogImage }],
        }
      : undefined,
  };
}

export default function AboutPage(): JSX.Element {
  const seo = getSeoForRoute(ROUTE);
  const schema = seo?.schema as unknown;

  return (
    <>
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}

      <AboutHero />
      <WhyThisModel />
      <PhotoSplit />
      <Founders />
      <WhatWeDontDo />
      <WhereToFindUs />
      <AboutClosingCta />
    </>
  );
}
