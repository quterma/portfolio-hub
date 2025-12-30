import Image from "next/image"

type ProjectGalleryMasonryProps = {
  images: string[]
}

export function ProjectGalleryMasonry({ images }: ProjectGalleryMasonryProps) {
  if (images.length === 0) return null

  const columnClass = images.length <= 3 ? "sm:columns-1" : "sm:columns-2"

  return (
    <div
      className={`bg-muted p-1.5 rounded-sm columns-1 gap-1.5 ${columnClass}`}
    >
      {images.map((src, index) => (
        <div key={src} className="break-inside-avoid mb-1.5">
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
  )
}
