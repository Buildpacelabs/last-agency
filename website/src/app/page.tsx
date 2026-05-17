import type { Metadata } from 'next';
import { getMarqueeTestimonials, getSeoForRoute } from '@/lib/content';
import { Hero } from '@/components/sections/home/Hero';
import { ServiceMarquee } from '@/components/sections/home/ServiceMarquee';
import { Services } from '@/components/sections/home/Services';
import { PortfolioStripA } from '@/components/sections/home/PortfolioStripA';
import { PhilosophyAnchor } from '@/components/sections/home/PhilosophyAnchor';
import { PortfolioStripB } from '@/components/sections/home/PortfolioStripB';
import { TestimonialMarquee } from '@/components/sections/home/TestimonialMarquee';
import { ClosingCTA } from '@/components/sections/home/ClosingCTA';

const HOME_SEO = getSeoForRoute('/');

export const metadata: Metadata = {
  title: HOME_SEO?.title ?? 'Last Agency — your last agency. we mean that literally.',
  description: HOME_SEO?.description,
  alternates: {
    canonical: HOME_SEO?.canonical ?? 'https://lastagency.com/',
  },
  openGraph: {
    title: HOME_SEO?.title,
    description: HOME_SEO?.description,
    url: HOME_SEO?.canonical,
    type: 'website',
    images: HOME_SEO?.ogImage ? [{ url: HOME_SEO.ogImage }] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_SEO?.title,
    description: HOME_SEO?.description,
  },
};

export default function HomePage(): JSX.Element {
  const testimonials = getMarqueeTestimonials();
  const orgSchema = HOME_SEO?.schema;

  return (
    <>
      {orgSchema ? (
        <script
          type="application/ld+json"
          // Static, build-time JSON from seo.json — safe to stringify.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      ) : null}

      <Hero />
      <ServiceMarquee />
      <Services />
      <PortfolioStripA />
      <PhilosophyAnchor />
      <PortfolioStripB />
      <TestimonialMarquee testimonials={testimonials} />
      <ClosingCTA />
    </>
  );
}
