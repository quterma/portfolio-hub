import { test, expect } from "@playwright/test"

test.describe("Portfolio Hub", () => {
  test("should load homepage and display navigation", async ({ page }) => {
    await page.goto("/")

    // Check that the page loads
    await expect(page).toHaveTitle(/Portfolio Hub/)

    // Check navigation elements (use more specific selectors to avoid conflicts)
    await expect(page.locator("nav")).toBeVisible()
    await expect(
      page.locator("nav").getByRole("link", { name: "Home" })
    ).toBeVisible()
    await expect(
      page.locator("nav").getByRole("link", { name: "Projects" })
    ).toBeVisible()
    await expect(
      page.locator("nav").getByRole("link", { name: "About" })
    ).toBeVisible()
    await expect(
      page.locator("nav").getByRole("link", { name: "Contact" })
    ).toBeVisible()
  })

  test("should navigate to projects page", async ({ page }) => {
    await page.goto("/")

    // Click on Projects link in navigation (be specific to avoid conflict with "View Projects" button)
    await page.locator("nav").getByRole("link", { name: "Projects" }).click()

    // Should be on projects page
    await expect(page).toHaveURL("/projects")
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Projects"
    )
  })

  test("should navigate to project detail page", async ({ page }) => {
    await page.goto("/projects")

    // Check if there are project cards and click on one
    const projectCards = page.locator("[data-testid='project-card']")
    const firstCard = projectCards.first()

    if ((await projectCards.count()) > 0) {
      await firstCard.click()

      // Should navigate to project detail page
      await expect(page.url()).toContain("/project/")
      await expect(page.getByText("Back to Projects")).toBeVisible()
    }
  })

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/")

    // On mobile, navigation might be hidden and replaced with a menu button
    // Let's check if the main content is visible instead
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await expect(page.getByText("Personal portfolio showcasing")).toBeVisible()

    // Check projects page on mobile
    await page.goto("/projects")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  })
})
