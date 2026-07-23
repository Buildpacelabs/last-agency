import type { Metadata } from 'next';
import Link from 'next/link';
import { FinalCta } from '@/components/FinalCta';

export const metadata: Metadata = {
  title: 'Lost the trail',
  description: "This page doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound(): JSX.Element {
  return (
    <>
      <section
        className="band-ink pad"
        style={{ minHeight: '52vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}
      >
        <div className="wrap">
          <span className="sticker">⚡ 404 — dead link</span>
          <h1 className="sec-h" style={{ marginTop: 22 }}>
            This page didn't <span className="r">rank</span>. It doesn't exist.
          </h1>
          <p className="lede" style={{ margin: '18px auto 0' }}>
            The URL you followed is gone. Everything worth reading is one of these clicks away.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-lg btn-red" href="/">
              Back to home
            </Link>
            <Link className="btn btn-lg btn-cream" href="/pricing">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
