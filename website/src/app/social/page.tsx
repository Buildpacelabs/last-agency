import type { Metadata } from 'next';
import { WA_HERO, SOCIAL_TIERS, SOCIAL_FAQ, SOCIAL_SERVICE, faqNode, breadcrumbNode } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { TierCard } from '@/components/TierCard';
import { FaqList } from '@/components/FaqList';
import { FinalCta } from '@/components/FinalCta';
import { ContentTeaser } from '@/components/ContentTeaser';

export const metadata: Metadata = {
  title: { absolute: 'Social Media Marketing Agency in India — Last Agency' },
  description:
    'Social media marketing and content production from one Indian pipeline — reels, carousels and SEO blogs that grow your following and rankings. Contact us for a custom quote.',
  alternates: { canonical: '/social' },
};

/* The honest limits of the channel. Deliberately specific to organic social —
   the paid page makes a different argument because it is a different business. */
const LIMITS: { q: string; a: string }[] = [
  {
    q: 'It does not produce demand that was not already there.',
    a: 'Social reaches people scrolling, not people searching. It is good at making a brand familiar and bad at catching someone who has already decided to buy. That second job belongs to search, which is why we wire the two together rather than selling them separately.',
  },
  {
    q: 'A follower count is not a business metric.',
    a: 'We report reach and follows because you will ask, but the number we optimise is conversations started — DMs and comments that turn into an enquiry. A brand with 2,000 followers who buy beats 50,000 who scroll past.',
  },
  {
    q: 'Posts expire. The blog underneath them does not.',
    a: 'A reel is worth the most in its first 48 hours and close to nothing after a week. The long-form piece it was cut from keeps earning search traffic for years. That asymmetry is the entire reason we make you commission both.',
  },
  {
    q: 'Consistency beats brilliance, and consistency is the expensive part.',
    a: 'Anyone can make one good reel. Producing sixteen a month, on brand, on schedule, while someone answers the comments, is the work — and it is the only thing that compounds.',
  },
];

const DIFF: { q: string; a: string }[] = [
  {
    q: 'We produce — you never film.',
    a: 'Every reel is shot-scripted, directed and edited by us. No "just send us some clips." No touching a camera.',
  },
  {
    q: 'Write once, distribute twice.',
    a: 'The same blog that ranks on Google gets sliced into carousels, threads and reel scripts. One production line, two channels.',
  },
  {
    q: 'A named human, not a bot.',
    a: 'Real community management in your voice — comments and DMs answered by someone who knows your brand and turns replies into leads.',
  },
  {
    q: 'Content that compounds.',
    a: "Posts vanish in 48 hours; the blogs and pillar pages we build keep earning traffic for years. You build an asset, not a feed of confetti.",
  },
];

export default function SocialPage(): JSX.Element {
  return (
    <>
      <JsonLd
        graph={[
          SOCIAL_SERVICE,
          faqNode('/social#faq', SOCIAL_FAQ),
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'Organic Social', path: '/social' },
          ]),
        ]}
      />

      {/* Hero */}
      <header className="hero band-ink">
        <div className="wrap">
          <span className="sticker">⚡ Organic social + content</span>
          <h1>
            Social media marketing that <span className="u">ranks</span>. And grows a feed. From{' '}
            <span className="r">one line.</span>
          </h1>
          <p className="sub">
            Most social agencies make you supply the video and post into the void. We produce every
            reel ourselves and wire each piece to double as a search asset — so followers and Google
            traffic <span className="y">compound together.</span> Produced in India, priced in rupees,
            quoted to your scope.
          </p>
          <div className="cta-row">
            <a className="btn btn-lg btn-red" href="#book">
              See the packages
            </a>
            <a className="btn btn-lg btn-wa" href={WA_HERO} target="_blank" rel="noopener noreferrer">
              WhatsApp us instead
            </a>
          </div>
          <p className="trust">Reels produced by us · SEO-wired content · No lock-in</p>
        </div>
      </header>

      {/* What makes it different */}
      <section className="band-ink pad" aria-labelledby="diff-h">
        <div className="wrap">
          <p className="eyebrow eyebrow-red">Not a post factory</p>
          <h2 className="sec-h" id="diff-h">
            Why this beats a cheaper social package.
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

      {/* What social does and doesn't do — the argument only this page makes */}
      <section className="band-cream pad" aria-labelledby="honest-h">
        <div className="wrap">
          <p className="eyebrow eyebrow-red">Before you brief anyone</p>
          <h2 className="sec-h" id="honest-h">
            What organic social actually does, and what it doesn&rsquo;t.
          </h2>
          <p className="lede">
            Most social proposals are careful not to tell you this, because the honest version is
            smaller than the pitch. It is still worth buying — it is just worth buying for the right
            reason.
          </p>
          <div className="lies">
            {LIMITS.map((d, i) => (
              <div className="lie" key={i}>
                <p className="q">{d.q}</p>
                <p className="a">{d.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="band-red pad" aria-labelledby="tiers-h">
        <div className="wrap">
          <p className="eyebrow eyebrow-ink">Pick your pace</p>
          <h2 className="sec-h" id="tiers-h">
            Social packages, priced to beat the market.
          </h2>
          <p className="lede">
            Every tier produces video end-to-end and repurposes long-form content into both search and
            social. Priced at or under comparable agencies — with more actually included.
          </p>
          <div className="tiers">
            {SOCIAL_TIERS.map((t, i) => (
              <TierCard key={i} t={t} cta="Start with this" />
            ))}
          </div>
          <p className="svc-note">
            Every tier is quoted per month, ex-GST. Month-to-month after the first quarter. Reels produced by us
            — you never supply footage.
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
        <FaqList items={SOCIAL_FAQ} />
      </section>

      <ContentTeaser
        eyebrow="No pitch, no gate, no email required"
        title="What we've published on social and content."
        band="band-ink"
        prefer={[
          { type: 'compare', slug: 'seo-vs-social-media' },
          { type: 'compare', slug: 'organic-social-vs-paid-social' },
          { type: 'answers', slug: 'how-to-do-seo-on-instagram' },
          { type: 'services', slug: 'content-marketing-services' },
          { type: 'cost', slug: 'content-writing-cost-india' },
          { type: 'compare', slug: 'seo-vs-influencer-marketing' },
        ]}
      />

      <FinalCta
        title={
          <>
            Make this the <span className="u">last</span> content agency you brief.
          </>
        }
        body="Book the free strategy call and we'll show you exactly how your content ranks and grows a feed at the same time — with a sample content plan for your brand. Hired or not."
        micro="No lock-in · Reels produced by us · Cancel with 30 days' notice"
      />
    </>
  );
}
