"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#contact", label: "Contact" },
];

/** Nav anchors with a scroll-spy underline on the section in view */
export function NavLinks() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      // A narrow band around the viewport center decides the active section
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <ul className="hidden items-center gap-6 text-sm text-muted sm:flex">
      {links.map((link) => {
        const isActive = active === link.href;
        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={isActive ? "true" : undefined}
              className={`relative transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-accent after:transition-[width] after:duration-500 after:ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground hover:after:w-full ${
                isActive ? "text-foreground after:w-full" : "after:w-0"
              }`}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
