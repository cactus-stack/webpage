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
