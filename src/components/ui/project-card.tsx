import { Link } from "@/i18n/navigation"
import { Project } from "@/types/project"
import { getLocalizedText } from "@/lib/i18n-utils"
import { useTranslations } from "next-intl"

type ProjectCardProps = {
  project: Project
  locale: string
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const t = useTranslations()

  const title = getLocalizedText(project.title, locale)
  const summary = getLocalizedText(project.summary, locale)
  const tags = project.tags ?? []
  const year = project.year
  const status = project.status

  return (
    <Link
      href={`/project/${project.slug}`}
      className="group relative block overflow-hidden rounded-lg border bg-background p-6 transition-all duration-200 hover:shadow-lg hover:border-ring/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* Status and Year Badge */}
      <div className="flex items-center justify-between mb-4">
        {status && (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              status === "completed"
                ? "bg-status-success text-status-success-foreground"
                : status === "in-progress"
                  ? "bg-status-info text-status-info-foreground"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {t(`project.status.${status}`)}
          </span>
        )}
        {year && <span className="text-sm text-muted-foreground">{year}</span>}
      </div>

      {/* Project Title */}
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {/* Project Summary */}
      <p className="text-muted-foreground mb-4 line-clamp-3">{summary}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
