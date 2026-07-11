"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

type Theme = "light" | "dark";
const themeChangeEvent = "portfolio-theme-change";

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (nextTheme: Theme) => {
      root.dataset.theme = nextTheme;
      root.style.colorScheme = nextTheme;
      setTheme(nextTheme);
    };
    const resolveTheme = () => {
      const stored = getStoredTheme();
      applyTheme(stored ?? (systemPreference.matches ? "dark" : "light"));
    };
    const handleSystemChange = () => {
      if (!getStoredTheme()) resolveTheme();
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "theme" || event.key === null) resolveTheme();
    };
    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail;
      if (nextTheme === "light" || nextTheme === "dark") {
        applyTheme(nextTheme);
      }
    };

    const frame = window.requestAnimationFrame(resolveTheme);
    systemPreference.addEventListener("change", handleSystemChange);
    window.addEventListener("storage", handleStorage);
    window.addEventListener(themeChangeEvent, handleThemeChange);

    return () => {
      window.cancelAnimationFrame(frame);
      systemPreference.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(themeChangeEvent, handleThemeChange);
    };
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const current =
      theme ??
      (root.dataset.theme === "dark" || root.dataset.theme === "light"
        ? root.dataset.theme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
    const next: Theme = current === "dark" ? "light" : "dark";

    root.dataset.theme = next;
    root.style.colorScheme = next;
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    window.dispatchEvent(new CustomEvent<Theme>(themeChangeEvent, { detail: next }));
  };

  const actionLabel =
    theme === "dark"
      ? "Switch to light theme"
      : theme === "light"
        ? "Switch to dark theme"
        : "Toggle color theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={actionLabel}
      aria-pressed={theme === null ? undefined : theme === "dark"}
      title={actionLabel}
      className="inline-flex size-11 items-center justify-center text-muted transition-colors duration-200 hover:bg-surface hover:text-foreground"
    >
      <Sun aria-hidden="true" size={19} className="theme-icon-sun" />
      <Moon aria-hidden="true" size={19} className="theme-icon-moon" />
    </button>
  );
}
