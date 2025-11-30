import { Project, ProjectFilter } from "@/types/project"
import { ProjectsSchema } from "@/lib/schemas"
import projectsData from "../../data/projects.json"

// Validate and import the JSON data with Zod schema
let projects: Project[] = []

try {
  projects = ProjectsSchema.parse(projectsData)
} catch (error) {
  console.error("Failed to validate projects data:", error)
  // Fallback to empty array if validation fails
  projects = []
}

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  return projects
}

/**
 * Get all projects with optional filtering
 */
export function getProjects(filter?: ProjectFilter): Project[] {
  let filteredProjects = projects

  if (filter?.status) {
    filteredProjects = filteredProjects.filter(
      project => project.status === filter.status
    )
  }

  if (filter?.featured !== undefined) {
    filteredProjects = filteredProjects.filter(
      project => project.featured === filter.featured
    )
  }

  if (filter?.tags && filter.tags.length > 0) {
    filteredProjects = filteredProjects.filter(project =>
      filter.tags!.some(tag => project.tags?.includes(tag))
    )
  }

  if (filter?.tech && filter.tech.length > 0) {
    filteredProjects = filteredProjects.filter(project =>
      filter.tech!.some(tech => project.tech?.includes(tech))
    )
  }

  if (filter?.year) {
    filteredProjects = filteredProjects.filter(
      project => project.year === filter.year
    )
  }

  return filteredProjects
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  const project = projects.find(project => project.slug === slug)
  return project || null
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return getProjects({ featured: true })
}

/**
 * Get projects by status
 */
export function getProjectsByStatus(status: Project["status"]): Project[] {
  return getProjects({ status })
}

/**
 * Get all unique tags from projects
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  projects.forEach(project => {
    project.tags?.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

/**
 * Get all unique technologies from projects
 */
export function getAllTechnologies(): string[] {
  const techSet = new Set<string>()
  projects.forEach(project => {
    project.tech?.forEach(tech => techSet.add(tech))
  })
  return Array.from(techSet).sort()
}

/**
 * Get project years in descending order
 */
export function getProjectYears(): number[] {
  const yearSet = new Set<number>()
  projects.forEach(project => {
    if (project.year) {
      yearSet.add(project.year)
    }
  })
  return Array.from(yearSet).sort((a, b) => b - a)
}
