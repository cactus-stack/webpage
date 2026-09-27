"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export type TitleLine =
  | string
  | {
      text: string;
      /** Relative size, 1 is the full title size. */
      scale?: number;
      tone?: "accent" | "muted";
      align?: "right";
      /** Light, lowercase line for connective words between heavy lines. */
      light?: boolean;
      /** Decorative element after the text, hidden from assistive tech. */
      after?: ReactNode;
    };

// Sizes are relative to the title's own column (cqi), not the viewport,
// so a word never outgrows its column once the page reaches max width.
// Ratios come from measured Inter Tight widths: the widest one-line hero
// title ("LET'S BUILD", 5.06em) fills ~96% of the column at 19cqi, and the
// widest one-line section title ("PRODUCTION AI", 6.83em) ~96% at 14cqi.
const sizes = {
  hero: "text-[clamp(3.4rem,19cqi,12.25rem)]",
  section: "text-[clamp(2.75rem,14cqi,8.25rem)]",
  compact: "text-[clamp(2.4rem,10cqi,5.75rem)]",
} as const;

type TitleCardProps = {
  lines: readonly TitleLine[];
  id?: string;
  level?: 1 | 2;
  size?: keyof typeof sizes;
  className?: string;
  tone?: "default" | "inverse";
  /**
   * Play the reveal on first paint with CSS instead of on scroll. Used for
   * the hero, which is above the fold and must not wait for hydration.
   */
  intro?: boolean;
};

/**
 * Section title whose lines rise out of a mask, stacked in mixed sizes the
 * way broadcast title cards are. It carries no eyebrow: the heading says
 * what the section is. Content is fully visible in the server HTML; the
 * hidden state is only armed on the client for titles below the fold.
 */
export function TitleCard({
  lines,
  id,
  level = 2,
  size = "section",
  className,
  tone = "default",
  intro = false,
}: TitleCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [armed, setArmed] = useState(false);

  useLayoutEffect(() => {
    if (reduce || intro) return;
    const element = ref.current;
    if (element && element.getBoundingClientRect().top > window.innerHeight * 0.9) {
      setArmed(true);
    }
  }, [reduce, intro]);

  const shown = !armed || inView;
  const Heading = level === 1 ? "h1" : "h2";
  const inverse = tone === "inverse";

  return (
    <div ref={ref} className={`@container ${className ?? ""}`}>
      <Heading id={id} className={`title-card ${sizes[size]}`}>
        {lines.map((line, lineIndex) => {
          const item = typeof line === "string" ? { text: line } : line;
          const color =
            item.tone === "accent"
              ? inverse
                ? "text-white"
                : "text-accent"
              : item.tone === "muted"
                ? inverse
                  ? "text-white/55"
                  : "text-muted"
                : "";
          const separator = lineIndex < lines.length - 1 ? " " : "";

          return (
            <span
              key={`${item.text}-${lineIndex}`}
              className={`-mt-[0.1em] block overflow-x-visible overflow-y-clip pt-[0.1em] ${item.align === "right" ? "text-right" : ""}`}
              style={item.scale ? { fontSize: `${item.scale}em` } : undefined}
            >
              <motion.span
                className={`block ${color} ${item.light ? "title-light" : ""} ${intro ? "title-rise" : ""}`}
                style={intro ? { animationDelay: `${0.12 + lineIndex * 0.1}s` } : undefined}
                initial={false}
                animate={intro ? undefined : { y: shown ? "0%" : "110%" }}
                transition={{ duration: 0.95, delay: 0.1 + lineIndex * 0.09, ease }}
              >
                {item.text}
                {separator}
                {item.after && <span aria-hidden="true">{item.after}</span>}
              </motion.span>
            </span>
          );
        })}
      </Heading>
    </div>
  );
}
