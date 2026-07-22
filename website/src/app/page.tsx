import type { Metadata } from 'next';

/* --- Constants ----------------------------------------------------------- */
const SITE_URL = 'https://lastagency.com';
const WA_NUMBER = '919315776817';
const WA_HERO =
  'https://wa.me/919315776817?text=Hi%20Last%20Agency%20%E2%80%94%20I%20want%20to%20rank.%20Send%20me%20the%20details.';
const WA_FINAL =
  'https://wa.me/919315776817?text=Hi%20Last%20Agency%20%E2%80%94%20I%20want%20the%2090-Day%20Blueprint.';
const CAL_LINK = 'https://cal.com/priyanshu-semwal-8qcxab/lastagency-last-seo-call';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/* --- Data ---------------------------------------------------------------- */
const MARQUEE_ITEMS = [
  "Rank or it's free",
  "The last SEO agency you'll ever hire",
  'No lock-in',
  'Beat your baseline in 90 days',
  'Only 3 clients / month',
];

const LIES: { q: string; a: React.ReactNode }[] = [
  {
    q: '"We\'ll get you to #1 on Google."',
    a: (
      <>
        Nobody controls the algorithm. A guaranteed ranking is{' '}
        <b>against Google's own rules</b> — and usually means black-hat tactics that torch your
        site later.
      </>
    ),
  },
  {
    q: '"Sign here — 12 month contract."',
    a: (
      <>
        Lock-in exists to protect <b>them</b> when results don't come. We're month-to-month. Leave
        whenever. We'd rather earn it.
      </>
    ),
  },
  {
    q: '"Here\'s your monthly report."',
    a: (
      <>
        40 tabs of rankings nobody reads. We report one thing:{' '}
        <b>leads and revenue from search.</b> The number that pays your bills.
      </>
    ),
  },
  {
    q: '"SEO takes 12–18 months."',
    a: (
      <>
        Sometimes. But you should see the needle move in <b>90 days</b> — or we work free until it
        does. Skin in the game.
      </>
    ),
  },
];

const ENGINES: { name: string; desc: string; val: string }[] = [
  {
    name: 'Technical + Performance Overhaul',
    desc: 'Crawl, schema, Core Web Vitals, speed — a foundation that ranks.',
    val: '₹80,000',
  },
  {
    name: 'Content & Topic-Cluster Engine',
    desc: 'Pillar pages, clusters, refreshes, blogs on a fixed cadence.',
    val: '₹1,20,000',
  },
  {
    name: 'Digital PR + Backlink Machine',
    desc: 'Linkable assets & authority links that actually move DR.',
    val: '₹1,50,000',
  },
  {
    name: 'pSEO + Internal Link Architecture',
    desc: 'Programmatic pages that scale, wired together to compound.',
    val: '₹90,000',
  },
  {
    name: 'AEO / GEO Future-Proofing',
    desc: 'Get cited by AI answers & generative search, not just Google.',
    val: '₹60,000',
  },
  {
    name: 'Live Dashboard + Strategy Calls',
    desc: 'One screen: leads from search. Real humans on call.',
    val: '₹40,000',
  },
];

const VEQ: { dir: 'up' | 'down'; arrow: string; label: string; body: string }[] = [
  {
    dir: 'up',
    arrow: '↑',
    label: 'Dream outcome',
    body: 'More qualified leads from search. Not rankings — revenue.',
  },
  {
    dir: 'up',
    arrow: '↑',
    label: 'Likelihood',
    body: 'Proven system + a guarantee that puts our money on it.',
  },
  {
    dir: 'down',
    arrow: '↓',
    label: 'Time delay',
    body: 'Movement in 90 days, not 18 months of "trust us."',
  },
  {
    dir: 'down',
    arrow: '↓',
    label: 'Effort & sacrifice',
    body: 'We run all 6 engines. You approve and watch it grow.',
  },
];

const RUN: { k: string; n: string; h: string; p: string }[] = [
  {
    k: 'Week 1',
    n: '01',
    h: 'Teardown & Blueprint',
    p: "We crawl everything, find what's quietly bleeding traffic, and hand you a keyword-to-revenue plan — yours to keep whether you hire us or not.",
  },
  {
    k: 'Weeks 2–4',
    n: '02',
    h: 'Fix the foundation',
    p: 'Technical and performance overhaul. Schema, speed, Core Web Vitals — the plumbing that silently caps every other effort.',
  },
  {
    k: 'Weeks 5–12',
    n: '03',
    h: 'Compound the machine',
    p: 'Content clusters ship on cadence, digital PR earns real links, programmatic pages scale. Authority starts to stack.',
  },
  {
    k: 'Day 90',
    n: '04',
    h: 'We prove it — or work free',
    p: 'You see the needle move on leads from search, or every engine keeps running at zero cost until it does.',
  },
];

const QUAL_YES = [
  'You have a real product and real revenue — SEO is a growth lever, not a science project.',
  "You're done paying for rankings and want leads and pipeline instead.",
  'You can move fast on approvals and let a senior team actually run the play.',
  'You want one partner who owns search end-to-end, not five vendors pointing fingers.',
];

const QUAL_NO = [
  'You want a #1 ranking guaranteed by Friday. Nobody honest sells that.',
  "You're shopping purely on price for the cheapest freelancer you can find.",
  "You need paid ads, not organic — that's a different engagement (we'll say so).",
  'You want a 40-tab report to forward, not revenue you can bank.',
];

const BONUSES: { bn: string; title: string; body: string; worth: string }[] = [
  {
    bn: 'BONUS 01',
    title: '90-Day Growth Blueprint',
    body: "A full audit + keyword-to-revenue roadmap, built before we're even hired. Yours to keep either way.",
    worth: 'Worth ₹25,000',
  },
  {
    bn: 'BONUS 02',
    title: 'Competitor Kill-List',
    body: 'Every keyword your rivals rank for and you don\'t — prioritised by how fast we can steal it.',
    worth: 'Worth ₹20,000',
  },
  {
    bn: 'BONUS 03',
    title: 'CRO Quick-Wins Pass',
    body: 'We tune your top pages so the traffic we send actually converts. More leads from the same visits.',
    worth: 'Worth ₹30,000',
  },
];

const STATS: { big: string; lab: string }[] = [
  { big: '+312%', lab: 'Avg organic leads / 6 mo' },
  { big: '90', lab: 'Days to first needle-move' },
  { big: '0', lab: 'Clients on lock-in contracts' },
];

const FAQ: { q: string; a: React.ReactNode; plain: string }[] = [
  {
    q: 'You said no ranking guarantees — but "rank or it\'s free"?',
    a: (
      <>
        We don't promise a specific position for a specific keyword (impossible, and against
        Google's rules). We guarantee <em>growth against your own baseline</em>. Miss it in 90 days
        and we work free until we beat it. Honest and still bold.
      </>
    ),
    plain:
      "We don't promise a specific position for a specific keyword (impossible, and against Google's rules). We guarantee growth against your own baseline. Miss it in 90 days and we work free until we beat it. Honest and still bold.",
  },
  {
    q: 'Why only 3 clients a month?',
    a: (
      <>
        Because the guarantee is real. We can only carry that risk if every client gets deep, senior
        attention. Volume agencies can't offer this — that's the point.
      </>
    ),
    plain:
      "Because the guarantee is real. We can only carry that risk if every client gets deep, senior attention. Volume agencies can't offer this — that's the point.",
  },
  {
    q: "What's actually included vs. an add-on?",
    a: (
      <>
        The six engines above are the core system. Different channels — paid ads, email/CRM, ASO,
        YouTube — are separate engagements. We'll tell you straight in the strategy call.
      </>
    ),
    plain:
      "The six engines above are the core system. Different channels — paid ads, email/CRM, ASO, YouTube — are separate engagements. We'll tell you straight in the strategy call.",
  },
  {
    q: 'Is there a contract?',
    a: (
      <>
        Month-to-month after the first quarter. 30-day notice. You keep every asset, page and report.
        Lock-in is a red flag; we don't do it.
      </>
    ),
    plain:
      "Month-to-month after the first quarter. 30-day notice. You keep every asset, page and report. Lock-in is a red flag; we don't do it.",
  },
  {
    q: 'What determines my price?',
    a: (
      <>
        Site size, competition, and how aggressive you want to go. Smaller sites start around
        ₹40k/mo; the full six-engine system is from ₹75k/mo, GST extra. We quote you straight on the
        call — no "packages" you have to decode.
      </>
    ),
    plain:
      'Site size, competition, and how aggressive you want to go. Smaller sites start around ₹40k/mo; the full six-engine system is from ₹75k/mo, GST extra. We quote you straight on the call — no "packages" you have to decode.',
  },
  {
    q: 'How do you measure my "baseline"?',
    a: (
      <>
        On day one we freeze one number: qualified leads from organic search over your trailing 90
        days. That single figure is the bar. "Beat your baseline in 90 days" means beat{' '}
        <em>that</em> — not a vanity metric we cherry-pick later. We track traffic and rankings too,
        but leads are what the guarantee is settled on.
      </>
    ),
    plain:
      'On day one we freeze one number: qualified leads from organic search over your trailing 90 days. That single figure is the bar. "Beat your baseline in 90 days" means beat that — not a vanity metric we cherry-pick later. We track traffic and rankings too, but leads are what the guarantee is settled on.',
  },
  {
    q: 'I already have an in-house SEO or another agency. Now what?',
    a: (
      <>
        Great — we audit what's working and only replace what isn't. Sometimes we run alongside your
        team as the senior brain. The Blueprint alone is usually worth the call — and it's yours free
        either way.
      </>
    ),
    plain:
      "Great — we audit what's working and only replace what isn't. Sometimes we run alongside your team as the senior brain. The Blueprint alone is usually worth the call — and it's yours free either way.",
  },
  {
    q: 'Who actually does the work?',
    a: (
      <>
        Senior operators, not interns behind a dashboard. Three clients a month exists precisely so
        the people who win the strategy call are the people running your account.
      </>
    ),
    plain:
      'Senior operators, not interns behind a dashboard. Three clients a month exists precisely so the people who win the strategy call are the people running your account.',
  },
];

/* --- Structured data ----------------------------------------------------- */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: 'Last Agency',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      description:
        "The last SEO agency you'll ever hire. A six-engine organic growth system with a rank-or-it's-free guarantee.",
      slogan: "Rank or it's free.",
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: `+${WA_NUMBER}`,
          areaServed: 'IN',
          availableLanguage: ['en', 'hi'],
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Last Agency',
      publisher: { '@id': `${SITE_URL}/#org` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/#service`,
      name: 'The Last Agency Growth System',
      serviceType: 'Search engine optimization',
      provider: { '@id': `${SITE_URL}/#org` },
      areaServed: 'IN',
      description:
        'Six SEO engines — technical, content, digital PR, programmatic SEO, AEO/GEO and live reporting — stacked into one performance-guaranteed system.',
      offers: {
        '@type': 'Offer',
        price: '75000',
        priceCurrency: 'INR',
        description: 'From ₹75,000/mo. Smaller sites from ₹40k/mo. GST extra. Month-to-month, no lock-in.',
        url: `${SITE_URL}/#book`,
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.plain },
      })),
    },
  ],
};

/* --- Page ---------------------------------------------------------------- */
export default function HomePage(): JSX.Element {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* 2.1 Marquee — items repeated 6× so half the track (the -50% loop distance)
          always exceeds the widest realistic viewport and never leaves a gap. */}
      <div className="marquee" aria-hidden="true">
        <div>
          {Array.from({ length: 6 }).flatMap((_, r) =>
            MARQUEE_ITEMS.map((item, i) => <span key={`${r}-${i}`}>{item}</span>),
          )}
        </div>
      </div>

      {/* 2.2 Nav */}
      <nav className="site" aria-label="Primary">
        <div className="nav-in">
          <a className="brand" href="#top" aria-label="Last Agency — home">
            <span className="blip" aria-hidden="true" />
            LAST&nbsp;<b>AGENCY</b>
          </a>
          <a className="btn btn-red" href="#book">
            Book a call →
          </a>
        </div>
      </nav>

      <main id="main">
        <span id="top" aria-hidden="true" />

        {/* 2.3 Hero */}
        <header className="hero band-ink">
          <div className="wrap">
            <span className="sticker">⚡ SEO — but the last time</span>
            <h1>
              Fire your SEO agency. <span className="r">Hire the</span>{' '}
              <span className="u">last one</span> you'll ever need.
            </h1>
            <p className="sub">
              Every agency sold you rankings and delivered spreadsheets. We build a growth system
              that pays for itself — and if it doesn't beat your numbers in 90 days,{' '}
              <span className="y">you don't pay.</span> That's the whole pitch.
            </p>
            <div className="cta-row">
              <a className="btn btn-lg btn-red" href="#book">
                Book a free strategy call
              </a>
              <a className="btn btn-lg btn-wa" href={WA_HERO} target="_blank" rel="noopener noreferrer">
                WhatsApp us instead
              </a>
            </div>
            <p className="trust">
              <span className="stars" role="img" aria-label="5 out of 5 stars">
                ★★★★★
              </span>{' '}
              · Trusted by founders who got burned before · No contracts · No jargon
            </p>
          </div>
        </header>

        {/* 2.4 The Enemy — Four Lies */}
        <section className="band-ink pad" aria-labelledby="lies-h">
          <div className="wrap">
            <p className="eyebrow eyebrow-red">You've heard this before</p>
            <h2 className="sec-h" id="lies-h">
              Every SEO agency told you the same four lies.
            </h2>
            <div className="lies">
              {LIES.map((lie, i) => (
                <div className="lie" key={i}>
                  <p className="q">{lie.q}</p>
                  <p className="a">{lie.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2.5 Grand Slam Offer */}
        <section className="band-red pad" aria-labelledby="offer-h">
          <div className="wrap">
            <p className="eyebrow eyebrow-ink">The Grand Slam Offer</p>
            <h2 className="sec-h" id="offer-h">
              Everything you need to own search. Stacked into one system.
            </h2>

            <div className="offer-card">
              <div className="offer-top">
                <div className="t">The Last Agency Growth System™</div>
                <div className="s">6 engines · one price · zero fluff</div>
              </div>
              <div className="stack">
                {ENGINES.map((e, i) => (
                  <div className="row" key={i}>
                    <div className="name">
                      <b>{e.name}</b>
                      <span>{e.desc}</span>
                    </div>
                    <div className="val num">{e.val}</div>
                  </div>
                ))}
              </div>
              <div className="offer-total">
                <div className="total-line">
                  <span>Total real value</span>
                  <span className="strike num">₹5,40,000 / mo</span>
                </div>
                <div className="price-big">
                  <span>You pay from</span>
                  <span>
                    <span className="p num">₹75,000</span> /mo
                  </span>
                </div>
              </div>
            </div>

            <p className="offer-foot">
              + performance bonus only when the leads land. GST extra · plans from ₹40k for smaller
              sites.
            </p>
          </div>
        </section>

        {/* 2.6 Value Equation */}
        <section className="band-ink pad" aria-labelledby="veq-h">
          <div className="wrap">
            <p className="eyebrow eyebrow-red">Why this offer is un-turn-down-able</p>
            <h2 className="sec-h" id="veq-h">
              We maxed the value equation.
            </h2>
            <div className="veq">
              {VEQ.map((c, i) => (
                <div className={`veq-cell ${c.dir}`} key={i}>
                  <div className="arrow" aria-hidden="true">
                    {c.arrow}
                  </div>
                  <strong>{c.label}</strong>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2.7 Guarantee */}
        <section className="band-cream pad" aria-labelledby="guar-h">
          <div className="wrap guar">
            <h2 className="stamp" id="guar-h">
              Rank or it's free
            </h2>
            <p>
              If we don't beat your organic baseline within <b>90 days</b>, we keep working{' '}
              <b>completely free</b> until we do. We carry the risk, not you. That's only possible
              because we don't take clients we can't win for — which is exactly why there are only{' '}
              <b>three slots a month</b>.
            </p>
          </div>
        </section>

        {/* NEW — The 90-Day Run (process) */}
        <section className="band-ink pad" aria-labelledby="run-h">
          <div className="wrap">
            <p className="eyebrow eyebrow-red">Here's the 90 days, start to proof</p>
            <h2 className="sec-h" id="run-h">
              No "trust us." Here's exactly how the run goes.
            </h2>
            <div className="run">
              {RUN.map((s, i) => (
                <div className="run-step" key={i}>
                  <div className="k">{s.k}</div>
                  <div className="n num" aria-hidden="true">
                    {s.n}
                  </div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2.8 Bonuses */}
        <section className="band-ink pad" aria-labelledby="bonus-h">
          <div className="wrap">
            <p className="eyebrow eyebrow-red">Sign this month and also get</p>
            <h2 className="sec-h" id="bonus-h">
              Three bonuses. On the house.
            </h2>
            <div className="bonuses">
              {BONUSES.map((b, i) => (
                <div className="bonus" key={i}>
                  <span className="free">Free</span>
                  <div className="bn">{b.bn}</div>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                  <span className="worth num">{b.worth}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEW — Who it's for */}
        <section className="band-cream pad" aria-labelledby="qual-h">
          <div className="wrap">
            <p className="eyebrow eyebrow-red">Straight talk before you book</p>
            <h2 className="sec-h" id="qual-h">
              This isn't for everyone. On purpose.
            </h2>
            <div className="qual">
              <div className="qual-col yes">
                <h3>Book the call if…</h3>
                <ul>
                  {QUAL_YES.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="qual-col no">
                <h3>Skip us if…</h3>
                <ul>
                  {QUAL_NO.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 2.9 Scarcity */}
        <section className="band-red pad scarcity" aria-labelledby="scarcity-h">
          <div className="wrap">
            <p className="eyebrow eyebrow-ink">This isn't false urgency</p>
            <h2 className="big" id="scarcity-h">
              <span className="r">3</span> Clients. That's the month.
            </h2>
            <p className="lede">
              A "rank or it's free" guarantee only works if we go deep on a few. We take three new
              clients a month — then the doors close.
            </p>
            <div className="slots">
              <span className="slot gone">Slot 1 — Taken</span>
              <span className="slot gone">Slot 2 — Taken</span>
              <span className="slot open">Slot 3 — Open ●</span>
            </div>
          </div>
        </section>

        {/* 2.10 Proof */}
        <section className="band-ink pad" aria-labelledby="proof-h">
          <div className="wrap">
            <p className="eyebrow eyebrow-red">Receipts, not promises</p>
            <h2 className="sec-h" id="proof-h">
              What the system does.
            </h2>
            <div className="proof">
              {STATS.map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="big num">{s.big}</div>
                  <div className="lab">{s.lab}</div>
                </div>
              ))}
            </div>
            <p className="foot-note">
              * Illustrative aggregate — swap for your real case-study numbers before going live.
            </p>
          </div>
        </section>

        {/* 2.11 FAQ */}
        <section className="band-ink pad" aria-labelledby="faq-h">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <h2 className="sec-h" id="faq-h">
              Fair questions.
            </h2>
          </div>
          <div className="wrap faq" style={{ textAlign: 'left' }}>
            {FAQ.map((f, i) => (
              <details key={i} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 2.12 Final CTA */}
        <section className="band-red pad" id="book" aria-labelledby="book-h">
          <div className="wrap">
            <p className="eyebrow eyebrow-ink">Last slot's open</p>
            <h2 className="sec-h" id="book-h">
              Make this the <span className="u">last</span> SEO call you book.
            </h2>
            <p className="lede">
              Grab the free strategy call and walk away with your 90-Day Growth Blueprint — hired or
              not. Or just text us. Either way, you'll know exactly how we'd win.
            </p>
            <div className="cta-row">
              <a className="btn btn-lg btn-cream" href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                📅 Book on Cal.com
              </a>
              <a className="btn btn-lg btn-wa" href={WA_FINAL} target="_blank" rel="noopener noreferrer">
                💬 WhatsApp us now
              </a>
            </div>
            <p className="micro">
              Rank or it's free · No lock-in · Blueprint is yours to keep
            </p>
          </div>
        </section>
      </main>

      {/* 2.13 Footer */}
      <footer className="site">
        <div className="wrap foot-in">
          <span className="brand">
            LAST&nbsp;<b>AGENCY</b>
          </span>
          <span>© 2026 LAST AGENCY · SEO, THE LAST TIME · PRICES IN INR, GST EXTRA</span>
        </div>
      </footer>
    </>
  );
}
