import type { Easing } from "framer-motion";

/** Cubic-bezier ease-out-expo — typed as a tuple so Framer Motion 12 is happy */
export const EASE: Easing = [0.16, 1, 0.3, 1] as [number, number, number, number];
