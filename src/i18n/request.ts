import { getRequestConfig } from "next-intl/server"
import { notFound } from "next/navigation"
import { locales, type Locale } from "./locales"

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const validLocale = locale as Locale

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  }
})
