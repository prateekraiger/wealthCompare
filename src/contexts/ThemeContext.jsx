import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Helper function to get initial theme
const getInitialTheme = () => {
  // Check localStorage first
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme === "dark";
  }

  // Check system preference
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // Default to dark mode
  return true;
};

// Helper function to apply theme to DOM
const applyThemeToDOM = (isDark) => {
  const html = document.documentElement;
  const body = document.body;

  // Remove all theme classes
  html.classList.remove("dark", "light");
  body.classList.remove("dark", "light");

  // Remove inline styles that might interfere
  html.removeAttribute("style");
  body.removeAttribute("style");

  if (isDark) {
    html.classList.add("dark");
    body.classList.add("dark");
  } else {
    html.classList.add("light");
    body.classList.add("light");
  }

  // Save to localStorage
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

export const ThemeProvider = ({ children }) => {
  // Initialize with a function to avoid hydration mismatch
  const [isDark, setIsDark] = useState(() => {
    // During SSR, default to dark mode
    if (typeof window === "undefined") {
      return true;
    }
    return getInitialTheme();
  });

  // Apply theme on mount and when isDark changes
  useEffect(() => {
    applyThemeToDOM(isDark);
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const setTheme = (dark) => {
    setIsDark(dark);
  };

  const value = {
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
