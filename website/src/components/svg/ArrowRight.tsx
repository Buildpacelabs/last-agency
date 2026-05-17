import type { ReactElement } from 'react';

export type ArrowRightProps = {
  className?: string;
  size?: number;
};

export function ArrowRight({ className, size = 24 }: ArrowRightProps): ReactElement {
  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="13 5 20 12 13 19" />
    </svg>
  );
}

export default ArrowRight;
