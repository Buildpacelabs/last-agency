# Build Report — Last Agency

**Date:** 2026-05-17
**Status:** Production-ready (with sample content + asset placeholders)
**Stack:** Next.js 14.2.35 (App Router) · TypeScript strict · Tailwind · Framer Motion · Lenis · `next/font`

---

## What was built

A static-rendered marketing site for Last Agency — eighteen routes built and shipping under 200kB first-load JS each. The voice contract, color contract, and visual contract from Phase 1 are honored in code: smooth scroll (Lenis), infinite marquees both directions, horizontal-scroll portfolio strips with wheel→x translation and keyboard nav, a sticky philosophy anchor with parallax opacity/Y, scroll-reveal cards via `whileInView`, animated nav underline, arrow-nudge CTAs on hover, and a `prefers-reduced-motion`-respecting motion system across the board. Eight case-study routes prerender at build time off `case-studies.json`. SEO metadata, JSON-LD, `robots.ts`, `sitemap.ts`, and a `@vercel/og` runtime route are all wired and verified.

---

## Routes (18 surfaces, build sizes)

From `npm run build` final pass:

| Route | Type | Page JS | First-load JS |
|---|---|---|---|
| `/` | Static | 11.4 kB | 153 kB |
| `/about` | Static | 1.45 kB | 141 kB |
| `/get-in-touch` | Static | 2.64 kB | 133 kB |
| `/get-in-touch/thanks` | Static | 1.22 kB | 135 kB |
| `/services` | Static | 1.45 kB | 141 kB |
| `/work` | Static | 2.25 kB | 139 kB |
| `/work/[slug]` × 8 | SSG | 1.6 kB | 138 kB |
| `/_not-found` | Static | 138 B | 87.4 kB |
| `/robots.txt` | Static | — | — |
| `/sitemap.xml` | Static | — | — |
| `/api/contact` | Dynamic | — | — |
| `/work/[slug]/opengraph-image/[[...]]` | Dynamic | — | — |

Shared chunks: 87.3 kB.

**Largest first-load:** `/` at 153 kB. Comfortably under the 200 kB budget. No route exceeds budget.

The eight `/work/[slug]` paths are: `helio-coffee`, `mailweave`, `kachra-capital`, `verdant-ritual`, `counterhouse`, `mishti-co`, `tilden-learn`, `ostara-market`.

---

## Feature matrix

| Feature | Status |
|---|---|
| Smooth scroll (Lenis, RAF loop, reduced-motion disabled) | ✅ |
| Infinite service marquee (CSS keyframes, both directions supported) | ✅ |
| Infinite testimonial marquee | ✅ |
| Horizontal-scroll portfolio strips (snap-mandatory, wheel→x, ArrowLeft/ArrowRight keys) | ✅ |
| Sticky philosophy anchor with `useScroll`/`useTransform` opacity+Y | ✅ |
| Scroll-reveal cards (`whileInView` + stagger) | ✅ |
| Parallax accent blobs (`GradientBlob` + `useTransform`) | ✅ |
| CTA arrow nudge on hover (Framer `variants={arrowNudge}`) | ✅ |
| Animated nav underline (CSS scale-x transform per link) | ✅ |
| Hover lift on portfolio cards | ✅ |
| `prefers-reduced-motion` (global CSS + per-component `useReducedMotion`) | ✅ |
| Skip-to-content link | ✅ |
| Custom 404 with brand voice | ✅ |
| Honeypot + zod-free typed validation on contact form | ✅ |
| `next/font` self-hosted (Inter body, Space Grotesk display placeholder) | ✅ |
| `next/image` on portfolio strip heroes | ✅ |
| Dynamic OG image route via `@vercel/og` | ✅ |
| `robots.ts` + `sitemap.ts` (13 URLs) | ✅ |
| JSON-LD on every indexable surface | ✅ |
| Per-page canonical, OG title/description/image | ✅ |
| Contact API stub (`/api/contact`) | 🟡 stub (no real send) |
| Cabinet Grotesk display font | ❌ placeholder (Space Grotesk) — swap procedure documented in `fonts.ts` |
| Hero reel video | ❌ placeholder (`onError` hides) |
| Case-study hero photography | ❌ placeholder (accent-tinted block + ClientLogo) |
| Founder portrait photography | ❌ placeholder (`FounderAvatar` generator) |
| Real social URLs in `Organization.sameAs` | ❌ placeholder (#instagram etc.) |

---

## Reference parity (vs. `reference-analysis.md`)

| Reference behavior | Last Agency match |
|---|---|
| Top nav: logo + voiced CTA + hamburger | ✅ matched (talk to us = voiced CTA) |
| Lowercase + period-separated marquee | ✅ matched (service words + dot separator) |
| Two horizontal-scroll portfolio strips | ✅ matched (PortfolioStripA + B) |
| Sticky/pinned philosophy anchor mid-page | ✅ matched (`sticky top-24 md:top-32`) |
| Multi-column footer | ✅ matched (site / office / elsewhere / copyright) |
| Service-tag pipe formatting on case study hero | ✅ matched (`services.join(' \| ')`) |
| All-caps "RESULTS, NOT PROPHECIES" treatment | ✅ matched (CaseStudyMetricsGrid label) |
| Discipline-organized case-study chapters | ✅ matched (`the build / the run / the handoff / the exit`, 4 chapters) |
| Long-form testimonial inside case study | ✅ matched (Last Agency divergence — required, present) |
| Closing CTA oversized lowercase | ✅ matched (ClosingCTA + footer wordmark line) |
| "Love" counter equivalent | ✅ adapted — "months standalone" counter |
| Smooth scroll site-wide | ✅ matched (Lenis) |
| Custom easing (not default) | ✅ matched (`easeOutExpo`, `out-quint`, `in-out-quart` in motion + Tailwind config) |
| No stock photo energy | ✅ matched (purpose-built ClientLogo SVGs + ResultChart placeholders) |
| Mobile mocks on case studies | 🟡 deferred — hero block falls back to ClientLogo until assets ship |

Single observed deviation from reference: the homepage hero uses a faint `<video>` reel placeholder (with `onError` hide-self), which the reference site doesn't have. This is non-blocking; if no `hero-reel.mp4` is shipped, the element collapses and the static GradientBlob carries the visual weight.

---

## Accessibility (WCAG 2.1 AA spot-check)

- **Color contrast (computed):**
  - `#F4F1EA` body on `#0E0E0C` bg → ~16.57:1 (passes AAA)
  - `#FF6B35` accent on `#0E0E0C` bg → ~6.78:1 (passes AA for normal text)
  - `#8B8884` muted on `#0E0E0C` bg → ~5.49:1 (passes AA for normal text — above the 4.5:1 floor)
- **Focus visible:** Global `:focus-visible` rule in `globals.css` (2 px solid accent outline + 3 px offset). Verified on Nav, Button, links, form inputs.
- **Keyboard nav:**
  - Skip-to-content link (`/* .skip-to-content */` in globals.css) — focusable, jumps to `#main-content` in `layout.tsx`.
  - Tab order on Nav → Hero → Marquee (skipped, no focusable children) → Services pillars → Portfolio strip cards. Within each strip, ArrowLeft/ArrowRight navigates between cards and `scrollIntoView({block: 'nearest', inline: 'center'})` pulls the focused card into view.
  - Form fields all have associated `<label>` via `htmlFor`/`id`; errors are linked via `aria-describedby`.
  - Mobile menu button: `aria-expanded` reflects state; menu reads three lowercase links + voiced CTA.
- **Images / SVGs:**
  - Decorative SVGs (`ArrowRight`, `ArrowDown`, `TargetIcon`) now use `aria-hidden="true"` + `focusable="false"`. Earlier they had `role="img"` + `aria-label` + `<title>` which leaked into screen-reader output for surfaces where the parent button already had an accessible name. Fixed in Phase 4.
  - Meaningful SVGs (`ClientLogo`, `FounderAvatar`, `ResultChart`) keep `role="img"` + `<title>` (e.g., "Mailweave wordmark", "Founder avatar: AM").
  - `WorkCard`, `CaseStudyHero`, `PortfolioCard` hero `<img>` / `next/image` all carry descriptive `alt` (brand + industry).
- **Headings:** Verified one `h1` per page; subsections use `h2` and `h3`. No skipped levels in surfaces inspected.
- **Marquee a11y:** Outer wrapper has `role="region"` + `aria-label="Marquee"`; the duplicated copy is `aria-hidden="true"` so screen readers only voice the items once.
- **Form a11y:** Inputs have associated labels, `aria-invalid` on error, `aria-describedby` to the error span, `role="alert"` on form-level error. Honeypot is visually hidden + `tabIndex={-1}` + `autoComplete="off"`.
- **Reduced motion:** Globals `@media (prefers-reduced-motion: reduce)` collapses all animations/transitions to ~0ms; LenisProvider bails early when the media query matches; Framer Motion components branch on `useReducedMotion()`.
- **Touch targets:** Mobile hamburger upped from 40×40 → 44×44 (`h-11 w-11`). Primary CTAs at `size="lg"` (~56 px tall). Filter chips at `size="md"`-equivalent (~36 px tall) are slightly under 44×44 but are spaced and on a non-critical surface — noted as a future polish.

Expected Lighthouse Accessibility score (static audit): **95+**.

---

## Performance (static audit)

- **Bundle sizes:** all routes under 200 kB first-load. Largest is `/` at 153 kB (Framer Motion + Lenis + nav transitions). Shared chunks 87.3 kB.
- **`next/font`:** Inter (body) and Space Grotesk (display placeholder) loaded via `next/font/google` with `display: 'swap'` — Next handles preload + subset.
- **Images:** `next/image` on `PortfolioStrip` card heroes (with `sizes` for mobile-vs-desktop). `WorkCard` / `CaseStudyHero` use `<img loading="lazy">` for the placeholder-or-image branch (deferred because the image source may be runtime-derived; flag as a future polish to convert to `next/image` when real assets land).
- **Hero video:** `preload="metadata"` (not `auto`); `onError` hides the element so a missing file doesn't cause layout shift.
- **No layout shift on static sections:** all images either declare aspect-ratio container (e.g., `aspect-[4/3]`, `aspect-[16/8]`) or are placeholders inside a fixed-aspect div.
- **Animations:** Lenis runs off RAF; Framer Motion uses GPU-accelerated transforms; marquee is pure CSS keyframes (no JS tween).

Expected Lighthouse mobile scores (static audit):

| Category | Estimated |
|---|---|
| Performance | 90–95 |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

**Known concerns:**
- Without the hero reel video and the real case-study photography, LCP will likely be a text element — fast. When real images ship, the homepage hero and case-study hero images must carry `priority` on the LCP image to keep Performance ≥90.
- Framer Motion's `m`-only import isn't being used; full `motion` import adds ~30 kB to the homepage chunk. Acceptable for now.

---

## SEO (verified end-to-end)

- **Metadata per route** (verified via curl on production-mode local server):
  - `/`: title + description + canonical + OG + Twitter card + Organization JSON-LD ✅
  - `/work`: title (single-suffix) + canonical + CollectionPage + BreadcrumbList JSON-LD ✅
  - `/services`: title + canonical + 4× Service + BreadcrumbList JSON-LD ✅
  - `/about`: title + canonical + AboutPage JSON-LD ✅
  - `/get-in-touch`: title + canonical + ContactPage JSON-LD ✅
  - `/get-in-touch/thanks`: title + `robots: noindex,nofollow` ✅
  - `/work/[slug]` × 8: title + canonical + OG (`type: article`) + Article + BreadcrumbList JSON-LD ✅
  - `/this-does-not-exist` → 404: `this page already graduated.` ✅
- **Title template:** the root `layout.tsx` declared `template: '%s | Last Agency'`, but seo.json titles already end in `| Last Agency`. Phase 4 fix: every per-route `generateMetadata` returns `title: { absolute: seo.title }` so titles render once, exactly as seo.json specifies.
- **`/robots.txt`:** matches the canonical spec — `User-Agent: *`, blocks `/api/`, `/_next/`, `/thanks`, `/404`; `Host` and `Sitemap` lines present.
- **`/sitemap.xml`:** 13 URLs — 5 static (`/`, `/work`, `/services`, `/about`, `/get-in-touch`) + 8 case studies. `/work` `lastmod` is `max(handoffDate)`; each case study uses its own `handoffDate`; static pages use build time. Excluded: `/thanks`, `/404`, `/api/*`.
- **OG image route:** `/work/[slug]/opengraph-image/<slug>` returns `200 image/png` (1200×630) for every case study. Runtime `nodejs` (so it can read `output/*.json`; the spec calls this out as the trade-off vs. `edge`).

---

## Files changed in Phase 4

- `src/app/robots.ts` — new (canonical robots metadata per `robots-and-sitemap.md`).
- `src/app/sitemap.ts` — new (13 routes: 5 static + work index + 8 case studies; build-time `lastmod`).
- `src/app/about/page.tsx` — title now `{ absolute }` so it isn't double-suffixed.
- `src/app/get-in-touch/page.tsx` — same.
- `src/app/services/page.tsx` — same.
- `src/app/work/page.tsx` — same.
- `src/app/work/[slug]/page.tsx` — same.
- `src/components/layout/Nav.tsx` — mobile hamburger upped to 44×44 (h-11 w-11) for touch-target compliance.
- `src/components/svg/ArrowRight.tsx` — decorative: `aria-hidden="true"` + `focusable="false"`, no more `<title>`.
- `src/components/svg/ArrowDown.tsx` — same.
- `src/components/svg/TargetIcon.tsx` — same.

No copy was edited in Phase 4. The Brand Guardian's Phase-3 audit stood; voice grep against `banned-phrases.json` over the changed files showed zero hits.

---

## Known limitations (carried into MANUAL-WORK)

1. **Cabinet Grotesk** — display font is Space Grotesk placeholder. Swap procedure documented in `src/app/fonts.ts` (drop `.woff2` files into `public/fonts/cabinet-grotesk/`, replace `Space_Grotesk` import with `localFont`).
2. **Hero reel video** — `public/assets/brand/hero-reel.mp4` missing; element auto-hides via `onError`. When the asset ships, also add a `poster` attribute.
3. **Case-study hero photography + founder portraits** — placeholders (accent-tinted blocks + generator SVGs). Hand-off point: `public/case-studies/<slug>/`. When real images land, also swap `WorkCard`'s raw `<img loading="lazy">` to `next/image` for layout-shift-free LCP.
4. **Contact API** — `/api/contact` is a stub; needs a real send target (Resend, Postmark, SES — pick one).
5. **Social URLs** — Footer and `Organization.sameAs` in seo.json use `#instagram` / `#linkedin` / `#twitter` placeholders.
6. **Founder surnames** — `seo.json` AboutPage.founder schema and About-page Founders block use first names only by design; surname back-substitution is a MANUAL-WORK item from Phase 2.
7. **OG runtime** — `nodejs` (not `edge`) because the OG route reads `output/*.json` at request time. To move to `edge`, bundle the case-study slice into a TS module at build time.
8. **No Lighthouse CI run** — static audit only. The first production deploy should run Lighthouse and report.
9. **`@vercel/og` font loading** — currently uses Vercel default sans. To match brand, ship `Inter-Bold.ttf` + Cabinet Grotesk variable into `public/fonts/` and wire `fonts:` per `og-template-spec.md §5`.
10. **Filter chips (`/work`)** — 36 px tall, slightly under 44×44 touch target. Acceptable on a non-critical surface but worth raising in a future polish.
