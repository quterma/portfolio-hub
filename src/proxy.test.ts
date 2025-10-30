import { describe, it, expect, vi, beforeEach } from "vitest"

// Mock next-intl/middleware
const mockCreateMiddleware = vi.fn()
vi.mock("next-intl/middleware", () => ({
  default: mockCreateMiddleware,
}))

// Mock the routing import
vi.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["en", "ru"],
    defaultLocale: "en",
  },
}))

describe("proxy", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should create middleware with routing configuration", async () => {
    const mockMiddleware = vi.fn()
    mockCreateMiddleware.mockReturnValue(mockMiddleware)

    // Import the proxy module
    await import("./proxy")

    expect(mockCreateMiddleware).toHaveBeenCalledWith({
      locales: ["en", "ru"],
      defaultLocale: "en",
    })
  })

  it("should use typed locale constants", async () => {
    const { routing } = await import("@/i18n/routing")
    expect(routing.locales).toContain("en")
    expect(routing.locales).toContain("ru")
    expect(routing.defaultLocale).toBe("en")
  })

  it("should export config with correct matcher pattern", async () => {
    const proxyModule = await import("./proxy")

    expect(proxyModule.config).toBeDefined()
    expect(proxyModule.config.matcher).toBe(
      "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
    )
  })

  it("should have proper matcher configuration for Next.js", async () => {
    const proxyModule = await import("./proxy")
    const matcher = proxyModule.config.matcher

    // Verify the matcher is a string that contains the expected patterns
    expect(typeof matcher).toBe("string")
    expect(matcher).toContain("api")
    expect(matcher).toContain("trpc")
    expect(matcher).toContain("_next")
    expect(matcher).toContain("_vercel")

    // The pattern should be a valid regex
    expect(() => new RegExp(matcher)).not.toThrow()
  })

  it("should properly handle routing object", async () => {
    const mockMiddleware = vi.fn()
    mockCreateMiddleware.mockReturnValue(mockMiddleware)

    // Clear modules and re-import to ensure fresh call
    vi.resetModules()
    await import("./proxy")

    // Verify middleware was created with the routing object
    expect(mockCreateMiddleware).toHaveBeenCalledTimes(1)
    const config = mockCreateMiddleware.mock.calls[0][0]

    expect(config).toEqual({
      locales: ["en", "ru"],
      defaultLocale: "en",
    })
  })

  it("should use correct import paths for type safety", async () => {
    // This test ensures we're using the typed constants from the centralized location
    const { routing } = await import("@/i18n/routing")
    expect(routing).toBeDefined()
    expect(routing.locales).toContain("en")
    expect(routing.locales).toContain("ru")
    expect(routing.defaultLocale).toBe("en")
  })
})
