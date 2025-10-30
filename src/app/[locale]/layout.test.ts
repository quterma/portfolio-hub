import { describe, it, expect } from "vitest"
import { routing } from "@/i18n/routing"

describe("Locale Layout", () => {
  describe("generateStaticParams", () => {
    it("should return all supported locales", () => {
      // Имитируем функцию generateStaticParams
      const params = routing.locales.map(locale => ({ locale }))

      expect(params).toHaveLength(2)
      expect(params).toEqual([{ locale: "en" }, { locale: "ru" }])
    })

    it("should include both English and Russian locales", () => {
      const params = routing.locales.map(locale => ({ locale }))
      const locales = params.map(p => p.locale)

      expect(locales).toContain("en")
      expect(locales).toContain("ru")
    })
  })
})
