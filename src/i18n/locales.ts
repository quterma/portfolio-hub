export const locales = ["en", "ru"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const LOCALES = {
  EN: "en",
  RU: "ru",
} as const
