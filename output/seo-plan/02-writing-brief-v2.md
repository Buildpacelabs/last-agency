# Writing brief — batch 2 (the 100 scheduled pages)

Read `01-writing-brief.md` first. Everything in it still applies: voice, structure, the banned
phrase list, our real pricing, the accuracy rules. This document only covers what is **different**
about this batch.

---

## 1. The reference page

`website/src/content/data/answers/how-do-seo-agencies-work.json` remains the quality bar for
structure. For the new standard on evidence, read
`website/src/content/data/glossary/core-web-vitals.json` — note the `sources` array and the single
inline citation in the body.

---

## 2. Carry the schedule over unchanged

Each spec in `plan-v2-100.json` has a `published` date. **Copy it exactly.** Set `updated` to the
same value.

These dates are a real publication schedule, not decoration. The loader withholds any page whose
`published` date has not arrived: it does not render, does not enter the sitemap, and returns 404.
It goes live on its date, when a scheduled build picks it up.

This exists because all 500 existing pages carry one publish date, which on a young domain reads
as bulk generation. Do not "helpfully" set these to today.

---

## 3. Never link forward in time

**A page may only link to pages that publish on or before its own date.** A link to a
later-publishing page is a 404 until that date arrives, and the validator fails the build on it.

In practice:

- Linking to any of the original 500 pages is always safe — they are all live.
- Linking to another page in *this* batch is only safe if its `published` date is earlier than or
  equal to yours. Check `plan-v2-100.json`.
- `related` refs to later pages are tolerated — the resolver drops them until they exist — but
  they waste a slot, so prefer refs that resolve.

---

## 4. Sources are required on this batch

Every page needs a `sources` array of **3–6 primary sources**, placed after `faqs` and before
`related`:

```json
"sources": [
  {
    "title": "The document's own title, exactly",
    "publisher": "Google Search Central",
    "url": "https://developers.google.com/search/docs/...",
    "date": "2025-06-11"
  }
]
```

**Every URL must be one you fetched and confirmed says what you are citing it for.** A fabricated
citation is far worse than none on a site whose entire positioning is that it tells the truth about
SEO. If you cannot verify a source, leave it out — three verified beat six plausible.

- `title` is the document's title, not your description of it.
- `date` only when the source states one. **Omit rather than guess.** A partial date like `2022-09`
  fails the build; it must be strict `YYYY-MM-DD`.
- Prefer primary sources — the specification, the documentation, the paper — over commentary.
- Do not cite competitor agency blogs or SEO tool marketing pages.
- Add **one** inline citation link in the body: find the sentence making the strongest factual claim
  your sources support and wrap a few words as `[text](https://...)`. Edit an existing sentence
  minimally. Skip it if no sentence genuinely warrants one.

Reliable anchors: `developers.google.com/search/docs/...`, `support.google.com/business/...`,
`support.google.com/webmasters/...`, `web.dev/articles/...`, `schema.org/...`, W3C and IETF specs,
`arxiv.org`. Try the obvious URL and confirm it loads before citing it.

---

## 5. Markup only where it renders

`plain()` strips inline markup from headings, table headers, table captions, callout titles and
`h1`. Writing `` `code` `` or a link in any of those produces text with the markup silently removed.
Use inline markup in `body`, `bullets`, `numbered`, table cells, callout bodies, `answer`,
`takeaways` and `faqs` — those all render it.

---

## 6. The non-redundancy rule

This batch exists because 500 pages already cover a great deal. **Deliver the spec's `angle`.**
It is the single field that stops a page duplicating something already published.

Before you write, read the two or three existing pages nearest your topic — `COVERAGE.md` lists
every one. If your page would substantially restate one of them, say so in your report rather than
writing it. A page that splits an existing page's signal is worse than no page.

The build enforces this: a 5-gram Jaccard above 0.55 against any sibling fails validation.

---

## 7. Length

Same bands as batch 1:

| Family | Words | Sections |
|---|---|---|
| `answers` | 900–1,400 | 5–7 |
| `glossary` | 500–800 | 3–5 |
| `journal` | 1,600–2,500 | 6–9 |
| `compare` | 1,000–1,500 | 5–7, incl. a comparison table and a verdict |
| `services` | 900–1,300 | 5–7, incl. what is and is not included |
| `cost` | 900–1,300 | 5–7, incl. a table of real INR numbers |
| `seo-for` | 900–1,300 | 5–7, genuinely industry-specific |

Aim for the middle of the band rather than the edges — the existing corpus already sits in tight
word-count bands per family, and widening the spread slightly is a small honest improvement.

---

## 8. Before you report back

```bash
cd website && python3 scripts/validate-content.py --quiet
```

Fix anything attributed to a file you own. Then confirm, for each of your files:

- `published` and `updated` match the plan exactly
- `metaTitle` ≤ 60 characters, `metaDescription` 140–155
- `sources` present, 3–6 entries, every URL verified
- no body link points at a page publishing later than yours
- valid JSON
