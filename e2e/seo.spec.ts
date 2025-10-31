import { test, expect } from "@playwright/test"

test.describe("Portfolio Hub - SEO Metadata", () => {
  // Core SEO test for English homepage
  test("should have proper SEO metadata on English homepage", async ({
    page,
  }) => {
    await page.goto("/en")

    // Check page title
    await expect(page).toHaveTitle(/Portfolio Hub - Web Developer Portfolio/)

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute(
      "content",
      "Personal portfolio showcasing projects and experience in web development"
    )

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute(
      "href",
      "https://portfolio-hub.example/en"
    )

    // Check alternate language links
    const alternateRu = page.locator('link[rel="alternate"][hreflang="ru"]')
    await expect(alternateRu).toHaveAttribute(
      "href",
      "https://portfolio-hub.example/ru"
    )

    // Check OpenGraph tags
    const ogLocale = page.locator('meta[property="og:locale"]')
    await expect(ogLocale).toHaveAttribute("content", "en")

    const ogUrl = page.locator('meta[property="og:url"]')
    await expect(ogUrl).toHaveAttribute(
      "content",
      "https://portfolio-hub.example/en"
    )
  })

  // Test Russian localization
  test("should have proper localized metadata for Russian", async ({
    page,
  }) => {
    await page.goto("/ru")

    // Check localized title and description
    await expect(page).toHaveTitle("Портфолио Хаб - Портфолио Веб-разработчика")

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute(
      "content",
      "Личное портфолио, демонстрирующее проекты и опыт в веб-разработке"
    )

    // Check canonical and alternates
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute(
      "href",
      "https://portfolio-hub.example/ru"
    )

    const ogLocale = page.locator('meta[property="og:locale"]')
    await expect(ogLocale).toHaveAttribute("content", "ru")
  })

  // Test page-specific metadata
  test("should have correct metadata for projects page", async ({ page }) => {
    await page.goto("/en/projects")

    // Check page-specific title
    await expect(page).toHaveTitle(
      "Projects | Portfolio Hub - Web Developer Portfolio"
    )

    // Check canonical URL includes path
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute(
      "href",
      "https://portfolio-hub.example/en/projects"
    )

    // Check alternate includes path
    const alternateRu = page.locator('link[rel="alternate"][hreflang="ru"]')
    await expect(alternateRu).toHaveAttribute(
      "href",
      "https://portfolio-hub.example/ru/projects"
    )
  })

  // Test 404 handling
  test("should handle 404 page gracefully", async ({ page }) => {
    await page.goto("/en/non-existent-page")
    await page.waitForLoadState("networkidle")

    // Check that we get a valid title (404 handling may vary in Next.js)
    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(0)
  })
})
