import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Marquee } from '@/components/Marquee';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { ORG_NODE, WEBSITE_NODE, PERSON_NODES, SITE_URL } from '@/lib/site';

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
        {/* PERSON_NODES ships site-wide because ORG_NODE references them via
            @id. Emitting the reference without the node would leave a dangling
            @id on every page that isn't /about, which is the most common silent
            way a structured-data graph stops resolving. */}
        <JsonLd graph={[ORG_NODE, WEBSITE_NODE, ...PERSON_NODES]} />
        <Marquee />
        <Nav />
        <main id="main">
          <span id="top" aria-hidden="true" />
          {children}
        </main>
        <Footer />
        {/* Both are cookieless and collect no personally identifying data, which
            is what lets /privacy keep saying this site sets no cookies. Analytics
            gives the traffic denominator; Speed Insights reports real-user Core
            Web Vitals — including INP, which cannot be derived from lab traces
            and which Search Console will not show until CrUX has enough samples.
            Both are inert until enabled in the Vercel project dashboard. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
