import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params

  if (!slug) {
    notFound()
  }

  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} - Portfolio Hub`,
    description: `Details about the ${slug} project`,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params

  if (!slug) {
    notFound()
  }

  return (
    <Container>
      <div className="flex flex-col space-y-8 py-12">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/projects">← Back to Projects</Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Project: {slug}
        </h1>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground">
            This is a placeholder page for the <strong>{slug}</strong> project.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Overview</h2>
          <p className="text-muted-foreground">
            Project details, screenshots, and technical information will be
            added here for the <em>{slug}</em> project.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Technologies</h2>
          <p className="text-muted-foreground">
            Technology stack and tools used in this project will be listed here.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Links</h2>
          <div className="flex space-x-4">
            <Button variant="outline">View Demo</Button>
            <Button variant="outline">Source Code</Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
