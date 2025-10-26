import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest"
import { setupServer } from "msw/node"
import { handlers } from "../test/mocks/handlers"

// Setup MSW server
const server = setupServer(...handlers)

describe("MSW API Mocking", () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it("should mock API requests", async () => {
    const response = await fetch("/api/projects")
    expect(response.ok).toBe(true)

    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)
    expect(data[0]).toHaveProperty("slug", "test-project")
    expect(data[0]).toHaveProperty("title", "Test Project")
  })

  it("should mock individual project requests", async () => {
    const response = await fetch("/api/projects/test-project")
    expect(response.ok).toBe(true)

    const project = await response.json()
    expect(project).toHaveProperty("slug", "test-project")
    expect(project).toHaveProperty("tech")
    expect(project.tech).toContain("React")
  })

  it("should return 404 for non-existent projects", async () => {
    const response = await fetch("/api/projects/non-existent")
    expect(response.status).toBe(404)
  })
})
