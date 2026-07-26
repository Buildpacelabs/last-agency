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

const STATS: { big: string; lab: string }[] = [
  { big: '+312%', lab: 'Avg organic leads / 6 mo' },
  { big: '3.4×', lab: 'Blended ROAS on paid media' },
  { big: '0', lab: 'Clients on lock-in contracts' },
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
          <p className="trust">
            <span className="stars" role="img" aria-label="5 out of 5 stars">
              ★★★★★
            </span>{' '}
            · Trusted by founders who got burned before · No contracts · No jargon
          </p>
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
          <div className="slots">
            <span className="slot gone">Slot 1 — Taken</span>
            <span className="slot gone">Slot 2 — Taken</span>
            <span className="slot open">Slot 3 — Open ●</span>
          </div>
        </div>
      </section>

      <ContentTeaser
        eyebrow="No pitch, no gate, no email required"
        title="Everything we know, published."
        prefer={[
          { type: 'answers', slug: 'how-do-seo-agencies-work' },
          { type: 'cost', slug: 'seo-cost-in-india' },
          { type: 'compare', slug: 'ppc-vs-seo' },
          { type: 'compare', slug: 'agency-vs-in-house' },
          { type: 'answers', slug: 'how-to-choose-an-seo-agency' },
          { type: 'glossary', slug: 'backlink' },
        ]}
        fill={['answers', 'cost', 'compare', 'glossary', 'journal']}
      />

      <FinalCta />
    </>
  );
}
