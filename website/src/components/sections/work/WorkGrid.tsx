'use client';

import { useMemo, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { WorkCard } from './WorkCard';
import type { ClientLogoVariant } from '@/components/generated/ClientLogo';
import type { CaseStudy } from '@/lib/content.types';

type WorkGridProps = {
  caseStudies: CaseStudy[];
  heroByslug: Record<string, string | undefined>;
  logoBySlug: Record<string, { name: string; variant: ClientLogoVariant }>;
};

export function WorkGrid({
  caseStudies,
  heroByslug,
  logoBySlug,
}: WorkGridProps): JSX.Element {
  const industries = useMemo(() => {
    const set = new Set(caseStudies.map((c) => c.industry));
    return Array.from(set);
  }, [caseStudies]);

  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (!activeIndustry) return caseStudies;
    return caseStudies.filter((c) => c.industry === activeIndustry);
  }, [caseStudies, activeIndustry]);

  return (
    <Container as="section" className="pb-24 md:pb-32">
      <h2 className="sr-only">The work</h2>

      <div
        className="mb-10 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter case studies by industry"
      >
        <button
          type="button"
          onClick={() => setActiveIndustry(null)}
          aria-pressed={activeIndustry === null}
          className={[
            'rounded-full border px-3.5 py-1.5 font-body text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors',
            activeIndustry === null
              ? 'border-accent bg-accent text-bg'
              : 'border-border bg-fg/[0.04] text-fg/80 hover:bg-fg/10',
          ].join(' ')}
        >
          all of them
        </button>
        {industries.map((industry) => {
          const active = activeIndustry === industry;
          return (
            <button
              type="button"
              key={industry}
              onClick={() => setActiveIndustry(industry)}
              aria-pressed={active}
              className={[
                'rounded-full border px-3.5 py-1.5 font-body text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors',
                active
                  ? 'border-accent bg-accent text-bg'
                  : 'border-border bg-fg/[0.04] text-fg/80 hover:bg-fg/10',
              ].join(' ')}
            >
              {industry}
            </button>
          );
        })}
      </div>

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((cs, i) => {
          const logo = logoBySlug[cs.slug];
          return (
            <li key={cs.slug}>
              <ScrollReveal delay={Math.min(i * 0.04, 0.4)}>
                <WorkCard
                  caseStudy={cs}
                  heroSrc={heroByslug[cs.slug]}
                  logoName={logo?.name ?? cs.brandName}
                  logoVariant={logo?.variant ?? 'lowercase-dot'}
                />
              </ScrollReveal>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 ? (
        <p className="mt-12 font-body text-muted">
          No graduates in that industry yet. Try another.
        </p>
      ) : null}
    </Container>
  );
}
