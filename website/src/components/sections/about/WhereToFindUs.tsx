import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export function WhereToFindUs(): JSX.Element {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6">
          <ScrollReveal>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              • where to find us
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] tracking-tight text-balance lowercase">
              Bangalore.{' '}
              <span className="italic text-accent">we answer email.</span>
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <a
              href="mailto:hello@lastagency.com"
              className="font-body text-lg text-fg hover:text-accent md:text-xl"
            >
              hello@lastagency.com
            </a>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
