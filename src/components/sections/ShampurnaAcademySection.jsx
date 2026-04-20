import { useState } from 'react'
import { FiAward, FiBookOpen, FiCheckCircle, FiUsers } from 'react-icons/fi'
import academyImageOne from '../../assets/academy/1.jpeg'
import academyImageTwo from '../../assets/academy/2.jpeg'
import academyImageThree from '../../assets/academy/3.jpeg'
import academyImageFour from '../../assets/academy/4.jpeg'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'

const academyModules = [
  {
    title: 'Skin Treatment Foundations',
    detail:
      'Learn consultation flow, skin analysis, treatment planning, hygiene, and client care from a clinic-led environment.',
    image: academyImageOne,
  },
  {
    title: 'Hands-On Practice',
    detail:
      'Build practical confidence through guided demonstrations, supervised practice, and real treatment room standards.',
    image: academyImageThree,
  },
  {
    title: 'Career-Ready Finish',
    detail:
      'Complete the journey with professional presentation, aftercare guidance, certification moments, and academy support.',
    image: academyImageFour,
  },
]

const academyHighlights = [
  { label: 'Clinical training', icon: FiBookOpen },
  { label: 'Small batch focus', icon: FiUsers },
  { label: 'Certificate moments', icon: FiAward },
]

function ShampurnaAcademySection() {
  const sectionRef = useRevealAnimations()
  const [activeModuleIndex, setActiveModuleIndex] = useState(0)
  const activeModule = academyModules[activeModuleIndex]

  return (
    <section
      ref={sectionRef}
      className="full-bleed overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,#380828_0%,#4a1138_48%,#26051c_100%)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center xl:gap-14">
        <div className="reveal relative min-h-[30rem] sm:min-h-[38rem] lg:min-h-[43rem]">
          <img
            className="absolute inset-0 h-full w-full rounded-[8px] border border-[rgba(252,223,92,0.18)] object-cover shadow-[0_30px_80px_rgba(1,0,2,0.42)]"
            src={academyImageTwo}
            alt="Shampurna Academy training batch"
          />
          <div className="absolute inset-0 rounded-[8px] bg-[linear-gradient(180deg,rgba(1,0,2,0.08)_0%,rgba(1,0,2,0.22)_46%,rgba(1,0,2,0.82)_100%)]" />

          <div className="absolute inset-x-3 bottom-3 rounded-[8px] border border-white/12 bg-[rgba(1,0,2,0.62)] p-4 shadow-[0_18px_44px_rgba(1,0,2,0.34)] backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-highlight)] sm:text-xs sm:tracking-[0.28em]">
              Shampurna Academy
            </p>
            <h2 className="mt-3 text-wrap font-display text-3xl leading-tight text-[var(--color-heading)] sm:text-4xl lg:text-5xl">
              Learn skin treatment inside a working aesthetic clinic.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
              Beside premium skin and body treatments, Shampurna Aesthetic trains aspiring
              professionals in treatment knowledge, client handling, hygiene, and polished practice.
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <div className="reveal">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-highlight)] sm:text-xs sm:tracking-[0.3em]">
              Academy Programme
            </p>
            <h3 className="mt-3 max-w-3xl text-wrap font-display text-[2.15rem] leading-[1.05] text-[var(--color-heading)] min-[390px]:text-4xl sm:mt-4 md:text-5xl xl:text-6xl">
              Training that feels personal, practical, and clinic-ready.
            </h3>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/66 sm:text-base">
              Move from treatment theory to confident hands-on learning with a premium academy
              experience shaped by real aesthetic care standards.
            </p>
          </div>

          <div className="reveal mt-7 grid gap-3 sm:grid-cols-3">
            {academyHighlights.map((item) => {
              const HighlightIcon = item.icon

              return (
                <div
                  key={item.label}
                  className="flex min-h-20 items-center gap-3 rounded-[8px] border border-white/12 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white/78"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-[rgba(252,223,92,0.2)] bg-[rgba(252,223,92,0.08)] text-[var(--color-gold)]">
                    <HighlightIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {item.label}
                </div>
              )
            })}
          </div>

          <div className="reveal mt-8 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col gap-3">
              {academyModules.map((module, index) => {
                const isActive = activeModuleIndex === index

                return (
                  <button
                    key={module.title}
                    className={`group flex min-h-20 w-full items-center gap-3 rounded-[8px] border px-4 py-3 text-left transition duration-300 ${
                      isActive
                        ? 'border-[rgba(252,223,92,0.44)] bg-[rgba(252,223,92,0.12)] text-[var(--color-gold)] shadow-[0_18px_42px_rgba(143,135,67,0.18)]'
                        : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-[rgba(252,223,92,0.28)] hover:text-white'
                    }`}
                    type="button"
                    onClick={() => setActiveModuleIndex(index)}
                    onFocus={() => setActiveModuleIndex(index)}
                    onMouseEnter={() => setActiveModuleIndex(index)}
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-white/10 bg-[rgba(1,0,2,0.26)] text-sm font-bold">
                      0{index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold sm:text-base">{module.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-white/50">
                        Select focus
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="overflow-hidden rounded-[8px] border border-[rgba(252,223,92,0.18)] bg-[rgba(1,0,2,0.38)] shadow-[0_24px_64px_rgba(1,0,2,0.34)]">
              <img
                className="h-56 w-full object-cover sm:h-72 lg:h-64 xl:h-72"
                src={activeModule.image}
                alt={`${activeModule.title} at Shampurna Academy`}
              />
              <div className="p-5 sm:p-6">
                <div className="inline-flex items-center gap-2 rounded-[8px] border border-[rgba(252,223,92,0.22)] bg-[rgba(252,223,92,0.08)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)]">
                  <FiCheckCircle className="h-4 w-4" aria-hidden="true" />
                  Focus {activeModuleIndex + 1}
                </div>
                <h4 className="mt-4 text-wrap font-display text-3xl leading-tight text-[var(--color-heading)]">
                  {activeModule.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-white/66">{activeModule.detail}</p>
              </div>
            </div>
          </div>

          <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="button-shine inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[rgba(252,223,92,0.24)] bg-[var(--color-button)] px-5 py-3 text-sm font-semibold text-[#f5efcf] shadow-[0_18px_40px_rgba(143,135,67,0.3)] transition duration-300 hover:-translate-y-0.5"
              href="#appointment"
            >
              Enquire About Academy
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-white/12 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white/78 transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(252,223,92,0.28)] hover:text-[var(--color-gold)]"
              href="tel:9831833650"
            >
              Call 98318 33650
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShampurnaAcademySection
