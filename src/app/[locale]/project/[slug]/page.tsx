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

  const hasDescription = !!description
  const hasHighlights = !!(project.highlights && project.highlights.length > 0)
  const hasGallery = !!(
    (project.images?.gallery && project.images.gallery.length > 0) ||
    (project.images?.mobileGallery && project.images.mobileGallery.length > 0)
  )
  const hasTech = !!(project.tech && project.tech.length > 0)
  const hasTags = !!(
    project.tags &&
    (project.tags.domain?.length ||
      project.tags.tech?.length ||
      project.tags.architecture?.length)
  )
  const hasSidebar = hasTech || hasTags

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

        {/* Hero Section with Cover */}
        <div
          className={`grid gap-6 ${project.images?.cover ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}
        >
          {/* Left: Header, Links, Summary */}
          <div className="space-y-6">
            {/* Project Header */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed line-clamp-2 lg:line-clamp-3">
                {summary}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                {project.status && (
                  <Badge
                    className={statusColors[project.status]}
                    variant="secondary"
                  >
                    {t(`project.status.${project.status}`)}
                  </Badge>
                )}
                {(getLocalizedText(project.period, locale) || project.year) && (
                  <>
                    <span className="text-muted-foreground/50">•</span>
                    <span>
                      {getLocalizedText(project.period, locale) || project.year}
                    </span>
                  </>
                )}
                {project.role && (
                  <>
                    <span className="text-muted-foreground/50">•</span>
                    <span>{getLocalizedText(project.role, locale)}</span>
                  </>
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

          {/* Right: Cover Image */}
          {project.images?.cover && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
              <Image
                src={project.images.cover}
                alt={`${title} cover image`}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>

        {(hasDescription || hasHighlights || hasGallery || hasSidebar) && (
          <Separator />
        )}

        {/* Description */}
        {hasDescription && (
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">
              {t("project.sections.about")}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-4xl">
              {description}
            </p>
          </div>
        )}

        {/* Highlights */}
        {hasHighlights && project.highlights && (
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">
              {t("project.sections.highlights")}
            </h2>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground max-w-4xl">
              {project.highlights.map((highlight, index) => (
                <li key={index}>{getLocalizedText(highlight, locale)}</li>
              ))}
            </ul>
          </div>
        )}

        {(hasDescription || hasHighlights) && (hasGallery || hasSidebar) && (
          <Separator />
        )}

        {/* Gallery and Sidebar */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Screenshots Gallery - 4/5 width */}
          {hasGallery && (
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-2xl font-semibold">
                {t("project.sections.screenshots")}
              </h2>
              <div className="grid gap-[3px] grid-cols-6 grid-flow-dense">
                {project.images?.gallery?.map((screenshot, index) => (
                  <div
                    key={`desktop-${index}`}
                    className="relative col-span-6 sm:col-span-4 aspect-[16/10] overflow-hidden"
                  >
                    <Image
                      src={screenshot}
                      alt={`${title} - desktop screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                {project.images?.mobileGallery?.map((screenshot, index) => (
                  <div
                    key={`mobile-${index}`}
                    className="relative col-span-3 sm:col-span-2 aspect-[9/16] overflow-hidden"
                  >
                    <Image
                      src={screenshot}
                      alt={`${title} - mobile screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sidebar */}
          {hasSidebar && (
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
              {hasTags && project.tags && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">
                    {t("project.sections.tags")}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {project.tags.domain && project.tags.domain.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-medium">
                          Domain
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.domain.map(tag => (
                            <Badge
                              key={tag}
                              className="bg-blue-500/10 text-blue-700 dark:text-blue-400"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {project.tags.tech && project.tags.tech.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-medium">
                          Tech
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.tech.map(tag => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {project.tags.architecture &&
                      project.tags.architecture.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground font-medium">
                            Architecture
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.architecture.map(tag => (
                              <Badge
                                key={tag}
                                className="bg-violet-500/10 text-violet-700 dark:text-violet-400"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
