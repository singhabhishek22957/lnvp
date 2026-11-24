
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = "edurevive-theme";

function getInitialTheme(): Theme {
  if (typeof document !== "undefined") {
    return document.documentElement.dataset.theme === "dark"
      ? "dark"
      : "light";
  }

  return "light";
}

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Load saved theme or system preference.
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);

      const initialTheme: Theme =
        savedTheme === "light" || savedTheme === "dark"
          ? savedTheme
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

      setThemeState(initialTheme);
      document.documentElement.dataset.theme = initialTheme;
    } catch {
      document.documentElement.dataset.theme = theme;
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.dataset.theme = newTheme;

    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Theme still works for the current session.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider",
    );
  }

  return context;
}
