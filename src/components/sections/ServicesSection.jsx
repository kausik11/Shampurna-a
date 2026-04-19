import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../ui/ServiceCard'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'
import useServicesData from '../../hooks/useServicesData'

const SERVICES_BATCH_SIZE = 6

function ServicesSection() {
  const sectionRef = useRevealAnimations()
  const { services } = useServicesData()
  const [visibleCount, setVisibleCount] = useState(SERVICES_BATCH_SIZE)
  const visibleServices = services.slice(0, visibleCount)
  const canLoadMore = visibleCount < services.length
  const canLoadLess = visibleCount > SERVICES_BATCH_SIZE

  const handleLoadMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + SERVICES_BATCH_SIZE, services.length),
    )
  }

  const handleLoadLess = () => {
    setVisibleCount((currentCount) =>
      Math.max(currentCount - SERVICES_BATCH_SIZE, SERVICES_BATCH_SIZE),
    )
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:py-28"
    >
      <SectionHeading
        eyebrow="Signature Services"
        title="A full premium treatment portfolio."
        description="Every treatment is positioned with concise luxury language, strong visual hierarchy, and clear CTA pathways for future lead generation."
      />

      <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 xl:grid-cols-3">
        {visibleServices.map((service, index) => (
          <ServiceCard key={service.title} index={index} service={service} />
        ))}
      </div>

      <div className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {canLoadMore ? (
          <button
            className="button-shine inline-flex w-full items-center justify-center rounded-full border border-[rgba(252,223,92,0.2)] bg-[var(--color-button)] px-6 py-3.5 text-center text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(143,135,67,0.42)] sm:w-auto"
            type="button"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        ) : null}

        {canLoadLess ? (
          <button
            className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-6 py-3.5 text-center text-sm font-semibold text-[var(--color-heading)] backdrop-blur-xl transition duration-300 hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)] sm:w-auto"
            type="button"
            onClick={handleLoadLess}
          >
            Load Less
          </button>
        ) : null}

        <p className="text-center text-xs uppercase tracking-[0.18em] text-white/45 sm:text-left">
          Showing {visibleServices.length} of {services.length} services
        </p>
      </div>
    </section>
  )
}

export default ServicesSection
