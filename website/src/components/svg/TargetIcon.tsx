import type { ReactElement } from 'react';

export type TargetIconProps = {
  className?: string;
  size?: number;
  accentColor?: string;
};

// Last Agency's analog of TIW's target icon: a stylized exit — a doorway with
// a dotted-line departure trail leading out, capped by an arrow. Says "we
// leave" without saying it.
export function TargetIcon({
  className,
  size = 96,
  accentColor = '#FF6B35',
}: TargetIconProps): ReactElement {
  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Doorway frame (the engagement) */}
      <rect x={10} y={14} width={36} height={68} rx={1.5} />
      <line x1={10} y1={48} x2={46} y2={48} strokeOpacity={0.35} />
      {/* Door handle */}
      <circle cx={38} cy={52} r={1.5} fill="currentColor" stroke="none" />
      {/* Dotted departure trail */}
      <line
        x1={52}
        y1={48}
        x2={82}
        y2={48}
        stroke={accentColor}
        strokeWidth={2}
        strokeDasharray="2 6"
      />
      {/* Arrow head — we leave */}
      <polyline points="76 40 86 48 76 56" stroke={accentColor} strokeWidth={2} />
    </svg>
  );
}

export default TargetIcon;
