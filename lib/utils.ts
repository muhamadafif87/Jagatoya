// Shared utility functions

/**
 * Combines class names, filtering out falsy values.
 * Lightweight alternative to clsx — no dependency needed.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
