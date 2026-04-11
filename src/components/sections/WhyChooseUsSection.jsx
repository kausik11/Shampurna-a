import SectionHeading from '../ui/SectionHeading'
import GlassPanel from '../ui/GlassPanel'
import { whyChooseUs } from '../../data/siteData'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'
import { FiStar } from 'react-icons/fi'
import { whyChooseUsIcons } from '@/lib/icons'

function WhyChooseUsSection() {
  const sectionRef = useRevealAnimations()

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <SectionHeading
        eyebrow="Why Choose Us"
        title="Credibility and clinic confidence translated into polished, high-conversion feature cards."
        description="These cards support a premium decision-making journey by emphasizing safety, personalization, expertise, and a luxury treatment environment."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {whyChooseUs.map((item) => {
          const FeatureIcon = whyChooseUsIcons[item.title] ?? FiStar

          return (
            <GlassPanel
              key={item.title}
              className="reveal group relative overflow-hidden p-6 transition duration-500 hover:-translate-y-2 hover:border-[rgba(252,223,92,0.2)]"
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(252,223,92,0.16),_transparent_70%)] blur-2xl transition duration-500 group-hover:scale-125" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-xl text-[var(--color-gold)]">
                  <FeatureIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-3xl text-[var(--color-heading)]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">{item.description}</p>
              </div>
            </GlassPanel>
          )
        })}
      </div>
    </section>
  )
}

export default WhyChooseUsSection
