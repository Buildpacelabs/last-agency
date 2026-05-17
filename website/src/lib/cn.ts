import { clsx, type ClassValue } from 'clsx';

/**
 * Tiny class-name helper. Wraps clsx so we have a single import surface
 * across the codebase.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
