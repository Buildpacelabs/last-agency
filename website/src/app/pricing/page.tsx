import type { Metadata } from 'next';
import Link from 'next/link';
import {
  WA_HERO,
  BUNDLES,
  SERVICE_CARDS,
  PRICING_FAQ,
  SEO_SERVICE,
  SOCIAL_SERVICE,
  PERF_SERVICE,
  faqNode,
  breadcrumbNode,
} from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { FaqList } from '@/components/FaqList';
import { FinalCta } from '@/components/FinalCta';
import { ContentTeaser } from '@/components/ContentTeaser';

export const metadata: Metadata = {
  title: { absolute: 'SEO & Digital Marketing Pricing in India — Custom Quote' },
  description:
    'SEO, organic social and paid media, quoted to your scope — ex-GST, month-to-month, no lock-in. Bundle two or three services and pay less than à la carte. Contact us for a quote.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage(): JSX.Element {
  return (
    <>
      <JsonLd
        graph={[
          SEO_SERVICE,
          SOCIAL_SERVICE,
          PERF_SERVICE,
          faqNode('/pricing#faq', PRICING_FAQ),
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'Pricing', path: '/pricing' },
          ]),
        ]}
      />

      {/* Hero */}
      <header className="hero band-ink">
        <div className="wrap">
          <span className="sticker">⚡ Pricing + bundles</span>
          <h1>
            SEO and digital marketing pricing, <span className="u">quoted straight.</span>
          </h1>
          <p className="sub">
            Every service is month-to-month, ex-GST, no lock-in — priced to your scope rather than
            sold as a package you have to decode. Run more than one and the bundle beats buying à la
            carte, because one shared pipeline{' '}
            <span className="y">costs us less to deliver.</span>
          </p>
          <div className="cta-row">
            <a className="btn btn-lg btn-red" href="#book">
              Book a free strategy call
            </a>
            <a className="btn btn-lg btn-wa" href={WA_HERO} target="_blank" rel="noopener noreferrer">
              WhatsApp us instead
            </a>
          </div>
          <p className="trust">Ex-GST · Ad spend billed separately · Cancel with 30 days' notice</p>
        </div>
      </header>

      {/* Bundles */}
      <section className="band-ink pad" aria-labelledby="bundles-h">
        <div className="wrap">
          <p className="eyebrow eyebrow-red">Best value</p>
          <h2 className="sec-h" id="bundles-h">
            Bundle it. One team, one pipeline, one bill.
          </h2>
          <p className="lede">
            Every service shares the same content pipeline and the same data. Run them together and it
            costs us less to deliver — so it costs you less. Each service keeps its own guarantee; one
            team owns the whole number.
          </p>
          <div className="bundles-grid">
            {BUNDLES.map((b, i) => (
              <div className={`bundle${b.best ? ' best' : ''}`} key={i}>
                <div className="combine">
                  {b.combines.map((c, j) => (
                    <span className="chip" key={j}>
                      {c}
                    </span>
                  ))}
                </div>
                <h3>{b.name}</h3>
                <div className="price">
                  <span className="amt num">{b.price}</span>
                  <span className="per">for a custom quote</span>
                </div>
                <span className="save">Cheaper than à la carte</span>
                <p>{b.body}</p>
                <div className="bundle-cta">
                  <a className="btn btn-cream" href="#book">
                    Get this bundle
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="svc-note">
            Bundles are quoted per month, ex-GST. Ad spend billed separately. Cancel any single
            service with 30 days' notice.
          </p>
        </div>
      </section>

      {/* Single services recap */}
      <section className="band-red pad" aria-labelledby="single-h">
        <div className="wrap">
          <p className="eyebrow eyebrow-ink">Or take one at a time</p>
          <h2 className="sec-h" id="single-h">
            Single services. Full detail and tiers on each page.
          </h2>
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
        </div>
      </section>

      {/* FAQ */}
      <section className="band-ink pad" aria-labelledby="faq-h">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 className="sec-h" id="faq-h">
            Pricing questions.
          </h2>
        </div>
        <FaqList items={PRICING_FAQ} />
      </section>

      <ContentTeaser
        eyebrow="Every number we know, published"
        title="What this actually costs, in detail."
        band="band-ink"
        prefer={[
          { type: 'cost', slug: 'seo-cost-in-india' },
          { type: 'cost', slug: 'seo-pricing-models' },
          { type: 'cost', slug: 'seo-pricing-factors' },
          { type: 'cost', slug: 'is-seo-worth-the-money' },
          { type: 'answers', slug: 'how-to-compare-seo-proposals' },
          { type: 'compare', slug: 'retainer-vs-project' },
        ]}
      />

      <FinalCta
        eyebrow="Pick a plan, or ask us"
        title={
          <>
            Not sure which? <span className="u">We'll</span> tell you straight.
          </>
        }
        body="Book the free strategy call and we'll tell you exactly which service — or bundle — fits your stage and budget. Even if the honest answer is 'not yet'."
        micro="No lock-in · Ex-GST · Beat your baseline or it's free"
      />
    </>
  );
}
