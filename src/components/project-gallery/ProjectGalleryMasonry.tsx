import Image from "next/image"

type ProjectGalleryMasonryProps = {
  title?: string
  images: string[]
  showTitle?: boolean
}

export function ProjectGalleryMasonry({
  title,
  images,
  showTitle = true,
}: ProjectGalleryMasonryProps) {
  if (images.length === 0) return null

  const columnClass = images.length <= 3 ? "sm:columns-1" : "sm:columns-2"

  return (
    <section>
      {showTitle && title && (
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      )}

      <div className={`bg-muted p-2 rounded-sm columns-1 gap-2 ${columnClass}`}>
        {images.map((src, index) => (
          <div key={src} className="break-inside-avoid mb-2">
            <Image
              src={src}
              alt={`Screenshot ${index + 1}`}
              width={1200}
              height={800}
              style={{ width: "100%", height: "auto" }}
              className="h-auto w-full object-contain"
              priority={index < 3}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
