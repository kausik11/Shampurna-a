import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { HiLocationMarker } from 'react-icons/hi'

const heroLocations = [
  {
    label: 'Chinar Park Clinic',
    address: 'PS Aviator Building, Satyam Bazar, Next to Spencers, Chinar Park',
    details: ['3rd Floor', 'Unit-303', 'Kolkata 700136'],
  },
  {
    label: 'Barasat Clinic',
    address: 'Bhadra Bari (Near Axis bank ATM), Barasat 700126',
    details: ['Conony More'],
  },
]

const canUsePointerParallax = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

function HeroLocationsCard({ compact = false, className = '' }) {
  const containerClassName = compact
    ? 'rounded-[1.05rem] border border-[rgba(252,223,92,0.2)] bg-[linear-gradient(145deg,rgba(8,5,6,0.96),rgba(22,15,18,0.88))] px-3.5 py-3.5 shadow-[0_20px_48px_rgba(0,0,0,0.28)]'
    : 'rounded-[1.25rem] border border-[rgba(252,223,92,0.24)] bg-[linear-gradient(145deg,rgba(8,5,6,0.92),rgba(22,15,18,0.76))] px-4 py-4 shadow-[0_28px_70px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:px-5 sm:py-5'
  const locationCardClassName = compact
    ? 'rounded-[0.95rem] border border-white/10 bg-[rgba(255,255,255,0.04)] px-3 py-2.5'
    : 'rounded-[1rem] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:px-5 sm:py-4'
  const iconWrapClassName = compact
    ? 'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(252,223,92,0.12)] ring-1 ring-[rgba(252,223,92,0.24)]'
    : 'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(252,223,92,0.12)] ring-1 ring-[rgba(252,223,92,0.24)] sm:h-10 sm:w-10'
  const iconClassName = compact
    ? 'h-4.5 w-4.5 text-[var(--color-highlight)]'
    : 'h-5 w-5 text-[var(--color-highlight)] sm:h-6 sm:w-6'
  const labelClassName = compact
    ? 'inline-flex rounded-full border border-[rgba(252,223,92,0.14)] bg-black/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-highlight)]'
    : 'inline-flex rounded-full border border-[rgba(252,223,92,0.16)] bg-black/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-highlight)] sm:text-[11px]'
  const addressClassName = compact
    ? 'mt-1.5 text-[0.92rem] font-medium leading-6 text-white/90'
    : 'mt-2 text-[1rem] font-medium leading-7 text-white/92 sm:text-[1.12rem] sm:leading-8'
  const detailWrapClassName = compact ? 'mt-2 flex flex-wrap gap-1.5' : 'mt-3 flex flex-wrap gap-2'
  const detailClassName = compact
    ? 'rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[0.76rem] font-medium text-white/78'
    : 'rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm font-medium text-white/80 sm:text-[0.96rem]'

  return (
    <div className={`relative overflow-hidden ${containerClassName} ${className}`.trim()}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(252,223,92,0.12),transparent_40%)]" />
      <div className={`relative grid ${compact ? 'gap-2.5' : 'gap-3 sm:gap-4'}`}>
        {heroLocations.map((location) => (
          <div key={location.label} className={locationCardClassName}>
            <div className="flex items-start gap-3">
              <div className={iconWrapClassName}>
                <HiLocationMarker className={iconClassName} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={labelClassName}>{location.label}</p>
                <p className={addressClassName}>{location.address}</p>
                {location.details.length > 0 ? (
                  <div className={detailWrapClassName}>
                    {location.details.map((detail) => (
                      <span key={detail} className={detailClassName}>
                        {detail}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroVideoSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { y: 42, autoAlpha: 0, filter: 'blur(12px)' },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.14,
          delay: 0.35,
        },
      )
    }, containerRef)

    return () => context.revert()
  }, [])

  const handleMouseMove = (event) => {
    if (!canUsePointerParallax()) {
      return
    }

    const currentTarget = event.currentTarget
    const rect = currentTarget.getBoundingClientRect()
    const moveX = ((event.clientX - rect.left) / rect.width - 0.5) * 18
    const moveY = ((event.clientY - rect.top) / rect.height - 0.5) * 18

    gsap.to(currentTarget.querySelector('.parallax-stage'), {
      x: moveX,
      y: moveY,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  const handleMouseLeave = (event) => {
    if (!canUsePointerParallax()) {
      return
    }

    gsap.to(event.currentTarget.querySelector('.parallax-stage'), {
      x: 0,
      y: 0,
      duration: 0.75,
      ease: 'power3.out',
    })
  }

  return (
    <section
      ref={containerRef}
      id="home"
      className="full-bleed -mt-[4.75rem] pb-6 pt-[4.75rem] sm:mt-0 sm:pb-10 sm:pt-6"
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="parallax-stage relative overflow-hidden border-y border-white/10 bg-[#010002] shadow-[0_30px_90px_rgba(1,0,2,0.45)] sm:mx-4 sm:rounded-[2rem] sm:border lg:mx-6 2xl:mx-auto 2xl:max-w-[94rem]">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/shampurna-logo.jpeg"
          >
            <source src="/Laser Treatment.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,0,2,0.86)_0%,rgba(1,0,2,0.56)_42%,rgba(1,0,2,0.2)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,2,0.06),rgba(1,0,2,0.72))]" />
        </div>

        <div className="mx-auto max-w-[92rem]">
          <div className="relative flex min-h-[calc(88svh-5.25rem)] items-end px-4 pb-6 pt-2 min-[380px]:min-h-[calc(90svh-5.75rem)] sm:min-h-[82svh] sm:px-6 sm:py-12 md:py-14 lg:px-8 lg:py-16 xl:min-h-[86svh] [@media(max-height:700px)]:pb-5 [@media(max-height:700px)]:pt-2 sm:[@media(max-height:700px)]:py-8">
            <div className="flex max-w-3xl flex-col justify-end lg:pl-2 xl:pl-6">
              <h1 className="hero-reveal mt-5 max-w-[13rem] bg-[linear-gradient(112deg,#fff7d4_0%,#ffd66b_30%,#ff8ebf_68%,#fff1b0_100%)] bg-clip-text text-balance font-display text-[2rem] leading-[0.96] text-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)] sm:hidden">
                Shampurna Aesthetic Clinic
              </h1>
              <p className="hero-reveal hidden mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-highlight)] min-[380px]:text-[11px] min-[380px]:tracking-[0.22em] sm:mt-0 sm:block sm:text-xs sm:tracking-[0.34em]">
                Luxury Aesthetic Clinic
              </p>
              <h1 className="hero-reveal hidden mt-5 text-wrap font-display text-[2.25rem] leading-[1.04] text-[var(--color-heading)] min-[390px]:text-5xl sm:mt-0 sm:block lg:text-6xl xl:text-7xl">
                Shampurna Aesthetic Clinic
              </h1>
              <address className="hero-reveal hidden max-w-3xl not-italic sm:mt-7 sm:block">
                <HeroLocationsCard />
              </address>

              <div className="hero-reveal mt-7 hidden flex-col gap-3 min-[420px]:flex-row sm:mt-10 sm:flex sm:gap-4">
                <a
                  className="button-shine inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(252,223,92,0.22)] bg-[var(--color-button)] px-5 py-3 text-center text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(143,135,67,0.42)] sm:px-6 sm:py-3.5"
                  href="#appointment"
                >
                  Book Appointment
                </a>
                <a
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-5 py-3 text-center text-sm font-semibold text-[var(--color-heading)] backdrop-blur-xl transition duration-300 hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)] sm:px-6 sm:py-3.5"
                  href="#services"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-4 max-w-[92rem] px-4 sm:hidden">
        <address className="hero-reveal not-italic">
          <HeroLocationsCard compact />
        </address>
      </div>
    </section>
  )
}

export default HeroVideoSection
