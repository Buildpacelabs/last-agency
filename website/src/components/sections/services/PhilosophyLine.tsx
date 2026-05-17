import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

/**
 * The anchor line that ties /services back to the homepage philosophy.
 * Quiet, lowercase, with the accent on the second clause.
 */
export function PhilosophyLine(): JSX.Element {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container>
        <ScrollReveal>
          <p className="font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-[1] tracking-tight text-balance lowercase">
            retainers are{' '}
            <span className="italic text-accent">a tax on indecision.</span>
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
