"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Desktop, Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState } from "react";

type ThemePreference = "system" | "light" | "dark";
type ResolvedTheme = Exclude<ThemePreference, "system">;

const themeChangeEvent = "portfolio-theme-change";

const themeOptions = [
  { value: "system", label: "System", Icon: Desktop },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const satisfies ReadonlyArray<{
  value: ThemePreference;
  label: string;
  Icon: typeof Sun;
}>;

function getStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

function resolveTheme(
  preference: ThemePreference,
  systemPreference: MediaQueryList,
): ResolvedTheme {
  if (preference !== "system") return preference;
  return systemPreference.matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [open, setOpen] = useState(false);
  const [focusedOption, setFocusedOption] =
    useState<ThemePreference>("system");
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const preferenceRef = useRef<ThemePreference>("system");

  useEffect(() => {
    const root = document.documentElement;
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");

    const applyPreference = (nextPreference: ThemePreference) => {
      const resolved = resolveTheme(nextPreference, systemPreference);
      preferenceRef.current = nextPreference;
      root.dataset.theme = resolved;
      root.style.colorScheme = resolved;
      setPreference(nextPreference);
    };

    const syncStoredPreference = () => applyPreference(getStoredPreference());
    const handleSystemChange = () => {
      if (preferenceRef.current === "system") applyPreference("system");
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "theme" || event.key === null) syncStoredPreference();
    };
    const handleThemeChange = (event: Event) => {
      const nextPreference = (event as CustomEvent<ThemePreference>).detail;
      if (
        nextPreference === "system" ||
        nextPreference === "light" ||
        nextPreference === "dark"
      ) {
        applyPreference(nextPreference);
      }
    };

    const frame = window.requestAnimationFrame(syncStoredPreference);
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

  useEffect(() => {
    if (!open) return;

    const selectedOption = menuRef.current?.querySelector<HTMLButtonElement>(
      '[role="menuitemradio"][aria-checked="true"]',
    );
    const frame = window.requestAnimationFrame(() => selectedOption?.focus());

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !menuRef.current?.parentElement?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const selectPreference = (nextPreference: ThemePreference) => {
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");
    const resolved = resolveTheme(nextPreference, systemPreference);

    preferenceRef.current = nextPreference;
    document.documentElement.setAttribute("data-theme", resolved);
    document.documentElement.style.setProperty("color-scheme", resolved);
    setPreference(nextPreference);
    setOpen(false);

    try {
      if (nextPreference === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", nextPreference);
    } catch {}

    window.dispatchEvent(
      new CustomEvent<ThemePreference>(themeChangeEvent, {
        detail: nextPreference,
      }),
    );
    window.requestAnimationFrame(() => buttonRef.current?.focus());
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      if (event.key === "Tab") setOpen(false);
      return;
    }

    event.preventDefault();
    const options = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="menuitemradio"]',
      ) ?? [],
    );
    if (!options.length) return;

    const currentIndex = options.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    let nextIndex: number;
    if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = options.length - 1;
    else if (event.key === "ArrowDown") {
      nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % options.length;
    } else {
      nextIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
    }
    const nextOption = options[nextIndex];
    if (!nextOption) return;
    setFocusedOption(nextOption.dataset.themeValue as ThemePreference);
    nextOption.focus();
  };

  const selectedOption = themeOptions.find(
    (option) => option.value === preference,
  ) ?? themeOptions[0];
  const SelectedIcon = selectedOption.Icon;
  const buttonLabel = `Choose color theme. Current preference: ${selectedOption.label}`;

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        aria-label={buttonLabel}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="menu"
        title={buttonLabel}
        onClick={() => {
          setFocusedOption(preference);
          setOpen((isOpen) => !isOpen);
        }}
        className="group inline-flex size-11 items-center justify-center text-muted transition-[color,background-color,transform] duration-200 hover:bg-surface hover:text-foreground active:scale-[0.96]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={preference}
            aria-hidden="true"
            className="inline-flex"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, rotate: -20, scale: 0.72 }
            }
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, rotate: 20, scale: 0.72 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <SelectedIcon size={19} weight="regular" />
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label="Color theme"
            onKeyDown={handleMenuKeyDown}
            initial={
              reduceMotion ? false : { opacity: 0, y: -6, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -4, scale: 0.98 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute top-[calc(100%+0.5rem)] right-0 z-50 w-40 origin-top-right rounded-xl border border-edge/90 bg-[var(--nav)] p-1.5 shadow-[0_16px_44px_rgb(0_0_0/0.16)] backdrop-blur-xl"
          >
            {themeOptions.map(({ value, label, Icon }) => {
              const selected = preference === value;

              return (
                <button
                  key={value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  data-theme-value={value}
                  tabIndex={focusedOption === value ? 0 : -1}
                  onFocus={() => setFocusedOption(value)}
                  onClick={() => selectPreference(value)}
                  className={`group flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm transition-[color,background-color,transform] duration-200 active:scale-[0.98] ${
                    selected
                      ? "bg-surface text-foreground"
                      : "text-muted hover:bg-surface/70 hover:text-foreground"
                  }`}
                >
                  <Icon aria-hidden="true" size={17} />
                  <span className="flex-1">{label}</span>
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full bg-accent transition-transform duration-200 ${
                      selected ? "scale-100" : "scale-0"
                    }`}
                  />
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
