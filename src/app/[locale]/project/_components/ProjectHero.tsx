import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"
import { siGithub } from "simple-icons"
import type { ProjectStatus } from "@/types/project"

type ProjectHeroProps = {
  title: string
  summary: string
  status?: ProjectStatus
  statusColor?: string
  statusLabel?: string
  roleText?: string
  tags?: {
    domain?: string[]
    architecture?: string[]
    tech?: string[]
  }
  urls?: {
    demo?: string
    github?: string
  }
  demoLabel: string
  sourceLabel: string
}

export function ProjectHero({
  title,
  summary,
  status,
  statusColor,
  statusLabel,
  roleText,
  tags,
  urls,
  demoLabel,
  sourceLabel,
}: ProjectHeroProps) {
  const hasTags =
    !!tags &&
    (tags.domain?.length ?? 0) +
      (tags.tech?.length ?? 0) +
      (tags.architecture?.length ?? 0) >
      0

  return (
    <div className="space-y-4">
      <h1 className="text-3xl mb-5 font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>

      <p className="text-lg mb-5 text-muted-foreground leading-relaxed">
        {summary}
      </p>

      <div className="flex mb-5 items-center gap-3 text-sm flex-wrap">
        {status && statusColor && statusLabel && (
          <Badge className={statusColor} variant="secondary">
            {statusLabel}
          </Badge>
        )}
        {roleText && (
          <>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-muted-foreground">Role: {roleText}</span>
          </>
        )}
      </div>

      {hasTags && tags && (
        <div className="flex flex-wrap gap-3">
          {tags.domain?.map(tag => (
            <Badge
              key={`domain-${tag}`}
              variant="outline"
              className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30"
            >
              {tag}
            </Badge>
          ))}
          {tags.architecture?.map(tag => (
            <Badge
              key={`arch-${tag}`}
              variant="outline"
              className="bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/30"
            >
              {tag}
            </Badge>
          ))}
          {tags.tech?.map(tag => (
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

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {urls?.demo && (
          <Button asChild variant="default" className="w-full sm:w-auto">
            <Link href={urls.demo} target="_blank" rel="noopener noreferrer">
              <Globe className="h-4 w-4 mr-2" />
              {demoLabel}
            </Link>
          </Button>
        )}
        {urls?.github && (
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href={urls.github} target="_blank" rel="noopener noreferrer">
              <svg
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={siGithub.path} />
              </svg>
              {sourceLabel}
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
