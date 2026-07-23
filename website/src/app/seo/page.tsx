import type { Metadata } from 'next';
import { WA_HERO, SEO_FAQ, SEO_SERVICE, faqNode, breadcrumbNode } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Guarantee } from '@/components/Guarantee';
import { FaqList } from '@/components/FaqList';
import { FinalCta } from '@/components/FinalCta';

export const metadata: Metadata = {
  title: "SEO That Ranks — or It's Free",
  description:
    "The Last Agency Growth System: six SEO engines — technical, content, digital PR, programmatic SEO, AEO/GEO and live reporting — for one price. Beat your organic baseline in 90 days or we work free. From ₹75,000/mo.",
  alternates: { canonical: '/seo' },
};

const ENGINES: { name: string; desc: string; val: string }[] = [
  { name: 'Technical + Performance Overhaul', desc: 'Crawl, schema, Core Web Vitals, speed — a foundation that ranks.', val: '₹80,000' },
  { name: 'Content & Topic-Cluster Engine', desc: 'Pillar pages, clusters, refreshes, blogs on a fixed cadence.', val: '₹1,20,000' },
  { name: 'Digital PR + Backlink Machine', desc: 'Linkable assets & authority links that actually move DR.', val: '₹1,50,000' },
  { name: 'pSEO + Internal Link Architecture', desc: 'Programmatic pages that scale, wired together to compound.', val: '₹90,000' },
  { name: 'AEO / GEO Future-Proofing', desc: 'Get cited by AI answers & generative search, not just Google.', val: '₹60,000' },
  { name: 'Live Dashboard + Strategy Calls', desc: 'One screen: leads from search. Real humans on call.', val: '₹40,000' },
];

const VEQ: { dir: 'up' | 'down'; arrow: string; label: string; body: string }[] = [
  { dir: 'up', arrow: '↑', label: 'Dream outcome', body: 'More qualified leads from search. Not rankings — revenue.' },
  { dir: 'up', arrow: '↑', label: 'Likelihood', body: 'Proven system + a guarantee that puts our money on it.' },
  { dir: 'down', arrow: '↓', label: 'Time delay', body: 'Movement in 90 days, not 18 months of "trust us."' },
  { dir: 'down', arrow: '↓', label: 'Effort & sacrifice', body: 'We run all 6 engines. You approve and watch it grow.' },
];

const RUN: { k: string; n: string; h: string; p: string }[] = [
  { k: 'Week 1', n: '01', h: 'Teardown & Blueprint', p: "We crawl everything, find what's quietly bleeding traffic, and hand you a keyword-to-revenue plan — yours to keep whether you hire us or not." },
  { k: 'Weeks 2–4', n: '02', h: 'Fix the foundation', p: 'Technical and performance overhaul. Schema, speed, Core Web Vitals — the plumbing that silently caps every other effort.' },
  { k: 'Weeks 5–12', n: '03', h: 'Compound the machine', p: 'Content clusters ship on cadence, digital PR earns real links, programmatic pages scale. Authority starts to stack.' },
  { k: 'Day 90', n: '04', h: 'We prove it — or work free', p: 'You see the needle move on leads from search, or every engine keeps running at zero cost until it does.' },
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
  'You need leads this week — paid media is the faster lever, and we run that too.',
  'You want a 40-tab report to forward, not revenue you can bank.',
];

const BONUSES: { bn: string; title: string; body: string; worth: string }[] = [
  { bn: 'BONUS 01', title: '90-Day Growth Blueprint', body: "A full audit + keyword-to-revenue roadmap, built before we're even hired. Yours to keep either way.", worth: 'Worth ₹25,000' },
  { bn: 'BONUS 02', title: 'Competitor Kill-List', body: "Every keyword your rivals rank for and you don't — prioritised by how fast we can steal it.", worth: 'Worth ₹20,000' },
  { bn: 'BONUS 03', title: 'CRO Quick-Wins Pass', body: 'We tune your top pages so the traffic we send actually converts. More leads from the same visits.', worth: 'Worth ₹30,000' },
];

export default function SeoPage(): JSX.Element {
  return (
    <>
      <JsonLd
        graph={[
          SEO_SERVICE,
          faqNode('/seo#faq', SEO_FAQ),
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'SEO', path: '/seo' },
          ]),
        ]}
      />

      {/* Hero */}
      <header className="hero band-ink">
        <div className="wrap">
          <span className="sticker">⚡ SEO — but the last time</span>
          <h1>
            Fire your SEO agency. <span className="r">Hire the</span>{' '}
            <span className="u">last one</span> you'll ever need.
          </h1>
          <p className="sub">
            Every agency sold you rankings and delivered spreadsheets. We build a growth system that
            pays for itself — and if it doesn't beat your numbers in 90 days,{' '}
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

      {/* Grand Slam Offer */}
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

      {/* Value Equation */}
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

      <Guarantee />

      {/* The 90-Day Run */}
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

      {/* Bonuses */}
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

      {/* Who it's for */}
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

      {/* FAQ */}
      <section className="band-ink pad" aria-labelledby="faq-h">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 className="sec-h" id="faq-h">
            Fair questions.
          </h2>
        </div>
        <FaqList items={SEO_FAQ} />
      </section>

      <FinalCta
        title={
          <>
            Make this the <span className="u">last</span> SEO call you book.
          </>
        }
        body="Grab the free strategy call and walk away with your 90-Day Growth Blueprint — hired or not. Or just text us. Either way, you'll know exactly how we'd win."
        micro="Rank or it's free · No lock-in · Blueprint is yours to keep"
      />
    </>
  );
}
