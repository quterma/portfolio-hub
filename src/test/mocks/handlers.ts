import { http, HttpResponse } from "msw"

export const handlers = [
  // Mock API endpoints here
  http.get("/api/projects", () => {
    return HttpResponse.json([
      {
        slug: "test-project",
        title: "Test Project",
        summary: "A test project for MSW",
        status: "completed",
        year: 2024,
        tech: ["React", "TypeScript"],
        tags: ["web", "frontend"],
        urls: {
          demo: "https://example.com",
          github: "https://github.com/example/test",
        },
        images: {
          hero: "/test-hero.jpg",
          screenshots: ["/test-1.jpg", "/test-2.jpg"],
        },
        description: "This is a test project for MSW mocking",
        featured: false,
      },
    ])
  }),

  http.get("/api/projects/:slug", ({ params }) => {
    const { slug } = params

    if (slug === "test-project") {
      return HttpResponse.json({
        slug: "test-project",
        title: "Test Project",
        summary: "A test project for MSW",
        status: "completed",
        year: 2024,
        tech: ["React", "TypeScript"],
        tags: ["web", "frontend"],
        urls: {
          demo: "https://example.com",
          github: "https://github.com/example/test",
        },
        images: {
          hero: "/test-hero.jpg",
          screenshots: ["/test-1.jpg", "/test-2.jpg"],
        },
        description: "This is a test project for MSW mocking",
        featured: false,
      })
    }

    return new HttpResponse(null, { status: 404 })
  }),
]
