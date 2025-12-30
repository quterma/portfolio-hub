import { notFound } from "next/navigation"
import { Container } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"
import { getProjectBySlug } from "@/lib/projects"
import { getLocalizedText } from "@/lib/i18n-utils"
import { getProjectImagePaths } from "@/lib/gallery"
import { getTranslations } from "next-intl/server"
import { ProjectGalleryMasonry } from "@/components/project-gallery"
import { statusColors, getProjectFlags } from "@/lib/project-utils"
import {
  ProjectBackLink,
  ProjectHero,
  ProjectAboutSection,
  ProjectHighlightsSection,
} from "../_components"

type ProjectPageProps = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

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
  const roleText = project.role
    ? getLocalizedText(project.role, locale)
    : undefined
  const localizedHighlights = project.highlights?.map(h =>
    getLocalizedText(h, locale)
  )

  const { hasDescription, hasHighlights, hasTags } = getProjectFlags(
    project.tags,
    description,
    project.highlights
  )

  return (
    <Container>
      <div className="flex flex-col space-y-8 py-12">
        <ProjectBackLink text={t("project.backToProjects")} />

        <div className="flex flex-col lg:flex-row lg:gap-10 items-start">
          <div className="w-full lg:w-2/3 space-y-8">
            <ProjectHero
              title={title}
              summary={summary}
              status={project.status}
              statusColor={
                project.status ? statusColors[project.status] : undefined
              }
              statusLabel={
                project.status
                  ? t(`project.status.${project.status}`)
                  : undefined
              }
              roleText={roleText}
              tags={hasTags ? project.tags : undefined}
              urls={project.urls}
              demoLabel={t("project.links.demo")}
              sourceLabel={t("project.links.source")}
            />

            {(hasDescription || hasHighlights) && (
              <Separator className="my-8" />
            )}

            {hasDescription && description && (
              <ProjectAboutSection
                title={t("project.sections.about")}
                description={description}
              />
            )}

            {hasHighlights && localizedHighlights && (
              <ProjectHighlightsSection
                title={t("project.sections.highlights")}
                highlights={localizedHighlights}
              />
            )}
          </div>

          {imagePaths.length > 0 && <Separator className="lg:hidden my-8" />}

          <div className="w-full lg:w-1/3 lg:sticky lg:top-58 mt-4 lg:mt-0">
            <ProjectGalleryMasonry images={imagePaths} />
          </div>
        </div>
      </div>
    </Container>
  )
}
