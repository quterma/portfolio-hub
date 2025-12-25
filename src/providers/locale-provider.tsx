"use client"

import type { ReactNode } from "react"
import { createContext, useState } from "react"
import { useRouter, usePathname } from "@/i18n/navigation"
import { safeGet, safeSet } from "@/lib/safe-storage"

type Locale = "en" | "ru"

type LocaleContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const STORAGE_KEY = "portfolio-locale"

export const LocaleContext = createContext<LocaleContextType | undefined>(
  undefined
)

const getStoredLocale = (): Locale | null => {
  const stored = safeGet(STORAGE_KEY)
  return stored === "en" || stored === "ru" ? stored : null
}

type LocaleProviderProps = {
  children: ReactNode
  initialLocale: Locale
}

export function LocaleProvider({
  children,
  initialLocale,
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(
    () => getStoredLocale() ?? initialLocale
  )
  const router = useRouter()
  const pathname = usePathname()

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return
    setLocaleState(newLocale)
    safeSet(STORAGE_KEY, newLocale)
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}
