import { useMemo } from 'react'
import { services } from '@/data/siteData'
import { Badge } from '@/components/ui/badge'
import {
  CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,
} from '@/components/ui/reveal-on-hover'
import {
  ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselProgress,
  ScrollXCarouselWrap,
} from '@/components/ui/scroll-x-carousel'

const galleryNotes = [
  'Consultation first',
  'Visible glow',
  'Texture focus',
  'Body contour',
  'Finish details',
]

function GalleryCard({ item, note }) {
  return (
    <CardHoverReveal className="min-w-[78vw] rounded-[1.5rem] border border-white/12 bg-[rgba(1,0,2,0.28)] shadow-[0_18px_60px_rgba(1,0,2,0.32)] sm:min-w-[29rem] lg:min-w-[32rem]">
      <CardHoverRevealMain className="relative">
        <img
          alt={item.imageAlt}
          className="h-[16rem] w-full object-cover sm:h-[19rem] lg:h-[22rem]"
          loading="lazy"
          src={item.image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,2,0.02),rgba(1,0,2,0.7))]" />
      </CardHoverRevealMain>

      <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2 sm:left-5 sm:top-5">
        <Badge
          variant="outline"
          className="border-white/12 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[var(--color-heading)]"
        >
          {item.focus}
        </Badge>
        <Badge
          variant="outline"
          className="border-[rgba(235,200,0,0.18)] bg-[rgba(235,200,0,0.08)] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)]"
        >
          {note}
        </Badge>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="rounded-[1rem] border border-white/10 bg-[rgba(1,0,2,0.46)] p-4 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
            Signature treatment
          </p>
          <h3 className="mt-2 font-display text-2xl leading-none text-[var(--color-heading)] sm:text-[2rem]">
            {item.title}
          </h3>
        </div>
      </div>

      <CardHoverRevealContent className="rounded-[1rem] border border-white/12 bg-[rgba(1,0,2,0.72)] text-[var(--color-heading)] shadow-[0_12px_40px_rgba(1,0,2,0.34)]">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
          {item.focus}
        </p>
        <p className="mt-3 text-sm leading-7 text-white/74">{item.description}</p>
      </CardHoverRevealContent>
    </CardHoverReveal>
  )
}

function HeroGallerySection() {
  const galleryItems = useMemo(
    () =>
      services.slice(0, 10).map((service, index) => ({
        ...service,
        note: galleryNotes[index % galleryNotes.length],
      })),
    [],
  )

  const firstRow = galleryItems.slice(0, 5)
  const secondRow = [...galleryItems.slice(5, 10)].reverse()

  return (
    <section
      id="hero-gallery"
      className="relative left-1/2 right-1/2 mt-4 w-screen -translate-x-1/2 overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,#2b071f_0%,#380828_48%,#220416_100%)] sm:mt-6 lg:mt-8"
    >
      <ScrollXCarousel className="h-[130vh] sm:h-[140vh] lg:h-[150vh]">
        <ScrollXCarouselContainer className="flex h-screen flex-col justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(245,73,145,0.18),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(235,200,0,0.14),transparent_24%),radial-gradient(circle_at_50%_84%,rgba(143,135,67,0.16),transparent_26%)]" />
          <div className="absolute inset-y-0 left-0 z-10 w-[12vw] min-w-10 bg-[linear-gradient(90deg,rgba(34,4,22,0.98),transparent)]" />
          <div className="absolute inset-y-0 right-0 z-10 w-[12vw] min-w-10 bg-[linear-gradient(270deg,rgba(34,4,22,0.98),transparent)]" />

          <div className="relative mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Badge
                variant="outline"
                className="border-white/12 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]"
              >
                Scroll Gallery
              </Badge>
              <h2 className="mt-5 font-display text-4xl leading-[0.96] text-[var(--color-heading)] sm:text-5xl lg:text-6xl">
                Explore the clinic story through a moving treatment gallery.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
                Signature skin, laser, contour, and finishing treatments unfold
                as you scroll, so the homepage moves from the hero straight into
                a more visual consultation journey.
              </p>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col gap-5 sm:mt-10">
            <ScrollXCarouselWrap
              xRagnge={['4%', '-56%']}
              className="flex gap-4 pr-6 sm:gap-6 lg:gap-7 [&>*:first-child]:ml-4 sm:[&>*:first-child]:ml-6 lg:[&>*:first-child]:ml-8"
            >
              {firstRow.map((item) => (
                <GalleryCard key={item.title} item={item} note={item.note} />
              ))}
            </ScrollXCarouselWrap>

            <ScrollXCarouselWrap
              xRagnge={['-46%', '4%']}
              className="flex gap-4 pr-6 sm:gap-6 lg:gap-7 [&>*:first-child]:ml-4 sm:[&>*:first-child]:ml-6 lg:[&>*:first-child]:ml-8"
            >
              {secondRow.map((item) => (
                <GalleryCard key={item.title} item={item} note={item.note} />
              ))}
            </ScrollXCarouselWrap>
          </div>

          <div className="relative mx-auto mt-6 w-full max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
            <ScrollXCarouselProgress
              className="h-px bg-white/10"
              progressStyle="h-full bg-[linear-gradient(90deg,var(--color-highlight),var(--color-gold))]"
            />

            <div className="mt-4 flex flex-col gap-3 text-xs uppercase tracking-[0.26em] text-white/42 sm:flex-row sm:items-center sm:justify-between">
              <span>Best placed directly after the hero</span>
              <span>Responsive sticky gallery using existing Unsplash imagery</span>
            </div>
          </div>
        </ScrollXCarouselContainer>
      </ScrollXCarousel>
    </section>
  )
}

export default HeroGallerySection
