import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'
import { aboutHighlights } from '../../data/siteData'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'

function AboutSection() {
  const sectionRef = useRevealAnimations()

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:py-28"
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:gap-12">
        <div className="reveal space-y-7 sm:space-y-8">
          <SectionHeading
            align="left"
            eyebrow="About Shampurna"
            title="An elevated clinic experience shaped by discretion, hygiene, and refined results."
            description="Shampurna Aesthetic is designed for clients who value premium atmosphere as much as clinical precision. Every journey is paced around consultation, safety, and treatments that support a polished, natural outcome."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {aboutHighlights.map((item) => (
              <GlassPanel key={item.title} className="reveal p-4 sm:p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-gold)] sm:text-xs sm:tracking-[0.24em]">
                  {item.label}
                </p>
                <h3 className="mt-3 text-wrap font-display text-xl leading-tight text-[var(--color-heading)] sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {item.description}
                </p>
              </GlassPanel>
            ))}
          </div>

          <blockquote className="reveal border-l border-[rgba(252,223,92,0.35)] pl-5 font-display text-xl leading-relaxed text-[var(--color-heading)] sm:text-2xl lg:text-3xl">
            “Luxury care should feel calm, intentional, and unmistakably
            personal.”
          </blockquote>
        </div>

        <div className="reveal">
          <GlassPanel className="group relative overflow-hidden p-3 sm:p-4">
            <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(252,223,92,0.14),transparent)]" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10">
              <img
                className="h-[21rem] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[26rem] lg:h-[34rem]"
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80"
                alt="Premium clinic interior placeholder"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,2,0.05),rgba(1,0,2,0.6))]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] sm:text-xs sm:tracking-[0.28em]">
                  Luxury Environment
                </p>
                <p className="mt-2 max-w-sm text-sm leading-7 text-white/70">
                  Glass, shadow, soft lighting, and clean silhouettes establish a
                  composed first impression across every touchpoint.
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
