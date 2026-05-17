import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function CaseStudyClosingCTA(): JSX.Element {
  return (
    <Container as="section" className="border-t border-border py-24 md:py-32">
      <SectionLabel>• the offer</SectionLabel>
      <h2 className="mt-6 max-w-[1100px] font-display text-[clamp(2.2rem,5.5vw,4.8rem)] font-bold leading-[1] tracking-tight lowercase text-fg">
        same shape engagement.{' '}
        <span className="italic text-accent">your name in this slot next.</span>
      </h2>
      <p className="mt-6 max-w-2xl font-body text-lg text-muted">
        Twelve to eighteen months. Fixed scope. We build the function, run it,
        train your hire, hand over the playbook. Then we&apos;re gone.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/get-in-touch" size="lg">
          tell us what&apos;s bleeding
        </Button>
        <Link
          href="/work"
          className="inline-flex items-center rounded-full border border-border px-7 py-4 font-body text-base font-medium text-fg transition-colors hover:bg-fg/5"
        >
          back to the work
        </Link>
      </div>
    </Container>
  );
}
