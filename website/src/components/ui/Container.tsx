import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'main';
};

/**
 * Max-width wrapper with consistent horizontal padding.
 * Default max-width matches the reference's wide-but-not-edge-to-edge feel.
 */
export function Container({ children, className, as: Tag = 'div' }: ContainerProps): JSX.Element {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16', className)}>
      {children}
    </Tag>
  );
}
