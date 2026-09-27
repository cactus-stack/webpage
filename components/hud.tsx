import type { ReactNode } from "react";

/**
 * A labelled hairline, read left to right like an instrument scale:
 * label, rule, trailing label and a status square.
 */
export function HudRule({
  left,
  right,
  className,
  tone = "default",
}: {
  left: ReactNode;
  right?: ReactNode;
  className?: string;
  tone?: "default" | "inverse";
}) {
  const rule = tone === "inverse" ? "bg-white/35" : "bg-edge-strong";
  const square = tone === "inverse" ? "bg-white" : "bg-accent";

  return (
    <div className={`hud flex items-center gap-4 ${className ?? ""}`}>
      <span className="shrink-0">{left}</span>
      <span aria-hidden="true" className={`h-px min-w-6 flex-1 ${rule}`} />
      {right && <span className="shrink-0">{right}</span>}
      <span aria-hidden="true" className={`size-1.5 shrink-0 ${square}`} />
    </div>
  );
}

/** Corner brackets that frame a positioned parent like a targeting reticle. */
export function Brackets({
  className = "border-edge-strong",
  size = "size-3",
}: {
  className?: string;
  size?: string;
}) {
  const corner = `pointer-events-none absolute ${size} ${className}`;
  return (
    <>
      <span aria-hidden="true" className={`${corner} top-0 left-0 border-t border-l`} />
      <span aria-hidden="true" className={`${corner} top-0 right-0 border-t border-r`} />
      <span aria-hidden="true" className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden="true" className={`${corner} right-0 bottom-0 border-r border-b`} />
    </>
  );
}

/** Thin moving warning tape used between major sections. */
export function CautionTape({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`caution caution-scroll h-2.5 w-full opacity-90 ${className ?? ""}`}
    />
  );
}
