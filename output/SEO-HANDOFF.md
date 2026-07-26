# SEO Build — Handoff & Manual Steps

Status as of 27 July 2026.

## ✅ Shipped and confirmed live

- **500 pages deployed.** 979,054 words. Validator: 0 errors, 0 near-duplicates.
- **Search Console URL-prefix property `https://lastagencyhere.com/` is VERIFIED**
  (auto-verified via both HTML file and HTML tag).
- **Both sitemaps submitted.** `/sitemap.xml` reports **Success — 513 pages discovered**.
  `/sitemaps/index.xml` submitted and processing.
- **Indexing requested** on `/answers`.
- **Manual actions: no issues detected. Security issues: none.**
- All 500 URLs, `robots.txt`, `llms.txt`, `favicon.ico`, manifest and per-page OG images
  returning 200 in production.

---

## 🛑 1. REMAINING BLOCKER — the Domain-property DNS record

The URL-prefix property is verified and already collecting data, so this is no longer
urgent — but the Domain property is strictly better and is still pending.

**Why bother, given URL-prefix already works:** the Domain property covers every
subdomain and both protocols in one place. URL-prefix covers `https://lastagencyhere.com/`
and nothing else — so if you ever add `blog.lastagencyhere.com` or `in.lastagencyhere.com`,
it reports nothing for them and you won't notice.

### Exact steps (Hostinger)

Your nameservers are `artemis.dns-parking.com` / `hermes.dns-parking.com`, which means DNS
is managed at **Hostinger**, not Vercel and not your registrar's generic panel.

1. Go to **https://hpanel.hostinger.com** and sign in.
2. Top menu → **Domains**.
3. Find **lastagencyhere.com** in the list → click **Manage**.
4. In the left sidebar of that domain, click **DNS / Nameservers**.
5. Scroll to the **Manage DNS records** section (below "Nameservers").
6. In the **Add new record** row, set:

   | Field | Value |
   |---|---|
   | **Type** | `TXT` |
   | **Name** | `@` |
   | **TXT value** | `google-site-verification=WG2SVhxFsNHSvhSz5mvjOxMVXJshxJnYCuD4MqlBFr0` |
   | **TTL** | leave the default (14400) |

7. Click **Add Record**.

> ⚠️ **Do not touch the existing TXT record** that reads
> `v=spf1 include:_spf.mail.hostinger.com ~all`. That's your email SPF record. A domain
> can hold many TXT records — you are *adding* a second one, not editing the first.
> Overwriting SPF sends your outbound email to spam.

8. Wait 5–30 minutes, then confirm from a terminal:

   ```bash
   dig +short lastagencyhere.com TXT | grep google-site-verification
   ```

   You want to see the `google-site-verification=WG2SV...` line **and** the `v=spf1` line.

9. Tell me it's live and I'll finish verification in Search Console. (Or do it yourself:
   Search Console → *Already started? finish verification* → `lastagencyhere.com` → VERIFY.)

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

## ▶️ 7. RETRY IN A FEW HOURS — IndexNow

IndexNow rejected the first submission with `SiteVerificationNotCompleted` — its crawler
hadn't fetched the key file yet, because the file went live minutes earlier. The key is
serving correctly (`text/plain`, correct contents), so this resolves itself. Retry:

```bash
cd website && ./scripts/submit-indexnow.sh
```

Expect `"ok": true` with 513 URLs submitted to Bing, Yandex, Naver, Seznam and Yep.
Google does not participate in IndexNow — Google discovery is already handled by the
submitted sitemap.

Re-run this script after any future deploy that adds or materially changes pages. Don't
re-run it on unchanged URLs; that reads as spam to the receiving engines.

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
