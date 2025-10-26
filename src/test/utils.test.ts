import { describe, it, expect } from "vitest"
import { createTestProject } from "./utils"

describe("Test Utils", () => {
  it("should create test project with defaults", () => {
    const project = createTestProject()
    expect(project.slug).toBe("test-project")
    expect(project.title).toBe("Test Project")
    expect(project.status).toBe("completed")
    expect(project.featured).toBe(false)
  })

  it("should create test project with overrides", () => {
    const project = createTestProject({
      slug: "custom-project",
      title: "Custom Project",
      year: 2025,
      featured: true,
    })
    expect(project.slug).toBe("custom-project")
    expect(project.title).toBe("Custom Project")
    expect(project.year).toBe(2025)
    expect(project.featured).toBe(true)
  })
})
