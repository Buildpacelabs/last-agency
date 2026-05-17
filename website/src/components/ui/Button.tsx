'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ReactNode, MouseEventHandler } from 'react';
import { ArrowRight } from '@/components/svg/ArrowRight';
import { arrowNudge } from '@/lib/motion';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  showArrow?: boolean;
  ariaLabel?: string;
};

type LinkButtonProps = BaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ClickButtonProps = BaseProps & {
  href?: never;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
};

export type ButtonProps = LinkButtonProps | ClickButtonProps;

const baseClasses =
  'group relative inline-flex items-center justify-center gap-2 font-body font-medium transition-colors duration-200 ease-out-expo focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-3 text-sm rounded-full',
  lg: 'px-7 py-4 text-base rounded-full',
};

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent text-bg hover:bg-accent-hover',
  secondary: 'bg-fg/5 text-fg hover:bg-fg/10 border border-border',
  ghost: 'bg-transparent text-fg hover:bg-fg/5',
};

function Inner({
  children,
  showArrow,
}: {
  children: ReactNode;
  showArrow: boolean;
}): JSX.Element {
  return (
    <>
      <span>{children}</span>
      {showArrow ? (
        <motion.span
          variants={arrowNudge}
          className="inline-flex"
          aria-hidden="true"
        >
          <ArrowRight size={18} />
        </motion.span>
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps): JSX.Element {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    showArrow = variant === 'primary',
    ariaLabel,
  } = props;

  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  if ('href' in props && props.href) {
    return (
      <motion.span initial="rest" whileHover="hover" animate="rest" className="inline-flex">
        <Link href={props.href} className={classes} aria-label={ariaLabel}>
          <Inner showArrow={showArrow}>{children}</Inner>
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      animate="rest"
      type={props.type ?? 'button'}
      onClick={props.onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      <Inner showArrow={showArrow}>{children}</Inner>
    </motion.button>
  );
}
