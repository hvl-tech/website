import { useSyncExternalStore } from "react";

/* Light/dark theme. The visitor's explicit choice (header toggle) wins,
 * otherwise we follow the system setting. index.html applies the same logic
 * in an inline script before React loads, so the page never flashes. */

export type Theme = "light" | "dark";

const STORAGE_KEY = "hvltech-theme";
const media = window.matchMedia("(prefers-color-scheme: dark)");
const listeners = new Set<() => void>();

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function currentTheme(): Theme {
  return storedTheme() ?? (media.matches ? "dark" : "light");
}

function apply() {
  document.documentElement.dataset.theme = currentTheme();
  listeners.forEach((listener) => listener());
}

media.addEventListener("change", apply);

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode: the choice just won't survive a reload.
  }
  apply();
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    currentTheme,
  );
}
