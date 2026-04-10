import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../ui/ServiceCard'
import { services } from '../../data/siteData'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'

function ServicesSection() {
  const sectionRef = useRevealAnimations()

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <SectionHeading
        eyebrow="Signature Services"
        title="A full premium treatment portfolio presented through reusable, glass-led service cards."
        description="Every treatment is positioned with concise luxury language, strong visual hierarchy, and clear CTA pathways for future lead generation."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} service={service} />
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
