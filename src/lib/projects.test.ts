import { describe, it, expect } from "vitest"
import { getAllProjects, getProjectBySlug } from "./projects"

describe("Project Utilities", () => {
  it("should get all projects", () => {
    const projects = getAllProjects()
    expect(projects).toBeDefined()
    expect(Array.isArray(projects)).toBe(true)
  })

  it("should get project by slug", () => {
    const project = getProjectBySlug("product-showcase")
    expect(project).toBeDefined()
    expect(project?.slug).toBe("product-showcase")
    expect(project?.title.en).toBe("Product Showcase")
  })

  it("should return null for non-existent project", () => {
    const project = getProjectBySlug("non-existent")
    expect(project).toBeNull()
  })

  it("should have valid project structure", () => {
    const projects = getAllProjects()
    if (projects.length > 0) {
      const project = projects[0]
      expect(project).toHaveProperty("slug")
      expect(project).toHaveProperty("title")
      expect(project).toHaveProperty("summary")
      expect(project).toHaveProperty("status")
      expect(project).toHaveProperty("year")
      expect(project).toHaveProperty("tech")
      expect(project).toHaveProperty("tags")
      expect(project).toHaveProperty("urls")
      expect(project).toHaveProperty("images")
    }
  })
})
