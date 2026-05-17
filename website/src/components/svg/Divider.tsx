import type { ReactElement } from 'react';

export type DividerProps = {
  className?: string;
  size?: number;
  accentColor?: string;
};

export function Divider({
  className,
  size = 1200,
  accentColor = '#FF6B35',
}: DividerProps): ReactElement {
  return (
    <svg
      className={className}
      role="presentation"
      aria-hidden="true"
      width="100%"
      height="24"
      viewBox={`0 0 ${size} 24`}
      preserveAspectRatio="none"
    >
      <line
        x1={0}
        y1={12}
        x2={size}
        y2={12}
        stroke="currentColor"
        strokeOpacity={0.18}
        strokeWidth={1}
      />
      <line
        x1={0}
        y1={12}
        x2={size * 0.08}
        y2={12}
        stroke={accentColor}
        strokeWidth={1.5}
      />
      <circle cx={size * 0.08} cy={12} r={3} fill={accentColor} />
    </svg>
  );
}

export default Divider;
