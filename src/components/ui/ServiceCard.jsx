import { gsap } from 'gsap'
import { FiStar } from 'react-icons/fi'
import { serviceIcons } from '@/lib/icons'
import GlassPanel from './GlassPanel'

function ServiceCard({ service, index }) {
  const ServiceIcon = serviceIcons[service.title] ?? FiStar

  const handleMove = (event) => {
    const currentTarget = event.currentTarget
    const rect = currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10

    gsap.to(currentTarget, {
      rotateX: -y,
      rotateY: x,
      y: -10,
      transformPerspective: 800,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  const handleLeave = (event) => {
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.55,
      ease: 'power3.out',
    })
  }

  return (
    <GlassPanel
      className="reveal group relative overflow-hidden p-6 transition duration-500"
      onMouseLeave={undefined}
    >
      <article
        className="relative h-full rounded-[1.45rem]"
        onMouseLeave={handleLeave}
        onMouseMove={handleMove}
      >
        <div className="absolute right-[-1rem] top-[-1rem] h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(252,223,92,0.16),_transparent_70%)] blur-2xl transition duration-500 group-hover:scale-125" />
        <div className="relative">
          <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10">
            <img
              className="h-52 w-full object-cover transition duration-700 group-hover:scale-105"
              src={service.image}
              alt={service.imageAlt}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,2,0.04),rgba(1,0,2,0.78))]" />
            <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-[rgba(252,223,92,0.22)] bg-[rgba(1,0,2,0.46)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)] backdrop-blur-xl">
              {service.focus}
            </div>
            <div className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[rgba(1,0,2,0.48)] text-xl text-[var(--color-gold)] backdrop-blur-xl">
              <ServiceIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="mt-5 text-xs uppercase tracking-[0.24em] text-white/35">
              Signature Service
            </span>
            <span className="mt-5 text-xs uppercase tracking-[0.24em] text-white/35">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="mt-4 font-display text-3xl leading-none text-[var(--color-heading)] transition group-hover:text-[var(--color-highlight)]">
            {service.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/65">
            {service.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]"
              href="#appointment"
            >
              Learn More
            </a>
            <a
              className="inline-flex items-center rounded-full border border-[rgba(252,223,92,0.18)] bg-[rgba(252,223,92,0.08)] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)] transition hover:bg-[rgba(252,223,92,0.14)]"
              href="#appointment"
            >
              Book Now
            </a>
          </div>
        </div>
      </article>
    </GlassPanel>
  )
}

export default ServiceCard
