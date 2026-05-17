import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import type { CaseStudyMetrics } from '@/lib/content.types';

type Props = {
  metrics: CaseStudyMetrics;
  accentColor: string;
};

type Tile = { label: string; value: string };

export function CaseStudyMetricsGrid({ metrics, accentColor }: Props): JSX.Element {
  const tiles: Tile[] = [
    { label: 'ROAS', value: metrics.roas },
    { label: 'CAC reduction', value: metrics.cacReduction },
    { label: 'revenue scale', value: metrics.revenueScale },
    { label: 'time to in-house', value: metrics.timeToInHouse },
  ];

  return (
    <Container as="section" className="border-t border-border py-24 md:py-32">
      <ScrollReveal>
        <div className="mb-12 grid gap-10 md:grid-cols-[200px,1fr]">
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
            results, not prophecies
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-bold leading-[1.05] tracking-tight lowercase text-fg">
            the numbers that stopped moving when we left.
          </h2>
        </div>

        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <li
              key={tile.label}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-fg/[0.02] p-6"
              style={{ borderTop: `3px solid ${accentColor}` }}
            >
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                {tile.label}
              </span>
              <span className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-bold leading-[1.1] tracking-tight text-fg text-balance">
                {tile.value}
              </span>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </Container>
  );
}
