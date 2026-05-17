import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export function WhyThisModel(): JSX.Element {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <ScrollReveal>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-balance lowercase">
              why this <span className="italic text-accent">model.</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-6 font-body text-lg text-fg/90 md:text-xl">
            <ScrollReveal delay={0.05}>
              <p>
                Most agencies bill for as long as the client signs the invoice.
                That&apos;s the business model. We&apos;re not pretending
                it&apos;s evil — it&apos;s just a model that runs out of road
                somewhere around month eighteen for most founder-led teams.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                By month eighteen the work has compressed. The novel hypotheses
                are gone. Everyone&apos;s running the same playbook on the same
                accounts. The agency invoices the same. The marginal ROI on the
                next agency-month is somewhere south of break-even, and both
                sides quietly know it.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p>
                Meanwhile the board has started asking the founder why
                marketing isn&apos;t in-house yet. The founder doesn&apos;t
                have an answer that survives a Q3 review. The agency keeps
                billing.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>
                We sat in that room enough times to know the shape of it. So
                we put the exit date in the contract. Eighteen months. One
                playbook. One trained hire. One bow-out. The relationship
                doesn&apos;t curdle because it doesn&apos;t outstay itself.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
