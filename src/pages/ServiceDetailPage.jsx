import { useEffect, useMemo, useState } from 'react'
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link, Navigate, useParams } from 'react-router-dom'
import GlassPanel from '../components/ui/GlassPanel'
import SectionHeading from '../components/ui/SectionHeading'
import AppointmentSection from '../components/sections/AppointmentSection'
import { services } from '../data/siteData'
import { useRevealAnimations } from '../hooks/useRevealAnimations'

function ServiceDetailPage() {
  const { slug } = useParams()
  const sectionRef = useRevealAnimations()
  const service = useMemo(
    () => services.find((item) => item.slug === slug),
    [slug],
  )
  const [activeResult, setActiveResult] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const normalizedResultIndex = activeResult % service.results.length
  const result = service.results[normalizedResultIndex]

  const showPreviousResult = () => {
    setActiveResult((current) =>
      current === 0 ? service.results.length - 1 : current - 1,
    )
  }

  const showNextResult = () => {
    setActiveResult((current) =>
      current === service.results.length - 1 ? 0 : current + 1,
    )
  }

  return (
    <>
      <main ref={sectionRef}>
        <section className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
          <div className="reveal flex flex-col justify-center">
            <Link
              className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]"
              to="/services"
            >
              <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to services
            </Link>

            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-highlight)]">
              {service.focus}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-none text-[var(--color-heading)] sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
              {service.detailDescription}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {service.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 text-sm font-medium text-white/72"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="button-shine inline-flex items-center rounded-full border border-[rgba(252,223,92,0.22)] bg-[var(--color-button)] px-6 py-3 text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)] transition duration-300 hover:-translate-y-0.5"
                href="#appointment"
              >
                Book This Service
              </a>
              <a
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/75 transition hover:border-[var(--color-highlight)] hover:text-[var(--color-highlight)]"
                href="#results"
              >
                View Results
              </a>
            </div>
          </div>

          <GlassPanel className="reveal overflow-hidden p-3">
            <div className="relative min-h-[34rem] overflow-hidden rounded-[1.45rem]">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={service.image}
                alt={service.imageAlt}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,2,0.1),rgba(1,0,2,0.82))]" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
                  Service Detail
                </p>
                <p className="mt-4 max-w-xl font-display text-3xl leading-none text-white sm:text-4xl">
                  Consultation-first care for a refined, comfortable result.
                </p>
              </div>
            </div>
          </GlassPanel>
        </section>

        <section
          id="results"
          className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <SectionHeading
            eyebrow="Result Slider"
            title={`${service.title} result stories`}
            description="Each slide combines the result title, short description, and before-after image pair so the service outcome can be reviewed as one focused story."
          />

          <GlassPanel className="reveal mt-12 overflow-hidden p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
              <div className="flex flex-col justify-between rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
                    {String(normalizedResultIndex + 1).padStart(2, '0')} /{' '}
                    {String(service.results.length).padStart(2, '0')}
                  </p>
                  <h2 className="mt-5 font-display text-4xl leading-none text-[var(--color-heading)]">
                    {result.title}
                  </h2>
                  <p className="mt-5 text-sm leading-7 text-white/65">
                    {result.description}
                  </p>
                </div>

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
                      <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/55">
                        {label}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[var(--color-highlight)]" />
                    </div>
                    <img
                      className="h-[22rem] w-full object-cover"
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

        <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title={`${service.title} questions`}
            description="Quick answers to help clients understand suitability, preparation, and expected result timelines before booking."
          />

          <div className="mt-12 grid gap-4">
            {service.faqs.map((item) => (
              <GlassPanel key={item.question} className="reveal p-6">
                <h3 className="font-display text-2xl leading-none text-[var(--color-heading)]">
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
