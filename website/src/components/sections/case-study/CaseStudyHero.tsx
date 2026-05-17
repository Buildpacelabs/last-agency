import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ClientLogo, type ClientLogoVariant } from '@/components/generated/ClientLogo';
import type { CaseStudy } from '@/lib/content.types';
import { monthsStandalone } from '@/lib/months-standalone';

type Props = {
  caseStudy: CaseStudy;
  heroSrc?: string;
  logoName: string;
  logoVariant: ClientLogoVariant;
};

export function CaseStudyHero({
  caseStudy,
  heroSrc,
  logoName,
  logoVariant,
}: Props): JSX.Element {
  const standalone = monthsStandalone(caseStudy.handoffDate);
  const services = caseStudy.services.join(' | ');

  return (
    <Container as="section" className="pt-28 pb-12 md:pt-36 md:pb-16">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-10 font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-muted"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/work" className="transition-colors hover:text-fg">
              work
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li aria-current="page" className="text-fg">
            {caseStudy.brandName}
          </li>
        </ol>
      </nav>

      <SectionLabel>{`• ${caseStudy.industry}`}</SectionLabel>

      <div className="mt-8 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <ClientLogo
            name={logoName}
            variant={logoVariant}
            accentColor={caseStudy.accentColor}
            className="text-[36px] md:text-[44px]"
          />
        </div>

        <h1 className="max-w-[1200px] font-display text-[clamp(2.6rem,7.5vw,7rem)] font-bold leading-[0.96] tracking-tight lowercase text-fg text-balance">
          {caseStudy.brandName.toLowerCase()}.
        </h1>

        <p className="max-w-[1100px] font-display text-[clamp(1.4rem,3vw,2.4rem)] font-medium leading-[1.15] tracking-tight text-fg/85 text-pretty">
          {caseStudy.headline}
        </p>

        <p className="font-body text-[13px] font-semibold uppercase tracking-[0.18em] text-muted">
          {services}
        </p>
      </div>

      {/* Hero image / tinted block */}
      <div
        className="relative mt-12 aspect-[16/8] w-full overflow-hidden rounded-2xl border border-border"
        style={{
          background: `linear-gradient(135deg, ${caseStudy.accentColor}33, ${caseStudy.accentColor}08)`,
        }}
      >
        {heroSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroSrc}
            alt={`${caseStudy.brandName} — ${caseStudy.industry} hero image`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ClientLogo
              name={logoName}
              variant={logoVariant}
              accentColor={caseStudy.accentColor}
              className="text-[clamp(48px,8vw,120px)] text-fg"
            />
          </div>
        )}

        {/* months standalone counter */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 md:bottom-8 md:left-8 md:right-8">
          <div
            className="rounded-2xl bg-bg/80 px-5 py-3 backdrop-blur"
            style={{ borderLeft: `3px solid ${caseStudy.accentColor}` }}
          >
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              status
            </span>
            <p className="mt-1 font-display text-2xl font-semibold lowercase text-fg md:text-3xl">
              {standalone.label}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
