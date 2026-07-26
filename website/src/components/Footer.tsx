import Link from 'next/link';
import { countByType } from '@/content/loader';
import { PAGE_TYPES, TYPE_LABEL, TYPE_PATH } from '@/content/types';

/* =========================================================================
   Footer doubles as the site index.

   With ~500 URLs across eight families, the footer is the one element on
   every page that can put each hub within a single click of everything else.
   That's what keeps deep pages from becoming orphans — a sitemap gets a URL
   crawled, but internal links are what make it worth ranking.
   ========================================================================= */

const SERVICES = [
  { href: '/seo', label: 'SEO' },
  { href: '/social', label: 'Organic Social' },
  { href: '/performance', label: 'Performance Marketing' },
  { href: '/pricing', label: 'Pricing' },
];

export function Footer(): JSX.Element {
  const counts = countByType();

  return (
    <footer className="site">
      <div className="wrap foot-cols">
        <div className="foot-brand">
          <Link className="brand" href="/">
            LAST&nbsp;<b>AGENCY</b>
          </Link>
          <p className="foot-line">
            Beat your baseline in 90 days, or we work free until we do. Three clients a month.
            No lock-in.
          </p>
        </div>

        <nav className="foot-col" aria-labelledby="f-svc">
          <p className="foot-h" id="f-svc">
            What we do
          </p>
          <ul>
            {SERVICES.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="foot-col" aria-labelledby="f-lib">
          <p className="foot-h" id="f-lib">
            Library
          </p>
          <ul>
            {PAGE_TYPES.map((t) => (
              <li key={t}>
                <Link href={TYPE_PATH[t]}>
                  {TYPE_LABEL[t]}
                  {counts[t] ? <span className="foot-n">{counts[t]}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="wrap foot-in">
        <span>© 2026 LAST AGENCY · SEO · SOCIAL · PERFORMANCE · PRICES IN INR, GST EXTRA</span>
      </div>
    </footer>
  );
}
