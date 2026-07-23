import { MARQUEE_ITEMS } from '@/lib/site';

/**
 * Decorative ticker. Items repeated 6× so half the track (the -50% loop
 * distance) always exceeds the widest realistic viewport and never gaps.
 */
export function Marquee(): JSX.Element {
  return (
    <div className="marquee" aria-hidden="true">
      <div>
        {Array.from({ length: 6 }).flatMap((_, r) =>
          MARQUEE_ITEMS.map((item, i) => <span key={`${r}-${i}`}>{item}</span>),
        )}
      </div>
    </div>
  );
}
