import { useEffect, useState } from "react"

type Theme = "light" | "dark"

/**
 * Custom hook for theme management with localStorage persistence and system preference detection.
 * 
 * FOUC (Flash of Unstyled Content) Prevention Strategy:
 * - The theme is applied via an inline script in index.html BEFORE React loads
 * - This script reads localStorage or system preference and adds the 'dark' class immediately
 * - This prevents the flash of incorrect theme that would occur if we waited for React to hydrate
 * - The hook then syncs with the initial state set by the script
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if we're in the browser
    if (typeof window === "undefined") return "light"
    
    // Check localStorage first (user preference)
    const stored = localStorage.getItem("theme") as Theme | null
    if (stored === "light" || stored === "dark") {
      return stored
    }
    
    // Fall back to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove existing theme classes
    root.classList.remove("light", "dark")
    
    // Add current theme class
    root.classList.add(theme)
    
    // Persist to localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  // Listen for system theme changes (only if no user preference is set)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      const stored = localStorage.getItem("theme")
      if (!stored) {
        setTheme(e.matches ? "dark" : "light")
      }
    }
    
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return { theme, setTheme, toggleTheme }
}

