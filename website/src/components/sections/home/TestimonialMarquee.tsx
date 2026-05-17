'use client';

import { useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';
import type { Testimonial } from '@/lib/content.types';

type Props = {
  testimonials: Testimonial[];
};

/**
 * Two rows of testimonial cards scrolling in opposite directions at slightly
 * different speeds. CSS-keyframe driven (same primitives the brand Marquee
 * uses), pauses on hover, frozen under prefers-reduced-motion via globals.css.
 */
export function TestimonialMarquee({ testimonials }: Props): JSX.Element {
  const rowOne = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const rowTwo = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden border-y border-border bg-bg py-24 md:py-32"
    >
      <Container className="mb-12 max-w-3xl space-y-5">
        <SectionLabel>what founders said on the way out</SectionLabel>
        <h2
          id="testimonials-heading"
          className="font-display text-[clamp(2.25rem,6vw,5rem)] font-bold leading-[1] tracking-[-0.02em] text-balance lowercase"
        >
          what founders said on the way out.
        </h2>
      </Container>

      <div className="flex flex-col gap-6">
        <TestimonialMarqueeRow items={rowOne} direction="left" speed={50} />
        <TestimonialMarqueeRow items={rowTwo} direction="right" speed={45} />
      </div>
    </section>
  );
}

type RowProps = {
  items: Testimonial[];
  direction: 'left' | 'right';
  speed: number;
};

function TestimonialMarqueeRow({ items, direction, speed }: RowProps): JSX.Element {
  const animationDuration = useMemo(() => {
    // Each card ~ 460px; double the row for the loop, scale duration by speed.
    const approxCopyPx = Math.max(items.length, 1) * 460;
    return `${Math.max(20, approxCopyPx / speed)}s`;
  }, [items.length, speed]);

  const animationName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight';

  const renderRow = (ariaHidden: boolean): JSX.Element => (
    <ul
      role={ariaHidden ? 'presentation' : 'list'}
      aria-hidden={ariaHidden ? 'true' : undefined}
      className="flex shrink-0 items-stretch gap-6"
    >
      {items.map((t, i) => (
        <li
          key={`${t.brand}-${i}`}
          className={cn(
            'flex w-[460px] shrink-0 flex-col justify-between gap-6 rounded-2xl border border-border bg-bg/60 p-7',
            'backdrop-blur-sm md:w-[520px]',
          )}
        >
          <p className="font-display text-xl leading-snug text-fg md:text-2xl">
            &ldquo;{t.quote}&rdquo;
          </p>
          <footer className="font-body text-sm text-muted">
            <span className="block font-medium text-fg">{t.founder}</span>
            <span>
              {t.role}, {t.brand}
            </span>
          </footer>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group relative w-full overflow-hidden" role="region" aria-label="Testimonials">
      <div
        className="flex w-max gap-6 group-hover:[animation-play-state:paused]"
        style={{
          animation: `${animationName} ${animationDuration} linear infinite`,
        }}
      >
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </div>
  );
}
