import { test, expect } from "@playwright/test"

test.describe("Portfolio Hub - Localized Routes", () => {
  test("should load English projects page", async ({ page }) => {
    await page.goto("/en/projects")

    await expect(page).toHaveURL("/en/projects")
    await expect(page.locator("h1")).toContainText("Projects")
  })

  test("should load Russian projects page", async ({ page }) => {
    await page.goto("/ru/projects")

    await expect(page).toHaveURL("/ru/projects")
    await expect(page.locator("h1")).toContainText("Projects")
  })

  test("should redirect root to English locale", async ({ page }) => {
    await page.goto("/")

    await expect(page).toHaveURL("/en")
  })
})
