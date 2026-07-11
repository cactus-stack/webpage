import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
};

export function CtaLink({ href, children, variant = "primary" }: CtaLinkProps) {
  const shell =
    variant === "primary"
      ? "border-accent bg-accent text-accent-ink hover:bg-foreground hover:border-foreground hover:text-background"
      : "border-edge bg-transparent text-foreground hover:border-foreground";

  return (
    <a
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border px-5 text-sm font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] ${shell}`}
    >
      {children}
      <ArrowRight
        size={16}
        aria-hidden
        className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      />
    </a>
  );
}
