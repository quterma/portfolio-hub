type ProjectHighlightsSectionProps = {
  title: string
  highlights: string[]
}

export function ProjectHighlightsSection({
  title,
  highlights,
}: ProjectHighlightsSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <ul className="space-y-2 list-disc list-inside text-base text-muted-foreground max-w-3xl break-words">
        {highlights.map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>
    </div>
  )
}
