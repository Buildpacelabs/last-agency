import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllCaseStudies,
  getAssetManifest,
  getCaseStudyBySlug,
  getSeoForRoute,
} from '@/lib/content';
import type { ClientLogoVariant } from '@/components/generated/ClientLogo';
import type { ResultChartMetric } from '@/components/generated/ResultChart';
import { CaseStudyHero } from '@/components/sections/case-study/CaseStudyHero';
import { CaseStudyNarrative } from '@/components/sections/case-study/CaseStudyNarrative';
import { CaseStudyChapter } from '@/components/sections/case-study/CaseStudyChapter';
import { CaseStudyChart } from '@/components/sections/case-study/CaseStudyChart';
import { CaseStudyTestimonial } from '@/components/sections/case-study/CaseStudyTestimonial';
import { CaseStudyMetricsGrid } from '@/components/sections/case-study/CaseStudyMetrics';
import { RelatedWork } from '@/components/sections/case-study/RelatedWork';
import { CaseStudyClosingCTA } from '@/components/sections/case-study/CaseStudyClosingCTA';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const seo = getSeoForRoute(`/work/${params.slug}`);
  const cs = getCaseStudyBySlug(params.slug);
  if (!seo || !cs) return {};
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      type: 'article',
    },
    keywords: seo.keywords,
  };
}

export default function CaseStudyPage({ params }: { params: Params }): JSX.Element {
  const caseStudy = getCaseStudyBySlug(params.slug);
  if (!caseStudy) {
    notFound();
  }

  const manifest = getAssetManifest();
  const seo = getSeoForRoute(`/work/${params.slug}`);

  const asset = manifest.caseStudies.find((c) => c.slug === params.slug);
  const logoName = asset?.clientLogoProps.name ?? caseStudy.brandName;
  const logoVariant = (asset?.clientLogoProps.variant as ClientLogoVariant) ?? 'lowercase-dot';
  const heroSrc = undefined; // hero images not yet shipped to /public — colored block fallback is wired
  const accentColor = caseStudy.accentColor;

  // Related work: next 4 case studies after the current one, wrapping around.
  const all = getAllCaseStudies();
  const idx = all.findIndex((c) => c.slug === params.slug);
  const related = idx === -1
    ? []
    : Array.from({ length: 4 }, (_, i) => all[(idx + 1 + i) % all.length]).filter(
        (c) => c.slug !== params.slug,
      );

  const heroBySlug: Record<string, string | undefined> = Object.fromEntries(
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

  const chartMetric = (asset?.resultChartData.metric as ResultChartMetric) ?? 'revenue-line';
  const chartData = asset?.resultChartData.data ?? [];
  const chartCaption = asset?.resultChartData.label ?? 'Movement across the engagement.';

  return (
    <>
      {seo?.schema ? (
        Array.isArray(seo.schema) ? (
          seo.schema.map((blob, i) => (
            <script
              // eslint-disable-next-line react/no-array-index-key
              key={`schema-${i}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(blob) }}
            />
          ))
        ) : (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema) }}
          />
        )
      ) : null}

      <CaseStudyHero
        caseStudy={caseStudy}
        heroSrc={heroSrc}
        logoName={logoName}
        logoVariant={logoVariant}
      />

      <CaseStudyNarrative preEngagement={caseStudy.narrative.preEngagement} />

      <CaseStudyChapter
        index="01"
        title="the build"
        subtitle="months 0–3"
        body={caseStudy.narrative.build}
        accentColor={accentColor}
      />

      <CaseStudyChapter
        index="02"
        title="the run"
        subtitle="months 3–12"
        body={caseStudy.narrative.run}
        accentColor={accentColor}
      />

      {chartData.length > 1 ? (
        <CaseStudyChart
          metric={chartMetric}
          data={chartData}
          accentColor={accentColor}
          caption={chartCaption}
        />
      ) : null}

      <CaseStudyChapter
        index="03"
        title="the handoff"
        subtitle="months 12–15"
        body={caseStudy.narrative.handoff}
        accentColor={accentColor}
        heavy
      />

      <CaseStudyChapter
        index="04"
        title="the exit"
        subtitle="months 15–18"
        body={caseStudy.narrative.exit}
        accentColor={accentColor}
      />

      <CaseStudyTestimonial
        quote={caseStudy.testimonial}
        founderName={caseStudy.founder.name}
        founderRole={caseStudy.founder.role}
        founderCity={caseStudy.founder.city}
        brandName={caseStudy.brandName}
        initials={asset?.founderAvatarProps.initials ?? caseStudy.founder.name.slice(0, 2).toUpperCase()}
        gradient={
          asset?.founderAvatarProps.gradient ?? {
            from: accentColor,
            to: accentColor,
          }
        }
        accentColor={accentColor}
      />

      <CaseStudyMetricsGrid metrics={caseStudy.metrics} accentColor={accentColor} />

      <RelatedWork
        items={related}
        heroBySlug={heroBySlug}
        logoBySlug={logoBySlug}
      />

      <CaseStudyClosingCTA />
    </>
  );
}
