import { describe, it, expect } from "vitest"
import { LOCALES, defaultLocale, locales } from "@/i18n/locales"
import { getMessages } from "@/i18n/i18n-utils"

describe("Type-safe locale constants", () => {
  it("should use LOCALES constants correctly", () => {
    // Verify LOCALES constants exist and are typed correctly
    expect(LOCALES.EN).toBe("en")
    expect(LOCALES.RU).toBe("ru")

    // Verify defaultLocale is correctly typed
    expect(defaultLocale).toBe(LOCALES.EN)

    // Verify locales array contains all expected values
    expect(locales).toContain(LOCALES.EN)
    expect(locales).toContain(LOCALES.RU)
    expect(locales.length).toBe(2)
  })

  it("should work with getMessages using typed constants", () => {
    const enMessages = getMessages(LOCALES.EN)
    const ruMessages = getMessages(LOCALES.RU)
    const defaultMessages = getMessages(defaultLocale)

    expect(enMessages).toBeDefined()
    expect(ruMessages).toBeDefined()
    expect(defaultMessages).toEqual(enMessages)

    // Verify message structure
    expect(enMessages.meta.siteTitle).toContain("Portfolio Hub")
    expect(ruMessages.meta.siteTitle).toContain("Портфолио Хаб")
  })
})
