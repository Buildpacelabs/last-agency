import Link from 'next/link';

const FOOT_LINKS = [
  { href: '/seo', label: 'SEO' },
  { href: '/social', label: 'Social' },
  { href: '/performance', label: 'Performance' },
  { href: '/pricing', label: 'Pricing' },
];

export function Footer(): JSX.Element {
  return (
    <footer className="site">
      <div className="wrap foot-in">
        <Link className="brand" href="/">
          LAST&nbsp;<b>AGENCY</b>
        </Link>
        <nav className="foot-nav" aria-label="Footer">
          {FOOT_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <span>© 2026 LAST AGENCY · SEO · SOCIAL · PERFORMANCE · PRICES IN INR, GST EXTRA</span>
      </div>
    </footer>
  );
}
