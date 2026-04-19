import { useEffect } from 'react'
import $ from 'jquery'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'
import { beforeAfterCases } from '../../data/siteData'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'

function BeforeAfterCard({ category, beforeImage, afterImage }) {
  return (
    <article className="group relative rounded-[0.8rem] bg-[rgba(255,255,255,0.045)] p-1.5 shadow-[0_14px_34px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:rounded-[1rem] sm:p-2">
      <div className="absolute inset-x-7 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(252,223,92,0.4),transparent)]" />

      <div className="relative -mt-5 mx-auto w-fit max-w-[calc(100%-1rem)] rounded-[0.6rem] bg-[linear-gradient(135deg,rgba(143,135,67,0.95),rgba(245,73,145,0.68))] px-3 py-1.5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.22)] sm:-mt-6 sm:rounded-[0.75rem] sm:px-4 sm:py-2">
        <p className="text-[9px] font-extrabold uppercase tracking-[0.06em] text-white sm:text-[11px] sm:tracking-[0.1em]">
          {category}
        </p>
      </div>

      <div className="mt-3.5 rounded-[0.75rem] bg-[rgba(255,255,255,0.03)] p-1.5 sm:mt-4 sm:rounded-[0.9rem] sm:p-2">
        <div className="mb-2 flex items-center justify-between gap-2 px-1 text-xs font-semibold">
          <span className="rounded-full bg-[rgba(245,73,145,0.18)] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.04em] text-[var(--color-highlight)] shadow-[0_0_18px_rgba(245,73,145,0.16)] sm:text-[10px]">
            Before
          </span>
          <span className="rounded-full bg-[rgba(252,223,92,0.18)] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.04em] text-[var(--color-gold)] shadow-[0_0_18px_rgba(252,223,92,0.16)] sm:text-[10px]">
            After
          </span>
        </div>

        <div className="js-before-after relative touch-none overflow-hidden rounded-[0.7rem] sm:rounded-[0.8rem]">
          <img
            className="h-[10rem] w-full object-cover min-[390px]:h-[11rem] sm:h-[12rem] md:h-[13rem] xl:h-[13.5rem]"
            src={beforeImage}
            alt={`${category} before placeholder`}
          />

          <div className="js-after-overlay absolute inset-y-0 left-0 overflow-hidden" style={{ width: '50%' }}>
            <img
              className="js-after-image h-[10rem] w-full max-w-none object-cover min-[390px]:h-[11rem] sm:h-[12rem] md:h-[13rem] xl:h-[13.5rem]"
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
            className="js-handle pointer-events-none absolute top-1/2 flex h-8 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] sm:h-9 sm:w-14"
            style={{ left: '50%' }}
          >
            <FiChevronLeft className="h-3 w-3 text-[var(--color-highlight)]" aria-hidden="true" />
            <span className="mx-1.5 h-3.5 w-px bg-[rgba(143,135,67,0.25)]" />
            <FiChevronRight className="h-3 w-3 text-[var(--color-highlight)]" aria-hidden="true" />
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

      <div className="mt-9 grid gap-x-4 gap-y-9 sm:mt-11 md:grid-cols-2 xl:grid-cols-3">
        {beforeAfterCases.map((item, index) => (
          <div key={`${item.category}-${index}`} className="reveal">
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
