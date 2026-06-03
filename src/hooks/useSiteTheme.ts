import { useEffect, useState } from "react";
import type { SiteTheme } from "../context/PlaygroundContext";

const THEME_STORAGE_KEY = "navis-ui-site-theme";

function getInitialTheme(): SiteTheme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function useSiteTheme() {
  const [theme, setTheme] = useState<SiteTheme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const isLight = theme === "light";
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return {
    isLight,
    theme,
    toggleTheme
  };
}
