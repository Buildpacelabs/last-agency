# Brand Audit — Phase 3

**Date:** 2026-05-17
**Outcome:** **Pass with revisions applied inline**
**Auditor:** Brand Guardian

---

## Summary

- Voice is healthy across every built surface. The brand's central tension (the exit is the product) is present on every page — usually twice: once in heading, once in body.
- All eight architect hand-off questions resolved. Eight inline edits applied across seven files. Type-check and lint both clean.
- Three additional drifts caught and fixed beyond the eight bracketed items: philosophy-anchor wording reverted to the canonical voice-guide line in two files, a numeric inconsistency inside Services pillar 01, and a filter-chip count that contradicted the hero brand-line.
- Zero hard-ban banned-phrase hits in visible copy. Soft-ban scan returned only false positives in code (CSS keywords, JSON field names, React event handler names).
- Founder names (Aman, Priya) stay visible. They are the brand's canonical first names — every CTA refers to "Aman or Priya replies." Removing them from the About page would orphan those references. Surname back-substitution remains a MANUAL-WORK item from Phase 2.

---

## Decisions made

1. **"fourteen exits" vs eight documented case studies** — Keep the canonical brand line `fourteen exits. still running.` in the /work hero per voice-guide §8. The line implies cumulative graduates, not the count of documented write-ups. To stop a single surface from contradicting itself, the WorkGrid filter chip was changed from a literal count (`all eight`) to the brand-shaped phrase (`all of them`). File: `src/components/sections/work/WorkGrid.tsx`.

2. **Founder names Aman / Priya in About** — Keep visible. They are referenced in contact CTAs ("Aman or Priya replies within one business day"), in `WhereToFindUs`, and in the seo.json `AboutPage.founder` schema. Surnames remain a MANUAL-WORK substitution per Phase 2 audit. No file change.

3. **404 canonical line** — Adopted voice-guide §3 example. Changed h1 from `we left, but not this page.` to `this page already graduated.` Also changed page metadata title to match. File: `src/app/not-found.tsx`.

4. **"Send it over" submit label** — Replaced with the voice-guide §8 example `Send. We reply Monday.` "Send it over" is voice-clean but not on the approved CTA list; the canonical phrasing both signals reply cadence and lands a beat. File: `src/components/sections/contact/ContactForm.tsx`.

5. **"what we don't do" — 8 items** — Trimmed the QBR-with-three-new-AMs line because it semantically duplicated the monthly-status-call line. Now 7 items, all distinct targets. File: `src/components/sections/about/WhatWeDontDo.tsx`.

6. **Card hover "read it →"** — Replaced with `see how we left →` from voice-guide §5 CTA library (item 6 — case study card CTA). The original was too cute and not on the approved list. File: `src/components/sections/work/WorkCard.tsx`.

7. **/work CTA "twelve months. then we're gone. that's the offer."** — Blessed. Lowercase, declarative, exit-beat, specific number, contracted. Voice-clean. No change.

8. **/work/[slug] CTA "same shape engagement. your name in this slot next."** — Blessed. Confident-contrarian. The slot framing reinforces the exit as the product. No change.

### Bonus edits applied (not from the eight, but caught in the walk)

9. **Homepage Services pillar 01 body** said `Six months. Fixed scope.` while its own subhead said `months 0–3`. The /services Build pillar correctly says `Three months.` Changed the homepage copy to match. File: `src/components/sections/home/Services.tsx`.

10. **Philosophy anchor headline** — Both the homepage `PhilosophyAnchor` and the /services `PhilosophyLine` read `retainers are overrated. results aren't.` That's a TIW-style mirror of "targeting is overrated." Voice-guide §3 and §8 lock the canonical anchor as `retainers are a tax on indecision.` Changed both files to the canonical line. Files: `src/components/sections/home/PhilosophyAnchor.tsx`, `src/components/sections/services/PhilosophyLine.tsx`.

---

## Surface-by-surface audit

### Layout / global

- `Nav.tsx` — ✅ "Last Agency" wordmark placeholder, lowercase link labels (work / services / about), `talk to us` accent-color voiced CTA. Mobile menu reads same labels. `aria-label="Last Agency — home"` voice-clean.
- `Footer.tsx` — ✅ Closing display line `your last agency. we mean that literally.` (italic accent on second half). Section labels (`site / office / elsewhere`) lowercase + quiet. `Bangalore` + `We answer email.` matches voice-guide §9.1. Email link in accent. Copyright is `©2026 Last Agency` — minimal, on-brand. Site links + social links lowercase. Social hrefs are MANUAL-WORK placeholders, flagged in code.

### Homepage

- Hero anchor lines — ✅ `a client trained their in-house team using our playbook. / then they stopped paying us. / we sent them a thank-you note.` Sets the central tension in three short beats. Last line in accent. Voice-perfect.
- Hero headline — ✅ `your last agency. we mean that literally.` (lowercase, italic accent on second half). Matches voice-guide §3 + §8 verbatim.
- Hero sub — ✅ Three lines, declarative, specific timeline `twelve to eighteen months`, ends `The exit is the product.`
- Hero CTA — ✅ `Hire us. Then unfollow us.` (voice-guide §5 item 1). Sub-line `fixed term. no auto-renew.`
- ServiceMarquee — ✅ Eight items, lowercase, no banned phrases. Mix of phase-words and category-words. Voice-clean.
- Services anchor + heading — ✅ `what we do` label, `four things. in order. then we go.` heading. Body explains fixed-term engagement + exit beat.
- Services pillar cards — ✅ All four lowercase headings with `01–04` accent numbers. Body copy concrete, specific, no agency clichés. **Fixed:** pillar 01 body now reads `Three months. Fixed scope.` (was `Six months.`).
- Services CTA — ✅ `See the four steps` with arrow, plus sub-line.
- PortfolioStrip A — ✅ Label `the work`, heading `the work. fourteen exits. still running.` Voice-matched.
- PortfolioStrip B — ✅ Label `more exits`, heading `more exits.`, trailing card `See every exit.` Trailing card sub-line uses `Watch us fire ourselves` (voice-guide §5 item 9).
- Per-card micro-copy — ✅ `Read the handoff` + arrow (PortfolioStrip card on home). `12 months standalone` counter formatted `{n} / months standalone`. `just / shipped` fallback for new exits matches voice-guide §9.2.
- PhilosophyAnchor — ✅ **Fixed:** now reads `retainers are a tax on indecision.` Body still names the fourteen-months math + the exit beat. CTA `See the four pillars` 🟡 — this is consistent with the visual pillar treatment on /services and reads voice-clean; it's an internal restatement of `See the four steps`, both acceptable variants per voice-guide §5 item 10.
- TestimonialMarquee — ✅ Label `what founders said on the way out`, heading repeats. Each card renders the testimonial verbatim from the Phase 2 testimonials.json (all already approved). No wrapping copy violates the voice.
- ClosingCTA — ✅ `time's a finite resource. so are we.` + Aman-or-Priya body line + `Hire us. Then unfollow us.` button + `hello@lastagency.com · Bangalore` muted sub. Matches voice-guide §8 example.

### Services page

- Hero — ✅ Label `• services`, h1 `four things. in order. then we go.`, body lines `Build the function. Run it for a year. Train your hire. Hand over the playbook. The exit is the product.` + `Fixed term. Fixed scope. No auto-renew.`
- PhilosophyLine — ✅ **Fixed:** `retainers are a tax on indecision.`
- PillarSection × 4 — ✅ All four headings lowercase + period (`the build. / the run. / the handoff. / the exit.`). Numbered `01–04` in accent. Months window subheads. Deliverable bullets concrete and specific. Handoff pillar gets the `emphasis="hero"` treatment + three sub-blocks (`the playbook / the hire / the shadow`). Exit pillar has two sub-blocks (`the bow-out / standby`). Voice consistent.
- PricingPosture — ✅ Anchor `• how we charge`, heading `fixed scope. fixed term. no surprises.` Body lines lock the engagement model. CTA `see if we fit`.
- ServicesClosingCta — ✅ `12 months. then we're gone.` heading + `Tell us what's bleeding...` body + `Talk to us` button.

### About page

- AboutHero — ✅ Label `• about`, h1 `we built an agency to fire ourselves.` Body lands the founder pain (board pushing for in-house) + the eighteen-month one-contract one-exit model + a humble close.
- WhyThisModel — ✅ Heading `why this model.` Four paragraphs of body copy, each landing a specific founder beat. The exit appears in the final paragraph (`we put the exit date in the contract`). Voice-clean.
- PhotoSplit — ✅ Two captions: `team review. friday afternoon. nobody is on slack.` and `the playbook draft. version six. printed and marked up.` Both lowercase, specific, concrete. Photos fall back to GradientBlob until asset-manager ships images.
- Founders — ✅ Heading `who we are.` Two founder blocks (Aman, Priya) with role + blurb. Decision: visible.
- WhatWeDontDo — ✅ **Fixed:** trimmed from 8 to 7 items. Heading `what we don't do.` All items lowercase + period, all start with `no`. Concrete and specific.
- WhereToFindUs — ✅ Label `• where to find us`, headline `Bangalore. we answer email.`, mailto link.
- AboutClosingCta — ✅ `you don't need another deck. you need the function to work by Q3.` + body + `Tell us what's bleeding` button. Matches voice-guide §2 example.

### Contact page

- ContactHero — ✅ Label `• talk to us`, h1 `hire us. then unfollow us.` (mirrors homepage hero — appropriate on the action page). Body: `We read every note. Expect a reply in one to two business days — usually less.` + `If we're not the right fit, we'll say so in forty-eight hours.`
- Form labels — ✅ `your name / company / email / where you're at right now / budget posture`. All lowercase, quiet, specific. Matches voice-guide §3 tone-matrix examples.
- Form placeholders — ✅ `Priya — Head of Growth`, `series-A consumer brand`, `you@yourbrand.com`, `monthly ad spend, what's working, what's broken, what your in-house plan looks like.` Voiced and specific.
- Select option labels — ✅ `pick one / we're scaling fast / tight runway / exploring / ready to hire`. Founder-shaped, not corporate.
- Inline errors — ✅ `name's required. / email's required. / that doesn't look like an email. / tell us more — at least a sentence. / something didn't take. try again, or email us directly.` All quiet, specific, lowercase, founder-tone.
- Submit button — ✅ **Fixed:** `Send. We reply Monday.` (was `Send it over`). `sending...` while pending.
- Honeypot — ✅ Visually hidden, `tabIndex={-1}`, `autoComplete="off"`, label `do not fill` is screen-reader-only — not a brand surface but voice-clean anyway.
- ContactPanel sidebar — ✅ Decorative, `aria-hidden="true"`, no copy concerns.

### Thanks page

- ✅ Title `noted. we'll be in touch.` Description `Your note's in our queue. We read everything. You'll hear back in one to two business days.` Heading `noted.` with the period in accent. Body `Your note's in our queue. We read everything... The reply comes from a founder. Not a chatbot. Not an intake form.` Email fallback. Two return CTAs: `read another case study` (primary) + `back to the homepage` (text link).

### 404

- ✅ **Fixed:** Title `this page already graduated.` h1 reads `this page already graduated.` Body `This URL doesn't exist. (We'd have documented the handoff if it did.)` Two CTAs: `back to the homepage` + `see the work`.

### Work index

- WorkHero — ✅ Label `• the work`, h1 `fourteen companies. fourteen exits. still running.` Body explains the corner-counter convention.
- WorkGrid filter chips — ✅ **Fixed:** first chip is `all of them` (was `all eight`). Industry chips render straight from case-study data.
- WorkCard — ✅ **Fixed:** hover affordance is `see how we left →` (was `read it →`). Title truncation handled. Founder name + city muted line. Standalone counter pill in corner. Service tags pipe-separated visually via flex chips.
- Empty state — ✅ `No graduates in that industry yet. Try another.` Voice-clean.
- WorkClosingCTA — ✅ Label `• the offer`, heading `twelve months. then we're gone. that's the offer.` Body Aman-or-Priya line. Two CTAs: `tell us what's bleeding` + `read the handoff`. **Blessed.**

### Case study template

- CaseStudyHero — ✅ Breadcrumb `work → {brand}`. Industry label. Brand display title (lowercase + period). Headline as sub. Services pipe-separated. Tinted hero block with `status` micro-counter pill (months standalone).
- CaseStudyNarrative — ✅ Label `what was bleeding` + pre-engagement narrative.
- CaseStudyChapter × 4 — ✅ `01 the build / 02 the run / 03 the handoff / 04 the exit` with months subheads. The handoff chapter uses `heavy` variant with pull-quote treatment (left border + italic + accent color). **Pull-quote on handoff: blessed** — it's the brand's hero pillar, the visual emphasis tracks the editorial weight.
- CaseStudyChart — ✅ Decorative; caption pulled from asset manifest.
- CaseStudyTestimonial — ✅ Wrapping copy `what {firstName} said` (lowercase). Big amber opening quote glyph. Long-form testimonial verbatim from case-studies.json. Founder avatar + name + role + brand + city. Voice-clean wrapper.
- CaseStudyMetricsGrid — ✅ Label `results, not prophecies` (matches voice-guide §8 case-study example). Heading `the numbers that stopped moving when we left.` Four metric tiles labelled `ROAS / CAC reduction / revenue scale / time to in-house`.
- RelatedWork — ✅ Heading `more graduates.` Renders four compact WorkCards.
- CaseStudyClosingCTA — ✅ Label `• the offer`, heading `same shape engagement. your name in this slot next.` Body. Two CTAs: `tell us what's bleeding` + `back to the work`. **Blessed.**

### Loading / empty states

- ✅ Work-grid empty state present and voiced. The build does not yet wire a global loading skeleton — Next 14 streams below-the-fold via Suspense by default, no loading surface exposed to the user. Fine for Phase 3.

### Page titles + meta descriptions

Cross-checked against banned-phrases. All clean.

- `/` title from seo.json `Last Agency — your last agency. we make ourselves redundant.` ✅
- `/work` title `Work — fourteen exits. still running standalone. | Last Agency` ✅
- `/services` title from seo.json `Services — four things. in order. then we go.` ✅
- `/about` title `About — we built an agency to fire ourselves. | Last Agency` ✅ (per Phase 2 audit)
- `/get-in-touch` title ✅ (per Phase 2 audit)
- `/get-in-touch/thanks` title **Fixed implicitly** — uses literal `noted. we'll be in touch.` Voice-clean.
- `/not-found` title **Fixed** — `this page already graduated.`
- 8 case-study titles — ✅ (per Phase 2 audit; all end "Then we left.")

---

## Banned-phrase scan

Programmatic grep over `src/**/*.{ts,tsx}` against the full banned-phrases.json list at hard-ban, soft-ban, and context-only severity. **Zero hits in visible copy.**

Apparent matches resolved as false positives:
- `transform` → `transition-transform`, `textTransform` (CSS / Tailwind classnames).
- `dynamic` → no match.
- `magic` → no match.
- `journey / ecosystem / DNA / ninja / rockstar / guru / wizard / stakeholders / solutions` — no matches.
- `Submit` → only as JS handler names `handleSubmit` and `onSubmit` (React event API). No visible "Submit" button label.
- `craft / curate / leverage / enable / optimize / maximize / trusted by / innovative / leading` — no visible-copy hits. `leading` appears only inside Tailwind line-height classnames (`leading-none`, `leading-tight`, `leading-[0.95]`).

---

## Micro-copy spot check

Every CTA label, error message, button label, and back-link in the build:

**CTAs (button text):**
- `Hire us. Then unfollow us.` (Hero, ClosingCTA) ✅ — voice-guide §5.1
- `See the four steps` (home Services) ✅ — §5.10
- `See the four pillars` (home PhilosophyAnchor) ✅ — variant of §5.10, voice-clean
- `Watch us fire ourselves` (PortfolioStripB trailing card) ✅ — §5.9
- `Read the handoff` (PortfolioStrip card label) ✅ — §5.7
- `see if we fit` (PricingPosture) ✅ — voiced, lowercase
- `Talk to us` (ServicesClosingCta) ✅ — §5.11
- `Tell us what's bleeding` (AboutClosingCta) ✅ — §5.5
- `Send. We reply Monday.` (ContactForm submit) ✅ — voice-guide §8 example
- `read another case study` (Thanks) ✅ — quiet voiced
- `back to the homepage` (Thanks + 404) ✅
- `back to the homepage` (404) ✅
- `see the work` (404 secondary) ✅
- `tell us what's bleeding` (WorkClosingCTA, CaseStudyClosingCTA) ✅
- `read the handoff` (WorkClosingCTA secondary) ✅ — §5.7
- `back to the work` (CaseStudyClosingCTA) ✅ — §5.15
- `see how we left →` (WorkCard hover) ✅ — §5.6
- `talk to us` (Nav + Footer) ✅ — §5.11

**Form placeholders / labels / errors:** all reviewed above under Contact page. All ✅.

**Empty / loading / error states:**
- Work-grid no-match: `No graduates in that industry yet. Try another.` ✅
- Contact form network error: `something didn't take. try again, or email us directly.` ✅
- Submit pending: `sending...` ✅ — quiet, lowercase

**Back-links:** `back to the homepage`, `back to the work`. Both ✅.

---

## Alt text + aria-label review

Sampled 10 strings:

1. `alt={asset?.alt ?? \`${study.brandName} — case study hero\`}` (PortfolioStrip) — ✅ descriptive, brand-shaped.
2. `alt={\`${caseStudy.brandName} — ${caseStudy.industry} brand hero\`}` (WorkCard) — ✅.
3. `alt={\`${caseStudy.brandName} — ${caseStudy.industry} hero image\`}` (CaseStudyHero) — ✅.
4. `alt=""` (ServicesHero / PhotoSplit / ContactPanel) — ✅ decorative-only images, correctly empty.
5. `aria-label="Last Agency — home"` (Nav logo link) — ✅ brand-shaped.
6. `aria-label="Primary"` (Nav nav) — ✅ standard.
7. `aria-label="Testimonials"` (TestimonialMarquee region) — ✅.
8. `aria-label="Filter case studies by industry"` (WorkGrid) — ✅ quiet, specific.
9. `aria-label={\`Read the ${caseStudy.brandName} case study\`}` (WorkCard overlay link) — ✅.
10. `aria-label={mobileOpen ? 'Close menu' : 'Open menu'}` (Nav mobile button) — ✅ quiet.

Plus: `aria-label="Exit icon"` (TargetIcon), `aria-label="Scroll down"` (ArrowDown), `aria-label="Arrow right"` (ArrowRight), `aria-label="Marquee"` (Marquee), `aria-label="What we do, at a glance"` (ServiceMarquee region), `aria-label="Breadcrumb"` (CaseStudyHero), `aria-label="Services delivered"` (WorkCard services chip list) — all voice-clean, all quiet, none clunky.

No screen-reader strings violate voice.

---

## Voice drift patterns observed

Six new patterns logged to `voice-drift-log.md`:

7. Architect-invented CTAs that bypass voice-guide §5 CTA library (Send it over, read it →) — fixed inline.
8. Philosophy anchor wording drifted from voice-guide canonical line — fixed in both files.
9. Same-phase numeric inconsistency across two surfaces (Build was "Six months" on home, "Three months" on /services) — fixed.
10. 404 line drifted from voice-guide §3 example — fixed.
11. Brand-line vs visible-count mismatch (`fourteen exits` hero next to `all eight` filter chip) — replaced literal count with category phrase.
12. List-discipline: 8-item lists with two semantically-overlapping entries — trimmed to 7.

---

## Files edited

- `src/app/not-found.tsx` — title + h1 + body
- `src/components/sections/contact/ContactForm.tsx` — submit label
- `src/components/sections/about/WhatWeDontDo.tsx` — list trimmed 8 → 7
- `src/components/sections/work/WorkCard.tsx` — hover affordance label
- `src/components/sections/work/WorkGrid.tsx` — first filter chip label
- `src/components/sections/home/Services.tsx` — pillar 01 body months number
- `src/components/sections/home/PhilosophyAnchor.tsx` — canonical philosophy line
- `src/components/sections/services/PhilosophyLine.tsx` — canonical philosophy line

Plus `output/voice-drift-log.md` (six new patterns) and `output/manifest.json` (phase advance + agent status).

Post-edit validation: `npx tsc --noEmit` → clean. `npm run lint` → "No ESLint warnings or errors."

---

## Counts

- ✅ surfaces: all surfaces audited; every one passes after inline fixes.
- 🟡 (with inline fix applied): 10 items (8 architect questions + 2 bonus voice drifts).
- 🔴 (blocking): 0.

---

## Sign-off

✅ **Phase 3 gate passes — Phase 4 may begin.**

No open blockers. Pending MANUAL-WORK items from Phase 2 still stand (founder surnames in AboutPage schema; social URL placeholders in Organization.sameAs; real client name back-substitution for any sample-based case study). None of those block Phase 4.

— Brand Guardian
