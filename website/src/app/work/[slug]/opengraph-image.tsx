import { ImageResponse } from 'next/og';
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/content';

// Note: the og-template-spec calls for Cabinet Grotesk and Inter loaded as
// ArrayBuffer files. Those fonts haven't been shipped to /public/fonts yet.
// We fall back to the Vercel OG platform default (a system sans). When the
// brand fonts are wired into /public/fonts/, swap the comment below for the
// `fonts:` option as documented in output/og-template-spec.md §5.
//
// Node runtime: the content layer reads JSON from disk (output/*.json) via
// node:fs. Edge runtime is incompatible with that — switch back to 'edge' once
// the content is bundled at build time instead of read at request time.
export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Last Agency case study';

export function generateImageMetadata(): { id: string; alt: string; size: typeof size; contentType: string }[] {
  return getAllCaseStudies().map((c) => ({
    id: c.slug,
    alt: `${c.brandName} — Last Agency case study`,
    size,
    contentType,
  }));
}

const BG = '#0E0E0C';
const FG = '#F4F1EA';
const ACC = '#FF6B35';
const MUTED = '#8C8A82';

export default function CaseStudyOG({
  params,
}: {
  params: { slug: string };
}): ImageResponse {
  const cs = getCaseStudyBySlug(params.slug);
  if (!cs) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: BG,
            color: FG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 64,
          }}
        >
          Last Agency
        </div>
      ),
      size,
    );
  }

  // Pull a headline metric token: prefer ROAS, fall back to CAC reduction.
  const roasTok = cs.metrics.roas?.split(' ')[0] ?? '';
  const cacTok = cs.metrics.cacReduction?.split(' ')[0] ?? '';
  const headlineMetric = roasTok && roasTok.toLowerCase() !== 'n/a' ? roasTok : cacTok;

  const months = cs.metrics.timeToInHouse?.replace(/[^0-9]/g, '') ?? '';

  let handoffMonthYear = '';
  const handoff = new Date(cs.handoffDate);
  if (!Number.isNaN(handoff.getTime())) {
    handoffMonthYear = handoff.toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: BG,
          color: FG,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
        }}
      >
        {/* Top row: wordmark + tag */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            letterSpacing: '0.08em',
            color: MUTED,
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: ACC, marginRight: 12 }}>•</span>
            <span>Last Agency</span>
          </div>
          <div>Case Study</div>
        </div>

        {/* Headline block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          <div style={{ fontSize: 80, fontWeight: 700, display: 'flex' }}>
            {cs.brandName}.
          </div>
          <div style={{ fontSize: 80, fontWeight: 700, display: 'flex' }}>
            {months ? `${months} months.` : 'standalone.'}{' '}
            {headlineMetric ? `${headlineMetric}.` : ''}
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: ACC,
              display: 'flex',
            }}
          >
            Then we left.
          </div>

          <div
            style={{
              marginTop: 28,
              fontWeight: 500,
              fontSize: 28,
              color: MUTED,
              letterSpacing: 0,
              display: 'flex',
            }}
          >
            {cs.industry} · {cs.founder.city}
            {handoffMonthYear ? ` · standalone since ${handoffMonthYear}` : ''}
          </div>
        </div>

        {/* Bottom row: accent bar + url */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ width: 8, height: 96, background: ACC, display: 'flex' }} />
          <div
            style={{
              fontSize: 22,
              color: MUTED,
              letterSpacing: '0.06em',
              display: 'flex',
            }}
          >
            lastagency.com/work/{cs.slug}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
