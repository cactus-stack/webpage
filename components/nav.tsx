"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { GithubLogo, LinkedinLogo, List, X } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState } from "react";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

const socialLinkClass =
  "inline-flex size-11 items-center justify-center text-muted transition-[color,background-color,transform] duration-200 hover:bg-surface hover:text-foreground active:scale-[0.96] focus-visible:relative";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const closeAtDesktop = window.matchMedia("(min-width: 48rem)");
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const target = event.target;
      if (target instanceof Element && target.closest('[role="menu"]')) return;
      event.preventDefault();
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

  const closeMobileMenu = (destination?: string) => {
    setMobileOpen(false);
    if (!destination) return;

    window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(destination)?.focus({
        preventScroll: true,
      });
    });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-edge/80 bg-[var(--nav)] backdrop-blur-xl">
      <nav aria-label="Primary navigation">
        <div className="mx-auto flex h-16 w-full max-w-[1380px] items-center px-5 sm:px-8 lg:px-10">
          <a
            href="#main"
            onClick={() => closeMobileMenu()}
            className="group inline-flex min-h-11 shrink-0 items-center gap-3 pr-3 focus-visible:outline-offset-4"
          >
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-lg border border-edge font-mono text-[10px] font-semibold tracking-[-0.02em] text-accent transition-[border-color,background-color,transform] duration-300 group-hover:-rotate-3 group-hover:border-accent/50 group-hover:bg-surface group-active:scale-[0.96]"
            >
              {site.initials}
            </span>
            <span className="text-sm font-semibold tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent">
              {site.name}
            </span>
          </a>

          <div className="ml-auto hidden min-w-0 items-center md:flex">
            <NavLinks />
            <span
              aria-hidden="true"
              className="mx-3 h-5 w-px shrink-0 bg-edge lg:mx-5"
            />
          </div>

          <div className="flex shrink-0 items-center">
            <ThemeToggle />
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on GitHub`}
              className={`${socialLinkClass} hidden md:inline-flex`}
            >
              <GithubLogo aria-hidden="true" size={19} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on LinkedIn`}
              className={`${socialLinkClass} hidden md:inline-flex`}
            >
              <LinkedinLogo aria-hidden="true" size={19} />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={mobileOpen}
              aria-controls={mobileOpen ? menuId : undefined}
              aria-label={
                mobileOpen ? "Close main navigation" : "Open main navigation"
              }
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex size-11 items-center justify-center text-foreground transition-[color,background-color,transform] duration-200 hover:bg-surface active:scale-[0.96] md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  aria-hidden="true"
                  className="inline-flex"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, rotate: -24, scale: 0.72 }
                  }
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, rotate: 24, scale: 0.72 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {mobileOpen ? <X size={21} /> : <List size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              ref={mobileMenuRef}
              id={menuId}
              initial={reduceMotion ? false : { opacity: 0, y: -12, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8, scaleY: 0.98 }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              onAnimationComplete={() => {
                if (
                  menuButtonRef.current?.getAttribute("aria-expanded") !== "true"
                ) {
                  return;
                }
                mobileMenuRef.current
                  ?.querySelector<HTMLAnchorElement>('a[href^="#"]')
                  ?.focus();
              }}
              className="origin-top overflow-hidden border-t border-edge/80 bg-[var(--nav)] backdrop-blur-xl md:hidden"
            >
              <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 pt-2 pb-5">
                <div className="mx-auto w-full max-w-[1380px]">
                  <NavLinks variant="mobile" onNavigate={closeMobileMenu} />
                  <div className="mt-3 flex items-center justify-between border-t border-edge pt-3">
                    <span className="text-sm text-muted">Profiles</span>
                    <div className="flex items-center">
                      <a
                        href={site.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${site.name} on GitHub`}
                        className={socialLinkClass}
                      >
                        <GithubLogo aria-hidden="true" size={20} />
                      </a>
                      <a
                        href={site.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${site.name} on LinkedIn`}
                        className={socialLinkClass}
                      >
                        <LinkedinLogo aria-hidden="true" size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
