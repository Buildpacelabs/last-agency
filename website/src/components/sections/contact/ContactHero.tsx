import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function ContactHero(): JSX.Element {
  return (
    <section className="border-b border-border">
      <Container className="flex min-h-[60vh] flex-col justify-end py-32 md:py-40">
        <SectionLabel className="mb-8">• talk to us</SectionLabel>
        <h1 className="font-display text-[clamp(3rem,9vw,8.5rem)] font-bold leading-[0.92] tracking-tight text-balance lowercase">
          hire us.{' '}
          <span className="italic text-accent">then unfollow us.</span>
        </h1>
        <div className="mt-10 max-w-2xl space-y-3 font-body text-lg text-muted md:text-xl">
          <p>
            We read every note. Expect a reply in one to two business days —
            usually less.
          </p>
          <p>If we&apos;re not the right fit, we&apos;ll say so in forty-eight hours.</p>
        </div>
      </Container>
    </section>
  );
}
