"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#contact", label: "Contact" },
];

type NavLinksProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

/** Nav anchors with a scroll-spy marker on the section in view. */
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
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-28% 0px -62% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
              onClick={onNavigate}
              className={
                isMobile
                  ? `group flex min-h-14 w-full items-center justify-between border-b border-edge py-2 text-base font-medium tracking-[-0.02em] transition-colors duration-200 hover:text-accent ${
                      isActive ? "text-accent" : "text-foreground"
                    }`
                  : `group relative inline-flex min-h-11 items-center gap-2 px-2.5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-200 after:absolute after:inset-x-2.5 after:bottom-0 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 lg:px-3 lg:after:inset-x-3 ${
                      isActive
                        ? "text-foreground after:scale-x-100"
                        : "text-muted after:scale-x-0 hover:text-foreground hover:after:scale-x-100"
                    }`
              }
            >
              <span>{link.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
