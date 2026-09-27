"use client";

import {
  animate,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** Local time in Mexico City, ticking every second. */
export function LiveClock({ timeZone = "America/Mexico_City" }: { timeZone?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return <time suppressHydrationWarning>{now ?? "--:--:--"}</time>;
}

const formatDepth = (value: number) =>
  `${Math.round(Math.min(1, Math.max(0, value)) * 100)
    .toString()
    .padStart(3, "0")}%`;

/**
 * Page scroll depth as a zero-padded percentage, e.g. "042%". It always
 * hydrates as "000%" and only then reads the real position, so a page
 * restored mid-scroll cannot produce a server/client text mismatch.
 */
export function ScrollPercent() {
  const { scrollYProgress } = useScroll();
  const ref = useRef<HTMLSpanElement>(null);

  // Written straight to the node: this ticks on every scroll frame and
  // nothing else on the page depends on it, so it never re-renders React.
  const write = (value: number) => {
    if (ref.current) ref.current.textContent = formatDepth(value);
  };
  useMotionValueEvent(scrollYProgress, "change", write);
  useEffect(() => {
    if (ref.current) ref.current.textContent = formatDepth(scrollYProgress.get());
  }, [scrollYProgress]);

  return (
    <span ref={ref} className="tabular-nums">
      000%
    </span>
  );
}

/**
 * Counts up to a number the first time it scrolls into view. The server
 * renders the final value, so the figure is correct without JavaScript
 * and for anything that reads the HTML.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [armed, setArmed] = useState(false);
  const [display, setDisplay] = useState(value);

  useLayoutEffect(() => {
    if (reduce) return;
    const element = ref.current;
    if (element && element.getBoundingClientRect().top > window.innerHeight * 0.9) {
      setArmed(true);
      setDisplay(0);
    }
  }, [reduce]);

  useEffect(() => {
    if (!armed || !inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [armed, inView, value, duration]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
