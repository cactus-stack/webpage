"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";

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
