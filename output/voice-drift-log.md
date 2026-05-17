# Voice Drift Log

> Patterns of brand-voice drift caught during audits. Maintained by Brand Guardian.
> Purpose: prevent recurrence in subsequent phases. Each entry: pattern + when caught + how to prevent.

---

## Phase 2 audit (2026-05-17)

### 1. Substring grep false-positives

**Caught:** Audit scan flagged "transform" inside `textTransform` (CSS), "ignite" inside `alignItems`, "DNA" inside `brandName`.

**Prevention:** Future banned-phrase audits should match on word boundaries (`\b<phrase>\b`) and exclude technical code blocks (```ts ... ```) from prose scans. The visible-copy audit should run on rendered text, not the raw source file.

**Severity:** Process, not content.

---

### 2. Hinglish / non-English sample brand names

**Caught:** Kachra Capital — Hindi for "trash/refuse" — sample brand name for a working-capital lender. Approved as a sample (cheeky-confident, parallel to real Indian fintech naming), but flagged for re-evaluation when the real client name back-substitutes.

**Prevention in Phase 3:** When real case-study data lands, the orchestrator should ask: does the actual brand name carry the same self-aware energy as the sample? If the real client is conservatively named, swap the sample-driven design accents (the all-caps geometric typographic variant currently mapped to this slug) so the visual treatment doesn't telegraph a different brand than the one named.

**Severity:** Watch — not a violation, but a back-substitution risk.

---

### 3. First-name-only Person schema entries

**Caught:** `seo.json` → `/about` → `AboutPage.mainEntity.founder` lists `{ "@type": "Person", "name": "Aman" }` and `{ "@type": "Person", "name": "Priya" }`.

**Prevention in Phase 3:** Architect must keep this field as a MANUAL-WORK substitution point. Real production schema should carry `name` (full name) + `jobTitle` per founder. Any `Person` schema block without a `jobTitle` triggers a Phase 3 brand-audit flag.

**Severity:** Schema completeness — flagged for MANUAL-WORK.

---

### 4. Placeholder URL convention

**Caught:** `seo.json` → `Organization.sameAs` uses `https://lastagency.com/_/social/{instagram,linkedin,twitter}` as placeholders.

**Decision:** Approved as a pattern. The `_/social/` segment is a clear, greppable substitution marker. Continue using `_/{thing}/` for any placeholder URL across Phase 3 work.

**Severity:** Pattern approved — no drift.

---

### 5. Exit-beat in body copy (not just testimonials)

**Caught:** Heading hierarchy carries the exit-beat per page, and case-study testimonials repeat the "trained us to fire them" beat in distinct phrasings. But the *body copy* on `/services` and `/about` is not yet written — Phase 3 will produce it.

**Prevention in Phase 3:** Architect must include at least one body-copy sentence per page that explicitly names the exit / handoff / playbook. The voice rule from brand-voice-guide §4: *"Treat the exit as the product. Mention handoff/playbook at least once per page."* This is a hard check in the Phase 3 audit — every page must show one body-copy reference beyond the heading.

**Severity:** Forward-looking — Phase 3 acceptance criterion.

---

### 6. SaaS-context dollar symbols vs. INR-context rupee symbols

**FYI only — not a violation.** Case studies use `$` for Mailweave (Berlin), Tilden Learn (Toronto), Ostara Market (London), and `₹` for Helio, Kachra, Verdant, Counterhouse, Mishti. Currency is correctly localized to the founder's market in each. Phase 3 Architect: preserve currency formatting verbatim — don't normalize.

---

## Phase 3 audit (2026-05-17)

### 7. Built-in CTA labels drifted from the approved CTA library

**Caught:** ContactForm submit label was `Send it over` (Architect-invented). WorkCard hover affordance was `read it →` (too cute, off-list).

**Prevention:** Architect must pull voiced CTAs from brand-voice-guide §5 CTA Library. Any new voiced CTA needs Brand Guardian approval before it ships. Fixed inline — submit became `Send. We reply Monday.`, hover became `see how we left →`.

**Severity:** 🟡 Needs revision — applied inline.

---

### 8. Philosophy anchor drifted from the canonical line

**Caught:** Both PhilosophyAnchor (home) and PhilosophyLine (/services) read `retainers are overrated. results aren't.` — a TIW-style mirror of "targeting is overrated." Voice guide §3 tone matrix and §8 hero example both lock the canonical anchor as `retainers are a tax on indecision.`

**Prevention:** Display copy on landmark anchors must match the voice guide example verbatim unless Brand Guardian signs off on a variant. Fixed inline in both files.

**Severity:** 🟡 Needs revision — applied inline.

---

### 9. Numeric inconsistency inside a single component

**Caught:** Homepage Services pillar 01 body said `Six months. Fixed scope.` while its own subhead said `months 0–3`. The /services Build pillar correctly says `Three months.` The homepage and the /services page were telling two different stories about the same phase.

**Prevention:** When the same phase appears on multiple surfaces, the months number must be derived from one source. Future Architect work that restates a duration should pull from a single constant rather than re-typing it. Fixed inline.

**Severity:** 🟡 Numeric drift — applied inline.

---

### 10. 404 line drifted from voice guide

**Caught:** not-found.tsx h1 was `we left, but not this page.` Voice guide §3 explicitly examples the 404 as `this page already graduated.` Architect notes confirmed two candidates were in play.

**Prevention:** When voice-guide §3 has a worked example for a surface, the build must use that exact phrasing. Fixed inline (h1 + page title).

**Severity:** 🟡 Surface drift — applied inline.

---

### 11. Brand-line vs visible-count mismatch

**Caught:** Brand voice canonical line is `fourteen exits. still running.` There are eight documented case studies. WorkGrid filter chip read `all eight`, which exposed the gap to the visitor on the same page that headlined "fourteen exits."

**Decision:** Keep the canonical brand line `fourteen` (the line implies cumulative graduates, not the count of full write-ups). Change the filter chip from a literal count to `all of them` so the surface stops contradicting the hero.

**Prevention:** When a brand-line implies a number, never re-state that number elsewhere on the same page as a literal count. Use category words ("all of them", "every industry") instead.

**Severity:** 🟡 Inconsistency — applied inline.

---

### 12. Item-count discipline on "what we don't do"

**Caught:** WhatWeDontDo had 8 list items (Architect flagged the upper end of the 6–8 range). The QBR-with-three-new-AMs line overlapped semantically with the monthly-status-call line — two ways of saying "no useless meetings."

**Prevention:** When lists hit the 8-item ceiling and two items share the same target, cut the weaker one. Trimmed to 7. Pattern: enforce "one item, one target" on display lists.

**Severity:** ✅ with a note — applied inline.

---

*End of voice drift log. Next update: post Phase 4 walkthrough.*
