"use client"

import type { ReactNode } from "react"
import { createContext, useEffect, useRef, useState } from "react"
import { safeGet, safeSet } from "@/lib/safe-storage"

type Theme = "light" | "dark" | "system"

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = "portfolio-theme"

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

const getStoredTheme = (): Theme => {
  const stored = safeGet(STORAGE_KEY)
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored
  }
  return "system"
}

const applyTheme = (theme: Theme) => {
  if (typeof window === "undefined") return

  const resolved = theme === "system" ? getSystemTheme() : theme
  const root = document.documentElement

  if (resolved === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme())
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (themeRef.current === "system") {
        applyTheme("system")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    safeSet(STORAGE_KEY, newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
