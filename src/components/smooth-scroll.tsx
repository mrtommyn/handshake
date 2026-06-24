"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery smooth scrolling for the marketing site. Mounts on the page that uses it and
 * cleans up on unmount (so the logged-in app keeps native scrolling later).
 * Respects prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
