import type { ReactElement } from 'react';

export type MarqueeUnderlineProps = {
  className?: string;
  size?: number;
  accentColor?: string;
};

export function MarqueeUnderline({
  className,
  size = 320,
  accentColor = '#FF6B35',
}: MarqueeUnderlineProps): ReactElement {
  return (
    <svg
      className={className}
      role="presentation"
      aria-hidden="true"
      width={size}
      height="14"
      viewBox={`0 0 ${size} 14`}
      preserveAspectRatio="none"
    >
      <path
        d={`M 2 8 Q ${size * 0.25} 2, ${size * 0.5} 8 T ${size - 2} 8`}
        fill="none"
        stroke={accentColor}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default MarqueeUnderline;
