/* =========================================================================
   Shared site data — links, pricing, marquee, FAQs, JSON-LD builders.
   Plain TS (no JSX) so it can be imported by both server components and
   metadata. Rich components live in src/components.
   ========================================================================= */

export const SITE_URL = 'https://lastagency.com';
export const WA_NUMBER = '919315776817';
export const WA_HERO =
  'https://wa.me/919315776817?text=Hi%20Last%20Agency%20%E2%80%94%20I%20want%20to%20rank.%20Send%20me%20the%20details.';
export const WA_FINAL =
  'https://wa.me/919315776817?text=Hi%20Last%20Agency%20%E2%80%94%20I%20want%20the%2090-Day%20Blueprint.';
export const CAL_LINK = 'https://cal.com/priyanshu-semwal-8qcxab/lastagency-last-seo-call';

export const MARQUEE_ITEMS = [
  "Guaranteed — or it's free",
  "The last agency you'll ever hire",
  'No lock-in',
  'Beat your baseline in 90 days',
  'Only 3 clients / month',
];

/* --- Pricing ------------------------------------------------------------- */
export type Tier = {
  badge: string;
  badgeClass?: string;
  featured?: boolean;
  name: string;
  tagline: string;
  price: string;
  bracket?: string;
  get: string[];
  how: string[];
};

export const SOCIAL_TIERS: Tier[] = [
  {
    badge: 'Starter',
    name: 'Content Starter',
    tagline: 'Show up consistently on the channels that matter — without ever touching a camera.',
    price: '₹30,000',
    get: [
      'A consistent, on-brand presence on your 2 most important channels',
      'Every reel shot-scripted and edited by us — you never supply footage',
      'Captions and topics mapped to real keyword demand, so social feeds search',
      'A real human answering comments and DMs in business hours',
      'One monthly strategy call + a plain-English performance report',
    ],
    how: [
      '2 platforms (Instagram + Facebook or LinkedIn)',
      '16 posts + 4 fully-produced reels / month',
      'Branded templates + original copywriting',
      'Keyword-informed hashtag & topic research',
      '1 SEO blog / month, repurposed from your best social',
      'Named account lead + monthly report',
    ],
  },
  {
    badge: 'Most popular',
    badgeClass: 'pop',
    featured: true,
    name: 'Growth Engine',
    tagline: 'One production line that grows followers AND organic search at the same time.',
    price: '₹50,000',
    get: [
      'A content engine that compounds followers and Google traffic together',
      'Art-directed, trend-led creative — not recycled templates',
      'Proactive community management that turns comments into leads',
      'Two ranking blogs a month, sliced into carousels, threads and reel scripts',
      "Bi-weekly reporting + strategy calls so you always know what's next",
    ],
    how: [
      '3 platforms (Instagram + 2 of Facebook / LinkedIn / YouTube Shorts)',
      '20 posts + 8 fully-produced reels / month',
      'Custom creative direction + trend research + concepting',
      '2 SEO long-form blogs / month — write once, distribute twice',
      'Competitor content analysis + monthly strategy',
      'Named lead, 1-business-day response',
    ],
  },
  {
    badge: 'Full service',
    badgeClass: 'full',
    name: 'Brand Studio',
    tagline: 'A dedicated creative pod that runs your brand like an in-house studio.',
    price: '₹70,000',
    get: [
      "A dedicated pod that runs your brand like in-house — for a fraction of a boutique agency's cost",
      'High-velocity produced video: concept, shoot direction and edit handled',
      'A compounding SEO asset base — pillar-and-cluster, not one-off posts',
      'Influencer and UGC collaborations coordinated for you',
      'Weekly reporting, a live dashboard and a manager who owns the outcome',
    ],
    how: [
      '3–4 platforms with per-platform content plans',
      '30 posts + 12 fully-produced reels / month',
      'Dedicated pod: strategist + designer + video editor',
      '4 SEO blogs / month in a pillar/cluster structure, repurposed across social',
      'Influencer / UGC collaboration coordination',
      'Dedicated manager, same-day response',
    ],
  },
];

export const PERF_TIERS: Tier[] = [
  {
    badge: 'Entry',
    name: 'Ignite',
    tagline: 'Both Meta and Google, run by a senior buyer — not a set-and-forget script.',
    price: '₹40,000',
    bracket: 'Manages up to ₹2L / mo ad spend',
    get: [
      'Your ads live on both Meta and Google from day one — not just one channel',
      'A senior buyer actually structuring and optimising the account',
      'Conversion tracking installed correctly, so every rupee is measured',
      'Fresh creative produced and tested monthly, never left to fatigue',
      "Guarantee: beat your agreed baseline (CPA or ROAS — your call) in 90 days, or next month's management fee is free",
    ],
    how: [
      'Dual channel: Meta (FB + IG) + Google Ads',
      'Full account setup, structuring and audience research',
      '8–12 ad-creative variants / month, tested in a framework',
      'Conversion tracking + pixel/tag setup and QA',
      'Weekly optimisation, monthly review call',
    ],
  },
  {
    badge: 'Most popular',
    badgeClass: 'pop',
    featured: true,
    name: 'Scale',
    tagline: 'Full-funnel Meta + Google, a real creative pipeline, and tracking you can trust.',
    price: '₹75,000',
    bracket: 'Manages ₹2L–₹8L / mo ad spend',
    get: [
      'Full-funnel Meta + Google run by a dedicated buyer who owns your numbers',
      '20–30 tested creative variants a month, so winners are found fast',
      'Server-side tracking (Meta CAPI + GA4) recovers conversions that iOS and cookie loss would otherwise hide',
      'We own the landing page and conversion rate, not just the click',
      "Guarantee: beat your agreed baseline (CPA or ROAS — your call) in 90 days, or next month's management fee is free",
    ],
    how: [
      'Full-funnel Meta + Google: prospecting, retargeting, retention',
      '20–30 creative variants / month from a dedicated pipeline',
      'Server-side tracking (Conversions API + GA4 server-side)',
      'Landing-page / CRO ownership and A/B testing',
      'Dedicated senior buyer + analyst, weekly reviews, live dashboard',
    ],
  },
  {
    badge: 'Full service',
    badgeClass: 'full',
    name: 'Dominate',
    tagline: 'A cross-functional pod run like your in-house growth team, with attribution you can trust.',
    price: '₹1,50,000',
    bracket: 'Manages ₹8L–₹25L / mo ad spend',
    get: [
      'A cross-functional pod: senior buyer + creative team + analyst',
      '40–60 tested variants a month across every format',
      'Attribution you can trust: server-side tracking + incrementality testing',
      'Programmatic, YouTube and marketplace channels layered on as you scale',
      'Skin in the game: we only earn a performance bonus once you clear your target ROAS — on top of the same fee-free guarantee',
    ],
    how: [
      'Full-funnel across Meta, Google, YouTube + programmatic as needed',
      '40–60 creative variants / month from a dedicated creative team',
      'Advanced attribution: server-side tracking, incrementality + media-mix testing',
      'Flat ₹1.5L floor OR floor + 8–10% of spend (whichever is higher)',
      'Real-time dashboards, weekly reviews + monthly strategy sessions',
    ],
  },
];

export type Bundle = {
  combines: string[];
  name: string;
  price: string;
  was: string;
  save: string;
  body: string;
  best?: boolean;
};

export const BUNDLES: Bundle[] = [
  {
    combines: ['SEO', 'Social'],
    name: 'Organic Growth Engine',
    price: '₹99,000',
    was: '₹1,25,000 à la carte',
    save: 'Save ₹26,000 / mo · ~21% off',
    body: 'Own organic: rank on Google and build a branded feed from one shared content pipeline. The blogs and social are produced once and distributed across both — so it costs less to run, and we pass the saving on.',
  },
  {
    combines: ['Social', 'Performance'],
    name: 'Full-Funnel Starter',
    price: '₹75,000',
    was: '₹90,000 à la carte',
    save: 'Save ₹15,000 / mo · ~17% off',
    body: "Demand now. Produced organic content plus dual-channel paid ads for D2C and lead-gen brands that aren't ready for full SEO yet. Your organic creative doubles as ad creative, cutting production cost.",
  },
  {
    combines: ['SEO', 'Social', 'Performance'],
    name: 'Own Everything Stack',
    price: '₹1,75,000',
    was: '₹2,20,000 à la carte',
    save: 'Save ₹45,000 / mo · ~20% off',
    best: true,
    body: 'One team owns search, social and paid end-to-end: a single content pipeline feeds all three, and attribution is unified across organic and paid. Every service keeps its own guarantee — SEO works free until it beats your baseline, paid waives a month’s fee if it misses — and one partner is accountable for the whole number, instead of three vendors pointing fingers.',
  },
];

/* --- Home service overview cards ----------------------------------------- */
export type ServiceCard = {
  k: string;
  href: string;
  name: string;
  one: string;
  from: string;
  points: string[];
  go: string;
};

export const SERVICE_CARDS: ServiceCard[] = [
  {
    k: '01',
    href: '/seo',
    name: 'SEO',
    one: 'The six-engine growth system that ranks you — or works free until it does.',
    from: 'From ₹75,000 / mo',
    points: [
      'Technical, content, digital PR & programmatic SEO',
      'AEO / GEO so AI answers cite you too',
      'One number that matters: leads from search',
    ],
    go: 'See the SEO system',
  },
  {
    k: '02',
    href: '/social',
    name: 'Organic Social & Content',
    one: 'Produced reels and blogs from one line — content that grows a feed and ranks on Google.',
    from: 'From ₹30,000 / mo',
    points: [
      'Reels shot & edited by us, end-to-end',
      'Write once, distribute across search + social',
      'Real community management, not auto-replies',
    ],
    go: 'See social packages',
  },
  {
    k: '03',
    href: '/performance',
    name: 'Performance Marketing',
    one: "Full-funnel Meta + Google run like it's our own money — flat fee, no media markup.",
    from: 'From ₹40,000 / mo',
    points: [
      'Dual-channel from day one',
      'Server-side tracking & CRO ownership',
      'Beat your baseline in 90 days or the fee is free',
    ],
    go: 'See paid plans',
  },
];

/* --- FAQs ---------------------------------------------------------------- */
export type Faq = { q: string; a: string };

export const SEO_FAQ: Faq[] = [
  {
    q: 'You said no ranking guarantees — but "rank or it\'s free"?',
    a: "We don't promise a specific position for a specific keyword (impossible, and against Google's rules). We guarantee growth against your own baseline. Miss it in 90 days and we work free until we beat it. Honest and still bold.",
  },
  {
    q: 'Why only 3 clients a month?',
    a: "Because the guarantee is real. We can only carry that risk if every client gets deep, senior attention. Volume agencies can't offer this — that's the point.",
  },
  {
    q: "What's actually included vs. an add-on?",
    a: "The six engines are the core SEO system. Other channels — social, paid ads, email/CRM — are their own services (see Pricing). We'll tell you straight in the strategy call what you actually need.",
  },
  {
    q: 'Is there a contract?',
    a: "Month-to-month after the first quarter. 30-day notice. You keep every asset, page and report. Lock-in is a red flag; we don't do it.",
  },
  {
    q: 'What determines my price?',
    a: 'Site size, competition, and how aggressive you want to go. Smaller sites start around ₹40k/mo; the full six-engine system is from ₹75k/mo, GST extra. We quote you straight on the call — no "packages" you have to decode.',
  },
  {
    q: 'How do you measure my "baseline"?',
    a: 'On day one we freeze one number: qualified leads from organic search over your trailing 90 days. That single figure is the bar. "Beat your baseline in 90 days" means beat that — not a vanity metric we cherry-pick later. We track traffic and rankings too, but leads are what the guarantee is settled on.',
  },
  {
    q: 'I already have an in-house SEO or another agency. Now what?',
    a: "Great — we audit what's working and only replace what isn't. Sometimes we run alongside your team as the senior brain. The Blueprint alone is usually worth the call — and it's yours free either way.",
  },
  {
    q: 'Who actually does the work?',
    a: 'Senior operators, not interns behind a dashboard. Three clients a month exists precisely so the people who win the strategy call are the people running your account.',
  },
];

export const SOCIAL_FAQ: Faq[] = [
  {
    q: 'Do I have to supply the videos?',
    a: "No — that's the whole point. We shot-script, direct and edit every reel end-to-end. Most 'reel' packages quietly make you film your own footage; we don't.",
  },
  {
    q: 'How does social feed my SEO?',
    a: 'Every cycle produces long-form blogs mapped to real keyword demand, then slices them into carousels, threads and reel scripts. One production line, two channels — search and social — so the work compounds instead of vanishing in 48 hours.',
  },
  {
    q: 'Which platforms do you cover?',
    a: 'Instagram is the core. Depending on your tier we add Facebook, LinkedIn and YouTube Shorts. We pick the two or three where your buyers actually are, not all seven for show.',
  },
  {
    q: 'Is there a lock-in?',
    a: 'Month-to-month after the first quarter, 30-day notice, and you keep every asset and template we make. Same no-lock-in policy as the rest of Last Agency.',
  },
];

export const PERF_FAQ: Faq[] = [
  {
    q: 'Is ad spend included in the fee?',
    a: "No, and that's on purpose. You pay a flat management fee; your ad budget is billed separately and goes straight to Meta and Google. We take zero media markup — so we're never incentivised to just spend more of your money.",
  },
  {
    q: 'What ad spend do I need to start?',
    a: "Ignite is built for up to ₹2L/mo in spend, Scale for ₹2–8L, Dominate for ₹8–25L. If you're below that, we'll tell you honestly whether paid is even the right move yet — sometimes SEO or social comes first.",
  },
  {
    q: 'How does the guarantee work?',
    a: "From your existing data we agree a baseline CPA or ROAS — your call which metric. If we don't beat it within 90 days, your next month's management fee is free. Ad spend is separate and always yours.",
  },
  {
    q: 'Meta, Google, or both?',
    a: "Both, from day one, even on the entry tier — most 'cheap' shops run a single channel and leave money on the table. As you scale we layer on YouTube, programmatic and marketplace.",
  },
];

export const PRICING_FAQ: Faq[] = [
  {
    q: 'Are these prices all-in?',
    a: 'Management fees are per month, ex-GST. For performance marketing, ad spend is billed separately and paid straight to the platforms — no markup. Everything else is exactly the sticker price.',
  },
  {
    q: 'Can I mix and match?',
    a: "Yes. Start with one service and add another when you're ready, or take a bundle and save up to ~21%. Any single service can be cancelled with 30 days' notice — bundles just re-rate to à la carte.",
  },
  {
    q: 'Which should I start with?',
    a: "If you want compounding, durable growth: SEO. If you need a branded presence and content that ranks: Social. If you need demand now and have budget to spend: Performance. Not sure? Book the free call and we'll tell you straight — even if the answer is 'not yet'.",
  },
];

/* --- JSON-LD nodes ------------------------------------------------------- */
export const ORG_NODE = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#org`,
  name: 'Last Agency',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description:
    'A guarantee-led growth agency — SEO, organic social and performance marketing run as one system, each service on its own performance guarantee.',
  slogan: "Beat your number, or it's free.",
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: `+${WA_NUMBER}`,
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  ],
};

export const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Last Agency',
  publisher: { '@id': `${SITE_URL}/#org` },
  inLanguage: 'en-IN',
};

export function serviceNode(opts: {
  id: string;
  name: string;
  serviceType: string;
  description: string;
  path: string;
  offer: { low: string; high?: string; count?: number };
}): Record<string, unknown> {
  const offers =
    opts.offer.high
      ? {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: opts.offer.low,
          highPrice: opts.offer.high,
          offerCount: opts.offer.count ?? 3,
          url: `${SITE_URL}${opts.path}`,
        }
      : {
          '@type': 'Offer',
          price: opts.offer.low,
          priceCurrency: 'INR',
          url: `${SITE_URL}${opts.path}`,
        };
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}${opts.id}`,
    name: opts.name,
    serviceType: opts.serviceType,
    provider: { '@id': `${SITE_URL}/#org` },
    areaServed: 'IN',
    description: opts.description,
    offers,
  };
}

export function faqNode(id: string, faqs: Faq[]): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${id}`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export const SEO_SERVICE = serviceNode({
  id: '/seo#service',
  name: 'SEO',
  serviceType: 'Search engine optimization',
  description:
    'Six SEO engines — technical, content, digital PR, programmatic SEO, AEO/GEO and live reporting — stacked into one performance-guaranteed system.',
  path: '/seo',
  offer: { low: '75000' },
});

export const SOCIAL_SERVICE = serviceNode({
  id: '/social#service',
  name: 'Organic Social & Content',
  serviceType: 'Social media marketing',
  description:
    'End-to-end produced social content — reels, carousels and SEO blogs from one pipeline — that grows followers and organic search together.',
  path: '/social',
  offer: { low: '30000', high: '70000' },
});

export const PERF_SERVICE = serviceNode({
  id: '/performance#service',
  name: 'Performance Marketing',
  serviceType: 'Pay-per-click advertising management',
  description:
    "Full-funnel Meta and Google paid media — creative, server-side tracking, CRO and a beat-your-baseline-or-it's-free guarantee. Flat fee, no media markup.",
  path: '/performance',
  offer: { low: '40000', high: '150000' },
});
