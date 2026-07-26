# Content Writing Brief — Last Agency

Every writer agent reads this before writing a single page. Non-negotiable.

Site: https://lastagencyhere.com · Next.js 14 · India-first · en-IN

---

## 1. Where the file goes

One JSON file per page:

```
website/src/content/data/<type>/<slug>.json
```

`<type>` is one of: `answers`, `glossary`, `journal`, `compare`, `services`, `cost`,
`seo-agency`, `seo-for`. The filename **must** equal the `slug` field, and the `type`
field **must** equal the directory name. The build fails loudly otherwise — which is the
point.

**Reference exemplar — read it before you write anything:**
`website/src/content/data/answers/how-do-seo-agencies-work.json`

That file is the quality bar. Match its density, its specificity, and its willingness to
say something the client might not want to hear.

---

## 2. The exact JSON schema

```jsonc
{
  "slug": "…",                    // REQUIRED — matches filename, from the plan
  "type": "answers",              // REQUIRED — matches directory, from the plan
  "primaryKeyword": "…",          // REQUIRED — copy from the plan, unchanged
  "secondaryKeywords": ["…"],     // copy from the plan
  "cluster": "…",                 // REQUIRED — copy from the plan, unchanged
  "intent": "informational",      // informational|commercial|transactional|navigational
  "h1": "…",                      // REQUIRED — from the plan (you may polish the wording)
  "metaTitle": "…",               // REQUIRED — <= 60 chars. COUNT THEM.
  "metaDescription": "…",         // REQUIRED — 140-155 chars. COUNT THEM.
  "updated": "2026-07-26",        // REQUIRED — use exactly this date
  "published": "2026-07-26",      // use exactly this date

  "answer": "…",                  // REQUIRED — 40-60 words, see §4
  "takeaways": ["…"],             // 3-5 bullets, optional but strongly preferred

  "sections": [                   // REQUIRED — non-empty, see §5 for counts
    {
      "h2": "…",                  // REQUIRED per section
      "body": ["para", "para"],   // paragraphs
      "bullets": ["…"],           // optional
      "numbered": ["…"],          // optional
      "table": {                  // optional
        "caption": "…",
        "head": ["col", "col"],
        "rows": [["cell", "cell"]]
      },
      "callout": {                // optional
        "kind": "note",           // note | warn | stat
        "title": "…",
        "body": "…"
      },
      "subs": [                   // optional H3 blocks
        { "h3": "…", "body": ["…"], "bullets": ["…"] }
      ]
    }
  ],

  "faqs": [ { "q": "…", "a": "…" } ],   // 4-6 per page — these become FAQPage schema
  "related": [ { "type": "answers", "slug": "…" } ],  // 4-6, see §7

  // Type-specific — include ONLY the one that applies to your type:
  "term": "Canonical tag",              // glossary only
  "definition": "One sentence.",        // glossary only
  "versus": { "a": "SEO", "b": "PPC", "verdict": "One sentence." },  // compare only
  "city": { "name": "Bangalore", "region": "Karnataka", "country": "India" }, // seo-agency only
  "industry": "SaaS",                   // seo-for only
  "priceFrom": "From ₹75,000 / mo"      // services only
}
```

**Structural rules the build enforces — get these wrong and the site fails to compile:**

- `table` must have **both** `head` and `rows`. Every row must have **exactly** as many
  cells as `head` has columns. A ragged table fails the build.
- `callout` must have `body`.
- In `subs`, `body` is optional — `{ "h3": "…", "bullets": [...] }` is valid. `h3` is not
  optional.
- Every section needs `h2`.

**Inline markup allowed in any body/bullet/answer/faq string — and nothing else:**

- `[label](/internal-path)` — internal link
- `[label](https://example.com)` — external link
- `**bold**`
- `` `code` ``

No markdown headings, no raw HTML, no images. Rows in tables may use the same markup.

---

## 3. Word counts by type

| Type | Total words | Sections | Notes |
|---|---|---|---|
| `answers` | 900–1,400 | 5–7 | Answer-first. Depth over padding. |
| `glossary` | 500–800 | 3–5 | Definition, then why it matters, then how to check it. |
| `journal` | 1,600–2,500 | 6–9 | Long-form, opinionated, first-person plural. |
| `compare` | 1,000–1,500 | 5–7 | Must include a comparison table AND a verdict. |
| `services` | 900–1,300 | 5–7 | What's included, what it costs, what the guarantee covers. |
| `cost` | 900–1,300 | 5–7 | Must publish real INR numbers in a table. |
| `seo-agency` | 900–1,300 | 5–7 | Real local substance. See §8. |
| `seo-for` | 900–1,300 | 5–7 | Real industry substance. See §8. |

Do not pad to hit a number. A tight 950-word page beats a bloated 1,400-word one, and
Google has been demoting the bloated version since the helpful-content update.

---

## 4. The `answer` field

40–60 words. It opens the page inside a red-ruled box and it is what a featured snippet
or an AI answer will lift verbatim. Rules:

- **Answer the question in the first sentence.** No "In today's digital landscape".
- Self-contained: it must make sense with zero surrounding context.
- Concrete: a number, a range, or a named thing. Not "it depends on your goals".
- No CTA, no brand pitch. Earn the click by being right, not by teasing.

Good: *"An SEO agency audits your site, fixes what's blocking it technically, builds
content around the queries your buyers search, earns links to prove authority, then
reports on what moved. Most work on a monthly retainer of ₹25,000–₹3,00,000, and most
take three to six months to show real movement."*

Bad: *"SEO agencies offer a range of services designed to help businesses grow their
online presence. Read on to discover what they can do for you."*

---

## 5. Structure rules

- Every `h2` is a real sub-question or a real stage — never "Introduction", "Conclusion",
  "Final Thoughts", "Wrapping Up".
- At least one `table` on every `compare`, `cost` and `services` page. Tables earn
  featured snippets and they force you to be specific.
- At least one `callout` per page. Use `warn` for the thing that costs the reader money.
- Vary the shape between sibling pages. If every page in a cluster is six sections of
  three paragraphs each, the cluster reads as machine-made — because it is.

---

## 6. Voice — the part that gets pages rejected

From `output/brand-voice-guide.md`. Read that file too.

**Do:**
- Short declarative sentences. Founders skim.
- Contractions — we're, you'll, don't, it's.
- Specific numbers, in INR, with context. "₹75,000/mo" not "competitive pricing".
- Say the uncomfortable thing. "A retainer buys capacity, not outcomes."
- Address one founder, not "businesses" or "stakeholders".
- Land a joke, then back it with a reason.

**Never — these are hard-banned and a page containing them gets rewritten:**

> elevate · unlock · synergy · best-in-class · thought leadership · strategic partner ·
> drive growth · passionate team · holistic · end-to-end · full-service · world-class ·
> cutting-edge · results-driven · unleash · ignite · transform · revolutionize · empower ·
> leverage · "we believe" · "we are committed to" · "we pride ourselves on" ·
> "take to the next level" · "exceed expectations" · "significant growth" ·
> "meaningful impact" · "in today's digital landscape" · "journey" (figurative) ·
> "solutions" (as a noun) · "ecosystem" (non-biological) · "moving the needle" ·
> "low-hanging fruit" · "actionable insights" · "game-changer" · "dive in" · "delve"

Also banned: exclamation marks (one ironic per page, maximum), rhetorical-question
openers ("Ever wondered why…?"), and any sentence beginning "In conclusion".

**Two that keep slipping through — do not use them in any form:**

- **"highest-leverage" / "high-leverage"** — the ban on *leverage* covers the hyphenated
  adjective too. Write "highest-return", "the biggest lever", or just say what it does.
- **"unlock"** — including "budgets unlock", "unlocks growth". Write "opens", "releases",
  "frees up".

---

## 7. Internal linking — 4–6 `related` entries, and 2–4 inline links

- Inline links go in `body` strings using `[label](/path)`. Link to real routes only:
  `/`, `/seo`, `/social`, `/performance`, `/pricing`, and `/<type>/<slug>` for any page
  in the plan.
- **Descriptive anchor text.** `[what SEO costs in India](/cost/seo-cost-in-india)`, never
  "click here" or a bare URL.
- `related` should mix types — an answer page should point at a glossary term, a
  comparison and a cost page, not five other answer pages.
- It is fine to link to a page that hasn't been written yet, as long as it's in the plan.
  Dangling refs are dropped automatically at render time, so a link that never lands
  costs nothing.

---

## 8. Accuracy — the rule that matters most

**Never invent a fact, a statistic, a client, a case study or a testimonial.**

This site sells honesty as its differentiator. A fabricated stat is both a brand
contradiction and a legal risk, and it is the single fastest way to lose the E-E-A-T
argument you're trying to win.

- No made-up client names, results or quotes. Ever.
- No invented survey data, no "studies show" without a real, nameable study.
- Where a range is genuinely uncertain, say so and give the range with its reasoning.
- Industry mechanics you can state confidently (how crawling works, how auctions work,
  how retainers are structured) are fine — that's domain knowledge, not fabrication.
- Prices for **our own services** come from §9 and must match exactly.
- For `seo-agency` and `seo-for` pages: local and industry substance must be real
  (Bangalore genuinely is India's SaaS hub; dental clinics genuinely do live on the map
  pack). If you can't say something true and specific about a city or industry, write
  less rather than inventing more.

**The guarantee, stated correctly, every time:** we never promise a specific ranking
position for a specific keyword. We guarantee movement against the client's own baseline
— their trailing-90-day qualified leads from organic search, frozen on day one. Miss it
in 90 days and we keep working free until we beat it.

---

## 9. Our pricing — quote these exactly

| Service | Price |
|---|---|
| SEO | From ₹75,000/mo · smaller sites from ₹40,000/mo |
| Organic Social & Content | ₹30,000 / ₹50,000 / ₹70,000 per month |
| Performance Marketing | ₹40,000 / ₹75,000 / ₹1,50,000 per month |
| Bundle — Organic Growth Engine (SEO + Social) | ₹99,000/mo |
| Bundle — Full-Funnel Starter (Social + Performance) | ₹75,000/mo |
| Bundle — Own Everything Stack (all three) | ₹1,75,000/mo |

All ex-GST. Ad spend is billed separately with zero media markup. Month-to-month after
the first quarter, 30 days' notice, client keeps every asset.

---

## 10. Before you finish each file

1. `python3 -c "import json;json.load(open('<path>'))"` — it must parse.
2. `metaTitle` ≤ 60 characters. `metaDescription` between 140 and 155. Count them.
3. Scan your own copy for the §6 banned list.
4. Check the `angle` from the plan is actually what the page delivers. If you drifted,
   either rewrite to the angle or say so in your return message.
5. No fabricated facts. Re-read §8.
