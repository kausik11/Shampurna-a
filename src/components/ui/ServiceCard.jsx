import { gsap } from 'gsap'
import { FiStar } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { serviceIcons } from '@/lib/icons'
import GlassPanel from './GlassPanel'

const canUseTilt = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

function ServiceCard({ service, index }) {
  const ServiceIcon = serviceIcons[service.title] ?? FiStar
  const navigate = useNavigate()

  const goToService = (event) => {
    if (event.target.closest('a, button')) {
      return
    }

    navigate(service.href)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      navigate(service.href)
    }
  }

  const handleMove = (event) => {
    if (!canUseTilt()) {
      return
    }

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
    if (!canUseTilt()) {
      return
    }

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
      className="reveal group relative overflow-hidden p-3.5 transition duration-500 sm:p-5 lg:p-6"
    >
      <article
        className="relative h-full cursor-pointer rounded-[1.45rem]"
        onMouseLeave={handleLeave}
        onMouseMove={handleMove}
        onClick={goToService}
        onKeyDown={handleKeyDown}
        role="link"
        tabIndex={0}
        aria-label={`View ${service.title} details`}
      >
        <div className="absolute right-[-1rem] top-[-1rem] h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(252,223,92,0.16),_transparent_70%)] blur-2xl transition duration-500 group-hover:scale-125" />
        <div className="relative">
          <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10">
            <img
              className="h-40 w-full object-cover transition duration-700 group-hover:scale-105 min-[390px]:h-44 sm:h-52 xl:h-56"
              src={service.image}
              alt={service.imageAlt}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,2,0.04),rgba(1,0,2,0.78))]" />
            <div className="absolute left-3 top-3 inline-flex max-w-[calc(100%-4.5rem)] items-center rounded-full border border-[rgba(252,223,92,0.22)] bg-[rgba(1,0,2,0.46)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold)] backdrop-blur-xl sm:left-4 sm:top-4 sm:text-[11px] sm:tracking-[0.22em]">
              {service.focus}
            </div>
            {/* <div className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[rgba(1,0,2,0.48)] text-xl text-[var(--color-gold)] backdrop-blur-xl">
              <ServiceIcon className="h-5 w-5" aria-hidden="true" />
            </div> */}
          </div>

          <div className="flex items-center justify-between">
            <span className="mt-5 text-xs uppercase tracking-[0.24em] text-white/35">
              Signature Service
            </span>
            <span className="mt-5 text-xs uppercase tracking-[0.24em] text-white/35">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="mt-3 text-wrap font-display text-[1.65rem] leading-tight text-[var(--color-heading)] transition group-hover:text-[var(--color-highlight)] sm:mt-4 sm:text-2xl lg:text-3xl">
            {service.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/65">
            {service.description}
          </p>

          <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/10 pt-4">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                {service.priceLabel}
              </p>
              <p className="mt-1 text-xs leading-5 text-white/58">
                {service.priceNote}
              </p>
            </div>
            <p className="shrink-0 text-right text-lg font-semibold text-[var(--color-gold)] sm:text-xl">
              {service.priceValue}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.1em] text-white/75 transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)] sm:tracking-[0.18em]"
              to={service.href}
            >
              Learn More
            </Link>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(252,223,92,0.18)] bg-[rgba(252,223,92,0.08)] px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-gold)] transition hover:bg-[rgba(252,223,92,0.14)] sm:tracking-[0.18em]"
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
