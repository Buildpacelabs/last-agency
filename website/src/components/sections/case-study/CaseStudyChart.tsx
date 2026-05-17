import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { ResultChart, type ResultChartMetric } from '@/components/generated/ResultChart';

type Props = {
  metric: ResultChartMetric;
  data: number[];
  accentColor: string;
  caption: string;
};

export function CaseStudyChart({
  metric,
  data,
  accentColor,
  caption,
}: Props): JSX.Element {
  return (
    <Container as="section" className="border-t border-border py-20 md:py-28">
      <ScrollReveal>
        <div className="grid gap-10 md:grid-cols-[200px,1fr]">
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
            mid-chapter — the numbers
          </span>
          <div className="max-w-[860px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-fg/[0.02] p-6 md:p-8">
              <ResultChart
                metric={metric}
                data={data}
                accentColor={accentColor}
                label={caption}
              />
            </div>
            <p className="mt-4 font-body text-[14px] text-muted">{caption}</p>
          </div>
        </div>
      </ScrollReveal>
    </Container>
  );
}
