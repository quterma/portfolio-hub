import { notFound } from "next/navigation"
import { Link } from "@/i18n/navigation"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProjectBySlug } from "@/lib/projects"
import { getLocalizedText } from "@/lib/i18n-utils"
import { getProjectImagePaths } from "@/lib/gallery"
import { getTranslations } from "next-intl/server"
import { ArrowLeft, Globe } from "lucide-react"
import { siGithub } from "simple-icons"
import { ProjectGalleryMasonry } from "@/components/project-gallery"

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

  const imagePaths = await getProjectImagePaths(slug)

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

  const hasDescription = !!description
  const hasHighlights = !!(project.highlights && project.highlights.length > 0)
  const tags = project.tags
  const hasTags =
    !!tags &&
    (tags.domain?.length ?? 0) +
      (tags.tech?.length ?? 0) +
      (tags.architecture?.length ?? 0) >
      0

  return (
    <Container>
      <div className="flex flex-col space-y-8 py-12">
        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/projects" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>{t("project.backToProjects")}</span>
            </Link>
          </Button>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row lg:gap-10 items-start">
          {/* Left column - Text content */}
          <div className="w-full lg:w-2/3 space-y-8">
            {/* Hero Section */}
            <div className="space-y-4">
              {/* Title */}
              <h1 className="text-3xl mb-5 font-bold tracking-tight sm:text-4xl">
                {title}
              </h1>

              {/* Summary */}
              <p className="text-lg mb-5 text-muted-foreground leading-relaxed">
                {summary}
              </p>

              {/* Status & Role */}
              <div className="flex mb-5 items-center gap-3 text-sm flex-wrap">
                {project.status && (
                  <Badge
                    className={statusColors[project.status]}
                    variant="secondary"
                  >
                    {t(`project.status.${project.status}`)}
                  </Badge>
                )}
                {project.role && (
                  <>
                    <span className="text-muted-foreground/50">•</span>
                    <span className="text-muted-foreground">
                      Role: {getLocalizedText(project.role, locale)}
                    </span>
                  </>
                )}
              </div>

              {/* Tags */}
              {hasTags && project.tags && (
                <div className="flex flex-wrap gap-3">
                  {project.tags.domain?.map(tag => (
                    <Badge
                      key={`domain-${tag}`}
                      variant="outline"
                      className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.architecture?.map(tag => (
                    <Badge
                      key={`arch-${tag}`}
                      variant="outline"
                      className="bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.tech?.map(tag => (
                    <Badge
                      key={`tech-${tag}`}
                      variant="outline"
                      className="bg-muted/50 text-foreground/80 border-border"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {project.urls?.demo && (
                  <Button
                    asChild
                    variant="default"
                    className="w-full sm:w-auto"
                  >
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
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
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

            {(hasDescription || hasHighlights) && (
              <Separator className="my-8" />
            )}

            {/* Description */}
            {hasDescription && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  {t("project.sections.about")}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
                  {description}
                </p>
              </div>
            )}

            {/* Highlights */}
            {hasHighlights && project.highlights && (
              <div className="space-y-4 mb-3">
                <h2 className="text-2xl font-semibold">
                  {t("project.sections.highlights")}
                </h2>
                <ul className="space-y-2 list-disc list-inside text-base text-muted-foreground max-w-3xl">
                  {project.highlights.map((highlight, index) => (
                    <li key={index}>{getLocalizedText(highlight, locale)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Separator between columns on mobile/tablet */}
          {imagePaths.length > 0 && <Separator className="lg:hidden my-8" />}

          {/* Right column - Gallery */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-58 mt-4 lg:mt-0">
            <ProjectGalleryMasonry
              title={t("project.sections.screenshots")}
              images={imagePaths}
              showTitle={false}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
