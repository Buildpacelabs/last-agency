import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { TargetIcon } from '@/components/svg/TargetIcon';

export const metadata: Metadata = {
  title: 'this page already graduated.',
  description: "this URL doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound(): JSX.Element {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <TargetIcon
        size={220}
        className="pointer-events-none absolute right-6 top-32 hidden -rotate-12 text-fg/40 md:block md:right-16"
      />
      <TargetIcon
        size={140}
        className="pointer-events-none absolute -right-6 top-24 -rotate-12 text-fg/40 md:hidden"
      />

      <Container className="flex min-h-[80vh] flex-col justify-center gap-8 py-32">
        <SectionLabel>• 404</SectionLabel>

        <h1 className="max-w-4xl font-display text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.92] tracking-tight text-balance lowercase">
          this page{' '}
          <span className="italic text-accent">already graduated.</span>
        </h1>

        <p className="max-w-xl font-body text-lg text-muted md:text-xl">
          This URL doesn&apos;t exist. (We&apos;d have documented the handoff
          if it did.)
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Button href="/" variant="primary" size="md">
            back to the homepage
          </Button>
          <Button href="/work" variant="secondary" size="md" showArrow={false}>
            see the work
          </Button>
        </div>
      </Container>
    </section>
  );
}
