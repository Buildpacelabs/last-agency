# Starting prompt for a new session

Copy everything inside the fenced block below into a fresh Claude Code session, then fill in
the "What I'm giving you" section with whatever you actually have. Delete the lines you don't
have yet — an empty line is better than a placeholder, because a placeholder gets published.

---

```
I'm continuing SEO work on lastagencyhere.com. Read these three files first, in this order,
before doing anything:

1. output/SEO-HANDOFF.md      — current state, Search Console status, what's blocked on me
2. output/90-DAY-PLAN.md      — live SERP research and the strategy, including what NOT to do
3. output/seo-plan/01-writing-brief.md — voice rules, banned phrases, our real pricing

## The project

- Site: https://lastagencyhere.com — Last Agency, an Indian SEO/social/paid agency
- Repo: /Users/dissu/Documents/PP/LastAgency (app in website/), GitHub Buildpacelabs/last-agency, branch main
- Next.js 14 App Router, fully static, auto-deploys to Vercel on push to main
- 517 URLs: 5 money pages, 4 trust pages, 8 hubs, 500 programmatic content pages
- Content model: one JSON file per page in website/src/content/data/<type>/<slug>.json,
  all rendered through website/src/content/render.tsx

## Where it stands

A full technical audit was completed on 27 July 2026 and every in-repo defect is fixed and
deployed. Search Console: both properties verified, both sitemaps Success, homepage indexed,
Googlebot actively crawling, no manual actions, no security issues. 0 clicks and 0 impressions,
which is expected — the domain is a few weeks old with zero backlinks.

There is nothing left to fix in the code that would change rankings. The constraint is
authority and entity signals, not the website.

## Rules that apply to everything you do

- Never mention Claude, Anthropic or any AI assistant in commit messages, PR text, code
  comments, or any file that ships. Write as if I authored it.
- Invent nothing. No fabricated statistics, client names, case studies, testimonials or
  "studies show". This site's entire positioning is that it tells the truth about SEO, so a
  made-up number is a brand contradiction and a legal risk under India's ASCI code.
- Never promise a specific ranking position anywhere. The guarantee is movement against the
  client's own frozen trailing-90-day baseline.
- Before any deploy: cd website && python3 scripts/validate-content.py --strict
  It must report 0 errors. It checks meta lengths, banned phrases, broken internal links,
  near-duplicate siblings, keyword collisions and orphan pages.
- Do NOT mass-edit the `published` or `updated` dates across content files. All 500 currently
  share one launch date; a bulk refresh would turn a passive scaled-content risk into an
  active signal.
- Do NOT touch the 60 /seo-agency/<city> pages. Every city SERP is review directories plus
  agencies with a physical address and a Google Business Profile. They cannot win for 12+
  months and editing them is wasted effort.
- Do NOT buy directory placements, links, or listicle inclusion. See the "What NOT to do"
  section of the 90-day plan — it names specific traps with evidence.
- If a new name is coined for anything (a report, a tool, a product), check whether it's
  already taken before treating it as final, and tell me what you find.

## What I'm giving you

Fill in only what you actually have. Delete the rest.

- Founder full name:
- Founder photo (file path):
- Founder city:
- Founder bio (2-3 sentences, true):
- Founder LinkedIn URL:
- LinkedIn company page URL:
- Other social profile URLs (Instagram / X / YouTube / Facebook):
- Business email on the domain:
- Registered business address:
- Legal entity name + GSTIN + CIN or proprietorship status:
- Guarantee mechanics: which metric, measured over what window, what exclusions apply,
  and what "we work free" means contractually:
- DataForSEO credentials (username + password) for rank tracking:
- Anything else you asked me for that I now have:

## What to do with it

Work through whatever I supplied above, in this order of value:

1. **Founder identity.** Put the name, photo, city and bio on /about. Add Person schema with
   sameAs. Replace the "Written by the Last Agency team" byline in
   website/src/components/ArticleShell.tsx with a real named author across all 500 pages, and
   point Article.author at the Person node instead of the Organization.
2. **sameAs.** Add every real social URL to ORG_NODE in website/src/lib/site.ts. There's a
   TODO comment marking the spot. Only real URLs — a sameAs pointing at a profile we don't
   control is worse than none.
3. **Business email and address.** Add to /contact and to ORG_NODE (email, PostalAddress).
   Keep the schema type as Organization, not LocalBusiness, unless the address is a real
   verifiable place of business.
4. **Guarantee mechanics.** Write them into /terms as a single contiguous quotable block.
   This is the site's boldest claim and it is currently defined nowhere.
5. **Rank tracking**, if I gave you DataForSEO credentials. The claude-seo toolchain already
   supports DATAFORSEO_USERNAME / DATAFORSEO_PASSWORD. Track the 12 Tier-1 URLs named in the
   90-day plan, from India geo, weekly. Write results somewhere I can read over time.

## If I gave you nothing above

Then do the highest-value work that needs no input from me:

- **Add cited external sources to ~40 pages** — the /cost/ cluster and the buyer-intent pages
  named as Tier-1 in the 90-day plan. Only 2 of 500 content files currently contain a single
  external link. The page about generative engine optimization discusses the 2023 arXiv GEO
  paper by name and doesn't link to it. Add 3-6 named, dated, linked sources per page plus a
  visible Sources block. Do NOT bulk-add to all 500.
- **Build the India Agency Price Index** — fully spec'd in the "original-data asset" section
  of the 90-day plan. Every input is public, so no client data is needed. Name-check it first.
- **Check Search Console** and report what changed: indexed URL count trend, whether the
  Tier-1 URLs are drawing impressions, whether crawl stats have appeared.

Start by telling me what you found in those three files and what you plan to do, before you
change anything.
```

---

## Things you still owe the project, regardless of session

These are the blockers. Nothing downstream works without them.

| # | What | Why it matters | Time |
|---|---|---|---|
| 1 | Your name, photo, city, bio, LinkedIn | Your name appears nowhere on the site. Publications won't take bylines from a nameless agency; directories won't verify you | 30 min |
| 2 | LinkedIn company page | Cheapest entity signal there is; feeds `sameAs` | 20 min |
| 3 | Claim 5 free directory profiles — Clutch, GoodFirms, DesignRush, Sortlist, Semrush Agency Partners | This is where AI assistants actually look when asked "who should I hire". **Don't pay for any tier** | 3 hrs |
| 4 | 3 clients signed with written permission to publish name, baseline and 90-day result | The only asset that can't be bought or written, only accrued | ongoing |
| 5 | Business email on the domain | How a journalist or directory reaches you | 15 min |
| 6 | Registered address + legal entity details | Unlocks PostalAddress schema, Google Business Profile, honest /terms | 15 min |
| 7 | Enable Vercel Web Analytics | Code is shipped and switched off. Vercel → project → Analytics → Enable | 1 click |
| 8 | Request indexing on /compare, /social, /performance | Search Console → URL inspection → paste URL → Request Indexing | 2 min |

## Reference

| Thing | Where |
|---|---|
| Current state + Search Console | `output/SEO-HANDOFF.md` |
| Strategy, SERP research, what not to do | `output/90-DAY-PLAN.md` |
| Voice, banned phrases, real pricing | `output/seo-plan/01-writing-brief.md` |
| Keyword plan + PAA tree | `output/seo-plan/00-keyword-brief.md` |
| Content QA (run before every deploy) | `website/scripts/validate-content.py` |
| IndexNow submitter (run after content deploys) | `website/scripts/submit-indexnow.sh` |
