import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'
import { resultsGallery } from '../../data/siteData'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'

function ResultsShowcase() {
  const sectionRef = useRevealAnimations()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    gsap.fromTo(
      '.result-stage',
      { autoAlpha: 0, y: 24, filter: 'blur(8px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' },
    )
  }, [activeIndex])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:py-28"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="reveal">
          <SectionHeading
            align="left"
            eyebrow="Results Showcase"
            title="Image-led storytelling with premium transitions and clear treatment context."
            description="Placeholder visuals are used here for a future before-and-after gallery, treatment room highlights, and curated patient journey imagery."
          />
        </div>
        <p className="reveal text-sm text-white/45">Results may vary depending on skin type and treatment plan.</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] xl:gap-8">
        <GlassPanel className="reveal result-stage overflow-hidden p-2.5 sm:p-3">
          <div className="relative overflow-hidden rounded-[1.2rem] sm:rounded-[1.75rem]">
            <img
              className="h-[18rem] w-full object-cover min-[390px]:h-[20rem] sm:h-[24rem] lg:h-[28rem]"
              src={resultsGallery[activeIndex].image}
              alt={resultsGallery[activeIndex].title}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,2,0.05),rgba(1,0,2,0.72))]" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gold)] sm:text-xs sm:tracking-[0.28em]">
                {resultsGallery[activeIndex].tag}
              </p>
              <h3 className="mt-2 text-wrap font-display text-2xl leading-tight text-[var(--color-heading)] sm:text-3xl">
                {resultsGallery[activeIndex].title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-7 text-white/70">
                {resultsGallery[activeIndex].description}
              </p>
            </div>
          </div>
        </GlassPanel>

        <div className="grid gap-4">
          {resultsGallery.map((item, index) => (
            <button
              key={item.title}
              className={`reveal group min-h-11 overflow-hidden rounded-[1.2rem] border p-2.5 text-left backdrop-blur-xl transition duration-300 sm:rounded-[1.6rem] sm:p-3 ${
                activeIndex === index
                  ? 'border-[rgba(235,200,0,0.28)] bg-[rgba(1,0,2,0.54)]'
                  : 'border-white/10 bg-[rgba(1,0,2,0.34)] hover:border-[rgba(245,73,145,0.28)]'
              }`}
              type="button"
              onClick={() => setActiveIndex(index)}
            >
              <div className="grid gap-4 sm:grid-cols-[8.5rem_1fr] sm:items-center">
                <img
                  className="h-28 w-full rounded-[1.2rem] object-cover sm:h-28 sm:w-full"
                  src={item.image}
                  alt={item.title}
                />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-gold)] sm:text-xs sm:tracking-[0.24em]">
                    {item.tag}
                  </p>
                  <h3 className="mt-2 text-wrap font-display text-xl leading-tight text-[var(--color-heading)] transition group-hover:text-[var(--color-highlight)] sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/60">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResultsShowcase
