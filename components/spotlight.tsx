"use client";

import { useRef, type ReactNode } from "react";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Card wrapper whose surface illuminates around the cursor. The highlight
 * position is written to CSS variables directly (no re-renders) and the
 * overlay only appears on hover-capable devices.
 */
export function Spotlight({ children, className = "" }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`group/spot relative ${className}`}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/spot:opacity-100 [@media(hover:none)]:hidden"
        style={{
          background:
            "radial-gradient(230px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--accent) 13%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}
