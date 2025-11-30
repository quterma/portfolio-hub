import { Link } from "@/i18n/navigation"
import { Project } from "@/types/project"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { siGithub } from "simple-icons"
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
    <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all duration-200 hover:shadow-lg hover:border-ring/20">
      {/* Status and Year Badge */}
      <div className="flex items-center justify-between mb-4">
        {status && (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              status === "completed"
                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                : status === "in-progress"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
            }`}
          >
            {t(`project.status.${status}`)}
          </span>
        )}
        {year && <span className="text-sm text-muted-foreground">{year}</span>}
      </div>

      {/* Project Title */}
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
        <Link
          href={`/project/${project.slug}`}
          className="after:absolute after:inset-0"
        >
          {title}
        </Link>
      </h3>

      {/* Project Summary */}
      <p className="text-muted-foreground mb-4 line-clamp-3">{summary}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-muted-foreground">
            +{tags.length - 3} more
          </span>
        )}
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-2 mt-auto relative z-10">
        <Button asChild size="sm" variant="outline">
          <Link href={`/project/${project.slug}`}>
            {t("projects.card.viewDetails")}
          </Link>
        </Button>
        {project.urls?.demo && (
          <Button asChild size="sm" variant="ghost">
            <Link
              href={project.urls.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        )}
        {project.urls?.github && (
          <Button asChild size="sm" variant="ghost">
            <Link
              href={project.urls.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={siGithub.path} />
              </svg>
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
