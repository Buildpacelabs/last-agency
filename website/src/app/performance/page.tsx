import type { Metadata } from 'next';
import { WA_HERO, PERF_TIERS, PERF_FAQ, PERF_SERVICE, faqNode, breadcrumbNode } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { TierCard } from '@/components/TierCard';
import { FaqList } from '@/components/FaqList';
import { FinalCta } from '@/components/FinalCta';

export const metadata: Metadata = {
  title: 'Performance Marketing, Run Like Our Own Money',
  description:
    'Full-funnel Meta + Google paid media — creative, server-side tracking, CRO and reporting — on a flat fee with zero media markup. Beat your agreed baseline in 90 days or the fee is free. From ₹40,000/mo.',
  alternates: { canonical: '/performance' },
};

const DIFF: { q: string; a: string }[] = [
  {
    q: 'Flat fee. Zero markup.',
    a: "You pay a management fee; ad spend goes straight to Meta and Google. We never take a cut of your budget — so we're never tempted to just spend more of it.",
  },
  {
    q: 'We own the whole funnel.',
    a: 'Creative, bidding, tracking and the landing page — not just the click. Most agencies stop at the ad and blame your site.',
  },
  {
    q: 'Tracking that survives iOS.',
    a: 'Server-side tracking (Meta CAPI + GA4) recovers conversions that cookie loss and iOS would otherwise hide, so decisions run on real data.',
  },
  {
    q: 'Skin in the game.',
    a: "We agree a baseline CPA or ROAS from your data. Miss it in 90 days and next month's management fee is free.",
  },
];

export default function PerformancePage(): JSX.Element {
  return (
    <>
      <JsonLd
        graph={[
          PERF_SERVICE,
          faqNode('/performance#faq', PERF_FAQ),
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'Performance Marketing', path: '/performance' },
          ]),
        ]}
      />

      {/* Hero */}
      <header className="hero band-ink">
        <div className="wrap">
          <span className="sticker">⚡ Performance marketing</span>
          <h1>
            Paid media, run like{' '}
            <span className="u">it's our own money.</span>
          </h1>
          <p className="sub">
            We don't push buttons and bill you. We architect the funnel, produce the creative, own the
            tracking and the landing page — flat fee, zero media markup — and put our money on the
            result: <span className="y">beat baseline or the fee's free.</span>
          </p>
          <div className="cta-row">
            <a className="btn btn-lg btn-red" href="#book">
              Book a free paid audit
            </a>
            <a className="btn btn-lg btn-wa" href={WA_HERO} target="_blank" rel="noopener noreferrer">
              WhatsApp us instead
            </a>
          </div>
          <p className="trust">Meta + Google from day one · Server-side tracking · No media markup</p>
        </div>
      </header>

      {/* How it's different */}
      <section className="band-ink pad" aria-labelledby="diff-h">
        <div className="wrap">
          <p className="eyebrow eyebrow-red">Not a button-pushing shop</p>
          <h2 className="sec-h" id="diff-h">
            Why brands move their ad account to us.
          </h2>
          <div className="lies">
            {DIFF.map((d, i) => (
              <div className="lie" key={i}>
                <p className="q">{d.q}</p>
                <p className="a">{d.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="band-red pad" aria-labelledby="tiers-h">
        <div className="wrap">
          <p className="eyebrow eyebrow-ink">Scaled to your spend</p>
          <h2 className="sec-h" id="tiers-h">
            Plans that scale with your ad budget.
          </h2>
          <p className="lede">
            Flat management fee, priced by the ad spend we run for you. Dual-channel from day one,
            produced creative, server-side tracking and a guarantee — for less than most serious
            agencies charge.
          </p>
          <div className="tiers">
            {PERF_TIERS.map((t, i) => (
              <TierCard key={i} t={t} cta="Book a paid audit" />
            ))}
          </div>
          <p className="svc-note">
            Fees ex-GST; ad spend billed separately and paid straight to the platforms — no markup.
          </p>
        </div>
      </section>

      {/* Guarantee */}
      <section className="band-cream pad" aria-labelledby="pguar-h">
        <div className="wrap guar">
          <h2 className="stamp" id="pguar-h">
            Beat it or the fee's free
          </h2>
          <p>
            We set a baseline <b>CPA or ROAS</b> from your own numbers. If we don't beat it within{' '}
            <b>90 days</b>, next month's management fee is <b>free</b>. Your ad spend is always
            separate, and always yours — we take zero media markup.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="band-ink pad" aria-labelledby="faq-h">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 className="sec-h" id="faq-h">
            Fair questions.
          </h2>
        </div>
        <FaqList items={PERF_FAQ} />
      </section>

      <FinalCta
        eyebrow="Your account, our numbers"
        title={
          <>
            Make this the <span className="u">last</span> media buyer you hire.
          </>
        }
        body="Book a free paid audit — we'll pressure-test your account, size the opportunity, and set the baseline your guarantee is measured against. Your ad spend stays yours."
        micro="Flat fee · No media markup · Beat baseline or the fee's free"
      />
    </>
  );
}
