import { notFound } from "next/navigation"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProjectBySlug } from "@/lib/projects"
import { getLocalizedText } from "@/lib/i18n-utils"
import { getTranslations } from "next-intl/server"
import { ArrowLeft, Globe } from "lucide-react"
import { siGithub } from "simple-icons"

type ProjectPageProps = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

// TODO: SEO metadata will be handled by localized layout or dedicated SEO helper
// Removed generateMetadata to keep this page focused on data loading and rendering

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params
  const t = await getTranslations({ locale })
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const title = getLocalizedText(project.title, locale)
  const summary = getLocalizedText(project.summary, locale)
  const description = getLocalizedText(project.description, locale)

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
              <span>{t("project.backToProjects")}</span>
            </Link>
          </Button>
        </div>

        {/* Hero Image */}
        {project.images?.cover && (
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            <Image
              src={project.images.cover}
              alt={`${title} cover image`}
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
                  {title}
                </h1>
                {project.year && (
                  <span className="text-lg text-muted-foreground">
                    {project.year}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {project.status && (
                  <Badge
                    className={statusColors[project.status]}
                    variant="secondary"
                  >
                    {t(`project.status.${project.status}`)}
                  </Badge>
                )}
                {project.featured && (
                  <Badge variant="outline">{t("project.featured")}</Badge>
                )}
              </div>
            </div>

            {/* External Links */}
            <div className="flex flex-wrap gap-2">
              {project.urls?.demo && (
                <Button asChild variant="default">
                  <Link
                    href={project.urls.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {t("project.links.demo")}
                  </Link>
                </Button>
              )}
              {project.urls?.github && (
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
                    {t("project.links.source")}
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Summary */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {summary}
          </p>
        </div>

        <Separator />

        {/* Project Details */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {description && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  {t("project.sections.about")}
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            )}

            {/* Screenshots Gallery */}
            {project.images?.gallery && project.images.gallery.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  {t("project.sections.screenshots")}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.images.gallery.map((screenshot, index) => (
                    <div
                      key={index}
                      className="relative aspect-video overflow-hidden rounded-lg border"
                    >
                      <Image
                        src={screenshot}
                        alt={`${title} screenshot ${index + 1}`}
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
            {project.tech && project.tech.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">
                  {t("project.sections.technologies")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">
                  {t("project.sections.tags")}
                </h3>
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
              <h3 className="text-lg font-semibold">
                {t("project.sections.info")}
              </h3>
              <div className="space-y-2 text-sm">
                {project.year && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("project.labels.year")}
                    </span>
                    <span>{project.year}</span>
                  </div>
                )}
                {project.status && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("project.labels.status")}
                    </span>
                    <span>{t(`project.status.${project.status}`)}</span>
                  </div>
                )}
                {project.featured && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("project.labels.featured")}
                    </span>
                    <span>{t("project.featuredYes")}</span>
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
