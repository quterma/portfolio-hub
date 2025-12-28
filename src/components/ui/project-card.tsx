import { Link } from "@/i18n/navigation"
import { Project } from "@/types/project"
import { getLocalizedText } from "@/lib/i18n-utils"
import { useTranslations } from "next-intl"

type ProjectCardProps = {
  project: Project
  locale: string
}

function getBadgeVariant(category: "domain" | "tech" | "architecture"): string {
  if (category === "domain") {
    return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
  }
  if (category === "architecture") {
    return "bg-violet-500/10 text-violet-700 dark:text-violet-400"
  }
  return "bg-muted/60 text-muted-foreground"
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const t = useTranslations()

  const title = getLocalizedText(project.title, locale)
  const summary = getLocalizedText(project.summary, locale)
  const tags = project.tags
  const status = project.status

  const displayBadges: Array<{ text: string; category: string }> = []
  if (tags?.domain?.[0])
    displayBadges.push({ text: tags.domain[0], category: "domain" })
  if (tags?.tech) {
    tags.tech
      .slice(0, 2)
      .forEach(t => displayBadges.push({ text: t, category: "tech" }))
  }
  if (tags?.architecture?.[0])
    displayBadges.push({ text: tags.architecture[0], category: "architecture" })

  return (
    <Link
      href={`/project/${project.slug}`}
      className="group relative flex flex-col h-full overflow-hidden rounded-lg border bg-background p-6 transition-all duration-200 hover:shadow-lg hover:border-ring/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* Status Badge - Absolute Top Right */}
      {status && (
        <span
          className={`absolute top-4 right-4 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
            status === "completed"
              ? "bg-green-500/10 text-green-700 dark:text-green-400"
              : status === "in-progress"
                ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                : "bg-muted/30 text-muted-foreground/70"
          }`}
        >
          {t(`project.status.${status}`)}
        </span>
      )}

      {/* Project Title */}
      <h3 className="text-xl font-semibold mb-2 leading-tight group-hover:text-primary transition-colors whitespace-nowrap overflow-hidden text-ellipsis pr-16">
        {title}
      </h3>

      {/* Project Summary */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {displayBadges.map((badge, idx) => (
          <span
            key={`${badge.category}-${idx}`}
            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getBadgeVariant(badge.category as "domain" | "tech" | "architecture")}`}
          >
            {badge.text}
          </span>
        ))}
      </div>
    </Link>
  )
}
