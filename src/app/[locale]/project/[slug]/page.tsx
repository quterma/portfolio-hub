import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProjectBySlug } from "@/lib/projects"
import { ArrowLeft, ExternalLink, Globe } from "lucide-react"
import { siGithub } from "simple-icons"
import { seoConfig } from "../../../../../next-seo.config"

type ProjectPageProps = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const projectImageUrl = project.images.hero || seoConfig.ogImage
  const projectUrl = `${seoConfig.url}/project/${project.slug}`

  return {
    title: project.title,
    description: project.summary,
    keywords: [
      ...project.tech,
      ...project.tags,
      "portfolio",
      "project",
      "web development",
    ],
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      siteName: seoConfig.siteName,
      url: projectUrl,
      images: [
        {
          url: projectImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} - Portfolio Project`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [projectImageUrl],
    },
    alternates: {
      canonical: projectUrl,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params // eslint-disable-line @typescript-eslint/no-unused-vars
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const statusColors = {
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    "in-progress":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    planned:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    archived:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
  }

  return (
    <Container>
      <div className="flex flex-col space-y-8 py-12">
        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/projects" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Projects</span>
            </Link>
          </Button>
        </div>

        {/* Hero Image */}
        {project.images.hero && (
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            <Image
              src={project.images.hero}
              alt={`${project.title} hero image`}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Project Header */}
        <div className="space-y-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {project.title}
                </h1>
                <span className="text-lg text-muted-foreground">
                  {project.year}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  className={statusColors[project.status]}
                  variant="secondary"
                >
                  {project.status}
                </Badge>
                {project.featured && <Badge variant="outline">Featured</Badge>}
              </div>
            </div>

            {/* External Links */}
            <div className="flex flex-wrap gap-2">
              {project.urls.demo && (
                <Button asChild variant="default">
                  <Link
                    href={project.urls.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Live Demo
                  </Link>
                </Button>
              )}
              {project.urls.github && (
                <Button asChild variant="outline">
                  <Link
                    href={project.urls.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={siGithub.path} />
                    </svg>
                    Source Code
                  </Link>
                </Button>
              )}
              {project.urls.documentation && (
                <Button asChild variant="outline">
                  <Link
                    href={project.urls.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Documentation
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Summary */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.summary}
          </p>
        </div>

        <Separator />

        {/* Project Details */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">About This Project</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Screenshots Gallery */}
            {project.images.screenshots &&
              project.images.screenshots.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Screenshots</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.images.screenshots.map((screenshot, index) => (
                      <div
                        key={index}
                        className="relative aspect-video overflow-hidden rounded-lg border"
                      >
                        <Image
                          src={screenshot}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Project Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Project Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year:</span>
                  <span>{project.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="capitalize">{project.status}</span>
                </div>
                {project.featured && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Featured:</span>
                    <span>Yes</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
