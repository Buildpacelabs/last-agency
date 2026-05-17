import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

/**
 * Founder names rendered as visible copy. The values below mirror seo.json's
 * AboutPage schema (Aman + Priya) so the structured data and the page agree.
 *
 * MANUAL-WORK: the names below are placeholders from the SEO schema. Brand
 * Guardian / the founding team must replace these (and the matching entries
 * in output/seo.json under `/about` -> mainEntity.founder) with real names
 * and roles before launch.
 */
const FOUNDERS: { name: string; role: string; blurb: string }[] = [
  {
    name: 'Aman',
    role: 'founder',
    blurb:
      'Ran growth at three Series B companies. Watched each one stay locked in with an agency two years past usefulness. Got tired of the room.',
  },
  {
    name: 'Priya',
    role: 'partner, head of accounts',
    blurb:
      'Twelve years running paid and lifecycle at consumer brands. Owns the cadence. Wrote the first version of the playbook we ship every time.',
  },
];

export function Founders(): JSX.Element {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container>
        <ScrollReveal>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-balance lowercase">
            who we <span className="italic text-accent">are.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          {FOUNDERS.map((founder, i) => (
            <ScrollReveal key={founder.name} delay={0.08 + i * 0.06}>
              <article>
                <h3 className="font-display text-3xl font-medium lowercase md:text-4xl">
                  {founder.name}
                </h3>
                <p className="mt-1 font-body text-sm uppercase tracking-[0.18em] text-muted">
                  {founder.role}
                </p>
                <p className="mt-5 max-w-md font-body text-base text-fg/90 md:text-lg">
                  {founder.blurb}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
