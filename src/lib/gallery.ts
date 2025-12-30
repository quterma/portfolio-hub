import { promises as fs } from "fs"
import path from "path"

const IMAGE_EXTENSION_REGEX = /\.(png|jpe?g|webp|avif)$/i

export async function getProjectImagePaths(slug: string): Promise<string[]> {
  const publicDir = path.join(process.cwd(), "public", "projects", slug)

  try {
    const files = await fs.readdir(publicDir)

    const imageFiles = files
      .filter((file: string) => IMAGE_EXTENSION_REGEX.test(file))
      .sort((a: string, b: string) => a.localeCompare(b))

    return imageFiles.map((file: string) => `/projects/${slug}/${file}`)
  } catch {
    return []
  }
}
