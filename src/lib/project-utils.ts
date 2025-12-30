import type { ProjectStatus } from "@/types/project"

export const statusColors: Record<NonNullable<ProjectStatus>, string> = {
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  "in-progress":
    "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  planned:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
}

export function getProjectFlags(
  tags?: { domain?: string[]; tech?: string[]; architecture?: string[] },
  description?: string | null,
  highlights?: unknown[] | null
) {
  const hasDescription = !!description
  const hasHighlights = !!(highlights && highlights.length > 0)
  const hasTags =
    !!tags &&
    (tags.domain?.length ?? 0) +
      (tags.tech?.length ?? 0) +
      (tags.architecture?.length ?? 0) >
      0

  return { hasDescription, hasHighlights, hasTags }
}
