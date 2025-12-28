import React from "react"
import { render, RenderOptions } from "@testing-library/react"
import type { Project } from "@/types/project"

// Custom render function with providers if needed
export function renderWithProviders(
  ui: React.ReactElement,
  options?: RenderOptions
) {
  return render(ui, options)
}

// Re-export everything from React Testing Library
export * from "@testing-library/react"
export { renderWithProviders as render }

// Test data factory for projects
export const createTestProject = (overrides?: Partial<Project>): Project => ({
  slug: "test-project",
  title: {
    en: "Test Project",
  },
  summary: {
    en: "A test project",
  },
  description: {
    en: "A detailed description of the test project",
  },
  status: "completed",
  year: 2024,
  featured: false,
  tech: ["React", "TypeScript"],
  tags: {
    domain: ["web"],
    tech: ["frontend"],
  },
  urls: {
    demo: "https://example.com",
    github: "https://github.com/example/test",
  },
  images: {
    cover: "/test-hero.jpg",
    gallery: [],
  },
  ...overrides,
})

// Mock utilities
export const createMockProps = <T extends Record<string, unknown>>(
  overrides?: Partial<T>
): T => {
  return {
    ...overrides,
  } as T
}
