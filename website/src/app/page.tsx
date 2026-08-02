import type { Metadata } from 'next';
import Link from 'next/link';
import {
  WA_HERO,
  SERVICE_CARDS,
  SEO_SERVICE,
  SOCIAL_SERVICE,
  PERF_SERVICE,
} from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { FinalCta } from '@/components/FinalCta';
import { ContentTeaser } from '@/components/ContentTeaser';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

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
        40 tabs of vanity metrics nobody reads. We report one thing:{' '}
        <b>leads and revenue.</b> The number that pays your bills.
      </>
    ),
  },
  {
    q: '"That channel isn\'t our department."',
    a: (
      <>
        So you hire three agencies who blame each other. We run <b>search, social and paid</b> as
        one team — one throat to choke, one number to move.
      </>
    ),
  },
];

/* Every number here is verifiable by a visitor without taking our word for it:
   count the library, read the pricing page, read the guarantee. We do not publish
   client results we cannot attribute. */
const STATS: { big: string; lab: string }[] = [
  { big: '0', lab: 'Clients on lock-in contracts' },
  { big: '500', lab: 'Pages published, nothing gated' },
  { big: '90', lab: 'Days to beat your baseline, or you stop paying' },
];

export default function HomePage(): JSX.Element {
  return (
    <>
      <JsonLd graph={[SEO_SERVICE, SOCIAL_SERVICE, PERF_SERVICE]} />

      {/* Hero */}
      <header className="hero band-ink">
        <div className="wrap">
          <span className="sticker">⚡ Search · Social · Paid — but the last time</span>
          <h1>
            Fire your agencies. <span className="r">Hire the</span>{' '}
            <span className="u">last one</span> you'll ever need.
          </h1>
          <p className="sub">
            Search, social, paid — most brands bolt three vendors together and hope. We run all three
            as one growth system, off one shared pipeline, and every engine is on the line:{' '}
            <span className="y">miss your number and you stop paying for it.</span>
          </p>
          <div className="cta-row">
            <a className="btn btn-lg btn-red" href="#book">
              Book a free strategy call
            </a>
            <a className="btn btn-lg btn-wa" href={WA_HERO} target="_blank" rel="noopener noreferrer">
              WhatsApp us instead
            </a>
          </div>
          <p className="trust">One straight quote · No contracts · No jargon</p>
        </div>
      </header>

      {/* The four lies */}
      <section className="band-ink pad" aria-labelledby="lies-h">
        <div className="wrap">
          <p className="eyebrow eyebrow-red">You've heard this before</p>
          <h2 className="sec-h" id="lies-h">
            Every agency told you the same four lies.
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

      {/* Services overview — derives clicks to detail pages */}
      <section className="band-red pad" id="services" aria-labelledby="services-h">
        <div className="wrap">
          <p className="eyebrow eyebrow-ink">Three engines. One team. Each on the line.</p>
          <h2 className="sec-h" id="services-h">
            Pick your growth engine. Or run all three.
          </h2>
          <p className="lede">
            Most brands duct-tape an SEO freelancer, a social intern and a media buyer together — then
            wonder why nothing compounds. We run search, social and paid as one system, off one shared
            content pipeline, on one promise.
          </p>

          <div className="svc-cards">
            {SERVICE_CARDS.map((s) => (
              <Link className="svc-card" href={s.href} key={s.href}>
                <span className="k">{s.k} · Service</span>
                <h3>{s.name}</h3>
                <p className="one">{s.one}</p>
                <div className="from num">{s.from}</div>
                <ul>
                  {s.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                <span className="go">{s.go} →</span>
              </Link>
            ))}
          </div>

          <p className="svc-note">
            Running more than one? <Link href="/pricing">Bundles save up to ~21% →</Link>
          </p>
        </div>
      </section>

      {/* Umbrella guarantee — honest, per service */}
      <section className="band-cream pad" aria-labelledby="guar-h">
        <div className="wrap guar">
          <h2 className="stamp" id="guar-h">
            Beat it or it's free
          </h2>
          <p>
            Every engine we run is on the line. <b>SEO</b> works completely free until it beats your
            organic baseline. <b>Paid media</b> waives next month's fee if it misses your target.{' '}
            <b>Social</b> is month-to-month with produced assets you keep. And we take only{' '}
            <b>three clients a month</b> — so we sign only what we can win.
          </p>
        </div>
      </section>

      {/* Proof */}
      <section className="band-ink pad" aria-labelledby="proof-h">
        <div className="wrap">
          <p className="eyebrow eyebrow-red">Checkable, not claimed</p>
          <h2 className="sec-h" id="proof-h">
            What you can check before you call.
          </h2>
          <div className="proof">
            {STATS.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="big num">{s.big}</div>
                <div className="lab">{s.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scarcity */}
      <section className="band-red pad scarcity" aria-labelledby="scarcity-h">
        <div className="wrap">
          <p className="eyebrow eyebrow-ink">This isn't false urgency</p>
          <h2 className="big" id="scarcity-h">
            <span className="r">3</span> Clients. That's the month.
          </h2>
          <p className="lede">
            A "beat it or it's free" guarantee only works if we go deep on a few. We take three new
            clients a month — then the doors close.
          </p>
          <p className="micro">
            If the month is full we will tell you on the call and give you a start date, not a
            deposit request.
          </p>
        </div>
      </section>

      {/* The homepage is the only URL on this domain with any authority, so these
          six links are the most valuable internal links we have. They previously
          pointed at pages we cannot win — /glossary/backlink shares a SERP with
          Wikipedia, Moz, Ahrefs and Semrush. These six sit on SERPs with no
          authority competitor at all, and they serve the buyer who is mid-purchase
          or mid-breakup with an agency. */}
      <ContentTeaser
        eyebrow="No pitch, no gate, no email required"
        title="Everything we know, published."
        prefer={[
          { type: 'answers', slug: 'can-i-fire-my-seo-agency' },
          { type: 'answers', slug: 'how-to-compare-seo-proposals' },
          { type: 'journal', slug: 'how-to-set-an-seo-baseline' },
          { type: 'compare', slug: 'retainer-vs-project' },
          { type: 'journal', slug: 'local-seo-in-tier-2-india' },
          { type: 'cost', slug: 'seo-cost-in-kolkata' },
        ]}
        fill={['answers', 'cost', 'compare', 'glossary', 'journal']}
      />

      <FinalCta />
    </>
  );
}
