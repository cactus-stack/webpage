"use client";

import { useEffect } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

export function ThemeToggle() {
  // Follow live system changes while the user has not chosen explicitly
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {}
      if (!stored) {
        document.documentElement.dataset.theme = e.matches ? "dark" : "light";
      }
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="-m-2 p-2 text-muted transition-colors hover:text-foreground"
    >
      <Sun size={20} className="theme-icon-sun" />
      <Moon size={20} className="theme-icon-moon" />
    </button>
  );
}
