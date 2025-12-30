type ProjectAboutSectionProps = {
  title: string
  description: string
}

export function ProjectAboutSection({
  title,
  description,
}: ProjectAboutSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-base text-muted-foreground leading-relaxed max-w-3xl break-words">
        {description}
      </p>
    </div>
  )
}
