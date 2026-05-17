import type { ReactElement } from 'react';

export type ArrowDownProps = {
  className?: string;
  size?: number;
};

export function ArrowDown({ className, size = 24 }: ArrowDownProps): ReactElement {
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
      <line x1="12" y1="4" x2="12" y2="20" />
      <polyline points="5 13 12 20 19 13" />
    </svg>
  );
}

export default ArrowDown;
