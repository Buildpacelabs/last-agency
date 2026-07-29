import type { Metadata } from 'next';
import { SITE_URL, WA_HERO, EMAIL, breadcrumbNode } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { PlainPage, type PlainSection } from '@/components/PlainPage';

export const metadata: Metadata = {
  title: { absolute: 'Terms of Use — Last Agency' },
  description:
    'Terms for using lastagencyhere.com, what our published prices and performance guarantee do and do not commit us to, and how client engagements are actually governed.',
  alternates: { canonical: '/terms' },
};

const UPDATED = '27 July 2026';

const SECTIONS: PlainSection[] = [
  {
    h2: 'What these terms cover',
    body: [
      'These terms govern your use of lastagencyhere.com and the information published on it. They are not the contract for a client engagement — that is a separate signed agreement, and where the two differ, the signed agreement wins.',
      'If you do not agree with these terms, the remedy is to stop using the site.',
    ],
  },
  {
    h2: 'The content here is information, not advice',
    body: [
      'The roughly 500 pages on this site describe how search, social and paid media generally work. They are written to be accurate and specific, and they are deliberately not tailored to your business, your market or your legal and regulatory position.',
      'Acting on general information without checking whether it applies to you is your decision and your risk. Nothing published here creates a professional relationship between us.',
    ],
  },
  {
    h2: 'Published prices',
    body: [
      'The prices on the [pricing page](/pricing) are the prices we actually charge, quoted in Indian rupees and exclusive of GST. They are quoted monthly and are month-to-month with no lock-in period.',
      'They are an invitation to talk, not a binding offer. Scope changes price: a site with fifteen pages and a site with fifteen thousand are not the same job, and we will tell you which bracket you are in before you commit to anything. The figure in your engagement letter is the figure that binds us.',
    ],
  },
  {
    h2: 'What the performance guarantee does and does not say',
    body: [
      'We say publicly that we will beat your baseline in 90 days or keep working without a fee until we do. That is a real commitment and we intend it to be read as one.',
      'It is a commitment about **movement against your own frozen baseline**, measured over an agreed window on an agreed metric. It is **not** a promise of any specific ranking position, traffic volume, revenue figure or return on spend, and any page on this site that appears to promise one should be read as an error rather than a term.',
      'The precise metric, the measurement window, the exclusions, and what "keep working without a fee" means in practice are defined in the engagement letter you sign before work starts. We will not ask you to sign anything that leaves those undefined, and you should not sign one from any agency that does.',
    ],
  },
  {
    h2: 'What we cannot control',
    body: [
      'Search engines and advertising platforms change their ranking systems, their policies and their pricing without consulting us. Results can move for reasons that have nothing to do with the work. We will tell you when that happens and what we are doing about it; we will not pretend we caused a change we did not cause, in either direction.',
    ],
  },
  {
    h2: 'Copyright',
    body: [
      'The writing, design and code on this site belong to Last Agency. You are welcome to read it, quote it with attribution and a link, and use what you learn from it — including to do the work yourself or to brief a different agency. That is what publishing it is for.',
      'Republishing substantial portions as your own, or feeding it into a product that resells it, is not covered by that.',
    ],
  },
  {
    h2: 'Third-party links',
    body: [
      'This site links out to booking and messaging services and, in the library, to external references. We do not control those destinations and are not responsible for their content or their terms.',
    ],
  },
  {
    h2: 'Liability',
    body: [
      'We provide this website as it is. To the extent the law allows, we are not liable for loss arising from your use of the information published here. Nothing in these terms limits liability that cannot lawfully be limited — including liability for fraud.',
      'Liability arising from client work is dealt with in the engagement letter, not here.',
    ],
  },
  {
    h2: 'Governing law and changes',
    body: [
      'These terms are governed by the laws of India.',
      `Last updated ${UPDATED}. If we change them we will update the date on this page. Questions: email **${EMAIL}** or [message us on WhatsApp](${WA_HERO}).`,
    ],
  },
];

export default function TermsPage(): JSX.Element {
  return (
    <>
      <JsonLd
        graph={[
          {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/terms#webpage`,
            url: `${SITE_URL}/terms`,
            name: 'Terms of Use',
            description: metadata.description as string,
            inLanguage: 'en-IN',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            publisher: { '@id': `${SITE_URL}/#org` },
            dateModified: '2026-07-27T09:00:00+05:30',
          },
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'Terms', path: '/terms' },
          ]),
        ]}
      />
      <PlainPage
        eyebrow={`Last updated ${UPDATED}`}
        h1="Terms of use"
        lede="What using this site commits you to, what our published prices and guarantee commit us to, and where the line sits between the two."
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Terms', path: '/terms' },
        ]}
        sections={SECTIONS}
        showCta={false}
      />
    </>
  );
}
