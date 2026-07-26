import type { Metadata } from 'next';
import './globals.css';
import { Marquee } from '@/components/Marquee';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { ORG_NODE, WEBSITE_NODE, SITE_URL } from '@/lib/site';

// Both fields are length-budgeted for the SERP: title <= 60 chars rendered,
// description 120-155. The previous pair ran 76 and 195, so Google was
// truncating the hook out of both.
const TITLE = "SEO Agency India — Rank or It's Free | Last Agency";
const DESCRIPTION =
  "One team for SEO, organic social and paid media, on one guarantee: beat your 90-day baseline or you don't pay. No lock-in. Three clients a month.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s — Last Agency' },
  description: DESCRIPTION,
  applicationName: 'Last Agency',
  authors: [{ name: 'Last Agency' }],
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  // title/description intentionally omitted here so Next fills og:/twitter:
  // title+description per route from each page's own metadata.
  openGraph: {
    type: 'website',
    siteName: 'Last Agency',
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
  // Google Search Console ownership. The same token verifies both the
  // URL-prefix property (via this meta tag) and the Domain property (via a
  // DNS TXT record on lastagencyhere.com). Do not remove it after
  // verification — Google re-checks periodically and will un-verify the
  // property if the token disappears.
  verification: { google: 'WG2SVhxFsNHSvhSz5mvjOxMVXJshxJnYCuD4MqlBFr0' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd graph={[ORG_NODE, WEBSITE_NODE]} />
        <Marquee />
        <Nav />
        <main id="main">
          <span id="top" aria-hidden="true" />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
