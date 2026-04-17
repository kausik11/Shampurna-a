import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { heroStats } from '../../data/siteData'
import { FaStar } from '@/lib/icons'

const canUsePointerParallax = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

function HeroVideoSection() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)

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

      gsap.to('.floating-badge', {
        y: -12,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
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
            ref={videoRef}
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
          <div className="relative grid min-h-[calc(88svh-5.25rem)] content-start gap-5 px-4 pb-6 pt-2 min-[380px]:min-h-[calc(90svh-5.75rem)] sm:min-h-[82svh] sm:content-normal sm:gap-8 sm:px-6 sm:py-12 md:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16 xl:min-h-[86svh] [@media(max-height:700px)]:pb-5 [@media(max-height:700px)]:pt-2 sm:[@media(max-height:700px)]:py-8">
            <div className="flex flex-col justify-start sm:justify-center lg:pl-2 xl:pl-6">
              <p className="hero-reveal mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-highlight)] min-[380px]:text-[11px] min-[380px]:tracking-[0.22em] sm:mt-0 sm:text-xs sm:tracking-[0.34em]">
                Luxury Aesthetic Clinic
              </p>
              <h1 className="hero-reveal mt-4 max-w-5xl text-wrap font-display text-[2.25rem] leading-[1.04] text-[var(--color-heading)] min-[390px]:text-5xl sm:mt-6 lg:text-6xl xl:text-7xl">
              Kolkata’s Most Trusted Destination for Aesthetic Care and Luxury Beauty Treatments
              </h1>
              <p className="hero-reveal mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:mt-7 sm:text-base sm:leading-8">
           Indulge in advanced skin, body, and beauty treatments with precision and luxury—elevated by Shampurna Aesthetic’s hospitality-led, consultation-first experience.
              </p>

              <div className="hero-reveal mt-7 flex flex-col gap-3 min-[420px]:flex-row sm:mt-10 sm:gap-4">
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

              {/* <div className="hero-reveal mt-12 max-w-2xl rounded-[1.5rem] border border-white/12 bg-[rgba(1,0,2,0.44)] p-5 shadow-[0_20px_60px_rgba(1,0,2,0.3)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="inline-flex rounded-full border border-[rgba(252,223,92,0.25)] bg-[rgba(252,223,92,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
                    {activeMoment.label}
                  </span>
                  <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(252,223,92,0.35),transparent)]" />
                </div>
                <p className="mt-4 text-sm leading-7 text-white/74">
                  {activeMoment.description}
                </p>
              </div> */}


            </div>

            <div className="relative flex items-end justify-end">
              <div className="floating-badge w-full max-w-xl space-y-4 self-end lg:mb-4 lg:max-w-md">


                {/* <div className="rounded-[1.7rem] border border-white/12 bg-[rgba(1,0,2,0.46)] p-5 shadow-[0_18px_60px_rgba(1,0,2,0.32)] backdrop-blur-2xl">
                  <div className="flex items-center gap-4">
                    <img
                      className="h-16 w-16 rounded-full border border-[rgba(252,223,92,0.35)] object-cover"
                      src="/shampurna-logo.jpeg"
                      alt="Shampurna Aesthetic emblem"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-gold)]">
                        Signature Presence
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white/70">
                        Premium motion, layered cards, and clear consultation
                        pathways build an expensive first impression.
                      </p>
                    </div>
                  </div>
                </div> */}

                <div className="grid gap-3 min-[430px]:grid-cols-3 sm:gap-4">
                  {heroStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.05rem] border border-white/12 bg-[rgba(1,0,2,0.42)] p-3.5 text-left shadow-[0_16px_45px_rgba(1,0,2,0.26)] backdrop-blur-xl sm:rounded-[1.5rem] sm:p-4"
                    >
                      <p className="flex items-center gap-2 font-display text-3xl leading-none text-[var(--color-heading)] sm:text-4xl">
                        {item.value}
                        {item.icon === 'star' ? <FaStar className="h-5 w-5 text-[var(--color-gold)]" aria-hidden="true" /> : null}
                      </p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/45 sm:text-xs sm:tracking-[0.22em]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroVideoSection
