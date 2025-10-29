import { locales, defaultLocale, type Locale } from "./locales"
import en from "../../messages/en.json"
import ru from "../../messages/ru.json"

// Strongly-typed dictionary map
const DICT: Record<Locale, typeof en> = {
  en,
  ru,
} as const

/**
 * Get messages for a specific locale with fallback to default locale
 */
export function getMessages(locale: Locale) {
  return DICT[locale] || DICT[defaultLocale]
}

/**
 * Type guard to check if a string is a supported locale
 */
export function isSupportedLocale(x: string): x is Locale {
  return locales.includes(x as Locale)
}

/**
 * Get all available locales
 */
export function getAvailableLocales(): readonly Locale[] {
  return locales
}

/**
 * Get the default locale
 */
export function getDefaultLocale(): Locale {
  return defaultLocale
}
