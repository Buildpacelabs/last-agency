import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Lost the trail — Last Agency",
  description: "This page doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound(): JSX.Element {
  return (
    <main id="main">
      <section className="band-ink pad" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div className="wrap">
          <span className="sticker">⚡ 404 — dead link</span>
          <h1 className="sec-h" style={{ marginTop: 22 }}>
            This page didn't <span className="r">rank</span>. It doesn't exist.
          </h1>
          <p className="lede" style={{ margin: '18px auto 0' }}>
            The URL you followed is gone. Everything worth reading is back on the home page.
          </p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <a className="btn btn-lg btn-red" href="/">
              Back to home
            </a>
            <a className="btn btn-lg btn-cream" href="/#book">
              Book a strategy call
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
