"use client"

import { useTheme } from "@/hooks/use-theme"
import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"

const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

const THEME_CYCLE = {
  light: "dark" as const,
  dark: "system" as const,
  system: "light" as const,
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const Icon = THEME_ICONS[theme]

  const handleToggle = () => {
    setTheme(THEME_CYCLE[theme])
  }

  return (
    <Button
      variant="ghost"
      onClick={handleToggle}
      aria-label="Theme"
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/30 hover:text-foreground focus-visible:border-border/60"
    >
      <Icon className="block h-4 w-4" />
    </Button>
  )
}
