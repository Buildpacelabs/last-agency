import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Button } from '@/components/ui/Button';

export function ServicesClosingCta(): JSX.Element {
  return (
    <section className="py-32 md:py-40">
      <Container className="flex flex-col gap-10 text-center md:items-center">
        <ScrollReveal>
          <h2 className="font-display text-[clamp(3rem,9vw,9rem)] font-bold leading-[0.92] tracking-tight text-balance lowercase">
            12 months.{' '}
            <span className="italic text-accent">then we&apos;re gone.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p className="max-w-xl font-body text-lg text-muted md:text-xl">
            Tell us what&apos;s bleeding. We&apos;ll tell you whether we&apos;re
            the right people to fix it.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.14}>
          <div>
            <Button href="/get-in-touch" variant="primary" size="lg">
              Talk to us
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
