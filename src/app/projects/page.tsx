import type { Metadata } from "next"
import { Container } from "@/components/ui/container"

export const metadata: Metadata = {
  title: "Projects - Portfolio Hub",
  description: "Explore my portfolio of projects and technical work",
}

export default function ProjectsPage() {
  return (
    <Container>
      <div className="flex flex-col space-y-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Projects
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A collection of projects I&apos;ve worked on, showcasing various
          technologies and approaches to problem-solving.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Project cards will go here */}
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">
              Project showcase will be added here.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
