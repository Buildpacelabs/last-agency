import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Button } from '@/components/ui/Button';

/**
 * Pricing posture block — a one-line statement on engagement model.
 * Anchors the page right before the closing CTA.
 */
export function PricingPosture(): JSX.Element {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container className="flex flex-col gap-10">
        <ScrollReveal>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            • how we charge
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-balance lowercase">
            fixed scope.{' '}
            <span className="italic text-accent">fixed term.</span> no surprises.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="max-w-2xl space-y-3 font-body text-lg text-muted md:text-xl">
            <p>
              One signed page. Eighteen months. The number doesn&apos;t move
              unless the scope does — and the scope doesn&apos;t move unless we
              both sign for it.
            </p>
            <p>
              No auto-renew. No retainer creep. No second invoice for the
              quarterly review.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.14}>
          <div>
            <Button href="/get-in-touch" variant="primary" size="lg">
              see if we fit
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
