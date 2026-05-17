import { cn } from '@/lib/cn';

type SectionLabelProps = {
  children: string;
  className?: string;
};

/**
 * Small all-caps anchor label, prefixed with a dot in the accent colour.
 * Used on every major section as a quiet wayfinding mark.
 */
export function SectionLabel({ children, className }: SectionLabelProps): JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-fg/80',
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}
