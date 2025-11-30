import { describe, it, expect } from "vitest"
import { LocalizedTextSchema, ProjectSchema, ProjectsSchema } from "./schemas"

describe("schemas", () => {
  describe("LocalizedTextSchema", () => {
    it("should validate valid LocalizedText with en only", () => {
      const data = { en: "Hello" }
      const result = LocalizedTextSchema.safeParse(data)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.en).toBe("Hello")
        expect(result.data.ru).toBeUndefined()
      }
    })

    it("should validate LocalizedText with all locales", () => {
      const data = {
        en: "Hello",
        ru: "Привет",
        he: "שלום",
      }
      const result = LocalizedTextSchema.safeParse(data)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.en).toBe("Hello")
        expect(result.data.ru).toBe("Привет")
        expect(result.data.he).toBe("שלום")
      }
    })

    it("should fail when en is missing", () => {
      const data = { ru: "Привет" }
      const result = LocalizedTextSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it("should fail when en is empty string", () => {
      const data = { en: "" }
      const result = LocalizedTextSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe("ProjectSchema", () => {
    it("should validate minimal valid project", () => {
      const data = {
        slug: "test-project",
        title: { en: "Test" },
        summary: { en: "Test summary" },
      }
      const result = ProjectSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it("should validate complete project", () => {
      const data = {
        slug: "test-project",
        title: { en: "Test Project", ru: "Тестовый проект" },
        summary: { en: "Summary", ru: "Краткое описание" },
        description: { en: "Full description" },
        year: 2024,
        status: "completed",
        featured: true,
        role: { en: "Developer", ru: "Разработчик" },
        period: { en: "2024-01", ru: "Январь 2024" },
        tags: ["web", "frontend"],
        tech: ["React", "TypeScript"],
        highlights: [{ en: "Feature 1" }, { en: "Feature 2" }],
        urls: {
          demo: "https://example.com",
          github: "https://github.com/test/test",
        },
        images: {
          cover: "/cover.jpg",
          gallery: ["/img1.jpg", "/img2.jpg"],
        },
      }
      const result = ProjectSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it("should fail when slug is missing", () => {
      const data = {
        title: { en: "Test" },
        summary: { en: "Test summary" },
      }
      const result = ProjectSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it("should fail when title is not LocalizedText", () => {
      const data = {
        slug: "test",
        title: "Plain string",
        summary: { en: "Summary" },
      }
      const result = ProjectSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it("should fail when status is invalid", () => {
      const data = {
        slug: "test",
        title: { en: "Test" },
        summary: { en: "Summary" },
        status: "invalid-status",
      }
      const result = ProjectSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it("should validate valid status values", () => {
      const statuses = ["completed", "in-progress", "planned", "archived"]
      statuses.forEach(status => {
        const data = {
          slug: "test",
          title: { en: "Test" },
          summary: { en: "Summary" },
          status,
        }
        const result = ProjectSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })

    it("should fail when URLs are not valid URLs", () => {
      const data = {
        slug: "test",
        title: { en: "Test" },
        summary: { en: "Summary" },
        urls: {
          demo: "not-a-url",
        },
      }
      const result = ProjectSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it("should allow optional fields to be undefined", () => {
      const data = {
        slug: "test",
        title: { en: "Test" },
        summary: { en: "Summary" },
        description: undefined,
        year: undefined,
        status: undefined,
        featured: undefined,
        role: undefined,
        period: undefined,
        tags: undefined,
        tech: undefined,
        highlights: undefined,
        urls: undefined,
        images: undefined,
      }
      const result = ProjectSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  describe("ProjectsSchema", () => {
    it("should validate array of projects", () => {
      const data = [
        {
          slug: "project-1",
          title: { en: "Project 1" },
          summary: { en: "Summary 1" },
        },
        {
          slug: "project-2",
          title: { en: "Project 2" },
          summary: { en: "Summary 2" },
        },
      ]
      const result = ProjectsSchema.safeParse(data)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toHaveLength(2)
      }
    })

    it("should validate empty array", () => {
      const result = ProjectsSchema.safeParse([])
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toHaveLength(0)
      }
    })

    it("should fail when one project is invalid", () => {
      const data = [
        {
          slug: "project-1",
          title: { en: "Project 1" },
          summary: { en: "Summary 1" },
        },
        {
          slug: "project-2",
          title: "Invalid title", // Should be LocalizedText
          summary: { en: "Summary 2" },
        },
      ]
      const result = ProjectsSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})
