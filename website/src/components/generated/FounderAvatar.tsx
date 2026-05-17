import type { ReactElement } from 'react';

export type FounderAvatarGradient = {
  from: string;
  to: string;
};

export type FounderAvatarProps = {
  initials: string;
  gradient: FounderAvatarGradient;
  size?: number;
  className?: string;
};

const DEFAULT_SIZE = 64;

export function FounderAvatar({
  initials,
  gradient,
  size = DEFAULT_SIZE,
  className,
}: FounderAvatarProps): ReactElement {
  const safeInitials = initials.trim().slice(0, 2).toUpperCase() || '??';
  const gradientId = `founder-gradient-${safeInitials}-${hashColor(gradient.from)}-${hashColor(gradient.to)}`;
  const title = `Founder avatar: ${safeInitials}`;
  const fontSize = Math.round(size * 0.42);

  return (
    <svg
      className={className}
      role="img"
      aria-label={title}
      width={size}
      height={size}
      viewBox="0 0 64 64"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradient.from} />
          <stop offset="100%" stopColor={gradient.to} />
        </linearGradient>
      </defs>
      <circle cx={32} cy={32} r={32} fill={`url(#${gradientId})`} />
      <text
        x={32}
        y={32}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#F4F1EA"
        fontFamily="var(--font-display), ui-sans-serif, system-ui"
        fontWeight={700}
        fontSize={fontSize}
        letterSpacing="-0.02em"
      >
        {safeInitials}
      </text>
    </svg>
  );
}

function hashColor(hex: string): string {
  return hex.replace('#', '').toLowerCase();
}

export default FounderAvatar;
