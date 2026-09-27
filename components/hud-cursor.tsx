"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Interactive targets the reticle locks onto. Anything else just gets the
// idle reticle. [data-cursor] opts in non-interactive elements such as
// diagram nodes; [data-cursor-label] overrides the readout text.
const TARGETS = "a, button, [role='button'], [data-cursor]";
// Larger elements (whole cards, sections) are not worth framing.
const MAX_LOCK = { width: 640, height: 220 };

const IDLE_SIZE = 34;
const SPRING = { stiffness: 520, damping: 42, mass: 0.6 };

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Readout for a locked target: a verb for what clicking does, then its name. */
function describe(element: Element) {
  const custom = element.getAttribute("data-cursor-label");
  if (custom) return custom;

  const name = (element.getAttribute("aria-label") ?? element.textContent ?? "")
    .replace(/\s+/g, " ")
    .split(",")[0]
    .trim();

  let verb = "Exec";
  if (element instanceof HTMLAnchorElement) {
    const href = element.getAttribute("href") ?? "";
    if (href.startsWith("#") || href.startsWith("/#")) verb = "Jump";
    else if (href.startsWith("mailto:")) verb = "Mail";
    else if (element.target === "_blank") verb = "Open";
    else verb = "Link";
  }

  return name ? `${verb} · ${name.slice(0, 28)}` : verb;
}

const pad = (value: number, length: number) =>
  String(Math.max(0, Math.round(value))).padStart(length, "0");

/**
 * Targeting-reticle cursor. Only mounts for a mouse or trackpad and never
 * under reduced motion; touch and keyboard users keep the native behavior.
 */
export function HudCursor() {
  const finePointer = useMediaQuery(FINE_POINTER);
  const reducedMotion = useMediaQuery(REDUCED_MOTION);

  if (!finePointer || reducedMotion) return null;
  return <CursorLayer />;
}

function CursorLayer() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);
  const targetW = useMotionValue(IDLE_SIZE);
  const targetH = useMotionValue(IDLE_SIZE);

  const x = useSpring(targetX, SPRING);
  const y = useSpring(targetY, SPRING);
  const w = useSpring(targetW, SPRING);
  const h = useSpring(targetH, SPRING);

  const left = useTransform(() => x.get() - w.get() / 2);
  const top = useTransform(() => y.get() - h.get() / 2);
  const readoutX = useTransform(() => x.get() + w.get() / 2 + 10);
  const readoutY = useTransform(() => y.get() + h.get() / 2 + 4);
  const dotX = useTransform(pointerX, (value) => value - 3);
  const dotY = useTransform(pointerY, (value) => value - 3);

  // Scroll drives the reticle: the ring turns with page progress and the
  // crosshair stretches with scroll speed, like a lens tracking motion.
  const { scrollY, scrollYProgress } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 300, damping: 40 });
  const stretch = useTransform(smoothVelocity, [-3000, 0, 3000], [1.9, 1, 1.9]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, 720]);

  const [mode, setMode] = useState<"hidden" | "idle" | "lock">("hidden");
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);
  const lockRef = useRef<Element | null>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("hud-cursor");

    let px = -100;
    let py = -100;
    let visible = false;
    let scrolling = false;
    let scrollTimer = 0;

    // Re-aim on every move and every scroll: content slides under a still
    // pointer while scrolling, so the target can change without a move.
    const aim = () => {
      const hit = visible ? document.elementFromPoint(px, py) : null;
      const target = hit?.closest(TARGETS) ?? null;

      if (target) {
        const rect = target.getBoundingClientRect();
        if (rect.width <= MAX_LOCK.width && rect.height <= MAX_LOCK.height) {
          targetX.set(rect.left + rect.width / 2);
          targetY.set(rect.top + rect.height / 2);
          targetW.set(rect.width + 14);
          targetH.set(rect.height + 10);
          if (lockRef.current !== target) {
            lockRef.current = target;
            setLabel(describe(target));
            setMode("lock");
          }
          return;
        }
      }

      if (lockRef.current) {
        lockRef.current = null;
        setMode("idle");
      }
      targetX.set(px);
      targetY.set(py);
      targetW.set(IDLE_SIZE);
      targetH.set(IDLE_SIZE);
    };

    // Written straight to the node; this changes every frame.
    const writeReadout = () => {
      const node = readoutRef.current;
      if (!node) return;
      if (scrolling) {
        const direction = velocity.get() >= 0 ? "▼" : "▲";
        node.textContent = `Scroll ${direction} ${pad(scrollYProgress.get() * 100, 3)}%`;
      } else {
        node.textContent = `X ${pad(px, 4)} · Y ${pad(py, 4)}`;
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      px = event.clientX;
      py = event.clientY;
      pointerX.set(px);
      pointerY.set(py);
      if (!visible) {
        visible = true;
        // Appear in place instead of flying in from the last position.
        x.jump(px);
        y.jump(py);
        setMode(lockRef.current ? "lock" : "idle");
      }
      aim();
      writeReadout();
    };

    const onScroll = () => {
      scrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
        writeReadout();
      }, 650);
      aim();
      writeReadout();
    };

    const onLeave = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      visible = false;
      setMode("hidden");
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseout", onLeave);

    return () => {
      root.classList.remove("hud-cursor");
      window.clearTimeout(scrollTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [pointerX, pointerY, targetX, targetY, targetW, targetH, x, y, velocity, scrollYProgress]);

  const hidden = mode === "hidden";
  const locked = mode === "lock";

  return (
    <>
      {/*
        The reticle layer blends with "difference" so it inverts against
        whatever is under it: ink on light surfaces, white on dark ones,
        amber over the blue band. The blend only reaches the page when it
        is set on the fixed layer itself.
      */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[70] mix-blend-difference transition-opacity duration-200 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
      >
        <motion.div
          className="absolute top-0 left-0"
          style={{ x: left, y: top, width: w, height: h }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: pressed ? 0.86 : 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
          >
            <span className="absolute top-0 left-0 size-2 border-t-[1.5px] border-l-[1.5px] border-white" />
            <span className="absolute top-0 right-0 size-2 border-t-[1.5px] border-r-[1.5px] border-white" />
            <span className="absolute bottom-0 left-0 size-2 border-b-[1.5px] border-l-[1.5px] border-white" />
            <span className="absolute right-0 bottom-0 size-2 border-r-[1.5px] border-b-[1.5px] border-white" />
          </motion.div>

          <motion.div
            className={`absolute inset-0 transition-opacity duration-200 ${locked ? "opacity-0" : "opacity-100"}`}
            style={{ scaleY: stretch }}
          >
            <motion.svg viewBox="0 0 40 40" className="absolute inset-0 size-full" style={{ rotate: spin }}>
              <circle
                cx="20"
                cy="20"
                r="14"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="5 3.8"
                opacity="0.75"
              />
            </motion.svg>
            <span className="absolute top-0 left-1/2 h-[26%] w-px -translate-x-1/2 bg-white" />
            <span className="absolute bottom-0 left-1/2 h-[26%] w-px -translate-x-1/2 bg-white" />
            <span className="absolute top-1/2 left-0 h-px w-[26%] -translate-y-1/2 bg-white" />
            <span className="absolute top-1/2 right-0 h-px w-[26%] -translate-y-1/2 bg-white" />
          </motion.div>
        </motion.div>

        <motion.div
          className="hud absolute top-0 left-0 text-[10px] whitespace-nowrap text-white"
          style={{ x: readoutX, y: readoutY }}
        >
          <span className={locked ? "hidden" : ""} ref={readoutRef}>
            X 0000 · Y 0000
          </span>
          {locked && <span>{label}</span>}
        </motion.div>
      </div>

      {/* Hotspot: the logo's blue square, exactly under the pointer. */}
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[71] size-1.5 bg-accent ring-1 ring-white/80 transition-opacity duration-200 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{ x: dotX, y: dotY }}
      />
    </>
  );
}
