import type { Metadata } from 'next';
import { ContactHero } from '@/components/sections/contact/ContactHero';
import { ContactPanel } from '@/components/sections/contact/ContactPanel';
import { getSeoForRoute } from '@/lib/content';

const ROUTE = '/get-in-touch';

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

export default function GetInTouchPage(): JSX.Element {
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

      <ContactHero />
      <ContactPanel />
    </>
  );
}
