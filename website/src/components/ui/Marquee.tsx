'use client';

import { useMemo, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type MarqueeProps = {
  items: string[];
  direction?: 'left' | 'right';
  /** Speed in px/sec. Default 60. */
  speed?: number;
  /** Node placed between items. Default a centred dot. */
  separator?: ReactNode;
  className?: string;
  itemClassName?: string;
};

const DEFAULT_SEPARATOR = (
  <span aria-hidden="true" className="mx-6 inline-block text-accent">
    .
  </span>
);

/**
 * CSS-driven infinite marquee. The track is duplicated so the second copy
 * picks up where the first ends; the second copy is `aria-hidden` so screen
 * readers only see the items once.
 *
 * Pauses on hover. The global prefers-reduced-motion media query in
 * globals.css freezes the animation entirely.
 */
export function Marquee({
  items,
  direction = 'left',
  speed = 60,
  separator = DEFAULT_SEPARATOR,
  className,
  itemClassName,
}: MarqueeProps): JSX.Element {
  // Track width = single-copy width × 2. Animation slides by 50%
  // (one full copy width) and loops. Duration = copyWidthEstimate / speed.
  // We don't measure DOM — instead approximate using items.length × 220px.
  const animationDuration = useMemo(() => {
    const approxCopyPx = Math.max(items.length, 1) * 220;
    return `${Math.max(8, approxCopyPx / speed)}s`;
  }, [items.length, speed]);

  const animationName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight';

  const renderRow = (ariaHidden: boolean): JSX.Element => (
    <ul
      role={ariaHidden ? 'presentation' : 'list'}
      aria-hidden={ariaHidden ? 'true' : undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className={cn(
            'flex items-center whitespace-nowrap font-display text-3xl font-medium lowercase md:text-5xl',
            itemClassName,
          )}
        >
          {item}
          {separator}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn('group relative w-full overflow-hidden', className)}
      role="region"
      aria-label="Marquee"
    >
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `${animationName} ${animationDuration} linear infinite`,
        }}
      >
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </div>
  );
}
