import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

type Props = {
  preEngagement: string;
};

export function CaseStudyNarrative({ preEngagement }: Props): JSX.Element {
  return (
    <Container as="section" className="py-20 md:py-28">
      <ScrollReveal>
        <div className="grid gap-10 md:grid-cols-[200px,1fr]">
          <h2 className="font-body text-[13px] font-semibold uppercase tracking-[0.18em] text-muted md:pt-2">
            what was bleeding
          </h2>
          <p className="max-w-[820px] font-display text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-[1.35] text-fg/90 text-pretty">
            {preEngagement}
          </p>
        </div>
      </ScrollReveal>
    </Container>
  );
}
