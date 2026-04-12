function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <div className={`reveal flex max-w-4xl flex-col ${alignment}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-highlight)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-5xl leading-none text-[var(--color-heading)] sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
        {description}
      </p>
    </div>
  )
}

export default SectionHeading
