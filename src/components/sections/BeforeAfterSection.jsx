import { useEffect } from 'react'
import $ from 'jquery'
import SectionHeading from '../ui/SectionHeading'
import { beforeAfterCases } from '../../data/siteData'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'

function BeforeAfterCard({ category, beforeImage, afterImage }) {
  return (
    <article className="group relative rounded-[1.75rem] bg-[rgba(255,255,255,0.045)] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
      <div className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(252,223,92,0.4),transparent)]" />

      <div className="relative -mt-8 mx-auto w-fit rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(143,135,67,0.95),rgba(245,73,145,0.68))] px-6 py-3 text-center shadow-[0_16px_34px_rgba(0,0,0,0.22)]">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">
          {category}
        </p>
      </div>

      <div className="mt-6 rounded-[1.35rem] bg-[rgba(255,255,255,0.03)] p-4">
        <div className="mb-4 flex items-center justify-between px-2 text-[1.05rem] font-semibold">
          <span className="rounded-full bg-[rgba(245,73,145,0.18)] px-5 py-2 text-[1.05rem] font-extrabold uppercase tracking-[0.08em] text-[var(--color-highlight)] shadow-[0_0_24px_rgba(245,73,145,0.16)]">
            Before
          </span>
          <span className="rounded-full bg-[rgba(252,223,92,0.18)] px-5 py-2 text-[1.05rem] font-extrabold uppercase tracking-[0.08em] text-[var(--color-gold)] shadow-[0_0_24px_rgba(252,223,92,0.16)]">
            After
          </span>
        </div>

        <div className="js-before-after relative overflow-hidden rounded-[1.2rem]">
          <img
            className="h-[20rem] w-full object-cover sm:h-[22rem]"
            src={beforeImage}
            alt={`${category} before placeholder`}
          />

          <div className="js-after-overlay absolute inset-y-0 left-0 overflow-hidden" style={{ width: '50%' }}>
            <img
              className="js-after-image h-[20rem] w-full max-w-none object-cover sm:h-[22rem]"
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
            className="js-handle pointer-events-none absolute top-1/2 flex h-12 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_rgba(0,0,0,0.22)]"
            style={{ left: '50%' }}
          >
            <span className="text-[var(--color-highlight)]">◀</span>
            <span className="mx-2 h-5 w-px bg-[rgba(143,135,67,0.25)]" />
            <span className="text-[var(--color-highlight)]">▶</span>
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
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="reveal text-center">
        <SectionHeading
          eyebrow="Visible Results"
          title="Results Of Our Services"
          description="A dedicated before-and-after section inspired by clinic-style proof cards, adapted into the Shampurna palette with premium glass layering and dummy imagery."
        />
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-1 xl:grid-cols-2">
        {beforeAfterCases.map((item) => (
          <div key={item.category} className="reveal">
            <BeforeAfterCard {...item} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default BeforeAfterSection
