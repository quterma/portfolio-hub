import { describe, it, expect, vi, beforeEach } from "vitest"
import { buildLocaleMetadata } from "./seo"

// Mock next-intl
vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn(({ locale }: { locale: string }) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        siteTitle: "Portfolio Hub - Web Developer Portfolio",
        siteDescription:
          "Personal portfolio showcasing projects and experience in web development",
      },
      ru: {
        siteTitle: "Портфолио Хаб - Портфолио Веб-разработчика",
        siteDescription:
          "Личное портфолио, демонстрирующее проекты и опыт в веб-разработке",
      },
    }

    return Promise.resolve((key: string) => translations[locale]?.[key] || key)
  }),
}))

// Mock routing
vi.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["en", "ru", "he"],
  },
}))

// Mock seo config
vi.mock("../../next-seo.config", () => ({
  seoConfig: {
    baseUrl: "https://example.com",
    siteName: "Portfolio Hub",
    ogImage: "https://example.com/og-image.jpg",
  },
}))

describe("seo", () => {
  describe("buildLocaleMetadata", () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it("should build basic metadata for English locale", async () => {
      const metadata = await buildLocaleMetadata("en")

      expect(metadata.title).toEqual({
        template: "%s | Portfolio Hub - Web Developer Portfolio",
        default: "Portfolio Hub - Web Developer Portfolio",
      })
      expect(metadata.description).toBe(
        "Personal portfolio showcasing projects and experience in web development"
      )
    })

    it("should build basic metadata for Russian locale", async () => {
      const metadata = await buildLocaleMetadata("ru")

      expect(metadata.title).toEqual({
        template: "%s | Портфолио Хаб - Портфолио Веб-разработчика",
        default: "Портфолио Хаб - Портфолио Веб-разработчика",
      })
      expect(metadata.description).toBe(
        "Личное портфолио, демонстрирующее проекты и опыт в веб-разработке"
      )
    })

    it("should include canonical URL", async () => {
      const metadata = await buildLocaleMetadata("en", {}, "/projects")

      expect(metadata.alternates?.canonical).toBe(
        "https://example.com/en/projects"
      )
    })

    it("should include language alternates", async () => {
      const metadata = await buildLocaleMetadata("en", {}, "/about")

      expect(metadata.alternates?.languages).toEqual({
        en: "https://example.com/en/about",
        ru: "https://example.com/ru/about",
        he: "https://example.com/he/about",
      })
    })

    it("should include OpenGraph metadata", async () => {
      const metadata = await buildLocaleMetadata("en")

      expect(metadata.openGraph).toBeDefined()
      expect(metadata.openGraph?.title).toBe(
        "Portfolio Hub - Web Developer Portfolio"
      )
      expect(metadata.openGraph?.locale).toBe("en")
      expect(metadata.openGraph?.siteName).toBe("Portfolio Hub")
      expect(metadata.openGraph?.url).toBe("https://example.com/en")
    })

    it("should include Twitter card metadata", async () => {
      const metadata = await buildLocaleMetadata("en")

      expect(metadata.twitter).toBeDefined()
      expect(metadata.twitter?.title).toBe(
        "Portfolio Hub - Web Developer Portfolio"
      )
    })

    it("should include robots metadata", async () => {
      const metadata = await buildLocaleMetadata("en")

      expect(metadata.robots).toEqual({
        index: true,
        follow: true,
      })
    })

    it("should apply overrides to metadata", async () => {
      const metadata = await buildLocaleMetadata("en", {
        title: "Custom Title",
        description: "Custom description",
      })

      expect(metadata.title).toBe("Custom Title")
      expect(metadata.description).toBe("Custom description")
    })

    it("should set metadataBase", async () => {
      const metadata = await buildLocaleMetadata("en")

      expect(metadata.metadataBase).toEqual(new URL("https://example.com"))
    })

    it("should include alternate locales in OpenGraph", async () => {
      const metadata = await buildLocaleMetadata("en")

      expect(metadata.openGraph?.alternateLocale).toEqual(
        expect.arrayContaining(["ru", "he"])
      )
      expect(metadata.openGraph?.alternateLocale).not.toContain("en")
    })

    it("should handle root path correctly", async () => {
      const metadata = await buildLocaleMetadata("en", {}, "")

      expect(metadata.alternates?.canonical).toBe("https://example.com/en")
      expect(metadata.openGraph?.url).toBe("https://example.com/en")
    })

    it("should handle path with leading slash", async () => {
      const metadata = await buildLocaleMetadata("en", {}, "/contact")

      expect(metadata.alternates?.canonical).toBe(
        "https://example.com/en/contact"
      )
    })
  })
})
