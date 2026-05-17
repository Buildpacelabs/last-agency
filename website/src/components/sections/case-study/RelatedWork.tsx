import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { WorkCard } from '@/components/sections/work/WorkCard';
import type { ClientLogoVariant } from '@/components/generated/ClientLogo';
import type { CaseStudy } from '@/lib/content.types';

type Props = {
  items: CaseStudy[];
  heroBySlug: Record<string, string | undefined>;
  logoBySlug: Record<string, { name: string; variant: ClientLogoVariant }>;
};

export function RelatedWork({ items, heroBySlug, logoBySlug }: Props): JSX.Element | null {
  if (items.length === 0) return null;

  return (
    <Container as="section" className="border-t border-border py-24 md:py-32">
      <h2 className="mb-12 font-display text-[clamp(2rem,4.5vw,3.6rem)] font-bold leading-[1.05] tracking-tight lowercase text-fg">
        more graduates.
      </h2>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((cs, i) => {
          const logo = logoBySlug[cs.slug];
          return (
            <li key={cs.slug}>
              <ScrollReveal delay={Math.min(i * 0.05, 0.3)}>
                <WorkCard
                  caseStudy={cs}
                  heroSrc={heroBySlug[cs.slug]}
                  logoName={logo?.name ?? cs.brandName}
                  logoVariant={logo?.variant ?? 'lowercase-dot'}
                  compact
                />
              </ScrollReveal>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
