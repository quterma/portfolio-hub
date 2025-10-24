import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { ProjectCard } from "@/components/ui/project-card"
import { getAllProjects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Projects - Portfolio Hub",
  description:
    "Explore my portfolio of projects and technical work. Discover the technologies, methodologies, and solutions I've implemented across various domains.",
  openGraph: {
    title: "Projects - Portfolio Hub",
    description: "Explore my portfolio of projects and technical work",
    type: "website",
  },
}

export default function ProjectsPage() {
  const projects = getAllProjects().sort((a, b) => b.year - a.year)

  return (
    <Container>
      <div className="flex flex-col space-y-8 py-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A collection of projects I&apos;ve worked on, showcasing various
            technologies and approaches to problem-solving.
          </p>
          {projects.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Showing {projects.length} project
              {projects.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <span className="text-2xl">📁</span>
            </div>
            <h3 className="text-xl font-semibold">No Projects Found</h3>
            <p className="text-muted-foreground max-w-md">
              It looks like there are no projects to display at the moment.
              Check back later for updates!
            </p>
          </div>
        )}
      </div>
    </Container>
  )
}
