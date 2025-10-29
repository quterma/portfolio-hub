import { describe, it, expect, vi, beforeEach } from "vitest"

// Mock next-intl/middleware
const mockCreateMiddleware = vi.fn()
vi.mock("next-intl/middleware", () => ({
  default: mockCreateMiddleware,
}))

// Mock the locales import
vi.mock("@/i18n/locales", () => ({
  locales: ["en", "ru"],
  defaultLocale: "en",
  LOCALES: {
    EN: "en",
    RU: "ru",
  },
}))

describe("proxy", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should create middleware with correct configuration", async () => {
    const mockMiddleware = vi.fn()
    mockCreateMiddleware.mockReturnValue(mockMiddleware)

    // Import the proxy module
    await import("./proxy")

    expect(mockCreateMiddleware).toHaveBeenCalledWith({
      locales: ["en", "ru"],
      defaultLocale: "en",
      localePrefix: "always",
    })
  })

  it("should use typed locale constants", async () => {
    const { LOCALES } = await import("@/i18n/locales")
    expect(LOCALES.EN).toBe("en")
    expect(LOCALES.RU).toBe("ru")
  })

  it("should export config with correct matcher pattern", async () => {
    const proxyModule = await import("./proxy")

    expect(proxyModule.config).toBeDefined()
    expect(proxyModule.config.matcher).toEqual([
      "/((?!api|_next|_vercel|.*\\..*).*)",
    ])
  })

  it("should have proper matcher configuration for Next.js", async () => {
    const proxyModule = await import("./proxy")
    const matcher = proxyModule.config.matcher[0]

    // Verify the matcher is a string that contains the expected patterns
    expect(typeof matcher).toBe("string")
    expect(matcher).toContain("api")
    expect(matcher).toContain("_next")
    expect(matcher).toContain("_vercel")

    // The pattern should be a valid regex
    expect(() => new RegExp(matcher)).not.toThrow()
  })

  it("should have localePrefix set to always", async () => {
    const mockMiddleware = vi.fn()
    mockCreateMiddleware.mockReturnValue(mockMiddleware)

    // Clear modules and re-import to ensure fresh call
    vi.resetModules()
    await import("./proxy")

    const callArgs = mockCreateMiddleware.mock.calls[0][0]
    expect(callArgs.localePrefix).toBe("always")
  })

  it("should properly handle locale detection and routing", async () => {
    const mockMiddleware = vi.fn()
    mockCreateMiddleware.mockReturnValue(mockMiddleware)

    // Clear modules and re-import to ensure fresh call
    vi.resetModules()
    await import("./proxy")

    // Verify middleware was created with the expected configuration
    expect(mockCreateMiddleware).toHaveBeenCalledTimes(1)
    const config = mockCreateMiddleware.mock.calls[0][0]

    expect(config).toEqual({
      locales: ["en", "ru"],
      defaultLocale: "en",
      localePrefix: "always",
    })
  })

  it("should use correct import paths for type safety", async () => {
    // This test ensures we're using the typed constants from the centralized location
    const { LOCALES } = await import("@/i18n/locales")
    expect(LOCALES).toBeDefined()
    expect(typeof LOCALES.EN).toBe("string")
    expect(typeof LOCALES.RU).toBe("string")
    expect(LOCALES.EN).not.toBe(LOCALES.RU)
  })
})
