'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const LINKS = [
  { href: '/seo', label: 'SEO' },
  { href: '/social', label: 'Social' },
  { href: '/performance', label: 'Performance' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/answers', label: 'Answers' },
];

export function Nav(): JSX.Element {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string): boolean => pathname === href;

  return (
    <nav className="site" aria-label="Primary">
      <div className="nav-in">
        <Link className="brand" href="/" aria-label="Last Agency — home" onClick={() => setOpen(false)}>
          <span className="blip" aria-hidden="true" />
          LAST&nbsp;<b>AGENCY</b>
        </Link>

        <div className="nav-right">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              className={`nav-link${isActive(l.href) ? ' active' : ''}`}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
          <a className="btn btn-red" href="#book">
            Book a call →
          </a>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="bars" aria-hidden="true" />
        </button>
      </div>

      {open ? (
        <div className="nav-menu">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              className={`nav-link${isActive(l.href) ? ' active' : ''}`}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a className="btn btn-red" href="#book" onClick={() => setOpen(false)}>
            Book a call →
          </a>
        </div>
      ) : null}
    </nav>
  );
}
