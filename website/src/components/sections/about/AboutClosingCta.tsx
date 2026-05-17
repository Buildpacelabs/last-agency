import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Button } from '@/components/ui/Button';

export function AboutClosingCta(): JSX.Element {
  return (
    <section className="py-32 md:py-40">
      <Container className="flex flex-col gap-10">
        <ScrollReveal>
          <h2 className="font-display text-[clamp(2.5rem,8vw,8rem)] font-bold leading-[0.92] tracking-tight text-balance lowercase">
            you don&apos;t need another deck.{' '}
            <span className="italic text-accent">
              you need the function to work by Q3.
            </span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p className="max-w-2xl font-body text-lg text-muted md:text-xl">
            Send a note. Tell us what&apos;s bleeding. We reply within one
            business day — usually less.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <div>
            <Button href="/get-in-touch" variant="primary" size="lg">
              Tell us what&apos;s bleeding
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
