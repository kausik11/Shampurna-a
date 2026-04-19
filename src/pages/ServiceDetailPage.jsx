import { useLayoutEffect, useMemo, useState } from 'react'
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link, Navigate, useParams } from 'react-router-dom'
import GlassPanel from '../components/ui/GlassPanel'
import SectionHeading from '../components/ui/SectionHeading'
import AppointmentSection from '../components/sections/AppointmentSection'
import { useRevealAnimations } from '../hooks/useRevealAnimations'
import useServicesData from '../hooks/useServicesData'

function ServiceDetailPage() {
  const { slug } = useParams()
  const sectionRef = useRevealAnimations()
  const { services, isLoading } = useServicesData()
  const service = useMemo(
    () => services.find((item) => item.slug === slug),
    [services, slug],
  )
  const [activeResult, setActiveResult] = useState(0)

  useLayoutEffect(() => {
    const lenis = window.__lenis

    lenis?.stop?.()
    lenis?.scrollTo?.(0, { immediate: true, force: true })
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const frameId = window.requestAnimationFrame(() => {
      lenis?.scrollTo?.(0, { immediate: true, force: true })
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      lenis?.start?.()
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [slug])

  if (!service && isLoading) {
    return null
  }

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const results = service.results || []
  const normalizedResultIndex = results.length ? activeResult % results.length : 0
  const result = results[normalizedResultIndex]

  const showPreviousResult = () => {
    setActiveResult((current) =>
      current === 0 ? results.length - 1 : current - 1,
    )
  }

  const showNextResult = () => {
    setActiveResult((current) =>
      current === results.length - 1 ? 0 : current + 1,
    )
  }

  return (
    <>
      <main ref={sectionRef}>
        <section className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24 xl:gap-10">
          <div className="reveal flex flex-col justify-center">
            <Link
              className="mb-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/70 transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)] sm:mb-8 sm:tracking-[0.18em]"
              to="/services"
            >
              <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to services
            </Link>

            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-highlight)] min-[380px]:text-[11px] min-[380px]:tracking-[0.22em] sm:text-xs sm:tracking-[0.34em]">
              {service.focus}
            </p>
            <h1 className="mt-4 text-wrap font-display text-[2.25rem] leading-tight text-[var(--color-heading)] min-[390px]:text-5xl md:text-6xl md:leading-none">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68 sm:mt-6 sm:text-base sm:leading-8">
              {service.detailDescription}
            </p>

            <div className="mt-7 flex w-full max-w-md items-end justify-between gap-4 border-y border-white/10 py-4">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42 sm:text-[11px]">
                  {service.priceLabel}
                </p>
                {service.priceNote ? (
                  <p className="mt-1 text-sm leading-6 text-white/58">
                    {service.priceNote}
                  </p>
                ) : null}
              </div>
              <p className="shrink-0 text-right text-2xl font-semibold text-[var(--color-gold)] sm:text-3xl">
                {service.priceValue}
              </p>
            </div>

            {/* <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {service.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-4 text-sm font-medium text-white/72 sm:rounded-[1.2rem]"
                >
                  {item}
                </div>
              ))}
            </div> */}

            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <a
                className="button-shine inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(252,223,92,0.22)] bg-[var(--color-button)] px-6 py-3 text-center text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)] transition duration-300 hover:-translate-y-0.5"
                href="#appointment"
              >
                Book This Service
              </a>
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-center text-sm font-semibold text-white/75 transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]"
                href={results.length ? '#results' : '#appointment'}
              >
                {results.length ? 'View Results' : 'Book Consultation'}
              </a>
            </div>
          </div>

          <GlassPanel className="reveal overflow-hidden p-3">
            <div className="relative min-h-[20rem] overflow-hidden rounded-[1.2rem] min-[390px]:min-h-[24rem] sm:min-h-[30rem] sm:rounded-[1.45rem] lg:min-h-[34rem]">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={service.image}
                alt={service.imageAlt}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,2,0.1),rgba(1,0,2,0.82))]" />
              {/* <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)] sm:text-xs sm:tracking-[0.28em]">
                  Service Detail
                </p>
                <p className="mt-4 max-w-xl text-wrap font-display text-[1.65rem] leading-tight text-white sm:text-4xl sm:leading-none">
                  Consultation-first care for a refined, comfortable result.
                </p>
              </div> */}
            </div>
          </GlassPanel>
        </section>

        {result ? (
          <section
            id="results"
            className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
          >
            <SectionHeading
              eyebrow="Result Slider"
              title={`${service.title} result stories`}
              description="Each slide combines the result title, short description, and before-after image pair so the service outcome can be reviewed as one focused story."
            />

            <GlassPanel className="reveal mt-10 overflow-hidden p-3 sm:mt-12 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
                <div className="flex flex-col justify-between rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-5 sm:rounded-[1.35rem] sm:p-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)] sm:text-xs sm:tracking-[0.28em]">
                      {String(normalizedResultIndex + 1).padStart(2, '0')} /{' '}
                      {String(results.length).padStart(2, '0')}
                    </p>
                    <h2 className="mt-4 text-wrap font-display text-[2rem] leading-tight text-[var(--color-heading)] sm:mt-5 sm:text-4xl sm:leading-none">
                      {result.title}
                    </h2>
                    <p className="mt-5 text-sm leading-7 text-white/65">
                      {result.description}
                    </p>
                  </div>

                  {results.length > 1 ? (
                    <div className="mt-8 flex items-center gap-3">
                      <button
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]"
                        type="button"
                        aria-label="Previous result"
                        onClick={showPreviousResult}
                      >
                        <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]"
                        type="button"
                        aria-label="Next result"
                        onClick={showNextResult}
                      >
                        <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    ['Before', result.beforeImage],
                    ['After', result.afterImage],
                  ].map(([label, image]) => (
                    <div
                      key={label}
                      className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.04]"
                    >
                      <div className="flex items-center justify-between px-5 py-4">
                        <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/55 sm:tracking-[0.22em]">
                          {label}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-[var(--color-highlight)]" />
                      </div>
                      <img
                        className="h-[15rem] w-full object-cover min-[390px]:h-[17rem] sm:h-[20rem] lg:h-[22rem]"
                        src={image}
                        alt={`${service.title} ${label.toLowerCase()} result`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </section>
        ) : null}

        <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="FAQ"
            title={`${service.title} questions`}
            description="Quick answers to help clients understand suitability, preparation, and expected result timelines before booking."
          />

          <div className="mt-10 grid gap-4 sm:mt-12">
            {service.faqs.map((item) => (
              <GlassPanel key={item.question} className="reveal p-5 sm:p-6">
                <h3 className="text-wrap font-display text-xl leading-tight text-[var(--color-heading)] sm:text-2xl sm:leading-none">
                  {item.question}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  {item.answer}
                </p>
              </GlassPanel>
            ))}
          </div>
        </section>
      </main>

      <AppointmentSection />
    </>
  )
}

export default ServiceDetailPage
