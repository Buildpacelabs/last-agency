import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { GradientBlob } from '@/components/svg/GradientBlob';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

/**
 * Send-off block. Oversized lowercase type, single primary CTA, voiced
 * sub-line. The exit beat one more time before the footer.
 */
export function ClosingCTA(): JSX.Element {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="relative isolate overflow-hidden py-32 md:py-48"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 -z-10 -translate-y-1/2 opacity-60"
      >
        <GradientBlob size={720} color="#FF6B35" seed={7} />
      </div>

      <Container className="relative z-10 flex flex-col items-start gap-12">
        <ScrollReveal>
          <h2
            id="closing-cta-heading"
            className="max-w-[16ch] font-display text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.92] tracking-[-0.03em] text-balance lowercase"
          >
            time&apos;s a finite resource.{' '}
            <span className="block italic text-accent">so are we.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="max-w-2xl font-body text-lg text-fg/85 md:text-xl">
            Twelve to eighteen months. We build, we run, we hand over the playbook, we leave. If
            something&apos;s bleeding right now, write to us — Aman or Priya replies within one
            business day.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center gap-5">
            <Button href="/get-in-touch" variant="primary" size="lg">
              Hire us. Then unfollow us.
            </Button>
            <span className="font-body text-sm text-muted">
              hello@lastagency.com · Bangalore
            </span>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
