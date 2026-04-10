import GlassPanel from './GlassPanel'

function TestimonialCard({ testimonial }) {
  return (
    <GlassPanel className="h-full p-8">
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="flex gap-1 text-[var(--color-gold)]">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={`${testimonial.name}-${index}`}>★</span>
            ))}
          </div>
          <p className="mt-6 font-display text-3xl leading-tight text-[var(--color-heading)]">
            “{testimonial.quote}”
          </p>
        </div>
        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="text-sm font-semibold text-[var(--color-heading)]">
            {testimonial.name}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/45">
            <span>{testimonial.tag}</span>
            {testimonial.country ? <span className="text-[var(--color-gold)]">{testimonial.country}</span> : null}
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}

export default TestimonialCard
