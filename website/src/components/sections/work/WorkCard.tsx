'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { ClientLogo, type ClientLogoVariant } from '@/components/generated/ClientLogo';
import type { CaseStudy } from '@/lib/content.types';
import { monthsStandalone } from '@/lib/months-standalone';
import { cn } from '@/lib/cn';

type WorkCardProps = {
  caseStudy: CaseStudy;
  heroSrc?: string;
  logoVariant: ClientLogoVariant;
  logoName: string;
  /** Compact rendering for related-work strips on the case-study page. */
  compact?: boolean;
  className?: string;
};

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const last = cut.lastIndexOf(' ');
  return `${cut.slice(0, last > 0 ? last : max).trim()}…`;
}

export function WorkCard({
  caseStudy,
  heroSrc,
  logoVariant,
  logoName,
  compact = false,
  className,
}: WorkCardProps): JSX.Element {
  const standalone = monthsStandalone(caseStudy.handoffDate);
  const tintStyle: CSSProperties = {
    background: `linear-gradient(135deg, ${caseStudy.accentColor}22, ${caseStudy.accentColor}05)`,
  };
  const borderStyle: CSSProperties = {
    borderColor: 'rgba(244,241,234,0.08)',
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-fg/[0.02]',
        className,
      )}
      style={borderStyle}
    >
      <Link
        href={`/work/${caseStudy.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`Read the ${caseStudy.brandName} case study`}
      >
        <span className="sr-only">{caseStudy.brandName} case study</span>
      </Link>

      {/* Hero block: image if available, else accent-tinted color block with logo */}
      <div
        className={cn(
          'relative w-full overflow-hidden',
          compact ? 'aspect-[16/9]' : 'aspect-[5/3]',
        )}
        style={tintStyle}
      >
        {heroSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroSrc}
            alt={`${caseStudy.brandName} — ${caseStudy.industry} brand hero`}
            className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8 text-fg">
            <ClientLogo
              name={logoName}
              variant={logoVariant}
              accentColor={caseStudy.accentColor}
              className={cn('text-[44px]', compact && 'text-[32px]')}
            />
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg/80 to-transparent"
        />
        <span
          className="absolute right-4 top-4 inline-flex items-center rounded-full bg-bg/70 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-fg backdrop-blur"
          style={{ borderLeft: `2px solid ${caseStudy.accentColor}` }}
        >
          {standalone.label}
        </span>
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col gap-4 p-6',
          compact ? 'md:p-5' : 'md:p-7',
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <ClientLogo
            name={logoName}
            variant={logoVariant}
            accentColor={caseStudy.accentColor}
            className={compact ? 'text-[18px]' : 'text-[22px]'}
          />
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            {caseStudy.industry}
          </span>
        </div>

        <h3
          className={cn(
            'font-display font-semibold tracking-tight text-fg text-pretty',
            compact ? 'text-[19px] leading-[1.2]' : 'text-[22px] leading-[1.2] md:text-[24px]',
          )}
        >
          {truncate(caseStudy.headline, compact ? 90 : 110)}
        </h3>

        {!compact ? (
          <ul className="mt-1 flex flex-wrap gap-1.5" aria-label="Services delivered">
            {caseStudy.services.map((service) => (
              <li
                key={service}
                className="rounded-full border border-border bg-fg/[0.04] px-2.5 py-1 font-body text-[11px] font-medium uppercase tracking-[0.12em] text-fg/70"
              >
                {service}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-body text-[12px] text-muted">
            {caseStudy.founder.name} · {caseStudy.founder.city}
          </span>
          <span
            aria-hidden="true"
            className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-fg/80 transition-colors group-hover:text-accent"
          >
            see how we left →
          </span>
        </div>
      </div>
    </motion.article>
  );
}
