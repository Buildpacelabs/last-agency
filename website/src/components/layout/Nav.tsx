'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/Container';

type NavLink = { href: string; label: string };

const NAV_LINKS: NavLink[] = [
  { href: '/work', label: 'work' },
  { href: '/services', label: 'services' },
  { href: '/about', label: 'about' },
];

// TODO: Replace placeholder wordmark with the SVG logo once it lands in
// assets/brand/logo.svg (see asset-manifest.json -> brand.logo).
export function Nav(): JSX.Element {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll(): void {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open.
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out-expo',
        scrolled
          ? 'bg-bg/85 backdrop-blur-md border-b border-border'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="font-display text-xl font-bold tracking-tight" aria-label="Last Agency — home">
          <span>Last Agency</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative font-body text-sm text-fg/80 transition-colors hover:text-fg"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-out-expo',
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/get-in-touch"
            className="group relative font-body text-sm font-medium text-accent"
          >
            talk to us
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out-expo group-hover:scale-x-100"
            />
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={cn(
                'absolute left-0 top-0 h-px w-full bg-fg transition-transform duration-300 ease-out-expo',
                mobileOpen && 'translate-y-[6px] rotate-45',
              )}
            />
            <span
              className={cn(
                'absolute bottom-0 left-0 h-px w-full bg-fg transition-transform duration-300 ease-out-expo',
                mobileOpen && '-translate-y-[6px] -rotate-45',
              )}
            />
          </span>
        </button>
      </Container>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-16 z-40 bg-bg md:hidden"
          >
            <Container className="flex flex-col gap-6 py-12">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-4xl font-medium lowercase"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/get-in-touch"
                onClick={() => setMobileOpen(false)}
                className="mt-4 font-display text-4xl font-medium lowercase text-accent"
              >
                talk to us
              </Link>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
