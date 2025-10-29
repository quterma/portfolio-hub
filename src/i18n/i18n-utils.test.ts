import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import {
  getMessages,
  isSupportedLocale,
  getAvailableLocales,
  getDefaultLocale,
} from "./i18n-utils"
import { LOCALES, defaultLocale, type Locale } from "./locales"

describe("i18n Utilities", () => {
  describe("Core Utils (Unit Tests)", () => {
    describe("getMessages", () => {
      it("should return English messages for 'en' locale", () => {
        const messages = getMessages(LOCALES.EN)

        expect(messages).toBeDefined()
        expect(messages.meta).toBeDefined()
        expect(messages.meta.siteTitle).toBe(
          "Portfolio Hub - Web Developer Portfolio"
        )
        expect(messages.nav).toBeDefined()
        expect(messages.nav.home).toBe("Home")
      })

      it("should return Russian messages for 'ru' locale", () => {
        const messages = getMessages(LOCALES.RU)

        expect(messages).toBeDefined()
        expect(messages.meta).toBeDefined()
        expect(messages.meta.siteTitle).toBe(
          "Портфолио Хаб - Портфолио Веб-разработчика"
        )
        expect(messages.nav).toBeDefined()
        expect(messages.nav.home).toBe("Главная")
      })

      it("should fallback to default locale for invalid locale", () => {
        // @ts-expect-error - Testing invalid locale
        const messages = getMessages("invalid")
        const defaultMessages = getMessages(defaultLocale)

        expect(messages).toEqual(defaultMessages)
      })
    })

    describe("isSupportedLocale", () => {
      it("should return true for supported locales", () => {
        expect(isSupportedLocale(LOCALES.EN)).toBe(true)
        expect(isSupportedLocale(LOCALES.RU)).toBe(true)
      })

      it("should return false for unsupported locales", () => {
        expect(isSupportedLocale("fr")).toBe(false)
        expect(isSupportedLocale("de")).toBe(false)
        expect(isSupportedLocale("invalid")).toBe(false)
        expect(isSupportedLocale("")).toBe(false)
      })

      it("should handle non-string inputs safely", () => {
        // @ts-expect-error - Testing type safety
        expect(isSupportedLocale(null)).toBe(false)
        // @ts-expect-error - Testing type safety
        expect(isSupportedLocale(undefined)).toBe(false)
        // @ts-expect-error - Testing type safety
        expect(isSupportedLocale(123)).toBe(false)
      })
    })

    describe("getAvailableLocales", () => {
      it("should return all supported locales", () => {
        const locales = getAvailableLocales()

        expect(locales).toHaveLength(2)
        expect(locales).toContain(LOCALES.EN)
        expect(locales).toContain(LOCALES.RU)
      })
    })

    describe("getDefaultLocale", () => {
      it("should return default locale", () => {
        const locale = getDefaultLocale()

        expect(locale).toBe(defaultLocale)
        expect(isSupportedLocale(locale)).toBe(true)
      })
    })

    describe("Type safety", () => {
      it("should have proper TypeScript types", () => {
        const locale: Locale = LOCALES.EN
        const messages = getMessages(locale)

        // Type checking - these should compile without errors
        expect(typeof messages.meta.siteTitle).toBe("string")
        expect(typeof messages.nav.home).toBe("string")
        expect(typeof messages.cta.repo).toBe("string")
      })
    })

    describe("Integration", () => {
      it("should work together properly", () => {
        const availableLocales = getAvailableLocales()
        const defaultLocale = getDefaultLocale()

        // Default locale should be in available locales
        expect(availableLocales).toContain(defaultLocale)

        // All available locales should be supported
        availableLocales.forEach(locale => {
          expect(isSupportedLocale(locale)).toBe(true)
          expect(getMessages(locale)).toBeDefined()
        })
      })
    })

    describe("Typed constants usage", () => {
      it("should work with LOCALES constants", () => {
        const enMessages = getMessages(LOCALES.EN)
        const ruMessages = getMessages(LOCALES.RU)

        expect(enMessages).toBeDefined()
        expect(ruMessages).toBeDefined()
        expect(enMessages.meta.siteTitle).toContain("Portfolio Hub")
        expect(ruMessages.meta.siteTitle).toContain("Портфолио Хаб")
      })

      it("should use defaultLocale constant correctly", () => {
        const defaultMessages = getMessages(defaultLocale)
        const enMessages = getMessages(LOCALES.EN)

        expect(defaultMessages).toEqual(enMessages)
        expect(defaultLocale).toBe(LOCALES.EN)
      })
    })
  })

  describe("HTTP Integration (MSW Tests)", () => {
    // Mock server setup for testing HTTP requests (example usage)
    const server = setupServer(
      // Mock translation API endpoint (example)
      http.get("https://api.example.com/translations/:locale", ({ params }) => {
        const { locale } = params

        if (locale === "en") {
          return HttpResponse.json({
            meta: { siteTitle: "Mocked EN Title" },
            nav: { home: "Mocked Home" },
          })
        }

        if (locale === "ru") {
          return HttpResponse.json({
            meta: { siteTitle: "Мокированный RU Заголовок" },
            nav: { home: "Мокированная Главная" },
          })
        }

        return new HttpResponse(null, { status: 404 })
      })
    )

    // Example function that would use HTTP requests (for demo purposes)
    async function fetchTranslationsFromAPI(locale: string) {
      const response = await fetch(
        `https://api.example.com/translations/${locale}`
      )
      if (!response.ok) {
        throw new Error(`Failed to fetch translations for ${locale}`)
      }
      return response.json()
    }

    // Setup mock server
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    describe("Local utils (no HTTP)", () => {
      it("should work with local utilities", () => {
        expect(isSupportedLocale(LOCALES.EN)).toBe(true)
        expect(isSupportedLocale(LOCALES.RU)).toBe(true)
        expect(isSupportedLocale("fr")).toBe(false)
      })

      it("should get local messages", () => {
        const enMessages = getMessages(LOCALES.EN)
        const ruMessages = getMessages(LOCALES.RU)

        expect(enMessages.meta.siteTitle).toContain("Portfolio Hub")
        expect(ruMessages.meta.siteTitle).toContain("Портфолио Хаб")
      })
    })

    describe("Mocked HTTP requests (example)", () => {
      it("should fetch mocked English translations", async () => {
        const translations = await fetchTranslationsFromAPI("en")

        expect(translations).toBeDefined()
        expect(translations.meta.siteTitle).toBe("Mocked EN Title")
        expect(translations.nav.home).toBe("Mocked Home")
      })

      it("should fetch mocked Russian translations", async () => {
        const translations = await fetchTranslationsFromAPI("ru")

        expect(translations).toBeDefined()
        expect(translations.meta.siteTitle).toBe("Мокированный RU Заголовок")
        expect(translations.nav.home).toBe("Мокированная Главная")
      })

      it("should handle 404 for unsupported locale", async () => {
        await expect(fetchTranslationsFromAPI("fr")).rejects.toThrow(
          "Failed to fetch translations for fr"
        )
      })

      it("should override default behavior", async () => {
        // Override the mock for this specific test
        server.use(
          http.get("https://api.example.com/translations/en", () => {
            return HttpResponse.json({
              meta: { siteTitle: "Override Title" },
              nav: { home: "Override Home" },
            })
          })
        )

        const translations = await fetchTranslationsFromAPI("en")
        expect(translations.meta.siteTitle).toBe("Override Title")
      })
    })

    describe("Integration example", () => {
      it("should validate locale before API call", async () => {
        const locale = LOCALES.EN

        // First check if locale is supported locally
        if (isSupportedLocale(locale)) {
          const apiTranslations = await fetchTranslationsFromAPI(locale)
          const localTranslations = getMessages(locale)

          // Both should exist but may have different content
          expect(apiTranslations).toBeDefined()
          expect(localTranslations).toBeDefined()

          // API returns mocked data, local returns real data
          expect(apiTranslations.meta.siteTitle).toBe("Mocked EN Title")
          expect(localTranslations.meta.siteTitle).toContain("Portfolio Hub")
        }
      })
    })
  })
})
