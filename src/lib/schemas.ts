import { z } from "zod"

export const LocalizedTextSchema = z.object({
  en: z.string().min(1),
  ru: z.string().optional(),
  he: z.string().optional(),
})

export const ProjectSchema = z.object({
  slug: z.string().min(1),

  title: LocalizedTextSchema,
  summary: LocalizedTextSchema,
  description: LocalizedTextSchema.optional(),

  status: z
    .enum(["completed", "in-progress", "planned", "archived"])
    .optional(),
  featured: z.boolean().optional(),

  role: LocalizedTextSchema.optional(),

  tags: z
    .object({
      domain: z.array(z.string()).optional(),
      tech: z.array(z.string()).optional(),
      architecture: z.array(z.string()).optional(),
    })
    .optional(),

  highlights: z.array(LocalizedTextSchema).optional(),

  urls: z
    .object({
      demo: z.string().url().optional(),
      github: z.string().url().optional(),
    })
    .optional(),

  images: z
    .object({
      cover: z.string().optional(),
      gallery: z.array(z.string()).optional(),
      mobileGallery: z.array(z.string()).optional(),
    })
    .optional(),
})

export const ProjectsSchema = z.array(ProjectSchema)

export type LocalizedText = z.infer<typeof LocalizedTextSchema>

export type Project = z.infer<typeof ProjectSchema>
