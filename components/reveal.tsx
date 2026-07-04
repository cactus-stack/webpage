"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Fades and rises content once when it enters the viewport.
 *
 * The server-rendered HTML is fully visible; the hidden state is only
 * "armed" on the client, before paint, for elements below the fold.
 * This keeps content readable without JavaScript, during hydration,
 * and in automated page snapshots. Collapses to static rendering
 * under prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useLayoutEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight * 0.85) {
      setArmed(true);
    }
  }, [reduce]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={
        armed
          ? { opacity: 0, y: 32, filter: "blur(10px)" }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}
