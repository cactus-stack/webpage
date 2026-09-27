"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Inertial page scroll. Native scrolling stays in charge of position, so
 * sticky elements, scroll-linked motion values and keyboard scrolling keep
 * working. Skipped entirely under prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -64 },
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
