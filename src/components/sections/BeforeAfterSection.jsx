import { useEffect } from 'react'
import $ from 'jquery'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'
import useSiteContent from '../../hooks/useSiteContent'

function BeforeAfterCard({ category, beforeImage, afterImage }) {
  return (
    <article className="group relative rounded-[1.2rem] bg-[rgba(255,255,255,0.045)] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:rounded-[1.75rem] sm:p-3">
      <div className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(252,223,92,0.4),transparent)]" />

      <div className="relative -mt-6 mx-auto w-fit max-w-[calc(100%-1rem)] rounded-[1rem] bg-[linear-gradient(135deg,rgba(143,135,67,0.95),rgba(245,73,145,0.68))] px-3.5 py-2.5 text-center shadow-[0_16px_34px_rgba(0,0,0,0.22)] sm:-mt-8 sm:rounded-[1.25rem] sm:px-6 sm:py-3">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-white sm:text-sm sm:tracking-[0.16em]">
          {category}
        </p>
      </div>

      <div className="mt-5 rounded-[1.2rem] bg-[rgba(255,255,255,0.03)] p-2.5 sm:mt-6 sm:rounded-[1.35rem] sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3 px-1 text-sm font-semibold sm:mb-4 sm:px-2 sm:text-[1.05rem]">
          <span className="rounded-full bg-[rgba(245,73,145,0.18)] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.06em] text-[var(--color-highlight)] shadow-[0_0_24px_rgba(245,73,145,0.16)] sm:px-5 sm:py-2 sm:text-[1.05rem] sm:tracking-[0.08em]">
            Before
          </span>
          <span className="rounded-full bg-[rgba(252,223,92,0.18)] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.06em] text-[var(--color-gold)] shadow-[0_0_24px_rgba(252,223,92,0.16)] sm:px-5 sm:py-2 sm:text-[1.05rem] sm:tracking-[0.08em]">
            After
          </span>
        </div>

        <div className="js-before-after relative touch-none overflow-hidden rounded-[1.2rem]">
          <img
            className="h-[14rem] w-full object-cover min-[390px]:h-[16rem] sm:h-[20rem] lg:h-[22rem]"
            src={beforeImage}
            alt={`${category} before placeholder`}
          />

          <div className="js-after-overlay absolute inset-y-0 left-0 overflow-hidden" style={{ width: '50%' }}>
            <img
              className="js-after-image h-[14rem] w-full max-w-none object-cover min-[390px]:h-[16rem] sm:h-[20rem] lg:h-[22rem]"
              src={afterImage}
              alt={`${category} after placeholder`}
              style={{ width: '200%' }}
            />
          </div>

          <div
            className="js-divider pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white/95 shadow-[0_0_20px_rgba(255,255,255,0.35)]"
            style={{ left: '50%' }}
          />

          <div
            className="js-handle pointer-events-none absolute top-1/2 flex h-11 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] sm:h-12 sm:w-20"
            style={{ left: '50%' }}
          >
            <FiChevronLeft className="h-4 w-4 text-[var(--color-highlight)]" aria-hidden="true" />
            <span className="mx-2 h-5 w-px bg-[rgba(143,135,67,0.25)]" />
            <FiChevronRight className="h-4 w-4 text-[var(--color-highlight)]" aria-hidden="true" />
          </div>

          <button
            className="js-hit-area absolute inset-0 z-10 h-full w-full cursor-ew-resize bg-transparent"
            type="button"
            aria-label={`${category} before and after comparison slider`}
          />
        </div>
      </div>
    </article>
  )
}

function BeforeAfterSection() {
  const sectionRef = useRevealAnimations()
  const { beforeAfterCases } = useSiteContent()

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const $section = $(sectionRef.current)
    let $activeCard = null

    const getClientX = (event) => {
      if (event.type.startsWith('touch')) {
        return event.originalEvent.touches[0]?.clientX ?? event.originalEvent.changedTouches[0]?.clientX
      }

      return event.clientX
    }

    const updateCard = (cardElement, clientX) => {
      const $card = $(cardElement)
      const rect = cardElement.getBoundingClientRect()
      const clampedX = Math.min(Math.max(clientX - rect.left, 0), rect.width)
      const percentage = (clampedX / rect.width) * 100

      $card.find('.js-after-overlay').css('width', `${percentage}%`)
      $card.find('.js-after-image').css('width', `${100 / Math.max(percentage / 100, 0.01)}%`)
      $card.find('.js-divider, .js-handle').css('left', `${percentage}%`)
    }

    const startDrag = (event) => {
      const cardElement = $(event.currentTarget).closest('.js-before-after').get(0)

      if (!cardElement) {
        return
      }

      $activeCard = $(cardElement)
      updateCard(cardElement, getClientX(event))
      event.preventDefault()
    }

    const moveDrag = (event) => {
      if (!$activeCard) {
        return
      }

      updateCard($activeCard.get(0), getClientX(event))
      event.preventDefault()
    }

    const endDrag = () => {
      $activeCard = null
    }

    $section.find('.js-hit-area').on('mousedown touchstart', startDrag)
    $(window).on('mousemove touchmove', moveDrag)
    $(window).on('mouseup touchend touchcancel', endDrag)

    return () => {
      $section.find('.js-hit-area').off('mousedown touchstart', startDrag)
      $(window).off('mousemove touchmove', moveDrag)
      $(window).off('mouseup touchend touchcancel', endDrag)
    }
  }, [sectionRef])

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:py-28"
    >
      <div className="reveal text-center">
        <SectionHeading
          eyebrow="Visible Results"
          title="Results Of Our Services"
          description="A dedicated before-and-after section inspired by clinic-style proof cards, adapted into the Shampurna palette with premium glass layering and dummy imagery."
        />
      </div>

      <div className="mt-12 grid gap-10 sm:mt-16 xl:grid-cols-2">
        {beforeAfterCases.map((item) => (
          <div key={item.category} className="reveal">
            <BeforeAfterCard {...item} />
          </div>
        ))}
      </div>

      <div className="reveal mt-10 flex justify-center sm:mt-12">
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-[0.5rem] border border-[rgba(252,223,92,0.28)] bg-[rgba(252,223,92,0.08)] px-6 py-3 text-sm font-semibold text-[var(--color-heading)] transition duration-300 hover:border-[rgba(245,73,145,0.34)] hover:bg-[rgba(245,73,145,0.12)] hover:text-[var(--color-highlight)]"
          to="/gallery#treatment-archive"
        >
          See All Images
        </Link>
      </div>
    </section>
  )
}

export default BeforeAfterSection
