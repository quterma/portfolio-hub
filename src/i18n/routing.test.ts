import { describe, it, expect } from "vitest"
import { routing } from "./routing"

describe("i18n Routing", () => {
  it("should have correct default locale", () => {
    expect(routing.defaultLocale).toBe("en")
  })

  it("should have correct locales order", () => {
    expect(routing.locales).toEqual(["en", "ru"])
    expect(routing.locales[0]).toBe("en") // First locale should be default
  })

  it("should have correct locale type", () => {
    const locales = routing.locales
    expect(locales).toContain("en")
    expect(locales).toContain("ru")
    expect(locales.length).toBe(2)
  })
})
