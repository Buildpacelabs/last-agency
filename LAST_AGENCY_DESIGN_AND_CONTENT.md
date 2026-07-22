# Last Agency — Design & Content Spec

Single source of truth for rebuilding the **Last Agency** landing page exactly.
Covers the full design system (tokens, type, layout, effects, components) **and** the complete verbatim content of every section.

- **Page title:** `Last Agency — The Last SEO Agency You'll Ever Hire`
- **Aesthetic:** Neo-brutalist direct-response poster. Warm near-black canvas, one loud red, highlighter yellow, hard offset shadows, uppercase Arial-Black display type, monospace labels. Alex Hormozi "Grand Slam Offer" energy rendered as a punk flyer.
- **Structure:** single-column, full-bleed alternating color "bands", ~1080px content width.

---

# PART 1 — DESIGN SYSTEM

## 1.1 Color tokens

```css
:root {
  --ink:       #14100c;  /* page background — warm near-black */
  --ink-2:     #1e1812;  /* raised surfaces: cards, offer total, FAQ */
  --red:       #ff2e12;  /* primary accent / CTA / bands */
  --red-deep:  #cc1c04;  /* darker red (reserve / hover) */
  --cream:     #f7efe0;  /* primary text on dark; light bands */
  --cream-dim: #e7dcc7;  /* secondary / muted text */
  --yellow:    #ffd21e;  /* highlights, prices, stamps, marker */
  --lime:      #c6ff3a;  /* "FREE" micro-badge only */
}
/* WhatsApp button is off-system: bg #25d366, text #05300f */
```

**Usage rules**
- Default surface `--ink`, default text `--cream`.
- Sections are full-bleed **bands** that alternate: `band-ink` (default), `band-red` (red bg, cream text), `band-cream` (cream bg, ink text). Every band gets `border-top/bottom: 3px solid var(--ink)`.
- Red = CTAs, accents, and one alternating band — never long body text.
- Yellow = money, guarantees, emphasis, highlighter marker. Lime = the "Free" pill only.
- Muted text on dark = `--cream-dim`.

## 1.2 Typography

```css
--disp: "Arial Black", "Helvetica Neue", Helvetica, Arial, sans-serif; /* display */
--sans: "Helvetica Neue", Helvetica, Arial, sans-serif;                /* body */
--mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;   /* labels/nums */
```

| Role | Family | Size | Treatment |
|---|---|---|---|
| Hero H1 | disp | `clamp(46px, 9.5vw, 108px)` | UPPERCASE, `letter-spacing:-.02em`, `line-height:.95`, `max-width:15ch` |
| Section H2 (`.sec-h`) | disp | `clamp(32px, 5.6vw, 64px)` | UPPERCASE, `text-wrap:balance`, `margin-top:14px` |
| Eyebrow | mono | 12px | UPPERCASE, `letter-spacing:.16em`, weight 700, red or ink |
| Body / hero sub | sans | `clamp(17px, 2.3vw, 22px)` | `line-height:1.5`, weight 500, `max-width:52ch` |
| Labels / stat captions | mono | 12–13px | UPPERCASE, `letter-spacing:.04–.1em` |
| Numbers | any | — | `.num { font-variant-numeric: tabular-nums }` |

- Base body: `line-height:1.55`, `-webkit-font-smoothing:antialiased`.
- All `h1/h2/h3`: `font-family:var(--disp)`, `text-transform:uppercase`, `letter-spacing:-.02em`, `line-height:.95`, `margin:0`.
- `.mono` utility swaps to the mono family; used for eyebrows, prices, captions, footer.

## 1.3 Layout & spacing

- Container: `.wrap { max-width:1080px; margin:0 auto; padding:0 22px }`
- Section rhythm: `.pad { padding:74px 0 }`. Hero uses `66px 0 80px`.
- Grid gaps: 14–16px.
- Grids: lies `2col` · value-equation `4col` · bonuses/proof `3col`.
- `html { scroll-behavior:smooth }`, `body { overflow-x:hidden }`, `* { box-sizing:border-box }`.

**Responsive — `@media (max-width:760px)`**
- `.lies, .veq, .bonuses, .proof → grid-template-columns:1fr` (value-equation stays `1fr 1fr`).
- `.offer-card` shadow shrinks to `7px 7px 0`.
- `nav .btn { display:none }`.

## 1.4 Signature effects

```css
/* Hard offset shadow — the brutalist signature. No blur. */
box-shadow: 12px 12px 0 var(--ink);   /* offer card */
box-shadow: 6px 6px 0 var(--red);     /* stat cards */
box-shadow: 6px 6px 0 var(--ink);     /* guarantee stamp */
box-shadow: 4px 4px 0 var(--ink);     /* sticker */

/* Yellow highlighter marker under a word */
.u { position:relative; display:inline-block; }
.u::after { content:""; position:absolute; left:-2%; right:-2%; bottom:6%;
  height:14%; background:var(--yellow); z-index:-1; transform:rotate(-1.5deg); }

/* Hero red glow */
.hero::before { content:""; position:absolute; inset:0; pointer-events:none;
  background: radial-gradient(70% 55% at 78% 8%, rgba(255,46,18,.28), transparent 60%); }

/* Rotated sticker / stamp */
transform: rotate(-3deg);  /* sticker */   transform: rotate(-4deg);  /* guarantee stamp */

/* Stroke-only outline number (scarcity "3") */
-webkit-text-stroke: 2px var(--cream); color: transparent;
```

Other motifs:
- Dashed dividers: `1px dashed rgba(247,239,224,.18)` (offer rows).
- Hairline borders: `rgba(247,239,224,.12–.14)`.
- Left accent bar: `border-left:5px solid var(--red)` on "lie" cards.
- Pulsing brand dot: `box-shadow: 0 0 0 4px rgba(255,46,18,.25)`.

## 1.5 Radius & border scale

| Token | Value | Applied to |
|---|---|---|
| pill | `999px` | buttons, small badges |
| xs | `6px` | sticker |
| sm | `8–10px` | slots, lie cards |
| md | `12–16px` | stat / bonus / value cells |
| lg | `22px` | offer card |
| Border widths | `2px` cards & buttons · `3px` bands & offer card · `4px` guarantee stamp | — |

## 1.6 Motion & accessibility

```css
.btn:focus-visible, summary:focus-visible { outline:3px solid var(--yellow); outline-offset:3px; }

@media (prefers-reduced-motion: reduce) {
  .marquee div { animation: none; }
  html { scroll-behavior: auto; }
}
@media (prefers-reduced-motion: no-preference) {
  .btn { transition: transform .12s ease; }
  .btn:hover { transform: translate(-1px,-2px); }
  .sticker { transition: transform .2s ease; }
  .hero:hover .sticker { transform: rotate(2deg) scale(1.03); }
}
```

- Decorative marquee is `aria-hidden="true"`.
- Focus ring is yellow, 3px, offset 3px.

## 1.7 Components

**Buttons** — pill, uppercase display, 2px border, subtle hover lift.
```css
.btn { font-family:var(--disp); text-transform:uppercase; font-size:14px; letter-spacing:-.01em;
  text-decoration:none; padding:11px 20px; border-radius:999px; border:2px solid var(--ink);
  display:inline-flex; align-items:center; gap:8px; cursor:pointer; }
.btn-lg    { font-size:19px; padding:17px 30px; }
.btn-red   { background:var(--red);   color:var(--cream); border-color:var(--red); }
.btn-cream { background:var(--cream);  color:var(--ink);   border-color:var(--cream); }
.btn-ghost { background:transparent;   color:var(--cream); border-color:rgba(247,239,224,.4); }
.btn-wa    { background:#25d366;       color:#05300f;      border-color:#25d366; } /* WhatsApp */
```

**Marquee** — red bar, mono uppercase, content duplicated once, `⚡` between items.
```css
.marquee { background:var(--red); color:var(--ink); font-family:var(--mono); font-weight:700;
  font-size:13px; letter-spacing:.08em; text-transform:uppercase; padding:9px 0;
  white-space:nowrap; overflow:hidden; border-bottom:3px solid var(--ink); }
.marquee div  { display:inline-block; animation: scroll 26s linear infinite; }
.marquee span { padding:0 26px; }
.marquee span::after { content:"⚡"; margin-left:26px; }
@keyframes scroll { from { transform:translateX(0); } to { transform:translateX(-50%); } }
```

**Nav** — sticky, `z-index:50`, ink bg, hairline bottom border; brand = pulsing red `.blip` dot + `LAST` / red `AGENCY`.
```css
nav { position:sticky; top:0; z-index:50; background:var(--ink); border-bottom:2px solid rgba(247,239,224,.12); }
.nav-in { display:flex; align-items:center; justify-content:space-between; padding:14px 22px; max-width:1080px; margin:0 auto; }
.brand { font-family:var(--disp); font-size:22px; text-transform:uppercase; letter-spacing:-.03em; display:flex; align-items:center; gap:9px; }
.brand .blip { width:12px; height:12px; background:var(--red); border-radius:50%; box-shadow:0 0 0 4px rgba(255,46,18,.25); }
.brand b { color:var(--red); }
```

**Sticker** (hero tag) — rotated yellow chip, hard shadow.
```css
.sticker { display:inline-block; font-family:var(--mono); font-weight:700; text-transform:uppercase;
  font-size:12px; letter-spacing:.12em; background:var(--yellow); color:var(--ink); padding:8px 15px;
  border:2px solid var(--ink); border-radius:6px; transform:rotate(-3deg); box-shadow:4px 4px 0 var(--ink); }
```

**"Lie" cards** — grid of enemy call-outs, red left bar.
```css
.lies { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:36px; }
.lie  { background:var(--ink-2); border:2px solid rgba(247,239,224,.14); border-left:5px solid var(--red);
        border-radius:10px; padding:18px 20px; }
.lie .q { font-family:var(--disp); text-transform:none; font-size:17px; letter-spacing:-.01em; }
.lie .a { font-size:14px; color:var(--cream-dim); margin-top:6px; }
.lie .a b { color:var(--yellow); }
```

**Offer / value-stack card** — the centerpiece.
```css
.offer-card { background:var(--ink); color:var(--cream); border:3px solid var(--ink); border-radius:22px;
  box-shadow:12px 12px 0 var(--ink); overflow:hidden; max-width:720px; margin:40px auto 0; }
.offer-top { background:var(--yellow); color:var(--ink); padding:20px 26px; text-align:center; border-bottom:3px solid var(--ink); }
.offer-top .t { font-family:var(--disp); text-transform:uppercase; font-size:clamp(22px,3.4vw,30px); }
.offer-top .s { font-family:var(--mono); font-size:12px; letter-spacing:.1em; text-transform:uppercase; margin-top:4px; }
.stack { padding:12px 26px 8px; }
.row  { display:flex; align-items:baseline; justify-content:space-between; gap:14px; padding:15px 0;
        border-bottom:1px dashed rgba(247,239,224,.18); }
.row:last-child { border-bottom:none; }
.row .name b    { display:block; font-family:var(--disp); text-transform:uppercase; font-size:16px; font-weight:400; }
.row .name span { color:var(--cream-dim); font-size:13px; }
.row .val { font-family:var(--mono); font-weight:700; color:var(--yellow); white-space:nowrap; }
.offer-total { background:var(--ink-2); padding:22px 26px; border-top:3px solid var(--ink); }
.total-line .strike { text-decoration:line-through; color:var(--cream-dim); }
.price-big .p { font-family:var(--disp); font-size:clamp(34px,6vw,52px); color:var(--red); letter-spacing:-.03em; }
```

**Value-equation cells** — 4-up, up/down arrows.
```css
.veq { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-top:40px; }
.veq-cell { background:rgba(20,16,12,.14); border:2px solid var(--ink); border-radius:14px; padding:22px 18px; }
.veq-cell .arrow { font-family:var(--disp); font-size:40px; line-height:1; }
.veq-cell.up   .arrow { color:var(--yellow); }
.veq-cell.down .arrow { color:var(--ink); }
```

**Guarantee stamp** — rotated yellow box on a cream band.
```css
.guar .stamp { display:inline-block; font-family:var(--disp); text-transform:uppercase; transform:rotate(-4deg);
  border:4px solid var(--ink); color:var(--ink); border-radius:12px; padding:14px 24px;
  font-size:clamp(26px,4.6vw,44px); background:var(--yellow); box-shadow:6px 6px 0 var(--ink); }
.guar p b { background:var(--ink); color:var(--cream); padding:1px 7px; border-radius:4px; }
```

**Bonus cards** — 3-up, lime "Free" pill.
```css
.bonus { background:var(--ink-2); border:2px solid rgba(247,239,224,.14); border-radius:16px; padding:24px; position:relative; }
.bonus .free { position:absolute; top:-12px; right:16px; background:var(--lime); color:var(--ink);
  font-family:var(--mono); font-weight:700; font-size:11px; letter-spacing:.1em; padding:4px 10px;
  border-radius:999px; border:2px solid var(--ink); text-transform:uppercase; }
.bonus .bn    { font-family:var(--mono); font-size:12px; color:var(--red); letter-spacing:.1em; }
.bonus .worth { font-family:var(--mono); font-weight:700; color:var(--yellow); margin-top:12px; display:block; }
```

**Scarcity slots**
```css
.scarcity .big { font-family:var(--disp); text-transform:uppercase; font-size:clamp(40px,9vw,96px); line-height:.9; }
.scarcity .big .r { -webkit-text-stroke:2px var(--cream); color:transparent; }
.slot      { font-family:var(--mono); font-weight:700; font-size:13px; letter-spacing:.06em; padding:9px 15px;
             border-radius:8px; border:2px solid var(--ink); text-transform:uppercase; }
.slot.gone { background:transparent; color:var(--ink); text-decoration:line-through; opacity:.55; }
.slot.open { background:var(--ink); color:var(--yellow); }
```

**Stat / proof cards** — cream on ink, red offset shadow.
```css
.stat-card { background:var(--cream); color:var(--ink); border:3px solid var(--ink); border-radius:16px;
  padding:26px 22px; box-shadow:6px 6px 0 var(--red); }
.stat-card .big { font-family:var(--disp); font-size:clamp(40px,6vw,58px); letter-spacing:-.03em; color:var(--red); }
.stat-card .lab { font-family:var(--mono); font-size:12.5px; letter-spacing:.05em; text-transform:uppercase; margin-top:4px; }
```

**FAQ** — `<details>` with custom `+`/`–` marker.
```css
details  { border-bottom:2px solid rgba(247,239,224,.14); padding:6px 0; }
summary  { list-style:none; cursor:pointer; font-family:var(--disp); text-transform:none; font-size:19px;
           letter-spacing:-.01em; padding:18px 40px 18px 0; position:relative; }
summary::-webkit-details-marker { display:none; }
summary::after { content:"+"; position:absolute; right:4px; top:14px; font-size:30px; color:var(--red); font-family:var(--disp); }
details[open] summary::after { content:"–"; }
details p { font-size:15px; color:var(--cream-dim); padding:0 0 20px; }
```

**Footer**
```css
footer { background:var(--ink); border-top:2px solid rgba(247,239,224,.12); padding:30px 0; }
.foot-in { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;
  font-family:var(--mono); font-size:12px; color:var(--cream-dim); letter-spacing:.04em; }
```

---

# PART 2 — CONTENT (verbatim)

Section order top → bottom, with band color and copy exactly as shipped.

## 2.1 Marquee ticker `[band: red]`
Scrolling items (repeated twice), separated by `⚡`:
- Rank or it's free
- The last SEO agency you'll ever hire
- No lock-in
- Beat your baseline in 90 days
- Only 3 clients / month

## 2.2 Nav `[band: ink, sticky]`
- Brand: `LAST` + **AGENCY** (red), preceded by a pulsing red dot.
- CTA button (red): `Book a call →` → anchor `#book`

## 2.3 Hero `[band: ink]`
- **Sticker:** `⚡ SEO — but the last time`
- **H1:** Fire your SEO agency. *Hire the* **last one** you'll ever need.
  - "Hire the" is red (`.r`); "last one" carries the yellow highlighter marker (`.u`).
- **Subhead:** Every agency sold you rankings and delivered spreadsheets. We build a growth system that pays for itself — and if it doesn't beat your numbers in 90 days, **you don't pay.** That's the whole pitch. ("you don't pay." is yellow.)
- **CTAs:**
  - Red, lg: `Book a free strategy call` → `#book`
  - WhatsApp green, lg: `WhatsApp us instead` → `https://wa.me/919315776817?text=Hi%20Last%20Agency%20%E2%80%94%20I%20want%20to%20rank.%20Send%20me%20the%20details.`
- **Trust line:** ★★★★★ (yellow) · Trusted by founders who got burned before · No contracts · No jargon

## 2.4 The Enemy — Four Lies `[band: ink]`
- **Eyebrow (red):** You've heard this before
- **H2:** Every SEO agency told you the same four lies.
- **Cards (2×2):**

| Quote (`.q`) | Answer (`.a`) — bold `<b>` in yellow |
|---|---|
| "We'll get you to #1 on Google." | Nobody controls the algorithm. A guaranteed ranking is **against Google's own rules** — and usually means black-hat tactics that torch your site later. |
| "Sign here — 12 month contract." | Lock-in exists to protect **them** when results don't come. We're month-to-month. Leave whenever. We'd rather earn it. |
| "Here's your monthly report." | 40 tabs of rankings nobody reads. We report one thing: **leads and revenue from search.** The number that pays your bills. |
| "SEO takes 12–18 months." | Sometimes. But you should see the needle move in **90 days** — or we work free until it does. Skin in the game. |

## 2.5 Grand Slam Offer `[band: red]`
- **Eyebrow (ink):** The Grand Slam Offer
- **H2:** Everything you need to own search. Stacked into one system.
- **Offer card:**
  - Header title: `The Last Agency Growth System™`
  - Header sub: `6 engines · one price · zero fluff`
  - Value stack (name / description / value):

| Engine | Description | Value |
|---|---|---|
| Technical + Performance Overhaul | Crawl, schema, Core Web Vitals, speed — a foundation that ranks. | ₹80,000 |
| Content & Topic-Cluster Engine | Pillar pages, clusters, refreshes, blogs on a fixed cadence. | ₹1,20,000 |
| Digital PR + Backlink Machine | Linkable assets & authority links that actually move DR. | ₹1,50,000 |
| pSEO + Internal Link Architecture | Programmatic pages that scale, wired together to compound. | ₹90,000 |
| AEO / GEO Future-Proofing | Get cited by AI answers & generative search, not just Google. | ₹60,000 |
| Live Dashboard + Strategy Calls | One screen: leads from search. Real humans on call. | ₹40,000 |

  - Total block: `Total real value` → ~~₹5,40,000 / mo~~ · `You pay from` → **₹75,000** /mo (red)
- **Footnote (ink, mono):** + performance bonus only when the leads land. GST extra · plans from ₹40k for smaller sites.

## 2.6 Value Equation `[band: ink]`
- **Eyebrow (red):** Why this offer is un-turn-down-able
- **H2:** We maxed the value equation.
- **Cells (4):**
  - ↑ **Dream outcome** — More qualified leads from search. Not rankings — revenue.
  - ↑ **Likelihood** — Proven system + a guarantee that puts our money on it.
  - ↓ **Time delay** — Movement in 90 days, not 18 months of "trust us."
  - ↓ **Effort & sacrifice** — We run all 6 engines. You approve and watch it grow.

## 2.7 Guarantee `[band: cream]`
- **Stamp:** `Rank or it's free`
- **Body:** If we don't beat your organic baseline within **90 days**, we keep working **completely free** until we do. We carry the risk, not you. That's only possible because we don't take clients we can't win for — which is exactly why there are only three slots a month. (bold spans use ink-on-cream highlight)

## 2.8 Bonuses `[band: ink]`
- **Eyebrow (red):** Sign this month and also get
- **H2:** Three bonuses. On the house.
- **Cards (3), each with lime "Free" pill:**

| # | Title | Copy | Worth |
|---|---|---|---|
| BONUS 01 | 90-Day Growth Blueprint | A full audit + keyword-to-revenue roadmap, built before we're even hired. Yours to keep either way. | Worth ₹25,000 |
| BONUS 02 | Competitor Kill-List | Every keyword your rivals rank for and you don't — prioritised by how fast we can steal it. | Worth ₹20,000 |
| BONUS 03 | CRO Quick-Wins Pass | We tune your top pages so the traffic we send actually converts. More leads from the same visits. | Worth ₹30,000 |

## 2.9 Scarcity `[band: red]`
- **Eyebrow (ink):** This isn't false urgency
- **Big:** **3** (outline/stroke) CLIENTS. THAT'S THE MONTH.
- **Body:** A "rank or it's free" guarantee only works if we go deep on a few. We take three new clients a month — then the doors close.
- **Slots:** `Slot 1 — Taken` (gone) · `Slot 2 — Taken` (gone) · `Slot 3 — Open ●` (open)

## 2.10 Proof `[band: ink]`
- **Eyebrow (red):** Receipts, not promises
- **H2:** What the system does.
- **Stat cards (3):**
  - **+312%** — Avg organic leads / 6 mo
  - **90** — Days to first needle-move
  - **0** — Clients on lock-in contracts
- **Footnote (mono):** * Illustrative aggregate — swap for your real case-study numbers before going live.

## 2.11 FAQ `[band: ink]`
- **H2 (centered):** Fair questions.
- **Items** (`<details>`; first is open):
  1. **You said no ranking guarantees — but "rank or it's free"?** — We don't promise a specific position for a specific keyword (impossible, and against Google's rules). We guarantee *growth against your own baseline*. Miss it in 90 days and we work free until we beat it. Honest and still bold.
  2. **Why only 3 clients a month?** — Because the guarantee is real. We can only carry that risk if every client gets deep, senior attention. Volume agencies can't offer this — that's the point.
  3. **What's actually included vs. an add-on?** — The six engines above are the core system. Different channels — paid ads, email/CRM, ASO, YouTube — are separate engagements. We'll tell you straight in the strategy call.
  4. **Is there a contract?** — Month-to-month after the first quarter. 30-day notice. You keep every asset, page and report. Lock-in is a red flag; we don't do it.

## 2.12 Final CTA `[band: red, id="book"]`
- **Eyebrow (ink):** Last slot's open
- **H2:** Make this the **last** SEO call you book. ("last" is red)
- **Body:** Grab the free strategy call and walk away with your 90-Day Growth Blueprint — hired or not. Or just text us. Either way, you'll know exactly how we'd win.
- **CTAs:**
  - Cream, lg: `📅 Book on Cal.com` → `https://cal.com/priyanshu-semwal-8qcxab/lastagency-last-seo-call`
  - WhatsApp green, lg: `💬 WhatsApp us now` → `https://wa.me/919315776817?text=Hi%20Last%20Agency%20%E2%80%94%20I%20want%20the%2090-Day%20Blueprint.`
- **Micro:** Rank or it's free · No lock-in · Blueprint is yours to keep

## 2.13 Footer `[band: ink]`
- Brand: `LAST` + **AGENCY** (red)
- Legal: © 2026 LAST AGENCY · SEO, THE LAST TIME · PRICES IN INR, GST EXTRA

---

# PART 3 — GLOBAL RESET (head styles)

```css
:root { color-scheme: light; }
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin:0; background:var(--ink); color:var(--cream); font-family:var(--sans);
       line-height:1.55; overflow-x:hidden; -webkit-font-smoothing:antialiased; }
img { max-width:100%; }
h1,h2,h3 { margin:0; font-family:var(--disp); text-transform:uppercase; letter-spacing:-.02em; line-height:.95; }
p { margin:0; }
a { color: inherit; }
```

## Key external links & assets
- WhatsApp number: `+91 93157 76817` (`https://wa.me/919315776817`)
- Cal.com booking: `https://cal.com/priyanshu-semwal-8qcxab/lastagency-last-seo-call`
- Currency: INR (₹), GST extra. Pricing anchor ₹5,40,000/mo → from ₹75,000/mo (smaller sites from ₹40k).

## Voice & copy principles
- Direct-response, second person, anti-agency framing ("fire your agency", "four lies").
- Bold single claims with a real guarantee ("rank or it's free"), genuine scarcity (3 clients/month).
- Money and guarantees always in yellow; the enemy/urgency in red bands; the promise/guarantee on a calm cream band.
- Numbers are tabular; captions and legal in monospace; headlines shout in uppercase display.
