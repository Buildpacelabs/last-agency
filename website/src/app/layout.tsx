import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://lastagency.com';
const TITLE = "Last Agency — The Last SEO Agency You'll Ever Hire";
const DESCRIPTION =
  "Fire your SEO agency. Hire the last one you'll ever need. We build a growth system that pays for itself — and if it doesn't beat your numbers in 90 days, you don't pay. Rank or it's free. Only 3 clients a month.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'Last Agency',
  keywords: [
    'SEO agency',
    'performance SEO',
    'rank or it\'s free',
    'organic growth',
    'digital PR',
    'programmatic SEO',
    'AEO',
    'GEO',
    'SEO India',
  ],
  authors: [{ name: 'Last Agency' }],
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    siteName: 'Last Agency',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
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
        {children}
      </body>
    </html>
  );
}
