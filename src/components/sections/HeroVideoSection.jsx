import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { HiLocationMarker } from 'react-icons/hi'

const heroAddressText = 'Ps Aviator Building, Rajarhat Main Road, Chinar Park'

const canUsePointerParallax = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

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
              <p className="hero-reveal hidden mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-highlight)] min-[380px]:text-[11px] min-[380px]:tracking-[0.22em] sm:mt-0 sm:block sm:text-xs sm:tracking-[0.34em]">
                Luxury Aesthetic Clinic
              </p>
              <h1 className="hero-reveal hidden mt-5 text-wrap font-display text-[2.25rem] leading-[1.04] text-[var(--color-heading)] min-[390px]:text-5xl sm:mt-0 sm:block lg:text-6xl xl:text-7xl">
                Shampurna Aesthetic
              </h1>
              <address className="hero-reveal mt-5 max-w-2xl not-italic sm:mt-7">
                <div className="relative overflow-hidden rounded-[8px] border border-[rgba(252,223,92,0.18)] bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] px-4 py-4 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-5 sm:py-5">
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(252,223,92,0.72),transparent)]" />
                  <div className="flex items-start gap-3">
                    <HiLocationMarker
                      className="mt-1 h-5 w-5 shrink-0 text-[var(--color-highlight)] sm:h-6 sm:w-6"
                      aria-hidden="true"
                    />
                    <p className="text-[0.98rem] leading-7 text-[#f5efcf] sm:text-[1.30rem] sm:leading-8">
                      <span className="hero-location-text" data-text={heroAddressText}>
                        {heroAddressText}
                      </span>
                    </p>
                  </div>
                  <div className="mt-3 h-px w-full bg-[linear-gradient(90deg,rgba(252,223,92,0.36),rgba(255,255,255,0.08))]" />
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-sm font-medium text-white/88 sm:text-[0.98rem]">
                      3rd Floor
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[var(--color-gold)]" />
                    <span className="text-sm font-medium text-[var(--color-gold)] sm:text-[0.98rem]">
                      Unit-303
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    <span className="text-sm font-medium text-[var(--color-highlight)] sm:text-[0.98rem]">
                      Kolkata -700136
                    </span>
                  </div>
                </div>
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
    </section>
  )
}

export default HeroVideoSection
