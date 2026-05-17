import type { CSSProperties } from 'react';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { cn } from '@/lib/cn';

type Props = {
  index: '01' | '02' | '03' | '04';
  title: string;
  subtitle: string;
  body: string;
  accentColor: string;
  /** Visually heavier treatment (used for "the handoff"). */
  heavy?: boolean;
};

export function CaseStudyChapter({
  index,
  title,
  subtitle,
  body,
  accentColor,
  heavy = false,
}: Props): JSX.Element {
  const decorativeStyle: CSSProperties = { color: accentColor };

  return (
    <Container
      as="section"
      className={cn('border-t border-border py-20 md:py-28', heavy && 'bg-fg/[0.02]')}
    >
      <ScrollReveal>
        <div className="grid gap-10 md:grid-cols-[200px,1fr]">
          <div className="flex flex-col gap-2">
            <span
              aria-hidden="true"
              className="font-display text-[64px] font-bold leading-none tracking-tight"
              style={decorativeStyle}
            >
              {index}
            </span>
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
              {subtitle}
            </span>
          </div>

          <div>
            <h2
              className={cn(
                'font-display font-bold leading-[1] tracking-tight lowercase text-fg',
                heavy
                  ? 'text-[clamp(2.6rem,6vw,5rem)]'
                  : 'text-[clamp(2.2rem,5vw,4rem)]',
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                'mt-8 max-w-[820px] font-body leading-[1.55] text-fg/85 text-pretty',
                heavy
                  ? 'text-[clamp(1.25rem,1.8vw,1.5rem)] border-l-2 pl-6 italic'
                  : 'text-lg',
              )}
              style={heavy ? { borderColor: accentColor } : undefined}
            >
              {body}
            </p>
          </div>
        </div>
      </ScrollReveal>
    </Container>
  );
}
