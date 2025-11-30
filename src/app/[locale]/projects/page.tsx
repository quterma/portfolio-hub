import { Container } from "@/components/ui/container"
import { ProjectCard } from "@/components/ui/project-card"
import { getAllProjects } from "@/lib/projects"
import { getTranslations } from "next-intl/server"

// Using buildLocaleMetadata with page-specific title override
import { buildLocaleMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import type { LocaleParams } from "@/types/route"

type ProjectsPageProps = {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>
}): Promise<Metadata> {
  const { locale } = await params

  // Override title for Projects page with proper canonical
  return buildLocaleMetadata(
    locale,
    {
      title: "Projects",
    },
    "/projects"
  )
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const projects = getAllProjects().sort((a, b) => {
    const aYear = a.year ?? 0
    const bYear = b.year ?? 0
    return bYear - aYear
  })

  return (
    <Container>
      <div className="flex flex-col space-y-8 py-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("projects.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("projects.description")}
          </p>
          {projects.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {t("projects.showing_other", { count: projects.length })}
            </p>
          )}
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <span className="text-2xl">📁</span>
            </div>
            <h3 className="text-xl font-semibold">
              {t("projects.empty.title")}
            </h3>
            <p className="text-muted-foreground max-w-md">
              {t("projects.empty.description")}
            </p>
          </div>
        )}
      </div>
    </Container>
  )
}
