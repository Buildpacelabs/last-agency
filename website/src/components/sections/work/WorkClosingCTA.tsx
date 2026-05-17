import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function WorkClosingCTA(): JSX.Element {
  return (
    <Container as="section" className="border-t border-border py-24 md:py-32">
      <SectionLabel>• the offer</SectionLabel>
      <h2 className="mt-6 max-w-[1100px] font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-bold leading-[0.98] tracking-tight lowercase text-fg">
        twelve months. then we&apos;re gone.{' '}
        <span className="italic text-accent">that&apos;s the offer.</span>
      </h2>
      <p className="mt-6 max-w-2xl font-body text-lg text-muted">
        Tell us what&apos;s bleeding. Aman or Priya replies within one business
        day. If we&apos;re not the fit, you&apos;ll hear it inside forty-eight
        hours.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/get-in-touch" size="lg">
          tell us what&apos;s bleeding
        </Button>
        <Link
          href="/services"
          className="inline-flex items-center rounded-full border border-border px-7 py-4 font-body text-base font-medium text-fg transition-colors hover:bg-fg/5"
        >
          read the handoff
        </Link>
      </div>
    </Container>
  );
}
