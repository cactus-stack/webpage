"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

type NavLinksProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: (href: string) => void;
};

/** Nav anchors with a deterministic scroll-spy marker. */
export function NavLinks({
  variant = "desktop",
  onNavigate,
}: NavLinksProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const section = visible.at(-1)?.target;
        if (section instanceof HTMLElement) setActive(`#${section.id}`);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    const syncHash = () => {
      if (links.some((link) => link.href === window.location.hash)) {
        setActive(window.location.hash);
      }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  const isMobile = variant === "mobile";

  return (
    <ul
      className={
        isMobile
          ? "flex w-full flex-col"
          : "flex min-w-0 items-center gap-0.5 lg:gap-2"
      }
    >
      {links.map((link) => {
        const isActive = active === link.href;

        return (
          <li key={link.href} className={isMobile ? "w-full" : undefined}>
            <a
              href={link.href}
              aria-current={isActive ? "location" : undefined}
              onClick={() => {
                setActive(link.href);
                onNavigate?.(link.href);
              }}
              className={
                isMobile
                  ? `group flex min-h-14 w-full items-center justify-between border-b border-edge py-2 text-base font-medium tracking-[-0.02em] transition-colors duration-200 hover:text-accent active:text-accent ${
                      isActive ? "text-accent" : "text-foreground"
                    }`
                  : `group relative inline-flex min-h-11 items-center gap-2 px-2.5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-200 after:absolute after:inset-x-2.5 after:bottom-0 after:h-px after:origin-center after:bg-accent after:transition-transform after:duration-300 lg:px-3 lg:after:inset-x-3 ${
                      isActive
                        ? "text-foreground after:scale-x-100"
                        : "text-muted after:scale-x-0 hover:text-foreground hover:after:scale-x-100"
                    }`
              }
            >
              <span>{link.label}</span>
              {isMobile && (
                <span
                  aria-hidden="true"
                  className={`mr-1 size-1.5 rounded-full bg-accent transition-[transform,opacity] duration-300 ${
                    isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                />
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
