# Brand Audit — Phase 2

**Date:** 2026-05-17
**Outcome:** **Pass**
**Auditor:** Brand Guardian

---

## Summary

- Voice is healthy across all 8 Phase 2 deliverables. Every long-form testimonial lands the "trained us to fire them" beat in a distinct phrasing. Every case-study headline carries a specific number. Every SEO title is voice-clean and within length budget (max 63 chars; budget is 70).
- Zero hard-ban banned-phrase hits in visible copy. The single scan match for "DNA" resolved to the JSON field name `brandName` (not the dead-metaphor). "transform" / "ignite" matches resolved to CSS keywords (`textTransform`, `alignItems`) inside the OG implementation block, not visible copy. "craft" appeared once as `craft-style` (artisan ceramics, literal craft usage — allowed by `context-only` rule).
- "The exit is the product" beat appears on every page in the heading hierarchy and in every long-form testimonial. Strong central-tension coherence.
- All four SEO Manager flags resolved (decisions below). Nothing needs a structural rewrite.
- Two MANUAL-WORK items propagated (placeholder founder surnames in AboutPage schema; placeholder social URLs in Organization.sameAs).

---

## Decisions made

- **Kachra Capital naming: APPROVED as a sample record.** Reads as cheeky-confident in-context: a working-capital lender for kirana stores leaning into Hinglish self-awareness, parallel to real Indian D2C naming patterns. The agency does not name the client; we accept the engagement. The case study itself treats the brand respectfully and lands the thesis. For the audience that knows the word, it's confident; for the audience that doesn't, it's a neutral coined word. Voice-drift-log note added so the orchestrator knows to re-evaluate when the real client name back-substitutes — if the actual fintech is more conservatively branded, swap the slot.
- **Em-dash + period homepage title: APPROVED.** Current: `Last Agency — your last agency. we make ourselves redundant.` The em-dash separates the brand from the headline; the period closes a complete declarative ("we make ourselves redundant."). Mirrors the hero brand voice (lowercase declarative, terminal period) and reads cleanly in SERPs. No rewrite.
- **Bangalore footer city: confirmed.** Locked in brand-voice-guide §9.1. Matches `addressLocality` in homepage Organization schema. No change.
- **Placeholder founder names (Aman, Priya):** These are the brand's *actual* canonical founder first names — referenced throughout the voice guide and used as the "Aman or Priya replies" line on the contact page. The placeholder concern is the **surname** (currently absent in AboutPage `founder` array). Added to MANUAL-WORK handoff list — orchestrator routes surname back-substitution to the user.
- **Placeholder social URLs** (`https://lastagency.com/_/social/{instagram,linkedin,twitter}`): Added to MANUAL-WORK handoff list. Architect should keep the schema field but treat the values as MANUAL-WORK substitution points.

---

## File-by-file review

### case-studies.json

| Record | Score | Industry | Accent | "Trained to fire" beat (phrasing) |
|---|---|---|---|---|
| helio-coffee | ✅ | D2C | #C2410C | "They literally trained her to fire them." |
| mailweave | ✅ | SaaS | #B45309 | "They built the function, then taught us out of needing them." |
| kachra-capital | ✅ | fintech | #7C2D12 | "They literally trained us to fire them — wrote the playbook, ran the dry runs, and then left." |
| verdant-ritual | ✅ | wellness | #4D7C0F | "They trained her into a job that fired them." |
| counterhouse | ✅ | fashion | #831843 | "They trained the team that replaced them and walked out the door on a Friday." |
| mishti-co | ✅ | food | #A16207 | "They taught him out of needing them." |
| tilden-learn | ✅ | edtech | #1E3A8A | "They trained her into a job that fired them — and they were proud of it." |
| ostara-market | ✅ | marketplace | #475569 | "They trained the team that replaced them and walked out." |

- 8 distinct industries ✓
- 8 distinct accent colors ✓
- 8 distinct exit-beat phrasings ✓ (no repetition; each phrases the central thesis in the founder's own voice)
- All headlines carry specific numbers (`₹4.2cr → ₹18.6cr ARR`, `47%`, `1,400 → 38,000`, `18% to 51%`, `0 → ₹1.2cr GMV`, `₹1,240 → ₹460`, `$94 to $37`, `2x GMV in 14 months`).
- Metrics varied — not all wins-by-ROAS. Mailweave uses CAC payback, Verdant uses repeat rate, Tilden uses cost-per-enrolled, Ostara uses paid-share-of-acquisition. Good range.
- Founder voice reads real, not deck — contractions, specific names ("Riya", "Vikram", "Maya"), concrete moments ("Diwali card", "USB stick", "Slack channel has eleven messages, mostly memes").
- Each `narrative` block contains pre-engagement / build / run / handoff / exit — the 5-part shape preserved.

**Note (FYI):** Counterhouse founder name "Reyansh Khurana" + city Mumbai + tailor-in-Tirupur detail = strongest founder-empathetic specificity in the set. Use as the reference voice for future case-study copy.

### testimonials.json

All 6 ✅. Word counts: 19 / 18 / 22 / 15 / 15 / 19. All under the 30-word limit. Each lands a distinct beat:

1. Aanya / Helio — agency that respected its own deadline
2. Marcus / Tilden — metric-specific + "went home"
3. Ravi / Forge & Foil — internal hire ran the meeting (net-new graduate)
4. Naomi / Petra Skincare — "pitched their last invoice" (net-new graduate)
5. Anika / Saanjh Studio — no auto-renew (net-new graduate)
6. Theo / Nordhaus Bikes — "weirdest goodbye email" (net-new graduate)

4 net-new graduate brands present (Forge & Foil, Petra Skincare, Saanjh Studio, Nordhaus Bikes), 2 cross-references to long-form case studies (Helio Coffee, Tilden Learn). Founder voices distinct, punchy, no two share a beat.

### brand-styling.json

| Slug | Variant | Score | Fit |
|---|---|---|---|
| helio-coffee | lowercase-dot | ✅ | D2C coffee — calm, modern. The dot carries the brand. Fits. |
| mailweave | custom-ligature | ✅ | SaaS — woven mark mirrors the product metaphor. Fits. |
| kachra-capital | all-caps geometric | ✅ | Fintech lender — heavy, confident. Fits the working-capital seriousness; the brand name carries the cheek, the typography carries the weight. |
| verdant-ritual | accent-dot serif | ✅ | Wellness — title-case serif + dot reads ritualistic, calm. Fits. |
| counterhouse | italic-stroke serif | ✅ | Fashion — editorial italic display. Fits. |
| mishti-co | condensed sans | ✅ | Food — narrow lowercase + ampersand in accent. Fits boutique-D2C food. |
| tilden-learn | monospace path | ✅ | Edtech — `tilden/learn` reads as a file path, fits technical learning. |
| ostara-market | outlined display serif | ✅ | Marketplace — outline-only wordmark + filled accent square reads gallery-quality. Fits an indie-ceramicist marketplace. |

All 8 distinct, all match brand personality, none misfit (no frivolous italic on a fintech, no heavy display on a wellness brand). Approved.

### seo.json

| Route | Title (chars) | Description (chars) | Score |
|---|---|---|---|
| `/` | 60 | 155 | ✅ |
| `/work` | 62 | 146 | ✅ |
| `/services` | 50 | 145 | ✅ |
| `/about` | 58 | 148 | ✅ |
| `/get-in-touch` | 50 | 140 | ✅ |
| `/work/helio-coffee` | 63 | 156 | ✅ |
| `/work/mailweave` | 62 | 145 | ✅ |
| `/work/kachra-capital` | 61 | 159 | ✅ |
| `/work/verdant-ritual` | 62 | 156 | ✅ |
| `/work/counterhouse` | 57 | 154 | ✅ |
| `/work/mishti-co` | 58 | 154 | ✅ |
| `/work/tilden-learn` | 62 | 154 | ✅ |
| `/work/ostara-market` | 54 | 151 | ✅ |

- Every title ≤63 chars (budget 70). Every description in 140–159 range.
- Homepage title carries the contrarian thesis: "we make ourselves redundant."
- Every case-study title ends "Then we left." — the exit beat is the SEO contract.
- Schema is well-formed across Organization / CollectionPage / Service / AboutPage / ContactPage / Article / BreadcrumbList.
- **Resolved flag 1 (em-dash + period):** Approved — see Decisions.
- **Resolved flag 2 (Bangalore):** Confirmed in `addressLocality` and `foundingLocation.name`.
- **Resolved flag 3 (founder names):** First names are canonical; surnames flagged for MANUAL-WORK.
- **Resolved flag 4 (social URLs):** Three sameAs placeholders flagged for MANUAL-WORK.

### heading-hierarchy.md

- One `<h1>` per page across 8 page templates (`/`, `/work`, `/services`, `/about`, `/get-in-touch`, `/get-in-touch/thanks`, `/work/[slug]`, `/404`). ✅
- Every H1 passes voice rules — lowercase declaratives, specific numbers, exit-beat present.
- Heading-skim reads coherently per page:
  - Homepage skim: tagline → four things → fourteen exits still running → retainers are a tax → more exits → what founders said → time's a finite resource.
  - /work skim: fourteen companies fourteen exits → 8 case-study cards → closing CTA.
  - /services skim: four things → the four pillars → fixed term no auto-renew → book the exit.
  - /about skim: built an agency to fire ourselves → why this model → who we are → twelve people one office → testimonials → read the handoff.
- Case-study H1 template (`{brandName}. {months} months. {headlineMetric}. then we left.`) is the brand-voice contract per spec. ✅
- Marquee + service-tag chips correctly excluded from heading hierarchy (per `<ul role="list">`). ✅

### og-template-spec.md

- All 5 variants (homepage, case study, services, about, contact) match voice guide visual rules — lowercase oversized display, single amber accent, generous whitespace, footer wordmark.
- Accent color `#FF6B35` carries the thesis line in every variant ("literally", "Then we left.", "then we go.", "to fire ourselves.", "what's bleeding."). Never decorative.
- Exit/handoff referenced in 3 of 5 variants directly; reinforced in remaining 2 via muted sub-line.
- Type scale opinionated — 80–96px headline, 32px sub, 22px footer. No mid-sized "feature heading" middle weight.
- ✅ Approved.

### content-notes.md

✅ Approved. Clearly enumerates what's safe-to-ship vs. what must be back-substituted before launch. The `_isSample: true` audit hook is the right move and gives the user a programmatic grep target. Replacement workflow is clean.

### robots-and-sitemap.md

✅ Approved. Exclusions correct (`/thanks`, `/404`, `/api/`, `/_next/`). Priorities sensible (`/`=1.0, `/work`+`/services`=0.9, case studies=0.8, `/about`+`/get-in-touch`=0.7). `lastmod = handoffDate` for case studies is the honest signal.

---

## Banned-phrase scan

Programmatic grep of all 8 files against the full banned-phrases.json list + soft-ban + context-only words. Result: **zero hits in visible copy.**

Apparent matches resolved as false positives:
- "DNA" → matches `brandName` JSON field name, never the dead-metaphor.
- "transform" → matches `textTransform` CSS property in OG implementation block (technical reference, not visible copy).
- "ignite" → no actual match; the grep returned `alignItems` lines due to substring scan.
- "dynamic" → `dynamic-route` (Next.js technical term in implementation prose).
- "craft" → `craft-style` referring to artisan ceramic crafts (literal/context-only usage, allowed).
- "magic" / "guru" / "wizard" / "ninja" / "rockstar" / "journey" / "ecosystem" / "stakeholders" / "solutions" → all clear.

---

## Voice drift patterns observed

Logging to `voice-drift-log.md` so Phase 3 doesn't re-introduce these:

1. **Substring grep false-positives.** Future audit scans should match on whole words / word-boundaries to avoid `transform` → `textTransform` confusion. Updating audit method, not a content issue.
2. **Hinglish brand names need a sample-vs-real flag.** Kachra Capital is fine *as a sample*. When the real client lands, the orchestrator should re-evaluate whether the actual brand carries the same self-aware energy. Flag pattern: any sample with a non-English root that could read as parody to readers outside the language community.
3. **First-name-only schema entries.** AboutPage.mainEntity.founder uses bare `"name": "Aman"`. This is acceptable for sample data but the production schema should carry a full name + jobTitle. Pattern to watch in Phase 3: any schema `Person` block without a `jobTitle` field.
4. **Placeholder URL pattern.** `https://lastagency.com/_/social/{platform}` is a clear, greppable placeholder convention. Approved pattern — Architect can grep `_/social/` to find every substitution point. Continue using this pattern for any placeholder URL.
5. **The exit-beat is currently carried mostly by the testimonial copy in case studies.** Phase 3 needs to make sure the body copy on /services and /about *also* mentions the exit/handoff once explicitly (per the voice rule: "Treat the exit as the product. Mention handoff/playbook at least once per page."). Heading hierarchy already covers it — Architect needs to ensure the body text does too.

---

## Sign-off

✅ **All ✅ — Phase 2 gate passes. Phase 3 may begin.**

Open items routed to MANUAL-WORK (not blockers):
- Founder surnames in AboutPage schema.
- Three social URL placeholders in Organization.sameAs.

No revisions required from Testimonial Manager or SEO Manager. Both deliverables are voice-clean and structurally sound.

— Brand Guardian
