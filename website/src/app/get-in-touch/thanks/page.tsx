import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: "noted. we'll be in touch.",
  description:
    "Your note's in our queue. We read everything. You'll hear back in one to two business days.",
  robots: { index: false, follow: false },
};

export default function ThanksPage(): JSX.Element {
  return (
    <section className="min-h-[80vh]">
      <Container className="flex min-h-[80vh] flex-col justify-center gap-10 py-32">
        <SectionLabel>• noted</SectionLabel>

        <h1 className="font-display text-[clamp(4rem,16vw,16rem)] font-bold leading-[0.9] tracking-tight text-balance lowercase">
          noted<span className="text-accent">.</span>
        </h1>

        <div className="max-w-2xl space-y-3 font-body text-lg text-muted md:text-xl">
          <p>
            Your note&apos;s in our queue. We read everything. You&apos;ll hear
            back in one to two business days — usually less.
          </p>
          <p>The reply comes from a founder. Not a chatbot. Not an intake form.</p>
        </div>

        <div className="max-w-2xl border-t border-border pt-8 font-body text-sm text-muted md:text-base">
          {/* MANUAL-WORK: replace this address with the team's real inbound
              alias when the contact handler is wired (see api/contact/route.ts). */}
          <p>
            If it&apos;s urgent, email us directly:{' '}
            <a
              href="mailto:hello@lastagency.com"
              className="text-accent hover:underline"
            >
              hello@lastagency.com
            </a>
            .
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button href="/work" variant="primary" size="md">
            read another case study
          </Button>
          <Link
            href="/"
            className="inline-flex items-center font-body text-sm text-fg/80 underline-offset-4 hover:text-fg hover:underline"
          >
            back to the homepage
          </Link>
        </div>
      </Container>
    </section>
  );
}
