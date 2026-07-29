import type { Metadata } from 'next';
import { SITE_URL, ORG_NODE, PEOPLE, breadcrumbNode } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { PlainPage, type PlainSection } from '@/components/PlainPage';

export const metadata: Metadata = {
  title: { absolute: 'About Last Agency — How We Work and What We Promise' },
  description:
    'Last Agency runs SEO, organic social and paid media as one system for Indian brands. Published pricing, no lock-in, three new clients a month. Here is how it works.',
  alternates: { canonical: '/about' },
};

const SECTIONS: PlainSection[] = [
  {
    h2: 'What we actually do',
    body: [
      'We run three things — search, organic social and paid media — as one system off one shared pipeline, rather than as three vendors who each blame the other two. A keyword brief becomes a landing page, a reel script and a paid ad angle, because researching the demand once and using it three times is cheaper than researching it three times.',
      'Most brands arrive having already bolted three agencies together. The failure mode is never that any one of them is incompetent. It is that nobody owns the number, so every monthly report is a defence of that channel rather than an account of the business.',
    ],
  },
  {
    h2: 'Who you are actually dealing with',
    body: [
      `We are a small team working remotely from India. Two people run it: **${PEOPLE[0].name}**, who runs ${PEOPLE[0].does}, and **${PEOPLE[1].name}**, who owns ${PEOPLE[1].does}. Their profiles are linked below, and one of them is on the call you book — not a salesperson who hands you to someone else afterwards.`,
      'That is the whole org chart. It is also why we cap intake at three new clients a month: there is no bench to hide a struggling account behind, so the roster has to stay small enough that we can actually run it.',
    ],
    bullets: [
      `[${PEOPLE[0].name} — ${PEOPLE[0].role}](${PEOPLE[0].linkedin})`,
      `[${PEOPLE[1].name} — ${PEOPLE[1].role}](${PEOPLE[1].linkedin})`,
    ],
  },
  {
    h2: 'The guarantee, and what it actually means',
    body: [
      'Before we start, we freeze your trailing 90-day organic lead baseline. If we have not beaten it in 90 days, we keep working at no fee until we do. The exact metric, measurement window and exclusions are written into the engagement letter you sign, because a guarantee that is only a slogan on a website is not a guarantee.',
      'What we never promise is a specific ranking position. Nobody can honestly sell that — position is a function of a competitive set we do not control. We guarantee movement against **your own** number, which we can control.',
    ],
  },
  {
    h2: 'Why only three new clients a month',
    body: [
      'A performance guarantee only works if we go deep on a small roster. The first month of any engagement runs roughly double the steady-state workload — the audit, the keyword map, the baseline freeze, access to Search Console and analytics and the CRM, and the archaeology of working out what the previous agency did and why some of it needs reversing.',
      'Capping intake is how the guarantee stays solvent. If the month is full, we will say so on the call and give you a start date rather than a deposit request.',
    ],
  },
  {
    h2: 'Everything we know is published',
    body: [
      'There are around 500 pages on this site covering pricing, methods, comparisons, definitions and the arguments we actually have with clients. None of it is gated, none of it asks for an email, and a competent in-house marketer could use it to do a good deal of this work without us.',
      'That is deliberate. If the only reason to hire an agency is that it knows something you are not allowed to read, it is not much of a reason. Start with [what SEO actually costs in India](/cost/seo-cost-in-india), [how SEO agencies work](/answers/how-do-seo-agencies-work), or the [full library of answers](/answers).',
    ],
  },
  {
    h2: 'Who we are a good fit for',
    bullets: [
      'You have a real product and real revenue, and search is a growth lever rather than an experiment.',
      'You are done buying rankings and want leads and pipeline you can trace.',
      'You can move quickly on approvals and let a senior team run the play.',
      'You want one partner who owns search from crawl to closed deal.',
    ],
  },
  {
    h2: 'Who we are a bad fit for',
    bullets: [
      'You want a number-one ranking guaranteed by Friday. Nobody honest sells that.',
      'You are shopping purely on price for the cheapest freelancer available.',
      'You need leads this week — paid media is the faster lever, and we run [that too](/performance).',
      'You want a forty-tab report to forward rather than revenue you can bank.',
    ],
  },
  {
    h2: 'How to reach us',
    body: [
      'The fastest route is WhatsApp or a booked call — both are on the [contact page](/contact). Every price we charge is published on the [pricing page](/pricing), so you can qualify us out before you speak to anyone.',
      'Whoever picks up is one of the two people named above.',
    ],
  },
];

export default function AboutPage(): JSX.Element {
  return (
    <>
      <JsonLd
        graph={[
          {
            '@type': 'AboutPage',
            '@id': `${SITE_URL}/about#webpage`,
            url: `${SITE_URL}/about`,
            name: 'About Last Agency',
            description: metadata.description as string,
            inLanguage: 'en-IN',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#org` },
            mainEntity: { '@id': `${SITE_URL}/#org` },
          },
          ORG_NODE,
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
      <PlainPage
        eyebrow="About"
        h1="The last agency you'll ever hire — and why we say that"
        lede="Last Agency runs SEO, organic social and paid media as one system for Indian brands. Two people run it, both named below. Published pricing, no lock-in, a performance guarantee, and a cap of three new clients a month."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
        sections={SECTIONS}
      />
    </>
  );
}
