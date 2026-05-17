import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function WorkHero(): JSX.Element {
  return (
    <Container as="section" className="pt-32 pb-16 md:pt-40 md:pb-24">
      <SectionLabel>• the work</SectionLabel>
      <h1 className="mt-6 max-w-[1100px] font-display text-[clamp(2.6rem,7.5vw,6.5rem)] font-bold leading-[0.98] tracking-tight text-balance lowercase text-fg">
        fourteen companies. fourteen exits.{' '}
        <span className="italic text-accent">still running.</span>
      </h1>
      <p className="mt-8 max-w-2xl font-body text-lg text-muted text-pretty">
        Every card below is a brand we built, ran, then handed over. The number
        in the corner is how many months they&apos;ve been standalone since the
        last invoice.
      </p>
    </Container>
  );
}
