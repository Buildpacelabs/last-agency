# SEO Build — Handoff & Manual Steps

Everything below is either **something only you can do** (credentials, DNS, business
decisions) or **something to run after the next deploy**.

---

## 🛑 1. BLOCKER — Add the Google Search Console DNS record

Both Search Console properties are already created and waiting on this one record.

**Where:** Hostinger (your nameservers are `artemis.dns-parking.com` /
`hermes.dns-parking.com`, so DNS lives at Hostinger, *not* Vercel).

`hPanel → Domains → lastagencyhere.com → DNS / Nameservers → Manage DNS records`

**Add this record:**

| Field | Value |
|---|---|
| Type | `TXT` |
| Name / Host | `@` |
| TTL | `3600` (or leave default) |
| Value / Content | `google-site-verification=WG2SVhxFsNHSvhSz5mvjOxMVXJshxJnYCuD4MqlBFr0` |

> Do **not** replace your existing SPF TXT record (`v=spf1 include:_spf.mail.hostinger.com ~all`).
> A domain can hold multiple TXT records — add a second one, don't overwrite the first.
> Losing SPF will send your outbound email to spam.

Once it's live (usually 5–30 minutes), verify with:

```bash
dig +short lastagencyhere.com TXT | grep google-site-verification
```

Then tell me and I'll finish verification in Search Console.

**Why the domain property matters:** it covers every subdomain and both protocols in one
place. The URL-prefix property only covers `https://lastagencyhere.com/` exactly, which
means a future `blog.` or `in.` subdomain would silently report nothing.

---

## 🛑 2. DECISION — Deploy approval

The site builds clean locally but **nothing has been pushed**. Everything so far is local
commits-in-waiting on `main`.

Deploying means: `git push origin main` → Vercel auto-builds → live.

Nothing in Search Console can complete until the new pages are actually live — the meta
verification tag, `robots.txt`, the sitemaps and all the new URLs only exist locally right
now. Say the word and I'll commit and push.

---

## 🛑 3. DECISION — The homepage proof numbers are placeholders

`website/src/app/page.tsx` currently shows:

- **+312%** — "Avg organic leads / 6 mo"
- **3.4×** — "Blended ROAS on paid media"

with this comment directly underneath, in the code and rendered on the live page:

> `* Illustrative aggregate — swap for your real case-study numbers before going live.`

The site is already live, so these are running publicly as proof. Three problems:

1. It contradicts the entire positioning. We're about to publish ~500 pages arguing that
   honest measurement is what separates you from every other agency.
2. In India, ASCI's code treats unsubstantiated quantified claims in advertising as
   misleading. You need evidence on file to make them.
3. Google's quality guidelines treat unverifiable proof claims as an E-E-A-T negative,
   which is exactly the signal this content build is trying to earn.

**Pick one and I'll do it:**

- **(a)** Give me real numbers from real clients → I'll swap them in with attribution.
- **(b)** Replace the section with claims you *can* substantiate today — "0 clients on
  lock-in", "3 clients a month", "90-day baseline guarantee". Honest and still strong.
- **(c)** Remove the proof band entirely until case studies exist.

I have not touched it — that's your claim to make, not mine.

---

## ⚙️ 4. NEEDED — Social profile URLs (`sameAs`)

`sameAs` is the strongest entity signal an `Organization` schema node can carry. It's how
Google connects "Last Agency" the website to "Last Agency" the business it may already
know from LinkedIn or Instagram.

Send me the real URLs for any of these you have and I'll add them to
`website/src/lib/site.ts`:

- LinkedIn company page
- Instagram
- X / Twitter
- YouTube
- Google Business Profile
- Facebook

I deliberately left this empty rather than guessing — a `sameAs` pointing at a profile you
don't control is worse than none at all.

---

## ⚙️ 5. NEEDED — Business address & founder details (optional but valuable)

Two things would meaningfully strengthen the site's E-E-A-T, and I can't invent either:

- **A real business address.** Unlocks `LocalBusiness` schema and a Google Business
  Profile, which is what actually wins "SEO agency near me" and map-pack queries. Your
  brand doc says Bangalore; the live site says nothing. I didn't add it because a wrong
  address in schema is worse than no address.
- **Named authors.** Every one of the ~500 pages currently says "Written by the Last
  Agency team". Google's helpful-content guidance is explicit that real, credentialed
  authors outperform anonymous brand bylines. Give me one or two real names with a
  one-line bio and I'll wire up `Person` schema and author pages.

---

## 🔑 6. OPTIONAL — API keys that upgrade the tooling

None of these block anything. Each one turns on capability in the `claude-seo` toolchain
that's currently dark:

| Key | What it unlocks | Cost |
|---|---|---|
| `GOOGLE_API_KEY` | PageSpeed Insights + CrUX — real Core Web Vitals field data | Free |
| Google OAuth / service account | Search Console API, Indexing API, GA4 reporting — automated rank & coverage tracking | Free |
| `MOZ_API_KEY` | Domain Authority, spam score, link data | Free tier, 2,500 rows/mo |
| `BING_WEBMASTER_API_KEY` | Bing coverage + automated URL submission | Free |
| DataForSEO / Ahrefs / SE Ranking | Real search volumes and difficulty — the keyword plan was built from SERP evidence and reasoning, not volume data | Paid |

The Google ones are the highest value per rupee (free, and they enable automated
reporting). Config goes in `~/.config/claude-seo/google-api.json`.

---

## ▶️ 7. AFTER THE NEXT DEPLOY — run these

Once the site is live with the new content:

```bash
cd website

# 1. Confirm the sitemaps are serving
curl -s https://lastagencyhere.com/sitemap.xml | grep -c '<loc>'
curl -s https://lastagencyhere.com/sitemaps/index.xml

# 2. Push everything to Bing / Yandex / Copilot's index
./scripts/submit-indexnow.sh
```

Then I'll drive Search Console to:

- Finish verification on both properties
- Submit `/sitemap.xml` **and** all eight section sitemaps (so coverage is reported
  per content family instead of as one undifferentiated number)
- Request indexing on the priority URLs
- Set the international targeting and check for manual actions

---

## 🧰 8. Reference — what's already built

| Thing | Where |
|---|---|
| Keyword brief + PAA tree | `output/seo-plan/00-keyword-brief.md` |
| Writing brief (voice, schema, banned phrases) | `output/seo-plan/01-writing-brief.md` |
| 500-URL page plan, 8 files | `output/seo-plan/plan-*.json` |
| Page content, one JSON per URL | `website/src/content/data/<type>/<slug>.json` |
| Content QA script | `website/scripts/validate-content.py` |
| IndexNow submitter | `website/scripts/submit-indexnow.sh` |
| IndexNow key | `website/public/ecf2a1301f4c9dee808c9cbc1a970931.txt` |
| GSC verification token | `website/src/app/layout.tsx` + `public/googled4b98758f8525102.html` |

**Content QA — run before every deploy:**

```bash
cd website && python3 scripts/validate-content.py --strict
```

It checks JSON validity, meta lengths, banned phrases, broken internal links, thin pages,
and — most importantly — near-duplicate siblings inside a cluster. That last check is the
guard against Google's scaled-content-abuse classifier, which penalises the domain rather
than the page.
