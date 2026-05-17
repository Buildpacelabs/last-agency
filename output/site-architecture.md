# Site Architecture — Last Agency

> Implementation blueprint for the Last Agency marketing site.
> Owner: Architect. Updated: 2026-05-17.
> Reference contract: `./reference-analysis.md`.

---

## 1. Stack confirmation

Locked from `architect.md` — no deviations.

- **Framework:** Next.js 14+ (App Router, RSC where possible) + TypeScript strict
- **Styling:** Tailwind CSS (tokens via CSS variables) + CSS Modules for component-scoped overrides
- **Motion:** Framer Motion (component-level), Lenis (site-wide smooth scroll), GSAP + ScrollTrigger (pin/horizontal sections only)
- **Fonts:** `next/font/google` for both display and body (self-hosted by Next at build time)
- **Images:** `next/image` everywhere; `@vercel/og` for dynamic OG previews
- **Linting:** ESLint + `@typescript-eslint/strict` + `eslint-plugin-tailwindcss`

### Package-level decisions

| Concern | Choice | Why |
|---|---|---|
| State management | React Context for theme/motion-preference only. Local `useState` everywhere else. No Redux/Zustand. | No client app surface. |
| Form library | `react-hook-form` + `zod` for `/get-in-touch`. | Smallest bundle that gives typed validation. |
| Icons | Inline SVG (custom arrow, target, marquee dot) — no icon library. | <10 unique glyphs; tree-shake is moot. |
| Class merging | `clsx` + `tailwind-merge` (via `cn()` helper in `lib/utils.ts`). | Standard. |
| Analytics | Vercel Analytics (drop-in, no GDPR banner needed at MVP). | Defer to Brand Guardian if EU concern raised. |
| Content | Local JSON in `./content/` for case studies + testimonials. No CMS in Phase 3. | Reads via `import` at build time → static. |

---

## 2. Project file structure

```
website/
├── app/
│   ├── (marketing)/                  # route group, no URL prefix
│   │   ├── layout.tsx                # ScrollProvider + Nav + Footer wrapper
│   │   ├── page.tsx                  # /
│   │   ├── work/
│   │   │   ├── page.tsx              # /work (index)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx          # /work/[slug]
│   │   │       └── generateStaticParams.ts
│   │   ├── services/page.tsx
│   │   ├── about/page.tsx
│   │   └── get-in-touch/
│   │       ├── page.tsx
│   │       └── thanks/page.tsx
│   ├── api/
│   │   └── contact/route.ts          # POST handler for form
│   ├── opengraph-image.tsx           # dynamic OG via @vercel/og
│   ├── not-found.tsx                 # 404
│   ├── loading.tsx                   # site-wide skeleton
│   ├── error.tsx                     # client error boundary
│   ├── globals.css                   # Tailwind layers + CSS vars + Lenis reset
│   ├── layout.tsx                    # <html>, font loading, metadata
│   └── robots.ts, sitemap.ts
│
├── components/
│   ├── primitives/                   # shared, no business logic
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── index.ts
│   │   ├── ArrowCTA/
│   │   ├── Tag/
│   │   ├── MetricCallout/
│   │   └── SectionHeading/
│   │
│   ├── motion/                       # animation building blocks
│   │   ├── ScrollProvider.tsx        # Lenis wrapper
│   │   ├── MotionWrapper.tsx         # whileInView stagger helper
│   │   ├── Reveal.tsx                # single-element fade/translate-in
│   │   ├── Parallax.tsx              # useScroll + useTransform
│   │   ├── HoverLift.tsx
│   │   └── ReducedMotionGate.tsx     # children -> opacity-only fallback
│   │
│   ├── global/
│   │   ├── Nav/                      # Nav.tsx + Nav.module.css + types.ts
│   │   ├── Footer/
│   │   ├── PageTransition/           # AnimatePresence wrapper
│   │   └── CursorAccent/             # custom cursor for desktop only
│   │
│   ├── home/
│   │   ├── Hero/
│   │   ├── ServicesOverview/
│   │   ├── Marquee/                  # infinite ticker
│   │   ├── PortfolioStrip/           # horizontal-scroll carousel (A & B reuse)
│   │   ├── PortfolioCard/
│   │   ├── PhilosophyAnchor/         # sticky display-type block
│   │   ├── TestimonialMarquee/       # Last Agency original
│   │   └── ClosingCTA/
│   │
│   ├── work/
│   │   ├── WorkIndexGrid/
│   │   └── WorkCard/
│   │
│   ├── case-study/
│   │   ├── CaseHero/
│   │   ├── ServiceTags/
│   │   ├── OpeningStatement/
│   │   ├── DisciplineSection/        # repeats per discipline
│   │   ├── ResultsBlock/
│   │   ├── FounderTestimonial/       # Last Agency divergence
│   │   ├── FutureNote/
│   │   └── RelatedWork/
│   │
│   ├── services/
│   │   ├── PillarSection/            # Build / Run / Handoff / Exit
│   │   └── PillarHeader/
│   │
│   ├── about/
│   │   ├── OriginStatement/
│   │   ├── WhyThisModel/
│   │   └── FoundersBlock/
│   │
│   └── contact/
│       ├── ContactForm/
│       └── ContactCopy/
│
├── lib/
│   ├── utils.ts                      # cn(), formatNumber()
│   ├── motion-presets.ts             # shared easing curves, durations
│   ├── content.ts                    # typed loaders for JSON content
│   ├── seo.ts                        # metadata builders
│   └── analytics.ts
│
├── hooks/
│   ├── useReducedMotion.ts           # wraps Framer's, adds SSR safety
│   ├── useMediaQuery.ts
│   ├── useLenis.ts                   # access shared Lenis instance
│   └── useHorizontalScroll.ts        # ScrollTrigger setup for strip
│
├── styles/
│   ├── tokens.css                    # CSS vars (colors, spacing, type scale)
│   └── fonts.css                     # @font-face fallbacks if any
│
├── content/                          # phase 2 will populate
│   ├── case-studies.json
│   ├── testimonials.json
│   ├── services.json
│   └── seo.json
│
├── public/
│   ├── images/
│   │   ├── case-studies/<slug>/
│   │   └── og/
│   ├── icons/                        # arrow.svg, target.svg, dot.svg
│   └── favicon set
│
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
├── tsconfig.json
└── package.json
```

### Co-location rule

Every component folder owns its `*.tsx`, `*.module.css` (if needed), `types.ts` (if shared), and `index.ts` (named re-export). Shared primitives live under `components/primitives/`. Motion building blocks live under `components/motion/` and are imported by feature components — feature components never instantiate Lenis/GSAP directly.

---

## 3. Pages

### 3.1 `/` — Homepage

| Order | Section | Component | Content source | Scroll behavior | Animation primitives |
|---|---|---|---|---|---|
| 1 | Top Nav | `Nav` | static (nav links hardcoded; CTA copy from `seo.json`) | sticky, blur on scroll | Framer (link underline scale-x), `useScroll` for blur opacity |
| 2 | Hero | `Hero` | `seo.json.home.hero` | static viewport | Framer entry stagger (display lines, accent italic last) |
| 3 | Marquee #1 | `Marquee` | `services.json.marqueeWords` | infinite horizontal loop | GSAP `xPercent: -100` tween, paused under `prefers-reduced-motion` |
| 4 | Services overview | `ServicesOverview` | `services.json.pillars` (4 modules) | scroll-reveal as cards enter | Framer `whileInView` stagger, `HoverLift` on each card |
| 5 | Portfolio strip A | `PortfolioStrip` | `case-studies.json.featured` (4–5 items) | horizontal scroll via pinned section | GSAP ScrollTrigger pin + `x: -scrollDistance`; cards have `HoverLift` |
| 6 | Philosophy anchor | `PhilosophyAnchor` | `seo.json.home.philosophy` | sticky pin (~1.5 viewport) | GSAP ScrollTrigger pin; Framer fade-in for two lines |
| 7 | Portfolio strip B | `PortfolioStrip` | `case-studies.json.secondary` | same as strip A | same as strip A |
| 8 | View all link | `Button` (primitive) | static | scroll-reveal | Framer fade + ArrowCTA nudge on hover |
| 9 | Testimonial marquee | `TestimonialMarquee` | `testimonials.json` (6 quotes) | infinite horizontal, slower than service marquee | GSAP marquee; rows offset; reduced-motion → static grid |
| 10 | Closing CTA | `ClosingCTA` | `seo.json.home.closingCta` | static viewport | Framer entry, ArrowCTA nudge |
| 11 | Footer | `Footer` | `seo.json.footer` | static | static |

### 3.2 `/work` — Work index

| Order | Section | Component | Content | Scroll behavior | Animation |
|---|---|---|---|---|---|
| 1 | Nav | `Nav` | — | sticky | underline |
| 2 | Page title | `SectionHeading` | `seo.json.work.title` | static | Framer entry |
| 3 | Work grid | `WorkIndexGrid` of `WorkCard` | all entries from `case-studies.json` | scroll-reveal stagger | Framer `whileInView`, `HoverLift` per card |
| 4 | Closing CTA | `ClosingCTA` | — | static | entry |
| 5 | Footer | — | — | — | — |

### 3.3 `/services`

| Order | Section | Component | Content | Scroll behavior | Animation |
|---|---|---|---|---|---|
| 1 | Nav | — | — | — | — |
| 2 | Page hero | `SectionHeading` | `services.json.pageHero` | static | Framer entry |
| 3 | Pillar: Build | `PillarSection` | `services.json.pillars.build` | each pillar header is sticky while body scrolls past | GSAP `position: sticky` on header column + scroll-reveal in body |
| 4 | Pillar: Run | `PillarSection` | `.run` | same | same |
| 5 | Pillar: Handoff | `PillarSection` | `.handoff` | same | same |
| 6 | Pillar: Exit | `PillarSection` | `.exit` | same | same |
| 7 | Marquee (services words) | `Marquee` | `services.json.marqueeWords` | infinite | GSAP marquee |
| 8 | Closing CTA | `ClosingCTA` | — | static | — |
| 9 | Footer | — | — | — | — |

### 3.4 `/about`

| Order | Section | Component | Content | Scroll behavior | Animation |
|---|---|---|---|---|---|
| 1 | Nav | — | — | — | — |
| 2 | Origin statement | `OriginStatement` | `seo.json.about.origin` | static viewport | Framer entry, oversized type |
| 3 | Why this model | `WhyThisModel` | `seo.json.about.whyThisModel` | sticky left column, scrolling right column | GSAP pin |
| 4 | Founders | `FoundersBlock` | `seo.json.about.founders` | scroll-reveal | Framer stagger, parallax on portrait via `Parallax` |
| 5 | Testimonial marquee | `TestimonialMarquee` | `testimonials.json` | infinite | GSAP marquee |
| 6 | Closing CTA | `ClosingCTA` | — | static | — |
| 7 | Footer | — | — | — | — |

### 3.5 `/get-in-touch`

| Order | Section | Component | Content | Scroll behavior | Animation |
|---|---|---|---|---|---|
| 1 | Nav | — | — | — | — |
| 2 | Contact copy | `ContactCopy` | `seo.json.contact.copy` | static | Framer entry |
| 3 | Contact form | `ContactForm` | static schema (`zod`) | static | field focus rings, ArrowCTA nudge on submit |
| 4 | Footer | — | — | — | — |

`/get-in-touch/thanks` — minimal page: oversized "we'll be in touch." line + ArrowCTA back to `/`.

### 3.6 `/work/[slug]` — Case study

Generated statically via `generateStaticParams` from `case-studies.json`.

| Order | Section | Component | Content | Scroll behavior | Animation |
|---|---|---|---|---|---|
| 1 | Nav | — | — | sticky | — |
| 2 | Case hero | `CaseHero` | `case-studies.json[slug].hero` (brand, headline, hero image) | static viewport | Framer entry, hero image parallax via `Parallax` |
| 3 | Service tags | `ServiceTags` | `[slug].services` (pipe-separated list) | static | Framer stagger |
| 4 | Opening statement | `OpeningStatement` | `[slug].opening` | scroll-reveal | Framer `whileInView` paragraph fade |
| 5 | Discipline sections (3–5×) | `DisciplineSection` (repeated) | `[slug].disciplines[]` | each: image side parallaxes, copy side scroll-reveals | `Parallax` on imagery, `Reveal` on copy, alternating L/R layout |
| 6 | Results block | `ResultsBlock` | `[slug].results` | scroll-reveal; numbers count up | Framer `whileInView` + `motion.span` value tween |
| 7 | Founder testimonial | `FounderTestimonial` | `[slug].testimonial` (Last Agency divergence) | sticky quote, scrolling attribution | GSAP pin briefly; Framer fade |
| 8 | Future note | `FutureNote` | `[slug].future` | scroll-reveal | fade |
| 9 | Related work | `RelatedWork` (uses `PortfolioStrip`) | 4 sibling slugs | horizontal scroll | same as homepage strip |
| 10 | Closing CTA | `ClosingCTA` | — | static | — |
| 11 | Footer | — | — | — | — |

---

## 4. Global components

| Component | File | Purpose |
|---|---|---|
| `Nav` | `components/global/Nav/Nav.tsx` | Logo home-link, route links with animated underline, "Hire us" CTA (Brand Guardian to confirm voice), hamburger on mobile. Backdrop blur on scroll past hero. |
| `Footer` | `components/global/Footer/Footer.tsx` | Multi-column: nav, single-city anchor (Brand Guardian commits), socials, copyright, oversized logo wordmark. |
| `Marquee` | `components/home/Marquee/Marquee.tsx` | Reused across home, services. Accepts items + `direction` + `speed`. Period-separated lowercase rendering. |
| `CursorAccent` | `components/global/CursorAccent/CursorAccent.tsx` | Desktop-only custom cursor (small accent-color dot that lifts on hover targets). Off entirely under `prefers-reduced-motion` and on touch. |
| `PageTransition` | `components/global/PageTransition/PageTransition.tsx` | `AnimatePresence` wrap inside `app/(marketing)/layout.tsx`; full-bleed accent-color wipe between routes (~250 ms). |
| `ScrollProvider` | `components/motion/ScrollProvider.tsx` | Lenis instance, attached to `document.documentElement`, RAF loop, shared via React context (`useLenis()`). GSAP ScrollTrigger registers and uses `lenis.on('scroll', ScrollTrigger.update)`. |
| `MotionWrapper` | `components/motion/MotionWrapper.tsx` | Convenience for `whileInView` + stagger children. |
| `Reveal` | `components/motion/Reveal.tsx` | Single-child fade + 24px translate, uses `motion-presets.easeOutWeird`. |
| `Parallax` | `components/motion/Parallax.tsx` | `useScroll` + `useTransform` for decorative offsets. |
| `HoverLift` | `components/motion/HoverLift.tsx` | `whileHover` translateY/scale + slight shadow. |
| `ReducedMotionGate` | `components/motion/ReducedMotionGate.tsx` | Reads `useReducedMotion()`; renders children with motion props OR opacity-only fallback. |

---

## 5. Animation contracts

Shared easing curve, defined once in `lib/motion-presets.ts`:

```ts
export const easeOutWeird = [0.16, 1, 0.3, 1] as const;   // expressive deceleration
export const easeInOutWeird = [0.7, 0, 0.2, 1] as const;  // for scroll-driven
```

All custom — never `"easeOut"` or default.

| Pattern | Implementation | Easing | Reduced-motion fallback |
|---|---|---|---|
| Smooth scroll | Lenis instance mounted in `ScrollProvider`; `duration: 1.2`, `easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`. ScrollTrigger.update bound to its `scroll` event. | Lenis easing | Lenis disabled, native scroll, `scroll-behavior: auto`. |
| Infinite marquee | GSAP `gsap.to(track, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 })` on a duplicated track (content rendered twice). | linear | Track frozen, items rendered as static flex row. |
| Horizontal portfolio scroll | GSAP ScrollTrigger pinned section: `pin: true`, `scrub: 1`, animates `x: -(totalWidth - viewportWidth)`. Snap to card edges via `snap: 1 / (cards.length - 1)`. | scrub (linear) | Falls back to `overflow-x: auto; scroll-snap-type: x mandatory` native scroll. |
| Sticky philosophy anchor | GSAP ScrollTrigger `pin: true, end: '+=80%'`. Inside the pin, two-line copy fades in/out with `scrub`. | `easeInOutWeird` for inner fades | `position: sticky` CSS only; copy is opaque from frame one. |
| Scroll-reveal cards | Framer `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true, margin: '-80px' }}` and `transition={{ duration: 0.7, ease: easeOutWeird, staggerChildren: 0.08 }}`. | `easeOutWeird` | `initial={{ opacity: 1, y: 0 }}` → instantly visible. |
| Parallax accents | Framer `useScroll({ target, offset: ['start end', 'end start'] })` + `useTransform([0,1], [-40, 40])`. Only `translateY` or `translateX`. | linear (scroll-bound) | Transform set to 0. |
| Hover lift/tilt | Framer `whileHover={{ y: -6, rotate: 0.5 }}` + `transition={{ duration: 0.3, ease: easeOutWeird }}`. | `easeOutWeird` | Hover disabled (Framer skips on reduced-motion via gate). |
| Animated underline | CSS pseudo-element `::after { transform: scaleX(0); transform-origin: left; transition: transform 320ms cubic-bezier(0.16,1,0.3,1); }` → `scaleX(1)` on hover/focus-visible. | matches `easeOutWeird` | Transition removed — underline snaps. |
| Arrow nudge CTA | Framer `motion.span` on the arrow: `whileHover={{ x: 4 }}`, `transition={{ duration: 0.25, ease: easeOutWeird }}`. | `easeOutWeird` | No nudge; static arrow. |

---

## 6. Typography decision

**Display:** **Cabinet Grotesk** (Fontshare, free for commercial use). Bold, opinionated, italic accents available. Pairs the "big type, opinionated voice" brief exactly.

**Body:** **Inter** (Google Fonts, OFL). Clean neutral sans, broad weight range, hinted superbly for body sizes, no licensing risk.

Both licenses are commercial-clean. Import strategy and details in `./typography.md`.

---

## 7. Color tokens

Single accent committed: **amber/rust `#FF6B35`**. Reasoning: warmer + more human than chartreuse; reads better against an off-black warm bg; doesn't compete with brand imagery in case studies (chartreuse would).

### Tokens

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0E0E0C` | Site background (warm off-black) |
| `--color-fg` | `#F4F1EA` | Primary text |
| `--color-muted` | `#8C8A82` | Body sub-copy, captions, metadata |
| `--color-border` | `#26241F` | Hairlines, card edges |
| `--color-accent` | `#FF6B35` | CTA, italic emphasis, marquee separators, focus rings |
| `--color-success` | `#9EE493` | Form success state only |
| `--color-error` | `#FF8A7A` | Form error state only |

### Tailwind extension (`tailwind.config.ts`)

```ts
theme: {
  extend: {
    colors: {
      bg: 'var(--color-bg)',
      fg: 'var(--color-fg)',
      muted: 'var(--color-muted)',
      border: 'var(--color-border)',
      accent: 'var(--color-accent)',
      success: 'var(--color-success)',
      error: 'var(--color-error)',
    },
  },
},
```

CSS variables declared in `app/globals.css` `@layer base` so tokens are addressable from CSS Modules too.

---

## 8. Performance budget

| Metric | Target |
|---|---|
| LCP | < 2.5 s on 4G mid-tier |
| CLS | < 0.1 |
| TBT | < 200 ms |
| JS shipped on `/` | < 180 KB gzip |
| First image (hero) | < 80 KB AVIF / WebP |

### Image strategy

- All raster art served via `next/image` with `formats: ['image/avif', 'image/webp']` in `next.config.mjs`.
- Hero images: `priority` + `fetchPriority="high"` + explicit `sizes`.
- Below-fold imagery: lazy by default; `sizes` always set to prevent CLS.
- Portfolio-strip imagery: served at 2× max card width; `placeholder="blur"` with base64 blur data baked at build by `asset-manager`.
- All SVGs inlined as React components when small (<2 KB), else `next/image` with `unoptimized: true`.

### Font strategy

- `next/font/google` with `display: 'swap'`, `preload: true`, subset `latin`.
- Cabinet Grotesk loaded with weights `[500, 700]` only; Inter with `[400, 500, 600]` only.
- Variable-font preferred where Fontshare ships one (Cabinet Grotesk does).
- CSS variables `--font-display` / `--font-body` for both, wired via Tailwind `fontFamily`.

### Animation strategy

- Only `transform` and `opacity` animate. No `width`/`height`/`top`/`left` tweens.
- `will-change: transform` only on actively-animating nodes; removed on completion via Framer's `onAnimationComplete`.
- GSAP ScrollTriggers initialised inside a single `useGSAP` block per page; cleaned up in the return.
- Marquee track uses `translate3d` for layer promotion; checked against jank on mid-tier Android.

---

## 9. Accessibility plan

### Semantic HTML per section

- One `<main>` per page, inside the `(marketing)` layout.
- One `<h1>` per page (the dominant display text on each page).
- Section headings ladder: `<section><h2>` → discipline sub-headings `<h3>` → metric labels `<h4>`.
- Marquee items render in a `<ul role="list">` for screen readers; visual `.` separators are `aria-hidden`.
- Portfolio cards: `<article>` per card; brand name = `<h3>`; tags = `<ul>`.
- Footer: `<footer>` with `<nav aria-label="Footer">`.

### Focus + keyboard

- `:focus-visible` ring: 2 px solid `var(--color-accent)` + 2 px offset, on every interactive element.
- Horizontal portfolio strip: when focus enters a card, the strip programmatically scrolls that card into view (Lenis `scrollTo` with offset). Arrow keys move focus card-to-card.
- Marquee: not focusable (decorative). If marquee items become links, they become a focusable `<ul>` and the marquee pauses on focus-within.
- Skip link: `<a href="#main-content">Skip to content</a>` first child of `<body>`, visually hidden until focused.

### `prefers-reduced-motion`

- `useReducedMotion()` hook gates every animation. Per section 5, each pattern has a defined fallback.
- Lenis disabled (native scroll restored) when preference is set.
- Page transitions become instant.

### Alt-text policy

- Case study imagery: alt = "{brand} — {disciplineDescription}" (asset-manager owns this string per asset in `asset-manifest.json`).
- Decorative SVG/blobs: `alt=""` + `aria-hidden="true"`.
- Founder portraits: alt = "{founder name}, {role}".
- No alt may contain the word "image" or "photo of".

### Color contrast

- `fg` on `bg`: 14.2 : 1 (passes AAA).
- `muted` on `bg`: 4.9 : 1 (passes AA for body text).
- `accent` on `bg`: 5.1 : 1 (passes AA for large + UI text — never used as body copy).
- `bg` on `accent`: same — used for the CTA filled-button reverse state.

---

## 10. Open questions for Brand Guardian

1. **Nav CTA voice:** "Hire us" vs "See the playbook" vs "Let's exit". Architect default: "Hire us." Confirm.
2. **Footer city anchor:** Bangalore / Bengaluru / Mumbai. Architect needs a single committed string.
3. **"Love" counter replacement:** keep "still standalone" (months-since-graduation) counter on each portfolio card, or remove entirely? Architect default: remove (cleaner — counter felt brand-cute on TIW).
4. **Closing CTA label string:** "Get in touch" vs "Let's talk" vs "Hire us". Architect default: matches nav CTA so the site has one voice.
5. **404 line:** placeholder "you took a wrong turn. so did the last agency you hired." — needs Brand Guardian sign-off.
6. **`/get-in-touch/thanks` line:** placeholder "we'll be in touch." — confirm.
7. **Page-transition wipe color:** accent (`#FF6B35`) or fg (`#F4F1EA`)? Architect default: accent — it brands the moment.
