function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto'

  return (
    <div className={`reveal flex w-full min-w-0 max-w-4xl flex-col ${alignment}`}>
      <p className="max-w-full text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-highlight)] min-[380px]:text-[11px] min-[380px]:tracking-[0.2em] sm:text-xs sm:tracking-[0.3em]">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-full text-wrap font-display text-[2rem] leading-[1.08] text-[var(--color-heading)] min-[390px]:text-4xl sm:mt-4 md:text-5xl lg:text-6xl xl:text-7xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:mt-5 sm:text-base">
        {description}
      </p>
    </div>
  )
}

export default SectionHeading
