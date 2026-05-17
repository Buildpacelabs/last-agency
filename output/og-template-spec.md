# Open Graph Template Spec — Last Agency

> Spec for the `@vercel/og` fallback generator that produces an OG image for every route the user hasn't supplied custom art for.
> Owner: SEO Manager. Implementation: Architect (`app/opengraph-image.tsx` and per-route variants).
> Voice: lifted from `brand-voice-guide.md`. Color tokens: lifted from `site-architecture.md` §7.

---

## 1. Goals

1. Every shareable URL on the site renders a branded, on-voice OG image — even when the asset-manager hasn't uploaded custom art yet.
2. Generation is at-edge (`@vercel/og` runs on the Edge runtime), so previews are fresh and don't require a static-asset upload step.
3. Visual treatment matches the homepage: warm off-black, oversized lowercase display type, single amber/rust accent, generous whitespace.

---

## 2. Canvas + fundamentals

- **Dimensions:** 1200 × 630 (Open Graph default, also fits Twitter `summary_large_image`).
- **Background:** solid `#0E0E0C` (warm off-black, matches `--color-bg`).
- **Accent:** `#FF6B35` (the locked amber/rust, matches `--color-accent`).
- **Text:** `#F4F1EA` primary, `#8C8A82` muted.
- **Padding:** 72 px on all sides. Content lives in a 1056 × 486 inner box.
- **Safe zone:** keep all critical text within 80 px from any edge — LinkedIn and Slack crop differently.

---

## 3. Typography (loaded via `@vercel/og` font fetch)

- **Display: Cabinet Grotesk Bold** — the brand display face. Loaded as a local font file at `/public/fonts/CabinetGrotesk-Bold.woff` and passed to the `ImageResponse` `fonts` option.
- **Body / metadata: Inter Medium** — for the small footer line (route, brand wordmark). Also `/public/fonts/Inter-Medium.woff`.

```ts
const cabinetGroteskBold = await fetch(
  new URL('../public/fonts/CabinetGrotesk-Bold.woff', import.meta.url),
).then((r) => r.arrayBuffer());

const interMedium = await fetch(
  new URL('../public/fonts/Inter-Medium.woff', import.meta.url),
).then((r) => r.arrayBuffer());

return new ImageResponse(<Template ... />, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Cabinet Grotesk', data: cabinetGroteskBold, style: 'normal', weight: 700 },
    { name: 'Inter',           data: interMedium,       style: 'normal', weight: 500 },
  ],
});
```

### Type sizes per variant

| Element | Size | Line height | Tracking | Weight |
|---|---|---|---|---|
| Headline (homepage) | 88 px | 1.02 | -0.02em | 700 |
| Headline (case study) | 80 px | 1.05 | -0.02em | 700 |
| Headline (services / about / contact) | 96 px | 1.0 | -0.02em | 700 |
| Sub-headline (case study only) | 32 px | 1.3 | 0 | 500 |
| Footer wordmark / route | 22 px | 1 | 0.04em | 500 (Inter, uppercase) |

---

## 4. Template variants

There are five distinct variants. Each takes a `route` and an optional data payload; the variant is selected inside `opengraph-image.tsx` by route prefix.

### 4.1 Homepage (`/`)

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   • LAST AGENCY                                          │   ← top-left wordmark, 22px Inter Medium uppercase, muted
│                                                          │
│                                                          │
│   your last agency.                                      │   ← H1 line 1, 88px Cabinet Grotesk Bold, fg
│   we mean that literally.                                │   ← H1 line 2, same; second word "literally" rendered in accent
│                                                          │
│                                                          │
│                                                          │
│                                                          │
│   ▌                                                      │   ← 8×96px accent rectangle anchored bottom-left
│                                                          │
│   lastagency.com                                         │   ← bottom-right footer, 22px Inter Medium muted
└──────────────────────────────────────────────────────────┘
```

- Two-line headline, lowercase, lockup left-aligned at 72 px from edges.
- Accent word ("literally") in `#FF6B35`.
- An 8 × 96 px accent bar pinned to the bottom-left as a brand mark.
- Footer URL at bottom-right.

### 4.2 Case study (`/work/[slug]`)

```
┌──────────────────────────────────────────────────────────┐
│   • LAST AGENCY                              CASE STUDY  │
│                                                          │
│   Helio Coffee.                                          │   ← brand name, 80px Cabinet Bold, fg
│   15 months. 4.3x ROAS.                                  │   ← metric line, 80px Cabinet Bold, fg (months/metric)
│   Then we left.                                          │   ← outcome line, 80px Cabinet Bold, accent
│                                                          │
│                                                          │
│   D2C · Bangalore · standalone since Apr 2025            │   ← sub line, 32px Inter Medium, muted
│                                                          │
│   ▌                                                      │
│                                                          │
│   lastagency.com/work/helio-coffee                       │
└──────────────────────────────────────────────────────────┘
```

- Three-line headline ladders the metric pattern from the case-study page.
- "Then we left." is the only line in the accent color — it lands the thesis.
- Sub-headline shows industry, founder city, and "standalone since {month-year}" — pulled from `case-studies.json`.
- "CASE STUDY" tag in the top-right corner, 22 px Inter Medium uppercase tracked.

### 4.3 Services (`/services`)

```
┌──────────────────────────────────────────────────────────┐
│   • LAST AGENCY                                          │
│                                                          │
│   four things.                                           │   ← line 1, 96px Cabinet Bold, fg
│   in order.                                              │   ← line 2, 96px Cabinet Bold, fg
│   then we go.                                            │   ← line 3, 96px Cabinet Bold, accent
│                                                          │
│   build · run · handoff · exit                           │   ← pillar line, 32px Inter Medium, muted
│                                                          │
│   ▌                                                      │
│                                                          │
│   lastagency.com/services                                │
└──────────────────────────────────────────────────────────┘
```

### 4.4 About (`/about`)

```
┌──────────────────────────────────────────────────────────┐
│   • LAST AGENCY                                          │
│                                                          │
│   we built an agency                                     │   ← 96px Cabinet Bold, fg
│   to fire ourselves.                                     │   ← 96px Cabinet Bold, accent on "fire ourselves"
│                                                          │
│   Bangalore · twelve people · one timezone               │   ← 32px Inter Medium, muted
│                                                          │
│   ▌                                                      │
│                                                          │
│   lastagency.com/about                                   │
└──────────────────────────────────────────────────────────┘
```

### 4.5 Contact (`/get-in-touch`)

```
┌──────────────────────────────────────────────────────────┐
│   • LAST AGENCY                                          │
│                                                          │
│   tell us                                                │   ← 96px Cabinet Bold, fg
│   what's bleeding.                                       │   ← 96px Cabinet Bold, accent
│                                                          │
│   one business day reply · no chatbot                    │   ← 32px Inter Medium, muted
│                                                          │
│   ▌                                                      │
│                                                          │
│   lastagency.com/get-in-touch                            │
└──────────────────────────────────────────────────────────┘
```

### 4.6 Fallback (`/work` index and any unforeseen route)

Same structure as Homepage but with the route's `seo.json` title as the headline (truncated to two lines if needed, max 38 chars per line).

---

## 5. Pseudo-JSX: case-study OG variant

This is the load-bearing example. Architect can copy-paste, swap the data shape if the actual JSON types differ.

```tsx
// app/opengraph-image.tsx (case-study variant)
import { ImageResponse } from 'next/og';
import caseStudies from '@/content/case-studies.json';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BG    = '#0E0E0C';
const FG    = '#F4F1EA';
const ACC   = '#FF6B35';
const MUTED = '#8C8A82';

export default async function CaseStudyOG({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return new Response('Not found', { status: 404 });

  const cabinetBold = await fetch(
    new URL('../public/fonts/CabinetGrotesk-Bold.woff', import.meta.url),
  ).then((r) => r.arrayBuffer());

  const interMedium = await fetch(
    new URL('../public/fonts/Inter-Medium.woff', import.meta.url),
  ).then((r) => r.arrayBuffer());

  // Pull the headline metric (first metric token from metrics.roas or cacReduction)
  const headlineMetric =
    cs.metrics.roas?.split(' ')[0] // e.g. "4.3x" from "4.3x blended..."
    ?? cs.metrics.cacReduction?.split(' ')[0]
    ?? '';

  const months = cs.metrics.timeToInHouse?.replace(/[^0-9]/g, '') ?? '';
  const handoffMonthYear = new Date(cs.handoffDate).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
  });

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
          fontFamily: 'Cabinet Grotesk',
        }}
      >
        {/* Top row: wordmark + tag */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Inter', fontSize: 22, letterSpacing: '0.04em', color: MUTED, textTransform: 'uppercase' }}>
          <div>• Last Agency</div>
          <div>Case Study</div>
        </div>

        {/* Headline block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <div style={{ fontSize: 80, fontWeight: 700 }}>{cs.brandName}.</div>
          <div style={{ fontSize: 80, fontWeight: 700 }}>
            {months} months. {headlineMetric}.
          </div>
          <div style={{ fontSize: 80, fontWeight: 700, color: ACC }}>Then we left.</div>

          <div style={{ marginTop: 28, fontFamily: 'Inter', fontWeight: 500, fontSize: 32, color: MUTED, letterSpacing: 0 }}>
            {cs.industry} · {cs.founder.city} · standalone since {handoffMonthYear}
          </div>
        </div>

        {/* Bottom row: accent bar + url */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ width: 8, height: 96, background: ACC }} />
          <div style={{ fontFamily: 'Inter', fontSize: 22, color: MUTED, letterSpacing: '0.04em' }}>
            lastagency.com/work/{cs.slug}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cabinet Grotesk', data: cabinetBold,  style: 'normal', weight: 700 },
        { name: 'Inter',           data: interMedium, style: 'normal', weight: 500 },
      ],
    },
  );
}
```

### Notes for Architect

- The `@vercel/og` runtime uses **`satori`** under the hood — no CSS grid, no `transform`, only the supported subset of Yoga flex + simple background colors. The spec above sticks to that subset.
- Fonts must be loaded as `ArrayBuffer` and passed in the `fonts` array — system fonts won't work.
- Edge runtime is required (`export const runtime = 'edge'`) so the function is fast at the CDN edge.
- One `app/opengraph-image.tsx` per dynamic-route segment is the cleanest way to handle variants — Next will auto-wire it to the `og:image` meta tag for that route.
- For static routes, prefer co-locating: `app/about/opengraph-image.tsx`, `app/services/opengraph-image.tsx`, etc.
- The case-study OG file lives at `app/work/[slug]/opengraph-image.tsx` and Next auto-iterates over `generateStaticParams` to pre-render every variant at build time.

---

## 6. Voice + brand audit (self-check)

- All headlines are lowercase except where the brand name itself is capitalized (case-study variants use `{brandName}.` which renders as written, e.g. "Helio Coffee." with a capital H).
- No banned phrase appears in any variant.
- The accent color carries the thesis-line ("Then we left.", "to fire ourselves.", "what's bleeding.") — never decorative.
- The exit / handoff is mentioned in 3 of 5 variants (homepage, services, case study). About + contact reinforce it in the muted sub-line. Brand thesis visible in every preview.

---

## 7. Performance budget

- OG image rendered at edge in <300 ms p95.
- Each font file ≤ 80 KB (subset before deploy — `glyphhanger` to extract used glyphs only; the brand uses a known character set).
- No external image fetches inside the OG render (everything is type + flat colors). Keeps the function lean and never breaks on a remote 404.
