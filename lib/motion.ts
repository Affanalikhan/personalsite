import type { Easing } from "framer-motion";

/** Cubic-bezier ease-out-expo — typed as a tuple so Framer Motion 12 is happy */
export const EASE: Easing = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * Returns true when the user has requested reduced motion.
 * Safe to call in both browser and SSR (defaults to false on server).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Returns animation props that are either full or instant depending on
 * the user's prefers-reduced-motion preference.
 */
export function reduceMotion(
  fullProps: Record<string, unknown>,
  reducedProps: Record<string, unknown> = { duration: 0 }
): Record<string, unknown> {
  return prefersReducedMotion() ? reducedProps : fullProps;
}
