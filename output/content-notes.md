# Content Notes — Phase 2 Testimonial Manager Output

> Owner: Testimonial Manager. Version: 1.0. Last updated: 2026-05-17.

---

## What's safe to ship as-is

These pieces are tested against the brand voice guide and banned-phrases list and can ship into the build unchanged:

- **Narrative structure** in every case study (preEngagement / build / run / handoff / exit) — the 5-part shape is the brand's central beat and should be preserved verbatim when real data is back-substituted.
- **Voice and tone** across all 8 long-form testimonials and 6 marquee quotes — contractions, specific numbers, the "trained us to fire them" beat phrased differently each time.
- **Schema design** — every field name, every record key. The Architect should code against these field names exactly.
- **The `_isSample: true` flag** on every record. This is the audit hook.
- **`accentColor` palette** — 8 distinct warm-leaning hexes spread across amber, terracotta, rust, mustard, ochre, plum, olive, slate-blue. Compatible with the brand amber `#FF6B35`.
- **Typographic variant assignments** in `brand-styling.json` — 8 distinct variants, one per case study. The Asset Manager renders directly from these.
- **`handoffDate` field** in case-studies.json — the Architect uses this to compute the "months standalone" counter on portfolio cards.

---

## What MUST be replaced before launch

**Hard requirement: nothing in this file is real.** Every record carries `_isSample: true` so the user can locate and overwrite them programmatically.

Replace before launch:
- All 8 **brand names** in `case-studies.json` (Helio Coffee, Mailweave, Kachra Capital, Verdant Ritual, Counterhouse, Mishti Co, Tilden Learn, Ostara Market). These are plausible inventions, not real clients.
- All 6 **graduate brand names** in `testimonials.json` net-new entries (Forge & Foil, Petra Skincare, Saanjh Studio, Nordhaus Bikes) plus the 2 cross-references to case study brands.
- All 14 **founder names and roles** across both files. These are inventions.
- All **metrics** — every ROAS number, CAC reduction, revenue figure, time-to-handoff. They are plausible-shaped but unverified. The user must back-substitute the real engagement data.
- All **headlines** — the TIW-style "Scaling X to Y by doing Z" structure should be preserved, but the numbers in each headline are illustrative.
- All **founder photos** (the Asset Manager spec calls for these in the case study hero). Replace with real headshots before launch.
- All **narrative specifics** (named in-house hires like Riya, Vikram, Maya, Karthik, Tara, Ishani, Daniel, Esme — these are placeholders for the real person who absorbed the playbook).
- All **handoffDate** values — these drive the standalone-months counter, so the real dates must be correct or the counter will lie on the homepage.

---

## A note on the metrics

The headlines and metrics are **plausible-shaped, not real.** I generated them to give the design and the page templates something to bite into — the Architect needs to know the headline can be that long, the metric block can hold those numbers, the narrative can support that level of specificity.

The user must back-substitute real engagement data before launch. The shape of the data (ROAS / CAC reduction / revenue scale / time-to-in-house) is correct. The numbers themselves are illustrative.

If a real engagement doesn't produce a number that fits a slot, leave the slot blank — don't soften a real metric to fit the template.

---

## Recommended replacement workflow

When the user is ready to replace sample content with real client data:

1. **Audit pass** — `grep -r '"_isSample": true'` across `./output/` to enumerate every sample record. This file count should match exactly the number of sample records still in the codebase.
2. **One case study at a time.** Start with the engagement the user is most confident in. Replace `brandName`, `founder`, `metrics`, `narrative` fields, `testimonial`, `handoffDate`, and `_isSample` (flip to `false`). Keep `slug`, `services`, `accentColor` if they still fit; swap them if not.
3. **Re-grep against `banned-phrases.json`** on the new testimonial copy. The brand voice rules apply to real founder quotes too — request a lightly edited version from the founder if their natural quote contains agency clichés.
4. **Update `brand-styling.json` slug-by-slug** as case studies are replaced. The 8 typographic variants are assignable; the user can reshuffle them if a real brand name fits a different variant better.
5. **Re-check the standalone-months counter.** When a real `handoffDate` lands, eyeball the counter on the portfolio card to confirm the number reads correctly (and the "just shipped" fallback fires when the date is under 3 months old).
6. **Marquee testimonials last.** They're the shortest copy in the site but the most-read. Real founder voices are punchier than invented ones — when the real quotes land, they will likely shorten further.

---

*End of content notes.*
