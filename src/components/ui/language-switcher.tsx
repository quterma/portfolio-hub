"use client"

import { useLocale } from "@/hooks/use-locale"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ru" : "en")
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleLocale}
      aria-label="Language"
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-transparent font-semibold uppercase text-muted-foreground hover:border-border/60 hover:bg-muted/30 hover:text-foreground focus-visible:border-border/60"
    >
      <span className="leading-none">{locale}</span>
    </Button>
  )
}
