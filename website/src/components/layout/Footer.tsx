import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const FOOTER_LINKS: { href: string; label: string }[] = [
  { href: '/work', label: 'work' },
  { href: '/services', label: 'services' },
  { href: '/about', label: 'about' },
  { href: '/get-in-touch', label: 'talk to us' },
];

// Social hrefs are placeholders. MANUAL-WORK: replace with the real
// Instagram / LinkedIn / X URLs before launch.
const SOCIAL_LINKS: { href: string; label: string }[] = [
  { href: '#instagram', label: 'instagram' },
  { href: '#linkedin', label: 'linkedin' },
  { href: '#twitter', label: 'twitter' },
];

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-border bg-bg" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <Container className="py-24 md:py-32">
        <p className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-balance lowercase">
          your last agency. <span className="italic text-accent">we mean that literally.</span>
        </p>
      </Container>

      <Container className="grid grid-cols-2 gap-10 border-t border-border py-12 md:grid-cols-4">
        <div>
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            site
          </p>
          <ul className="flex flex-col gap-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-body text-sm text-fg hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            office
          </p>
          <p className="font-body text-sm text-fg">Bangalore</p>
          <p className="mt-1 font-body text-sm text-muted">We answer email.</p>
          <a
            href="mailto:hello@lastagency.com"
            className="mt-3 inline-block font-body text-sm text-accent hover:underline"
          >
            hello@lastagency.com
          </a>
        </div>

        <div>
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            elsewhere
          </p>
          <ul className="flex flex-col gap-2">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-body text-sm text-fg hover:text-accent"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex md:justify-end">
          <p className="font-body text-sm text-muted">&copy;2026 Last Agency</p>
        </div>
      </Container>
    </footer>
  );
}
