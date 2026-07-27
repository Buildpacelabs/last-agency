# SEO Build — Handoff & Manual Steps

Status as of 27 July 2026, after the full technical audit and fix pass.

## ✅ Search Console — reviewed end to end, nothing broken

Both properties verified (Domain via DNS TXT, URL-prefix via HTML file + tag).

| Report | State |
|---|---|
| Manual actions | **No issues detected** |
| Security issues | **None** |
| Sitemaps | `/sitemap.xml` + `/sitemaps/index.xml` both **Success**; `/sitemaps/core.xml` newly submitted |
| URL inspection on `/` | **Indexed.** Crawled 27 Jul 04:40 by Googlebot smartphone. Crawl allowed, fetch successful, indexing allowed, self-canonical accepted |
| Performance | 0 clicks, 0 impressions |
| Crawl stats | No data yet |
| Core Web Vitals | "Not enough usage data" — no CrUX record until the site has real traffic |
| Links | Still processing |

**The important finding:** Google discovered the homepage *via* `/answers/how-to-start-a-marketing-agency`
and `/glossary/largest-contentful-paint` — it is already walking the internal link graph. Hub pages
report **"Discovered – currently not indexed"** with last crawl N/A, which is normal crawl-budget
rationing on a three-week-old domain, not a defect.

Nine URLs were pushed to the priority crawl queue today (daily quota exhausted):
`/glossary` `/journal` `/pricing` `/seo` `/services` `/cost` `/seo-agency` `/seo-for`.

**➡️ Do tomorrow (2 minutes):** request indexing on `/compare`, `/social`, `/performance`.
Search Console → URL inspection → paste URL → REQUEST INDEXING.

---

## ✅ Fixed this pass

Everything below is live and verified in production.

**Internal link graph — the big one.** `resolveRelated()` capped author-declared links at 6 and
returned early, silently discarding **133 links** and leaving **67 pages with zero editorial inbound
links**. On a site with no backlinks, internal links are the only PageRank that exists. Now honours 8;
zero orphans. Also added 34 refs into the city and industry pages, and 15 in-prose links to the eight
hubs, which previously had none outside the footer.

**Raw markdown was rendering to users and Google** on ~94 pages. `/glossary/hreflang` — a page selling
hreflang expertise — displayed 32 literal backticks. Three separate holes, all closed.

**Money pages had none of their own keywords.** `/seo` said "technical SEO" zero times while
`/services/technical-seo-services` said it 30 times. Retitled and reworked `/seo`, `/pricing`,
`/social`, `/performance`, and rewrote all 60 city H1s to lead with their target term.

**Trust pages.** `/about`, `/contact`, `/privacy`, `/terms` all 404'd. Now live, linked from the footer
and in the sitemap. The WhatsApp number is now crawlable text, not just an `href`.

**Homepage proof claims removed.** The `+312%` / `3.4× ROAS` cards were placeholders published under a
visible note reading *"Illustrative aggregate — swap for your real case-study numbers before going
live."* Replaced with claims a visitor can verify on the site. Also removed the ★★★★★ rating (no reviews
exist anywhere on the domain) and the hardcoded "Slot 1 — Taken" chips (unfalsifiable on a static build).

**Also:** 175 titles were blowing the 60-char budget via the brand suffix; `twitter:card` was missing on
486 pages; `/sitemaps/index.xml` omitted all five money pages; hub pages were prefetching 1.85 MB;
robots.txt was blocking utm_ URLs from being crawled *at all*, so Google could never read the canonical
that would consolidate them; four WCAG AA contrast failures; Service/Offer schema asserted an exact
one-off price where the page states a monthly floor.

**Validator gained four rules** so none of this can silently return: rendered title length, keyword
collisions, markup in fields that strip it, and inbound links computed *the way the renderer resolves
them* — that last one is what would have caught the link bug.

```bash
cd website && python3 scripts/validate-content.py --strict
# PAGES 500  WORDS 979,054  ERRORS 0  NEAR-DUPES 0  UNWRITTEN 0
```

---

## 🛑 Blocked on you — ranked by ranking impact per unit of effort

### 1. A LinkedIn company page, and post under your own name weekly
The cheapest entity signal that exists. Google has nothing to anchor a trust assessment to right now —
no `sameAs`, no address, no named author, no external mention anywhere. For an Indian B2B agency this is
also where the first real referral traffic and first genuine links come from. **Send me the URL and I'll
wire it into `sameAs`.**

### 2. A business email on the domain
e.g. `hello@lastagencyhere.com`, monitored. There isn't one anywhere in the codebase. Unlocks a proper
`/contact`, `Organization.email`, and the single most common way a journalist or directory reaches you.

### 3. A named author with a real bio
All 500 pages say "Written by the Last Agency team". Google's helpful-content guidance is explicit that
credentialed named authors outperform anonymous brand bylines. One real person with a LinkedIn URL is
enough. A fictional persona is not.

### 4. Registered business address
Unlocks `PostalAddress`, a Google Business Profile, and eventually map-pack visibility for "seo agency
near me". I've deliberately kept the schema as `Organization` rather than `LocalBusiness` — asserting a
physical place of business without a verifiable address is worse than not asserting one.

### 5. The guarantee mechanics, in writing
"Beat your baseline in 90 days or we work free" is your boldest claim and it is defined nowhere. I need
the metric, the measurement window, the exclusions, and what "work free" means. `/terms` currently says
these are defined in the engagement letter — which needs to be true.

### 6. Three real case studies with named clients
This is the fix for the proof problem, **and** the only content on this site anyone would ever link to
voluntarily. The 500-page library is useful and entirely unremarkable — fine for capturing long-tail
demand, useless for earning links.

### 7. Legal entity name, GSTIN, proprietorship or CIN
For an honest `/terms` and `/privacy`. Worth a lawyer's eye on both before they matter.

### 8. Analytics — a decision
There is **no analytics of any kind** installed. You cannot see your own traffic, and Core Web Vitals
will stay blank for months. Options: Vercel Speed Insights (two lines, metered), or self-hosted
`web-vitals` (~1.5 KB), plus GA4 or Plausible for pageviews. Tell me which and I'll install it.

---

## 📊 What to actually watch, and when

**Do not watch the Performance report.** It will read zero for weeks and tell you nothing.

**Watch the Pages report** — specifically the trend in *"Crawled – currently not indexed"*. Shrinking
month over month means Google is warming to the corpus. Growing means the quality assessment is going
the wrong way. That is the single most important number on this site right now.

| When | What normal looks like |
|---|---|
| Weeks 1–4 | Crawl stats populate. Indexed count climbs. 40–70% indexed in the first two months is normal for a 500-page same-day launch, not a failure |
| Weeks 4–10 | First impressions appear — on `glossary/*` and `answers/*` long-tail queries. Watch *unique pages drawing impressions*, not clicks |
| Week 12 | 60+ distinct pages drawing impressions = the corpus is being taken seriously. 5 pages = it isn't |
| Ongoing | First branded impression for "last agency" is the cleanest proxy for the entity forming |

City and service commercial queries — "seo agency mumbai", "seo services india" — are decided by links
and entity signals. On a domain this age that is a 9–18 month proposition regardless of on-page quality.
Anyone promising faster on zero backlinks is guessing.

**Do not buy links.** A new domain with 500 same-day pages and a sudden paid link profile is the exact
pattern that gets an entire corpus discounted, and unlike everything else here, it is not recoverable.

---

## 🧰 Reference

| Thing | Where |
|---|---|
| Keyword brief + PAA tree | `output/seo-plan/00-keyword-brief.md` |
| Writing brief (voice, schema, banned phrases) | `output/seo-plan/01-writing-brief.md` |
| 500-URL page plan | `output/seo-plan/plan-*.json` |
| Page content, one JSON per URL | `website/src/content/data/<type>/<slug>.json` |
| Content QA — run before every deploy | `website/scripts/validate-content.py` |
| IndexNow submitter | `website/scripts/submit-indexnow.sh` |
| GSC verification token | `website/src/app/layout.tsx` + `public/googled4b98758f8525102.html` |

Re-run IndexNow after any deploy that adds or materially changes pages — not on unchanged URLs, which
reads as spam to the receiving engines. Google does not participate; the sitemap covers Google.

```bash
cd website && ./scripts/submit-indexnow.sh   # last run: ok, 517 URLs
```

---

## The honest summary

Nothing technical is blocking this site. It is indexed, crawlable, penalty-free, and Googlebot is
actively walking it. It has zero impressions because it is a three-week-old domain with no external
links and no entity footprint — a time-and-authority problem, not a code problem.

Everything fixed above removes reasons for Google to *discount* the site. It does not make it rank. The
repo work makes it credible; items 1–6 above make it known. Only the second one produces rankings.
