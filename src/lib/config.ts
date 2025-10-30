export const siteConfig = {
  name: "Portfolio Hub",
  description: "Personal portfolio showcasing projects and experience",
  routes: {
    home: "/",
    projects: "/projects",
    about: "/about",
    contact: "/contact",
  },
} as const

export type RouteKey = keyof typeof siteConfig.routes

export type RoutePath = (typeof siteConfig.routes)[RouteKey]
