import { FiMapPin, FiNavigation } from 'react-icons/fi'
import GlassPanel from '../ui/GlassPanel'
import SectionHeading from '../ui/SectionHeading'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'

const locations = [
  
  {
    name: 'Shampurna Aesthetic Clinic',
    label: 'Chinar Park Address',
    address:
      'Ps Aviator Building, Rajarhat Main Road, Chinar Park, 3rd Floor, Unit-303, Kolkata 700136',
    mapUrl: 'https://share.google/yKkIHvVEqXeyMvFKm',
    embedQuery:
      'Shampurna Aesthetic Clinic, Ps Aviator Building, Rajarhat Main Road, Chinar Park, Kolkata 700136',
  },
  {
    name: 'Shampurna Barasat',
    label: 'Barasat Address',
    address: 'Bhadra bari more, Barasat, Kolkata, West Bengal 700126',
    mapUrl: 'https://maps.app.goo.gl/Ypo3juaCscMD5hQr5',
    embedQuery: 'Bhadra bari more, Barasat, Kolkata, West Bengal 700126',
  }
]

function ContactLocationsSection() {
  const sectionRef = useRevealAnimations()

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <SectionHeading
        eyebrow="Visit Shampurna"
        title="Choose the clinic address that is easiest for your appointment."
        description="Use the map cards below for directions, arrival planning, and quick access to Google Maps before your consultation."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-7">
        {locations.map((location) => (
          <GlassPanel
            key={location.mapUrl}
            className="reveal overflow-hidden p-3 sm:p-4"
          >
            <div className="relative overflow-hidden rounded-[1rem] border border-white/10 bg-[rgba(1,0,2,0.3)]">
              <iframe
                title={`${location.name} map`}
                className="h-[18rem] w-full border-0 grayscale-[18%] invert-[8%] saturate-[1.08] sm:h-[22rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(location.embedQuery)}&z=15&output=embed`}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(1,0,2,0.78))]" />
            </div>

            <div className="grid gap-4 px-1 py-5 sm:grid-cols-[1fr_auto] sm:items-end sm:px-2 sm:pb-2 sm:pt-6">
              <div className="min-w-0">
                <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)] sm:text-xs sm:tracking-[0.28em]">
                  <FiMapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {location.label}
                </p>
                <h2 className="mt-3 text-wrap font-display text-2xl leading-tight text-[var(--color-heading)] sm:text-3xl">
                  {location.name}
                </h2>
                <address className="mt-3 max-w-xl text-sm not-italic leading-7 text-white/68 sm:text-base">
                  {location.address}
                </address>
              </div>

              <a
                className="button-shine inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-[rgba(252,223,92,0.36)] bg-[rgba(252,223,92,0.12)] px-5 py-3 text-sm font-bold text-[var(--color-gold)] shadow-[0_18px_40px_rgba(143,135,67,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[rgba(252,223,92,0.18)] hover:text-[var(--color-highlight)]"
                href={location.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FiNavigation className="h-4 w-4 shrink-0" aria-hidden="true" />
                Open Map
              </a>
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  )
}

export default ContactLocationsSection
