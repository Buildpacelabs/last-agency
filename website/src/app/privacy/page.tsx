import type { Metadata } from 'next';
import { SITE_URL, WA_HERO, CAL_LINK, breadcrumbNode } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { PlainPage, type PlainSection } from '@/components/PlainPage';

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy — Last Agency' },
  description:
    'What lastagencyhere.com collects, which is almost nothing. No analytics, no advertising pixels, no cookies set by us. Here is exactly what happens to your data.',
  alternates: { canonical: '/privacy' },
};

const UPDATED = '27 July 2026';

const SECTIONS: PlainSection[] = [
  {
    h2: 'The short version',
    body: [
      'This website runs no analytics, no advertising pixels and no third-party trackers, and sets no cookies of its own. We do not know who you are while you read it, and we cannot build a profile of you from it.',
      'The only personal data we ever receive is what you deliberately send us — by messaging us on WhatsApp or booking a call. Everything below is the detail behind those two sentences.',
    ],
  },
  {
    h2: 'What this website collects',
    body: [
      'Nothing, directly. There is no analytics package, no tag manager, no advertising pixel and no session-recording tool installed on this site. No cookie is set by lastagencyhere.com, which is why you have not been asked to consent to one.',
      'The site is hosted on Vercel. Like every web host, Vercel processes standard server request logs — IP address, timestamp, requested URL, user agent — for the purpose of serving the page and protecting the service from abuse. We do not use those logs for marketing, and we do not combine them with anything else.',
    ],
  },
  {
    h2: 'What happens when you contact us',
    body: [
      `If you message us on WhatsApp, WhatsApp (Meta) processes that conversation under its own terms and we receive your phone number, your profile name and whatever you write. If you book a call, that booking runs on Cal.com, which collects the name, email address and any notes you enter in order to create the appointment.`,
      'We use that information for one purpose: to have the conversation you started and, if you become a client, to run the engagement. We do not sell it, rent it, or pass it to anyone for their own marketing.',
    ],
  },
  {
    h2: 'How long we keep it',
    body: [
      'Enquiries that do not become engagements are kept while the conversation is live and for a reasonable period afterwards in case you come back, then deleted. Client records are kept for as long as the engagement runs and afterwards for the period Indian tax and accounting law requires.',
    ],
  },
  {
    h2: 'Processors we rely on',
    bullets: [
      '**Vercel** — hosting and content delivery. Processes server request logs.',
      '**Cal.com** — appointment booking. Processes the name, email and notes you enter when booking.',
      '**WhatsApp (Meta)** — messaging. Processes the conversation and your phone number.',
      '**Google Search Console** — reports aggregated, anonymised search performance for this site. It does not identify individual visitors and we cannot use it to.',
    ],
  },
  {
    h2: 'Your rights',
    body: [
      "You can ask us what personal data we hold about you, ask us to correct it, or ask us to delete it. Message us on WhatsApp and we will action it. Because we hold so little, this is usually a short conversation.",
      'Data you sent through WhatsApp or Cal.com also sits with those providers under their own policies, and requests about their copies have to go to them — we can only act on ours.',
    ],
  },
  {
    h2: 'Links to other sites',
    body: [
      'Our booking and messaging buttons take you to cal.com and wa.me. Once you are there, that provider’s privacy policy applies, not this one.',
    ],
  },
  {
    h2: 'Changes to this policy',
    body: [
      `This policy was last updated on ${UPDATED}. If we add analytics or any other tracking to this site, we will update this page before it goes live and change the date above.`,
      `Questions about any of this: [message us on WhatsApp](${WA_HERO}) or [book a call](${CAL_LINK}).`,
    ],
  },
];

export default function PrivacyPage(): JSX.Element {
  return (
    <>
      <JsonLd
        graph={[
          {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/privacy#webpage`,
            url: `${SITE_URL}/privacy`,
            name: 'Privacy Policy',
            description: metadata.description as string,
            inLanguage: 'en-IN',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            publisher: { '@id': `${SITE_URL}/#org` },
            dateModified: '2026-07-27T09:00:00+05:30',
          },
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'Privacy', path: '/privacy' },
          ]),
        ]}
      />
      <PlainPage
        eyebrow={`Last updated ${UPDATED}`}
        h1="Privacy policy"
        lede="This site runs no analytics, sets no cookies of its own and has no advertising pixels. The only personal data we get is what you send us on WhatsApp or when you book a call."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Privacy', path: '/privacy' },
        ]}
        sections={SECTIONS}
        showCta={false}
      />
    </>
  );
}
