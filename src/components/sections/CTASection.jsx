import { useRevealAnimations } from '../../hooks/useRevealAnimations'

function CTASection() {
  const sectionRef = useRevealAnimations()

  return (
    <section ref={sectionRef} className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="reveal relative overflow-hidden rounded-[1.5rem] border border-[rgba(235,200,0,0.18)] bg-[linear-gradient(135deg,rgba(1,0,2,0.62),rgba(56,8,40,0.86),rgba(245,73,145,0.12))] px-5 py-10 shadow-[0_30px_80px_rgba(1,0,2,0.36)] backdrop-blur-2xl sm:rounded-[2.25rem] sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_center,rgba(252,223,92,0.14),transparent_65%)] blur-2xl" />
          <div className="relative max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)] sm:text-xs sm:tracking-[0.3em]">
              Final Invitation
            </p>
            <h2 className="mt-4 text-wrap font-display text-3xl leading-tight text-[var(--color-heading)] sm:text-5xl sm:leading-none">
              Book Your Appointment
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/65 sm:text-base">
              Create a premium first impression before a client even enters the
              clinic. This section is positioned as the final conversion prompt
              with clear visual weight and minimal friction.
            </p>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <a
              className="button-shine inline-flex w-full items-center justify-center rounded-full border border-[rgba(252,223,92,0.2)] bg-[var(--color-button)] px-6 py-3.5 text-center text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(143,135,67,0.42)] sm:w-auto"
              href="#appointment"
            >
              Schedule Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
