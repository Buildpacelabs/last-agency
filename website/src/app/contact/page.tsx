import type { Metadata } from 'next';
import { SITE_URL, WA_HERO, CAL_LINK, EMAIL, ORG_NODE, breadcrumbNode } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { PlainPage, type PlainSection } from '@/components/PlainPage';

export const metadata: Metadata = {
  title: { absolute: 'Contact Last Agency — WhatsApp or Book a Strategy Call' },
  description:
    'Talk to Last Agency about SEO, organic social or paid media. Email info@lastagencyhere.com, WhatsApp +91 93157 76817, or book a free 30-minute strategy call.',
  alternates: { canonical: '/contact' },
};

/* The number is written out as readable text as well as sitting inside the
   wa.me href — a phone number that exists only inside a link is invisible to
   anyone reading the page as text, including Google and every AI answer engine. */
const READABLE_PHONE = '+91 93157 76817';

const SECTIONS: PlainSection[] = [
  {
    h2: 'WhatsApp',
    body: [
      `The fastest way to reach us is WhatsApp on **${READABLE_PHONE}** — [open a chat](${WA_HERO}). Messages go to the team that would actually run your account, not to a reception desk.`,
      'Tell us your site, your category and the one number you want to move. That is enough for us to say something useful in the first reply.',
    ],
  },
  {
    h2: 'Email',
    body: [
      `**${EMAIL}** — [write to us](mailto:${EMAIL}). Best for anything with detail attached: a brief, a proposal you want a second opinion on, an audit you paid for and do not trust, or a press enquiry.`,
      'We read it ourselves. There is no ticketing system and no first-line filter, which is the upside of being two people.',
    ],
  },
  {
    h2: 'Book a strategy call',
    body: [
      `Thirty minutes, free, no pitch deck — [book a slot directly](${CAL_LINK}). You pick a time; nobody chases you to "confirm availability" first.`,
      'You leave the call with a 90-day plan for your site whether or not you hire us. If we are not the right fit we will say so on the call and tell you what to look for instead.',
    ],
  },
  {
    h2: 'Before you get in touch',
    body: [
      'Two things will make the conversation shorter and better.',
    ],
    bullets: [
      '**Read the prices first.** Every fee we charge is published on the [pricing page](/pricing). If the range does not work for you, that is a useful thing to know before either of us spends half an hour.',
      '**Know your baseline.** Whatever you currently get per month from organic search — leads, enquiries, calls, demos — is the number the guarantee is measured against. If you do not know it yet, that is fine; establishing it is the first thing we do.',
    ],
  },
  {
    h2: 'Where we work',
    body: [
      'We are based in India and work with clients across India and internationally, remotely. Pricing is quoted in rupees and delivery runs on IST. You can see the cities we publish local pages for on the [SEO agency by city index](/seo-agency), and the industries we cover on the [SEO by industry index](/seo-for).',
    ],
  },
  {
    h2: 'Press, partnerships and everything else',
    body: [
      `Same inbox: **${EMAIL}**. We are a small team, so there is no separate press address that gets checked more often than this one does.`,
    ],
  },
];

export default function ContactPage(): JSX.Element {
  return (
    <>
      <JsonLd
        graph={[
          {
            '@type': 'ContactPage',
            '@id': `${SITE_URL}/contact#webpage`,
            url: `${SITE_URL}/contact`,
            name: 'Contact Last Agency',
            description: metadata.description as string,
            inLanguage: 'en-IN',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#org` },
            mainEntity: { '@id': `${SITE_URL}/#org` },
          },
          ORG_NODE,
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />
      <PlainPage
        eyebrow="Contact"
        h1="Talk to the people who'd run the account"
        lede={`Email **${EMAIL}**, WhatsApp **${READABLE_PHONE}**, or book a free 30-minute strategy call. No contact form, no gated PDF, no "someone will be in touch".`}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
        sections={SECTIONS}
      />
    </>
  );
}
