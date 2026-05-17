import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { cn } from '@/lib/cn';

type SubBlock = {
  title: string;
  body: string;
};

type PillarSectionProps = {
  number: string;
  months: string;
  heading: string;
  subhead: string;
  body: string;
  deliverables?: string[];
  subBlocks?: SubBlock[];
  /** Visual weight tier. 'hero' gives the Handoff pillar extra type-weight. */
  emphasis?: 'default' | 'hero';
  /** Extra trailing slot for any custom content. */
  children?: ReactNode;
  /** Anchor id (used by SEO Service schema). */
  id?: string;
};

/**
 * A pillar block: numbered decorative "01" + months window + heading + body.
 * Supports either a deliverables list (Build / Run / Exit) or a set of
 * sub-blocks (the Handoff pillar uses these to spell out the playbook /
 * the hire / the shadow).
 */
export function PillarSection({
  number,
  months,
  heading,
  subhead,
  body,
  deliverables,
  subBlocks,
  emphasis = 'default',
  children,
  id,
}: PillarSectionProps): JSX.Element {
  return (
    <section
      id={id}
      className={cn(
        'border-b border-border py-24 md:py-32',
        emphasis === 'hero' && 'bg-fg/[0.02]',
      )}
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-[200px_1fr] md:gap-16">
          <div className="space-y-2">
            <p
              aria-hidden="true"
              className="font-display text-[clamp(4rem,10vw,8rem)] font-bold leading-none tracking-tight text-accent"
            >
              {number}
            </p>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {months}
            </p>
          </div>

          <div className="space-y-8">
            <ScrollReveal>
              <h2
                className={cn(
                  'font-display font-bold leading-[0.95] tracking-tight text-balance lowercase',
                  emphasis === 'hero'
                    ? 'text-[clamp(2.5rem,7vw,6rem)]'
                    : 'text-[clamp(2.25rem,6vw,5rem)]',
                )}
              >
                {heading}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <p className="max-w-3xl font-body text-xl text-fg/90 md:text-2xl">
                {subhead}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <p className="max-w-3xl font-body text-base text-muted md:text-lg">
                {body}
              </p>
            </ScrollReveal>

            {deliverables ? (
              <ScrollReveal delay={0.16}>
                <ul className="grid max-w-3xl gap-3 border-t border-border pt-8 md:grid-cols-2">
                  {deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-3 font-body text-sm text-fg/90 md:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ) : null}

            {subBlocks ? (
              <div className="grid max-w-4xl gap-8 border-t border-border pt-10 md:grid-cols-3 md:gap-10">
                {subBlocks.map((block, i) => (
                  <ScrollReveal key={block.title} delay={0.2 + i * 0.06}>
                    <h3 className="font-display text-2xl font-medium lowercase md:text-3xl">
                      {block.title}
                    </h3>
                    <p className="mt-3 font-body text-sm text-muted md:text-base">
                      {block.body}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            ) : null}

            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
