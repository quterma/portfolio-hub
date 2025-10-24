export interface ProjectUrls {
  demo?: string
  github?: string
  documentation?: string
  live?: string
}

export interface ProjectImages {
  hero: string
  screenshots: string[]
  thumbnail?: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  description: string
  year: number
  status: "completed" | "in-progress" | "planned" | "archived"
  featured: boolean
  tags: string[]
  tech: string[]
  urls: ProjectUrls
  images: ProjectImages
}

export type ProjectStatus = Project["status"]

export interface ProjectFilter {
  status?: ProjectStatus
  featured?: boolean
  tags?: string[]
  tech?: string[]
  year?: number
}
