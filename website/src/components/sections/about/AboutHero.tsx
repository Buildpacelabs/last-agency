import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GradientBlob } from '@/components/svg/GradientBlob';

export function AboutHero(): JSX.Element {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <GradientBlob
        seed={5}
        size={760}
        className="pointer-events-none absolute -left-40 top-1/3 -z-10 opacity-50"
      />

      <Container className="flex min-h-[78vh] flex-col justify-end py-32 md:py-40">
        <SectionLabel className="mb-8">• about</SectionLabel>
        <h1 className="font-display text-[clamp(3rem,9vw,8.5rem)] font-bold leading-[0.92] tracking-tight text-balance lowercase">
          we built an agency{' '}
          <span className="italic text-accent">to fire ourselves.</span>
        </h1>
        <div className="mt-10 max-w-2xl space-y-3 font-body text-lg text-muted md:text-xl">
          <p>
            Every founder we&apos;ve worked with hit the same wall: an agency
            two years past usefulness, a board pushing for in-house, and no
            clear path from one to the other.
          </p>
          <p>
            So we built the model we wished we&apos;d hired. Eighteen months.
            One contract. One exit.
          </p>
          <p>This is the long version of why.</p>
        </div>
      </Container>
    </section>
  );
}
