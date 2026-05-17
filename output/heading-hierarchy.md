# Heading Hierarchy — Last Agency

> Per-page semantic outline. One H1 per page. H2s/H3s show how each page reads at a heading-skim glance.
> Owner: SEO Manager. Voice reference: `./brand-voice-guide.md`.
> Architect implements as literal `<h1>` / `<h2>` / `<h3>` — copy is final unless Brand Guardian flags.

---

## / (homepage)

- **H1:** your last agency. we mean that literally.
  - **H2:** four things. in order. then we go. *(services overview anchor)*
    - **H3:** 01 — build the function
    - **H3:** 02 — run it for a year
    - **H3:** 03 — train your hire
    - **H3:** 04 — hand over the playbook
  - **H2:** the work. fourteen exits. still running. *(portfolio strip A)*
    - **H3:** Helio Coffee — 15 months standalone
    - **H3:** Mailweave — 14 months standalone
    - **H3:** Kachra Capital — 13 months standalone
    - **H3:** Verdant Ritual — 15 months standalone
  - **H2:** retainers are a tax on indecision. *(philosophy anchor)*
  - **H2:** more exits. *(portfolio strip B)*
    - **H3:** Counterhouse — 13 months standalone
    - **H3:** Mishti Co — 14 months standalone
    - **H3:** Tilden Learn — 14 months standalone
    - **H3:** Ostara Market — 15 months standalone
  - **H2:** what founders said on the way out. *(testimonial marquee)*
  - **H2:** time's a finite resource. so are we. *(closing CTA block)*

---

## /work

- **H1:** fourteen companies. fourteen exits. still running.
  - **H2:** the work *(filter + grid heading; visually hidden if needed but present in DOM)*
    - **H3:** Helio Coffee — D2C — 15 months standalone
    - **H3:** Mailweave — SaaS — 14 months standalone
    - **H3:** Kachra Capital — fintech — 13 months standalone
    - **H3:** Verdant Ritual — wellness — 15 months standalone
    - **H3:** Counterhouse — fashion — 13 months standalone
    - **H3:** Mishti Co — food — 14 months standalone
    - **H3:** Tilden Learn — edtech — 14 months standalone
    - **H3:** Ostara Market — marketplace — 15 months standalone
  - **H2:** time's a finite resource. so are we. *(closing CTA)*

---

## /services

- **H1:** four things. in order. then we go.
  - **H2:** 01 — build the function
    - **H3:** what we do in months zero to six
    - **H3:** what you sign for
    - **H3:** what you walk away with
  - **H2:** 02 — run it for a year
    - **H3:** what we do in months six to twelve
    - **H3:** the weekly cadence
    - **H3:** the monthly board doc
  - **H2:** 03 — train your hire
    - **H3:** the hire we make in month two
    - **H3:** shoulder-to-shoulder months
    - **H3:** the dry-run weeks
  - **H2:** 04 — hand over the playbook
    - **H3:** what's in the playbook
    - **H3:** the thirty-day post-exit window
    - **H3:** how we measure a clean exit
  - **H2:** fixed term. fixed scope. no auto-renew. *(price/terms anchor)*
  - **H2:** book the exit. *(closing CTA)*

---

## /about

- **H1:** we built an agency to fire ourselves.
  - **H2:** why this model
    - **H3:** the founder problem we kept watching
    - **H3:** the agency math that breaks
    - **H3:** what fixed-term changes
  - **H2:** who we are
    - **H3:** Aman — founder
    - **H3:** Priya — partner, head of accounts
    - **H3:** the rest of us *(team line)*
  - **H2:** twelve people. one office. one timezone. *(specifics anchor)*
  - **H2:** what founders said on the way out. *(testimonial marquee)*
  - **H2:** read the handoff. *(closing CTA → /services)*

---

## /get-in-touch

- **H1:** tell us what's bleeding.
  - **H2:** how this works
    - **H3:** we reply within one business day
    - **H3:** if we're not the fit, we say so in forty-eight hours
    - **H3:** no chatbot. Aman or Priya answers.
  - **H2:** the form *(visually hidden heading for screen readers)*
    - **H3:** your name
    - **H3:** your company
    - **H3:** what's bleeding
    - **H3:** when did it start

---

## /get-in-touch/thanks

- **H1:** got it. we'll be in touch.
  - **H2:** what happens next
    - **H3:** Aman replies within one business day
    - **H3:** if we're not the right fit, we'll say so in forty-eight hours

---

## /work/[slug] — Case study (template, instantiated 8×)

- **H1:** {brandName}. {months} months. {headlineMetric}. then we left.
  *(e.g. "Helio Coffee. 15 months. 4.3x ROAS. Then we left.")*
  - **H2:** what was bleeding *(opening / pre-engagement)*
  - **H2:** the build *(months 0–3)*
    - **H3:** what we tore down
    - **H3:** what we built
    - **H3:** who we hired inside
  - **H2:** the run *(months 3–12)*
    - **H3:** the weekly numbers
    - **H3:** what changed mid-engagement
  - **H2:** the handoff *(months 12–15)*
    - **H3:** who we trained
    - **H3:** what's in the playbook
  - **H2:** the exit *(month 15+)*
    - **H3:** what they own now
    - **H3:** what they've shipped without us
  - **H2:** RESULTS, NOT PROPHECIES *(all-caps section anchor)*
    - **H3:** ROAS / payback / CAC headline number
    - **H3:** revenue / volume movement
    - **H3:** months to in-house
  - **H2:** what {founderName} said
  - **H2:** the work since *(future / closing)*
  - **H2:** other exits *(related work strip)*
    - **H3:** {related-1}
    - **H3:** {related-2}
    - **H3:** {related-3}
    - **H3:** {related-4}
  - **H2:** back to the work. *(closing nav CTA)*

---

## 404 — `/_not-found`

- **H1:** this page already graduated.
  - **H2:** where to go now
    - **H3:** the work
    - **H3:** the services
    - **H3:** talk to us

---

## Rules baked into this outline

1. **One `<h1>` per page.** Every other display-sized chunk is `<h2>` (section) or `<h3>` (sub-section).
2. **Anchor copy and philosophy lines are headings, not paragraphs.** "Retainers are a tax on indecision." sits on the philosophy anchor as a `<h2>` for screen-reader signal and SEO weight.
3. **Marquee items are not headings** — they're `<ul role="list">` per the Architect's accessibility plan.
4. **Service-tag chips on case studies are not headings** — they're a `<ul>`.
5. **Visually-hidden headings exist where the visual design omits them but the DOM still needs structure** (e.g. `/get-in-touch` form `<h2>`).
6. **Case-study H1 always names the brand, the months, and the headline metric.** This is the SEO + voice contract per case-study spec in `seo.json`.

---

## Keyword brief (10–15) — mirrors `seo.json._keywords`

These should appear naturally — never stuffed — across the homepage hero/sub-hero, the services pillar bodies, and the about page.

**Founder-intent (high volume, commercial):**
1. performance marketing agency for startups
2. Meta ads agency India
3. paid media agency Bangalore
4. Series A growth agency
5. ROAS optimization agency

**Contrarian angle (low volume, brand-defining):**
6. agency exit playbook
7. in-house performance marketing handoff
8. fixed-term growth agency
9. fire-yourself agency model
10. contrarian marketing agency

**Service-specific (mid volume, intent-rich):**
11. growth function setup
12. marketing playbook handover
13. creative pipeline scaling
14. lifecycle marketing agency
15. brand and performance agency India

**Where each cluster lands:**
- 1–5 → homepage hero sub-copy, /services pillar intros, `/about` first paragraph
- 6–10 → /about thesis section, homepage philosophy anchor, /services "fixed term" anchor
- 11–15 → /services individual pillar bodies, /work index intro, case-study opening statements

Brand Guardian: any of these phrases reads like a stuff to you, flag it. The default is *natural prose first, keyword second.*
