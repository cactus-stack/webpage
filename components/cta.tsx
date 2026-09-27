import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "inverse";
  newTab?: boolean;
};

const shells = {
  primary:
    "border-accent bg-accent text-accent-ink hover:border-foreground hover:bg-foreground hover:text-background",
  ghost:
    "border-edge-strong bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
  inverse:
    "border-white bg-white text-[#0b0e14] hover:border-[#0b0e14] hover:bg-[#0b0e14] hover:text-white",
} as const;

export function CtaLink({
  href,
  children,
  variant = "primary",
  newTab = false,
}: CtaLinkProps) {
  const Arrow = newTab ? ArrowUpRight : ArrowRight;

  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={`hud group inline-flex min-h-12 items-center justify-between gap-6 border px-5 whitespace-nowrap transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px ${shells[variant]}`}
    >
      {children}
      {newTab && <span className="sr-only">, opens in a new tab</span>}
      <Arrow
        size={15}
        aria-hidden
        className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
