import type { Metadata } from 'next';
import './globals.css';
import { Marquee } from '@/components/Marquee';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { ORG_NODE, WEBSITE_NODE, SITE_URL } from '@/lib/site';

const TITLE = "Last Agency — The Last SEO, Social & Performance Agency You'll Hire";
const DESCRIPTION =
  "One team for SEO, organic social and performance marketing — run as a single growth system with a beat-your-numbers-in-90-days-or-you-don't-pay guarantee. No lock-in. Only 3 clients a month.";

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
