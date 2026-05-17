'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, type KeyboardEvent, type WheelEvent } from 'react';
import { ClientLogo, type ClientLogoVariant } from '@/components/generated/ClientLogo';
import { ResultChart } from '@/components/generated/ResultChart';
import { ArrowRight } from '@/components/svg/ArrowRight';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { monthsStandalone } from '@/lib/months-standalone';
import { cn } from '@/lib/cn';
import type { CaseStudy } from '@/lib/content.types';
import type { AssetManifest, CaseStudyAsset } from '@/lib/content.types';

type ExtraCard = {
  kind: 'view-all';
  href: string;
  label: string;
  sub: string;
};

type StripProps = {
  studies: CaseStudy[];
  manifest: AssetManifest;
  /** Visible section anchor. */
  label: string;
  /** Visible H2. */
  heading: string;
  /** Optional muted line under the heading. */
  intro?: string;
  /** Trailing card after the case studies. */
  trailing?: ExtraCard;
  /** Heading id for aria-labelledby. */
  headingId: string;
};

/**
 * Horizontal-scrolling portfolio strip. Snap-mandatory on the X axis, native
 * touch drag, and (on desktop) wheel-Y → scroll-X translation when the strip
 * is the dominant element in the viewport. Keyboard focus on any card pulls
 * it into view via smooth scrollIntoView.
 */
export function PortfolioStrip({
  studies,
  manifest,
  label,
  heading,
  intro,
  trailing,
  headingId,
}: StripProps): JSX.Element {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // Mouse-wheel Y → X translation. Only active when the user is over the
  // scroller AND there's still room to scroll horizontally.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function onWheel(event: globalThis.WheelEvent): void {
      if (!el) return;
      // Only intercept "mostly vertical" wheels — let trackpad horizontal
      // swipes pass through untouched.
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      const atStart = el.scrollLeft <= 0 && event.deltaY < 0;
      const atEnd = el.scrollLeft >= maxScroll - 1 && event.deltaY > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    }

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  function onCardKeyDown(event: KeyboardEvent<HTMLAnchorElement>): void {
    const el = scrollerRef.current;
    if (!el) return;
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const focusable = Array.from(
      el.querySelectorAll<HTMLAnchorElement>('[data-portfolio-card-link]'),
    );
    const idx = focusable.indexOf(event.currentTarget);
    if (idx < 0) return;
    const next = event.key === 'ArrowRight' ? idx + 1 : idx - 1;
    const target = focusable[next];
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  function onWheelGuard(_event: WheelEvent<HTMLDivElement>): void {
    // no-op; React handler kept so the element has scrollable affordance for ARIA.
  }

  return (
    <section
      aria-labelledby={headingId}
      className="relative py-24 md:py-32"
    >
      <Container>
        <div className="max-w-3xl space-y-5">
          <SectionLabel>{label}</SectionLabel>
          <h2
            id={headingId}
            className="font-display text-[clamp(2.25rem,6vw,5rem)] font-bold leading-[1] tracking-[-0.02em] text-balance lowercase"
          >
            {heading}
          </h2>
          {intro ? (
            <p className="font-body text-base text-muted md:text-lg">{intro}</p>
          ) : null}
        </div>
      </Container>

      <div
        ref={scrollerRef}
        onWheel={onWheelGuard}
        role="region"
        aria-label={`${label} — horizontal carousel, use arrow keys to navigate`}
        tabIndex={-1}
        className={cn(
          'portfolio-strip mt-14 flex gap-6 overflow-x-auto pb-10 md:mt-20 md:gap-8',
          'snap-x snap-mandatory scroll-px-6 md:scroll-px-16',
        )}
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#FF6B35 transparent' }}
      >
        {/* Left-side gutter spacer matches Container padding. */}
        <div aria-hidden="true" className="shrink-0 basis-6 md:basis-16" />

        {studies.map((study) => (
          <PortfolioCard
            key={study.slug}
            study={study}
            asset={manifest.caseStudies.find((a) => a.slug === study.slug)}
            onCardKeyDown={onCardKeyDown}
          />
        ))}

        {trailing ? <TrailingCard card={trailing} onCardKeyDown={onCardKeyDown} /> : null}

        <div aria-hidden="true" className="shrink-0 basis-6 md:basis-16" />
      </div>
    </section>
  );
}

type CardProps = {
  study: CaseStudy;
  asset: CaseStudyAsset | undefined;
  onCardKeyDown: (event: KeyboardEvent<HTMLAnchorElement>) => void;
};

function PortfolioCard({ study, asset, onCardKeyDown }: CardProps): JSX.Element {
  const standalone = monthsStandalone(study.handoffDate);
  const accent = study.accentColor;
  const logoVariant = (asset?.clientLogoProps.variant ?? 'all-caps') as ClientLogoVariant;
  const logoName = asset?.clientLogoProps.name ?? study.brandName;
  const heroPath = asset?.hero;

  return (
    <article
      className="snap-start shrink-0 basis-[82vw] md:basis-[480px]"
      aria-labelledby={`card-${study.slug}-title`}
    >
      <Link
        href={`/work/${study.slug}`}
        data-portfolio-card-link
        onKeyDown={onCardKeyDown}
        className="group flex h-full flex-col gap-6 rounded-2xl border border-border bg-bg p-6 transition-colors duration-300 hover:bg-fg/[0.03] focus-visible:bg-fg/[0.03] md:p-8"
      >
        <CardHero study={study} asset={asset} accent={accent} heroPath={heroPath} />

        <div className="flex items-center justify-between gap-4">
          <ClientLogo
            name={logoName}
            variant={logoVariant}
            accentColor={accent}
            className="max-w-[60%] text-2xl text-fg"
          />
          <StandaloneCounter
            kind={standalone.kind}
            months={standalone.kind === 'months' ? standalone.months : 0}
            accent={accent}
          />
        </div>

        <div className="space-y-3">
          <h3
            id={`card-${study.slug}-title`}
            className="font-display text-2xl font-bold leading-tight text-fg md:text-3xl"
          >
            {study.brandName}.{' '}
            <span className="text-fg/80">{study.headline}</span>
          </h3>
        </div>

        <ul role="list" className="flex flex-wrap gap-2">
          {study.services.map((svc) => (
            <li
              key={svc}
              className="rounded-full border border-border px-3 py-1 font-body text-xs uppercase tracking-[0.12em] text-fg/75"
            >
              {svc}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
          <span className="font-body text-sm font-medium text-fg group-hover:text-accent">
            Read the handoff
          </span>
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg transition-transform duration-300 group-hover:translate-x-1 group-hover:border-accent group-hover:text-accent"
          >
            <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </article>
  );
}

function CardHero({
  study,
  asset,
  accent,
  heroPath,
}: {
  study: CaseStudy;
  asset: CaseStudyAsset | undefined;
  accent: string;
  heroPath: string | undefined;
}): JSX.Element {
  // The hero images are still in backlog. Until they land, render a tinted
  // block + a ResultChart so the card never looks broken.
  const hasImage =
    typeof heroPath === 'string' && heroPath.startsWith('./assets') === false && heroPath.length > 0;

  if (hasImage) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border">
        <Image
          src={heroPath as string}
          alt={asset?.alt ?? `${study.brandName} — case study hero`}
          fill
          sizes="(min-width: 768px) 480px, 82vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  // Fallback: tinted background + result chart preview.
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border"
      style={{
        background: `linear-gradient(135deg, ${accent}33 0%, ${accent}11 60%, rgba(14,14,12,0.0) 100%)`,
      }}
    >
      <div className="absolute inset-0 flex items-end p-5">
        {asset ? (
          <ResultChart
            metric={asset.resultChartData.metric as 'roas-curve' | 'cac-bars' | 'revenue-line'}
            data={asset.resultChartData.data}
            accentColor={asset.resultChartData.accentColor}
            label={asset.resultChartData.label}
            className="w-full"
          />
        ) : (
          <span className="font-display text-3xl text-fg/40">{study.brandName}</span>
        )}
      </div>
    </div>
  );
}

function StandaloneCounter({
  kind,
  months,
  accent,
}: {
  kind: 'just-shipped' | 'months';
  months: number;
  accent: string;
}): JSX.Element {
  if (kind === 'just-shipped') {
    return (
      <div className="flex flex-col items-end text-right leading-none">
        <span className="font-display text-2xl font-bold" style={{ color: accent }}>
          just
        </span>
        <span className="font-body text-[11px] uppercase tracking-[0.18em] text-muted">shipped</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-end text-right leading-none">
      <span className="font-display text-4xl font-bold" style={{ color: accent }}>
        {months}
      </span>
      <span className="font-body text-[11px] uppercase tracking-[0.18em] text-muted">
        months standalone
      </span>
    </div>
  );
}

function TrailingCard({
  card,
  onCardKeyDown,
}: {
  card: ExtraCard;
  onCardKeyDown: (event: KeyboardEvent<HTMLAnchorElement>) => void;
}): JSX.Element {
  return (
    <article className="snap-start shrink-0 basis-[70vw] md:basis-[360px]">
      <Link
        href={card.href}
        data-portfolio-card-link
        onKeyDown={onCardKeyDown}
        className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-accent/40 bg-accent/[0.04] p-8 transition-colors duration-300 hover:bg-accent/[0.08]"
      >
        <span className="font-body text-sm uppercase tracking-[0.16em] text-accent">{card.sub}</span>
        <span className="font-display text-3xl font-bold leading-tight text-fg md:text-4xl">
          {card.label}
        </span>
        <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-accent">
          Watch us fire ourselves
          <ArrowRight size={16} />
        </span>
      </Link>
    </article>
  );
}
