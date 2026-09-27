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

const sizes = {
  hero: "text-[clamp(3.9rem,11.4vw,12.25rem)]",
  section: "text-[clamp(2.75rem,8vw,8.25rem)]",
  compact: "text-[clamp(2.4rem,5.6vw,5.75rem)]",
} as const;

type TitleCardProps = {
  index: string;
  label: string;
  meta?: ReactNode;
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
 * Section header in two registers: an instrument-style index rule, then a
 * condensed black serif title whose lines rise out of a mask. Content is
 * fully visible in the server HTML; the hidden state is only armed on the
 * client for titles that start below the fold.
 */
export function TitleCard({
  index,
  label,
  meta,
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
    <div ref={ref} className={className}>
      <div className={`hud flex items-center gap-4 ${inverse ? "text-white/75" : "text-muted"}`}>
        <span className={inverse ? "text-white" : "text-accent-text"}>{index}</span>
        <span className="shrink-0">{label}</span>
        <motion.span
          aria-hidden="true"
          className={`h-px min-w-6 flex-1 origin-left ${inverse ? "bg-white/35" : "bg-edge-strong"} ${intro ? "rule-draw" : ""}`}
          initial={false}
          animate={intro ? undefined : { scaleX: shown ? 1 : 0 }}
          transition={{ duration: 1.2, ease }}
        />
        {meta && <span className="hidden shrink-0 sm:inline">{meta}</span>}
        <span aria-hidden="true" className={`size-1.5 shrink-0 ${inverse ? "bg-white" : "bg-accent"}`} />
      </div>

      <Heading id={id} className={`title-card mt-6 sm:mt-8 ${sizes[size]}`}>
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
