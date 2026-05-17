# Last Agency — Manual Work to Take Live

This is the single document you read to take the site from **"demo with sample content"** to **"live, public, real-content production site."** Everything below was deferred during the build with good reason: it needs your judgment, your real data, or external accounts only you can create.

Built and signed off across 5 phases:
- ✅ Phase 1 — Reference, voice guide, architecture, asset spec
- ✅ Phase 2 — 8 case studies + 6 testimonials + SEO + code-generated brand assets (all sample, all marked `_isSample: true`)
- ✅ Phase 3 — Next.js 14 build, 18 routes, Brand Guardian gate passed clean
- ✅ Phase 4 — Reference parity, mobile, a11y, perf, SEO injection, founder walkthrough

The site builds clean (`npx tsc --noEmit && npm run lint && npm run build` all pass), all 18 routes render, and the brand voice is healthy on every visible surface.

---

## 🔴 Critical (blocks launch)

These items MUST be addressed before you ship the site publicly. They are the difference between "demo" and "real."

### Content replacement

- [ ] **Replace all 8 sample case studies** in [output/case-studies.json](case-studies.json)
  - Every record carries `_isSample: true` — flip to `false` once real. Or remove the field entirely.
  - Schema is documented in `.claude/agents/testimonial-manager.md` §Phase 2 deliverables.
  - Brand names, founder names, narratives, metrics, testimonial quotes — all sample. Replace with real.
  - Keep the structural fields intact: `slug`, `industry`, `services`, `narrative.{preEngagement, build, run, handoff, exit}`, `metrics`, `founder`, `testimonial`, `accentColor`, `handoffDate`.
  - **Voice check every new piece of content** against [output/brand-voice-guide.md](brand-voice-guide.md) and [output/banned-phrases.json](banned-phrases.json) before saving.

- [ ] **Replace all 6 marquee testimonials** in [output/testimonials.json](testimonials.json)
  - Same `_isSample: true` flip-or-remove pattern.
  - ≤30 words each.

- [ ] **Replace placeholder client logo styling** in [output/brand-styling.json](brand-styling.json)
  - One entry per case study slug. If a real client has a logo file you can ship, swap to a `<Image src="..." />` in the case study page; otherwise keep the typographic render.

- [ ] **Replace placeholder founder names** in About page
  - Currently `Aman` and `Priya` (first-name only). Visible in [website/src/components/sections/about/Founders.tsx](../website/src/components/sections/about/Founders.tsx) and in `seo.json` `/about` `AboutPage.founders` array.
  - Update both. Add surnames. Add `jobTitle` to the JSON-LD entry in [output/seo.json](seo.json).

### Assets (user-provided)

User-provided asset spec: [output/asset-spec.md](asset-spec.md). Drop files at the exact paths below. The site has graceful fallbacks for every missing file, so things won't crash — but the site looks demonstrably better with real assets.

**Brand assets (8 files):**
- [ ] [website/public/assets/brand/logo.svg](../website/public/assets/brand/logo.svg) — primary Last Agency wordmark, <10 KB
- [ ] [website/public/assets/brand/logo-mark.svg](../website/public/assets/brand/logo-mark.svg) — icon-only mark for favicon/mobile, <5 KB
- [ ] [website/public/assets/brand/hero-reel.mp4](../website/public/assets/brand/hero-reel.mp4) — 10–20s landing video, 1080p H.264, <15 MB
- [ ] [website/public/assets/brand/about-1.jpg](../website/public/assets/brand/about-1.jpg) — 1920×1280, <500 KB
- [ ] [website/public/assets/brand/about-2.jpg](../website/public/assets/brand/about-2.jpg) — 1920×1280, <500 KB
- [ ] [website/public/assets/brand/services-hero.jpg](../website/public/assets/brand/services-hero.jpg) — 1920×1280, <500 KB
- [ ] [website/public/assets/brand/contact-bg.jpg](../website/public/assets/brand/contact-bg.jpg) — 1920×1280, <500 KB
- [ ] [website/public/assets/brand/og-image.png](../website/public/assets/brand/og-image.png) — 1200×630, <300 KB

**Case study hero images (8 files):**
- [ ] `website/public/assets/case-studies/01-helio-coffee/hero.jpg`
- [ ] `website/public/assets/case-studies/02-mailweave/hero.jpg`
- [ ] `website/public/assets/case-studies/03-kachra-capital/hero.jpg`
- [ ] `website/public/assets/case-studies/04-verdant-ritual/hero.jpg`
- [ ] `website/public/assets/case-studies/05-counterhouse/hero.jpg`
- [ ] `website/public/assets/case-studies/06-mishti-co/hero.jpg`
- [ ] `website/public/assets/case-studies/07-tilden-learn/hero.jpg`
- [ ] `website/public/assets/case-studies/08-ostara-market/hero.jpg`

All 1600×1080, <400 KB, jpg.

Note: paths in [output/asset-manifest.json](asset-manifest.json) start with `./assets/`. The site maps these to `/assets/` under `public/`. If you change slugs in `case-studies.json`, also rename these directories or update the manifest paths.

### Typography swap

- [ ] **Cabinet Grotesk swap** (display font)
  - Currently using Space Grotesk (Google Fonts) as a temporary stand-in.
  - To swap: download Cabinet Grotesk woff2 files from [Fontshare](https://www.fontshare.com/fonts/cabinet-grotesk), drop into [website/public/fonts/](../website/public/fonts/), and update [website/src/app/fonts.ts](../website/src/app/fonts.ts) (single-file swap, instructions in-file).
  - The site is identical visually except for the display font character.

### Integrations

- [ ] **Contact form API handler**
  - Currently a stub at [website/src/app/api/contact/route.ts](../website/src/app/api/contact/route.ts) that logs and returns `{ok: true}`. Form submissions go nowhere.
  - Wire one of: [Resend](https://resend.com), [Loops](https://loops.so), a Slack webhook, a Notion database via the official SDK, or your CRM of choice.
  - Keep the `{ok: boolean}` contract — the client form expects it.
  - Read the honeypot field (`extra`) and reject if non-empty.

- [ ] **Email address placeholder**
  - `hello@lastagency.com` appears in:
    - [website/src/app/get-in-touch/thanks/page.tsx](../website/src/app/get-in-touch/thanks/page.tsx)
    - [website/src/components/layout/Footer.tsx](../website/src/components/layout/Footer.tsx)
    - [website/src/components/sections/home/ClosingCTA.tsx](../website/src/components/sections/home/ClosingCTA.tsx)
  - Replace with your real inbound email, then set up a real mailbox or forwarding rule.

- [ ] **Social URLs in footer + Organization schema**
  - Footer at [website/src/components/layout/Footer.tsx](../website/src/components/layout/Footer.tsx) uses `#instagram`, `#linkedin`, `#twitter` placeholders.
  - [output/seo.json](seo.json) `/` route `Organization.sameAs` array also has placeholders.
  - Replace with real URLs in both places, or remove the social column entirely if you're launching without socials.

### Deployment

- [ ] **Domain + DNS**
  - Buy `lastagency.com` (or your preferred TLD).
  - Point A/AAAA/CNAME records at your host.

- [ ] **Deployment target (recommended: Vercel)**
  - Push the repo to GitHub.
  - Connect Vercel to the repo, set the root directory to `./website/`.
  - Vercel auto-detects Next.js. No build command override needed.
  - Add the domain in Vercel → Settings → Domains.
  - **Important:** The current `@/lib/content` loader reads `../output/*.json` at build time. This works in Vercel because the entire repo is checked out. If you decide to extract `./output/` into its own package or split repos, the loader will need updating.

- [ ] **Environment variables**
  - The site reads zero env vars today. When you wire the contact handler, you'll add:
    - `RESEND_API_KEY` (or equivalent for your provider)
    - `CONTACT_INBOX_EMAIL`
    - Possibly `NEXT_PUBLIC_SITE_URL` if you start generating absolute URLs at runtime
  - Set these in Vercel → Settings → Environment Variables.

- [ ] **Analytics**
  - No analytics wired yet. Recommended: [Vercel Analytics](https://vercel.com/docs/analytics) (one-line addition to `layout.tsx`) or [Plausible](https://plausible.io) (privacy-friendly, ~1KB script).
  - If you add Google Tag Manager, do so in `layout.tsx` head — and remember to respect prefers-reduced-motion expectations and avoid CLS from late-injected scripts.

---

## 🟡 Recommended (do within first 2 weeks)

- [ ] **Replace code-generated `ResultChart` SVGs with real screenshots** once you have client permission. Currently each case study shows a stylized SVG dashboard rendering. Real dashboard screenshots (Meta Ads Manager, GA, Stripe) read more credibly.

- [ ] **Replace `FounderAvatar` initials with real founder photos.** Wire a `<Image>` element behind a feature flag — keep avatars as fallback for case studies where the founder doesn't want a photo on the public site.

- [ ] **Add real testimonial videos** for 2–3 marquee quotes. The marquee component will need a small upgrade to accept video items; the trade-off is that two video items on the homepage marquee buy more conversion than a hero reel does.

- [ ] **Google Search Console + sitemap submission**
  - Add the site, verify ownership.
  - Submit `https://lastagency.com/sitemap.xml`.
  - Set up a weekly review cadence for the first month.

- [ ] **Set up `@vercel/og` brand fonts**
  - Currently the dynamic OG image at `/work/[slug]/opengraph-image` uses the platform default sans.
  - To brand-correct: ship `Cabinet-Grotesk-Bold.ttf` (or your display font) and `Inter-Regular.ttf` to a public location and `fetch()` them in the OG handler. Spec lives in [output/og-template-spec.md](og-template-spec.md) §5.

- [ ] **OG runtime: `nodejs` → `edge`**
  - The OG route is currently `runtime: 'nodejs'` because `getCaseStudyBySlug` reads `output/*.json` via `node:fs` at request time.
  - To flip to `edge`: import the JSON directly (TS module import) instead of reading from disk, so the data is bundled at build time. Faster + edge-cached.

- [ ] **Run Lighthouse on the deployed site**
  - Static build audit predicts Perf ≥90 / A11y 95+ / SEO 100.
  - Once deployed, run Lighthouse against the live URL and adjust.

- [ ] **404 page polish**
  - Already in voice (`this page already graduated.`), but consider adding a search box or a list of the 8 most-visited case studies once you have traffic data.

- [ ] **Cookie banner (if you operate in EU)**
  - Not wired. Add a privacy-first banner only if you start serving non-essential cookies (analytics with PII, marketing pixels).

---

## 🟢 Optional (polish)

- [ ] Blog / insights section at `/notes` — a place for the playbook excerpts, retrospectives, the things that get founders to share the link.
- [ ] Team page at `/team` — only if you grow past 3 people.
- [ ] Press / awards section — only if you have something to put there.
- [ ] A/B testing on the hero CTA ("Hire us. Then unfollow us." vs. alternates).
- [ ] Localization (Hindi variant?) — interesting for Indian-market positioning, expensive to maintain.
- [ ] Calendly / scheduling on `/get-in-touch` — could reduce the form-fill funnel by half.
- [ ] Live chat — probably not. Doesn't fit the voice. We tell founders to write us a note, not pop a modal.
- [ ] A `/handoff` page surfacing a redacted playbook sample — Brand Guardian flagged this in the [founder walkthrough](founder-walkthrough.md) as the single highest-impact addition. Strong recommendation.
- [ ] Auto-resize testimonial marquee for longer quotes — current widths assume ≤30 word quotes.

---

## 📂 What's Real vs. What's Sample

| Real (ship-ready) | Sample (must replace) |
|---|---|
| Brand identity, name, tagline, central thesis | All 8 case studies (every field) |
| Voice guide + banned-phrases list | All 6 marquee testimonials |
| Site architecture + animation system | All client brand names + logo styling directions |
| All page layouts, navigation, footer | All founder names, roles, cities |
| All scroll behaviors (Lenis, marquee, horizontal scroll, sticky anchor, parallax) | All ResultChart metric data |
| SEO structure + JSON-LD schemas | Founder names in About page + AboutPage schema |
| Robots.txt + sitemap.xml | Social URLs (Instagram, LinkedIn, Twitter) |
| Code-generated SVG components (logos, avatars, charts) | Email `hello@lastagency.com` |
| Form validation + voice-clean error messages | Contact form API handler |
| 404 + thanks pages | Display font (Space Grotesk → Cabinet Grotesk) |
| Mobile responsive + accessibility (WCAG AA) | Hero reel video + all case-study hero photos + about photos |

---

## 🎙️ Brand Voice Governance (read before publishing anything)

The voice rules are non-negotiable. They are why this site reads differently from every other agency site.

**Master references** (in priority order):
1. [output/brand-voice-guide.md](brand-voice-guide.md) — the rubric. Tone matrix, do/don't with *why*, per-page concrete examples.
2. [output/banned-phrases.json](banned-phrases.json) — 70+ phrases. Grep against this before publishing any new content.
3. [output/voice-drift-log.md](voice-drift-log.md) — patterns we caught Architect/Testimonial Manager drifting toward. Don't repeat them.
4. [output/brand-audit-phase2.md](brand-audit-phase2.md) and [output/brand-audit-phase3.md](brand-audit-phase3.md) — precedent decisions you can cite later.

**Before publishing any new content** (blog post, social copy, new case study, new page, email reply, auto-responder):
1. Open the voice guide.
2. Draft the copy.
3. Grep the draft against banned-phrases.json.
4. Read the draft once at midnight in your own voice. Does it sound like *you*, or like an agency-deck-template?

**The two rules that prevent 80% of drift:**
- No agency clichés (elevate, unlock, synergy, drive growth, strategic partner, …).
- Every claim has a specific number behind it.

If you grow the team: every new writer reads the voice guide. Every new piece of copy goes through one round of voice review before publishing. Cheap insurance.

---

## 🚀 Deployment Checklist (Vercel — recommended)

```bash
# from repo root
git add .
git commit -m "ready to deploy"
git push origin main
```

1. In Vercel dashboard → Add New Project → import the GitHub repo.
2. **Root Directory:** `website/` (important — Vercel needs to know where `package.json` lives).
3. **Framework Preset:** Next.js (auto-detected).
4. **Build Command:** `next build` (default).
5. **Output Directory:** `.next` (default).
6. **Install Command:** `npm install` (default).
7. **Node.js Version:** 18.x or 20.x (either works).
8. Click **Deploy.**
9. After first deploy:
   - Settings → Domains → add `lastagency.com` and `www.lastagency.com` (set one as primary, redirect the other).
   - Settings → Environment Variables → add any new ones (when you wire the contact handler).
10. Verify:
    - All 13 sitemap routes return 200
    - `/sitemap.xml` and `/robots.txt` resolve
    - At least one `/work/<slug>/opengraph-image/<slug>` returns a PNG
    - `<title>` matches `seo.json` on every route (view-source)
    - Lighthouse Perf/A11y/BP/SEO each ≥90 on mobile

---

## 🔧 Maintenance Notes

### How to add a new case study

1. Append a new record to [output/case-studies.json](case-studies.json) following the existing schema. Pick a fresh `slug`, `accentColor`, `handoffDate`.
2. Append a matching record to [output/brand-styling.json](brand-styling.json) — pick a typographic variant.
3. Append a matching record to [output/asset-manifest.json](asset-manifest.json) — declare hero path, clientLogoProps, founderAvatarProps, resultChartData.
4. Add the case-study hero image at `website/public/assets/case-studies/<NN>-<slug>/hero.jpg`.
5. Append a per-route entry to [output/seo.json](seo.json) for `/work/<slug>` with title, description, OG, Article JSON-LD.
6. Run `npm run build` — the new slug auto-appears in `/work` grid, sitemap, related-work carousels, and gets its own pre-rendered page.
7. Grep your new copy against banned-phrases. Fix any hits.

### How to update testimonials

Edit [output/testimonials.json](testimonials.json). Each row is independent. Marquee picks them up at build time.

### How to swap fonts

1. Replace files in [website/public/fonts/](../website/public/fonts/).
2. Update [website/src/app/fonts.ts](../website/src/app/fonts.ts) — single source of font config.
3. If you're switching from Google to local or vice-versa, change the `next/font` import accordingly.
4. Tailwind picks up font families via CSS variables — no Tailwind config changes needed.

### How to change the color palette

1. Update Tailwind tokens in [website/tailwind.config.ts](../website/tailwind.config.ts).
2. Update matching CSS variables in [website/src/app/globals.css](../website/src/app/globals.css).
3. Search for hex literals if you remember any inline (most are tokenized).
4. **Re-run color contrast checks** for any new combination. Use a contrast checker. WCAG AA = 4.5:1 for normal text.

### Where brand voice guidelines live

All in [output/](.) — `brand-voice-guide.md`, `banned-phrases.json`, `voice-drift-log.md`. Ship them as living docs; every new team member reads them in their first week.

### How to run the site locally

```bash
cd website
npm install     # only first time
npm run dev     # → http://localhost:3000
```

### How to verify a deployment

```bash
cd website
npx tsc --noEmit
npm run lint
npm run build
```

All three should be clean. If anything fails, fix before deploying.

---

## 📋 Outputs Index — every file the build produced

In [output/](.):
- `manifest.json` — build state across all 5 phases
- `reference-analysis.md` — the visual contract (TIW site analysis)
- `site-architecture.md` — Architect's implementation blueprint
- `typography.md` — font decisions + import strategy
- `asset-spec.md` — the 15-file user-asset structure
- `asset-manifest.json` — runtime asset mapping (the Architect imports this)
- `asset-validation.md` — pre-launch asset audit
- `brand-voice-guide.md` — master voice reference
- `banned-phrases.json` — live exclusion list (70+ phrases)
- `voice-drift-log.md` — drift patterns to prevent
- `case-studies.json` — 8 sample case studies (replace before launch)
- `testimonials.json` — 6 sample marquee testimonials (replace before launch)
- `brand-styling.json` — typographic logo direction per case study
- `content-notes.md` — what's safe to ship vs. what's sample
- `seo.json` — per-route metadata + JSON-LD schemas
- `heading-hierarchy.md` — H1/H2/H3 plan per page
- `robots-and-sitemap.md` — robots.txt + sitemap strategy
- `og-template-spec.md` — @vercel/og template direction
- `brand-audit-phase2.md` — Phase 2 gate audit (38 ✅, 0 🟡, 0 🔴)
- `brand-audit-phase3.md` — Phase 3 gate audit (Pass with 10 inline fixes applied)
- `founder-walkthrough.md` — Brand Guardian's Phase 4 qualitative review
- `build-report.md` — final build report (routes, bundle sizes, perf, a11y, SEO)
- `MANUAL-WORK.md` — this file

In [website/](../website):
- The Next.js 14 App Router site. 18 routes pre-rendered. TS-strict, ESLint clean, Lighthouse-ready.

---

## TL;DR

You have a complete site. It's voice-correct, accessible, performant, and structurally faithful to the reference. What's missing is **your real content** (case studies, testimonials, assets), **your integrations** (contact handler, analytics, social URLs), and **the Cabinet Grotesk font files**. Everything else just needs deployment.

The critical-path items above are the only blockers between today and a public launch. The recommended items polish the experience. The optional items are growth moves.

Read the voice guide. Replace the sample content. Drop the assets. Deploy.

Then we leave. You own it.
