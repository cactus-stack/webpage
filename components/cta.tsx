import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
};

/** Pill CTA with the trailing icon nested in its own circular island */
export function CtaLink({ href, children, variant = "primary" }: CtaLinkProps) {
  const shell =
    variant === "primary"
      ? "bg-foreground text-background hover:opacity-90"
      : "ring-1 ring-edge hover:ring-accent/50";
  const island =
    variant === "primary" ? "bg-background/20" : "bg-foreground/[0.06]";

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 font-medium transition-all duration-500 ${EASE} active:scale-[0.98] ${shell}`}
    >
      {children}
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ${EASE} group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105 ${island}`}
      >
        <ArrowUpRight size={15} />
      </span>
    </a>
  );
}
