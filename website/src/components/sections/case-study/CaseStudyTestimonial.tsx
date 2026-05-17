import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { FounderAvatar, type FounderAvatarGradient } from '@/components/generated/FounderAvatar';

type Props = {
  quote: string;
  founderName: string;
  founderRole: string;
  founderCity: string;
  brandName: string;
  initials: string;
  gradient: FounderAvatarGradient;
  accentColor: string;
};

export function CaseStudyTestimonial({
  quote,
  founderName,
  founderRole,
  founderCity,
  brandName,
  initials,
  gradient,
  accentColor,
}: Props): JSX.Element {
  return (
    <Container as="section" className="border-t border-border py-24 md:py-32">
      <ScrollReveal>
        <div className="grid gap-10 md:grid-cols-[200px,1fr]">
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
            what {founderName.split(' ')[0].toLowerCase()} said
          </span>
          <div className="max-w-[1000px]">
            <h2 className="sr-only">{`What ${founderName} said`}</h2>
            <div
              className="relative rounded-2xl border bg-fg/[0.03] p-8 md:p-12"
              style={{ borderColor: `${accentColor}55` }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-6 left-8 font-display text-[120px] leading-none"
                style={{ color: accentColor }}
              >
                &ldquo;
              </span>
              <blockquote className="relative font-display text-[clamp(1.3rem,2.4vw,2rem)] font-medium leading-[1.35] text-fg/90 text-pretty">
                {quote}
              </blockquote>

              <figcaption className="mt-10 flex items-center gap-4">
                <FounderAvatar
                  initials={initials}
                  gradient={gradient}
                  size={64}
                />
                <div className="flex flex-col">
                  <span className="font-display text-lg font-semibold text-fg">
                    {founderName}
                  </span>
                  <span className="font-body text-[13px] text-muted">
                    {founderRole} · {brandName} · {founderCity}
                  </span>
                </div>
              </figcaption>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Container>
  );
}
