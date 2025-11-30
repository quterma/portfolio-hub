import { z } from "zod"
import { ProjectSchema } from "@/lib/schemas"

export type Project = z.infer<typeof ProjectSchema>
export type ProjectStatus = Project["status"]

export interface ProjectFilter {
  status?: ProjectStatus
  featured?: boolean
  tags?: string[]
  tech?: string[]
  year?: number
}
