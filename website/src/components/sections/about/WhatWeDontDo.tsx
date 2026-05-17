import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

const ITEMS: string[] = [
  'no perpetual retainers.',
  'no agency-of-record contracts.',
  'no 30-page slide decks.',
  'no monthly status calls that mostly recap last month.',
  'no SEO upsell mid-engagement.',
  'no hiding the dashboards behind a login we own.',
  'no auto-renew. ever.',
];

export function WhatWeDontDo(): JSX.Element {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <ScrollReveal>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-balance lowercase">
              what we{' '}
              <span className="italic text-accent">don&apos;t</span> do.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <ul className="divide-y divide-border border-y border-border">
              {ITEMS.map((item) => (
                <li
                  key={item}
                  className="py-5 font-display text-2xl font-medium lowercase md:text-3xl"
                >
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
