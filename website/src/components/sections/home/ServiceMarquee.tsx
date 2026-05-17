import { Marquee } from '@/components/ui/Marquee';

const ITEMS = [
  'the build',
  'the run',
  'the handoff',
  'the exit',
  'performance marketing',
  'creative pipeline',
  'in-house handoff',
  '12-month engagement',
];

/**
 * Infinite ticker that sits between the hero and the services overview.
 * Period-separated, lowercase, generous tracking — the brand's spoken rhythm.
 */
export function ServiceMarquee(): JSX.Element {
  return (
    <section
      aria-label="What we do, at a glance"
      className="border-y border-border/60 bg-bg py-10 md:py-14"
    >
      <Marquee
        items={ITEMS}
        direction="left"
        speed={55}
        itemClassName="tracking-[-0.01em] text-fg/95"
      />
    </section>
  );
}
