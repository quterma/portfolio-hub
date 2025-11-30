import { describe, it, expect } from "vitest"
import { getLocalizedText } from "./i18n-utils"
import type { LocalizedText } from "./schemas"

describe("i18n-utils", () => {
  describe("getLocalizedText", () => {
    it("should return English text when locale is en", () => {
      const text: LocalizedText = {
        en: "Hello",
        ru: "Привет",
      }
      expect(getLocalizedText(text, "en")).toBe("Hello")
    })

    it("should return Russian text when locale is ru and ru translation exists", () => {
      const text: LocalizedText = {
        en: "Hello",
        ru: "Привет",
      }
      expect(getLocalizedText(text, "ru")).toBe("Привет")
    })

    it("should return Hebrew text when locale is he and he translation exists", () => {
      const text: LocalizedText = {
        en: "Hello",
        he: "שלום",
      }
      expect(getLocalizedText(text, "he")).toBe("שלום")
    })

    it("should fallback to English when ru translation is missing", () => {
      const text: LocalizedText = {
        en: "Hello",
      }
      expect(getLocalizedText(text, "ru")).toBe("Hello")
    })

    it("should fallback to English when he translation is missing", () => {
      const text: LocalizedText = {
        en: "Hello",
      }
      expect(getLocalizedText(text, "he")).toBe("Hello")
    })

    it("should return empty string when text is undefined", () => {
      expect(getLocalizedText(undefined, "en")).toBe("")
      expect(getLocalizedText(undefined, "ru")).toBe("")
    })

    it("should fallback to English for unknown locale", () => {
      const text: LocalizedText = {
        en: "Hello",
        ru: "Привет",
      }
      expect(getLocalizedText(text, "fr")).toBe("Hello")
    })
  })
})
