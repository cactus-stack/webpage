"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  GithubLogo,
  LinkedinLogo,
  List,
  X,
} from "@phosphor-icons/react";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";

const socialLinkClass =
  "inline-flex size-11 items-center justify-center text-muted transition-colors duration-200 hover:bg-surface hover:text-foreground focus-visible:relative";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const closeAtDesktop = window.matchMedia("(min-width: 48rem)");
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      menuButtonRef.current?.focus();
    };

    closeAtDesktop.addEventListener("change", handleDesktop);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      closeAtDesktop.removeEventListener("change", handleDesktop);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-edge/80 bg-[var(--nav)] backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 w-full max-w-[1320px] items-center px-5 sm:px-8 lg:px-10"
      >
        <a
          href="#main"
          onClick={closeMobileMenu}
          className="group inline-flex min-h-11 shrink-0 items-center gap-3 pr-3 focus-visible:outline-offset-4"
        >
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-lg border border-edge font-mono text-[10px] font-semibold tracking-[-0.02em] text-accent"
          >
            OB
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent">
            Oscar Bucio
          </span>
        </a>

        <div className="ml-auto hidden min-w-0 items-center md:flex">
          <NavLinks />
          <span
            aria-hidden="true"
            className="mx-3 h-5 w-px shrink-0 bg-edge lg:mx-5"
          />
          <div className="flex shrink-0 items-center">
            <ThemeToggle />
            <a
              href="https://github.com/cactus-stack"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Oscar Bucio on GitHub"
              className={socialLinkClass}
            >
              <GithubLogo aria-hidden="true" size={19} />
            </a>
            <a
              href="https://www.linkedin.com/in/oscarbucio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Oscar Bucio on LinkedIn"
              className={socialLinkClass}
            >
              <LinkedinLogo aria-hidden="true" size={19} />
            </a>
          </div>
        </div>

        <div className="ml-auto flex items-center md:hidden">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex size-11 items-center justify-center text-foreground transition-colors duration-200 hover:bg-surface"
          >
            {mobileOpen ? (
              <X aria-hidden="true" size={21} />
            ) : (
              <List aria-hidden="true" size={22} />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id={menuId}
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-edge/80 bg-[var(--nav)] px-4 pt-2 pb-5 backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto w-full max-w-[1320px]">
            <NavLinks variant="mobile" onNavigate={closeMobileMenu} />
            <div className="mt-3 flex items-center justify-between border-t border-edge pt-3">
              <span className="text-sm text-muted">
                Profiles
              </span>
              <div className="flex items-center">
                <a
                  href="https://github.com/cactus-stack"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Oscar Bucio on GitHub"
                  className={socialLinkClass}
                >
                  <GithubLogo aria-hidden="true" size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/oscarbucio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Oscar Bucio on LinkedIn"
                  className={socialLinkClass}
                >
                  <LinkedinLogo aria-hidden="true" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
