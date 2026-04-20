import GlassPanel from '../ui/GlassPanel'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'
import shampurnaShelfImage from '../../assets/shampurna_shelf.jpeg'

const expertisePoints = [
  'Skin glow and texture refinement',
  'Laser-led aesthetic treatments',
  'Body contouring and shape care',
  'Permanent makeup finishing',
]

function ShampurnaExpertiseSection() {
  const sectionRef = useRevealAnimations()

  return (
    <section
      ref={sectionRef}
      className="full-bleed relative overflow-hidden border-y border-white/10 bg-[linear-gradient(135deg,#210315_0%,#4b0c36_46%,#17020d_100%)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(245,73,145,0.18),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(235,200,0,0.12),transparent_24%)]" />
      <div className="absolute inset-0 noise-mask opacity-[0.05]" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24 xl:gap-14 xl:py-28">
        <div className="reveal order-2 lg:order-1">
          <GlassPanel className="relative overflow-hidden p-2">
            <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(235,200,0,0.7),transparent)]" />
            <div className="relative overflow-hidden rounded-[1rem] border border-white/10">
              <img
                className="h-[24rem] w-full object-cover object-center sm:h-[32rem] lg:h-[40rem]"
                src={shampurnaShelfImage}
                alt="Shampurna aesthetic products and clinic shelf"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,2,0.02),rgba(1,0,2,0.5))]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="max-w-sm border border-white/12 bg-[rgba(1,0,2,0.48)] p-4 backdrop-blur-xl">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)] sm:text-xs sm:tracking-[0.3em]">
                    Curated Care
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/72">
                    Every detail is selected to support a calm, polished, and
                    hygienic aesthetic journey.
                  </p>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>

        <div className="reveal order-1 min-w-0 space-y-7 lg:order-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-highlight)] min-[380px]:text-[11px] sm:text-xs sm:tracking-[0.3em]">
              Meet The Expert
            </p>
            <h2 className="mt-4 max-w-4xl text-wrap font-display text-[2.15rem] leading-[1.06] text-[var(--color-heading)] min-[390px]:text-4xl md:text-5xl xl:text-6xl">
              Shampurna Madam brings a refined eye to skin, laser, and body
              aesthetics.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
              Her approach begins with listening closely, understanding the
              client&apos;s comfort, and choosing treatments with intention. The
              result is a premium experience where technique, hygiene, and
              natural-looking confidence move together.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {expertisePoints.map((point) => (
              <div
                key={point}
                className="reveal border border-white/10 bg-white/[0.045] px-4 py-4 shadow-[0_18px_50px_rgba(1,0,2,0.18)] backdrop-blur-md"
              >
                <span className="block h-px w-10 bg-[var(--color-gold)]" />
                <p className="mt-4 text-sm font-semibold leading-6 text-[var(--color-heading)] sm:text-base">
                  {point}
                </p>
              </div>
            ))}
          </div>

          <div className="reveal border-l border-[rgba(235,200,0,0.42)] pl-5">
            <p className="max-w-2xl font-display text-xl leading-relaxed text-[var(--color-heading)] sm:text-2xl lg:text-3xl">
              Premium beauty care feels most luxurious when it is personal,
              precise, and quietly confident.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShampurnaExpertiseSection
