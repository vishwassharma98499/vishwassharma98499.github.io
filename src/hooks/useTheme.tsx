import { useState, useEffect, useCallback, createContext, useContext } from "react";
import type { ThemeMode } from "@/types";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getPreferredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem("vs-theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // localStorage unavailable
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(getPreferredTheme);

  const applyTheme = useCallback((t: ThemeMode) => {
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("vs-theme", t);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem("vs-theme")) {
          setTheme(e.matches ? "light" : "dark");
        }
      } catch {
        setTheme(e.matches ? "light" : "dark");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
