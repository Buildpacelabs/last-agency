import type { Metadata } from 'next';
import { body, display } from './fonts';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Last Agency — your last agency. we mean that literally.',
    template: '%s | Last Agency',
  },
  description:
    'An agency built to fire itself. We set up paid, lifecycle, brand. Run it twelve to eighteen months. Train your hire. Hand over the playbook. Then we leave.',
  metadataBase: new URL('https://lastagency.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="bg-bg font-body text-fg antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <LenisProvider>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
