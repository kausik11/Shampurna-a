import { useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,
} from '@/components/ui/reveal-on-hover'
import {
  ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselWrap,
} from '@/components/ui/scroll-x-carousel'
import useServices from '@/hooks/useServices'

const galleryNotes = [
  'Consultation first',
  'Visible glow',
  'Texture focus',
  'Body contour',
  'Finish details',
]

function GalleryCard({ item, note }) {
  return (
    <CardHoverReveal className="min-w-[min(84vw,20rem)] max-w-[22rem] rounded-[1.1rem] border border-white/12 bg-[rgba(1,0,2,0.28)] shadow-[0_18px_60px_rgba(1,0,2,0.32)] sm:min-w-[24rem] sm:max-w-none sm:rounded-[1.5rem] md:min-w-[27rem] lg:min-w-[30rem] xl:min-w-[32rem]">
      <CardHoverRevealMain className="relative">
        <img
          alt={item.imageAlt}
          className="h-[11.5rem] w-full object-cover min-[380px]:h-[12.5rem] sm:h-[14rem] md:h-[15rem] lg:h-[17rem] xl:h-[18rem]"
          loading="lazy"
          src={item.image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,2,0.02),rgba(1,0,2,0.7))]" />
      </CardHoverRevealMain>

      <div className="pointer-events-none absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2 sm:left-5 sm:top-5 sm:max-w-[calc(100%-2.5rem)]">
        <Badge
          variant="outline"
          className="border-white/12 bg-black/25 px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-[var(--color-heading)] sm:px-3 sm:text-[10px] sm:tracking-[0.28em]"
        >
          {item.focus}
        </Badge>
        <Badge
          variant="outline"
          className="border-[rgba(235,200,0,0.18)] bg-[rgba(235,200,0,0.08)] px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-[var(--color-gold)] sm:px-3 sm:text-[10px] sm:tracking-[0.28em]"
        >
          {note}
        </Badge>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="rounded-[1rem] border border-white/10 bg-[rgba(1,0,2,0.46)] p-3 backdrop-blur-md sm:p-4">
          <p className="text-[9px] uppercase tracking-[0.16em] text-white/42 sm:text-[10px] sm:tracking-[0.28em]">
            Signature treatment
          </p>
          <h3 className="mt-2 text-wrap font-display text-lg leading-tight text-[var(--color-heading)] sm:text-2xl">
            {item.title}
          </h3>
        </div>
      </div>

      <CardHoverRevealContent className="inset-[auto_1rem_1rem] rounded-[1rem] border border-white/12 bg-[rgba(1,0,2,0.72)] p-4 text-[var(--color-heading)] shadow-[0_12px_40px_rgba(1,0,2,0.34)] sm:inset-[auto_1.5rem_1.5rem] sm:p-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)] sm:tracking-[0.3em]">
          {item.focus}
        </p>
        <p className="mt-3 text-sm leading-6 text-white/74 sm:leading-7">{item.description}</p>
      </CardHoverRevealContent>
    </CardHoverReveal>
  )
}

function HeroGallerySection() {
  const { services } = useServices()
  const galleryItems = useMemo(
    () =>
      services.slice(0, 10).map((service, index) => ({
        ...service,
        note: galleryNotes[index % galleryNotes.length],
      })),
    [services],
  )

  const firstRow = galleryItems.slice(0, 5)

  return (
    <section
      id="hero-gallery"
      className="full-bleed mt-2 overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,#2b071f_0%,#380828_48%,#220416_100%)] sm:mt-6 lg:mt-8"
    >
      <ScrollXCarousel className="h-auto pb-8 sm:h-[128svh] sm:pb-0 lg:h-[138svh] xl:h-[145svh] sm:[@media(max-height:700px)]:h-[132svh]">
        <ScrollXCarouselContainer className="!relative flex h-auto flex-col justify-start sm:!sticky sm:h-[100svh]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(245,73,145,0.18),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(235,200,0,0.14),transparent_24%),radial-gradient(circle_at_50%_84%,rgba(143,135,67,0.16),transparent_26%)]" />
          <div className="absolute inset-y-0 left-0 z-10 w-[12vw] min-w-10 bg-[linear-gradient(90deg,rgba(34,4,22,0.98),transparent)]" />
          <div className="absolute inset-y-0 right-0 z-10 w-[12vw] min-w-10 bg-[linear-gradient(270deg,rgba(34,4,22,0.98),transparent)]" />

          <div className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12 [@media(max-height:700px)]:pt-4">
            <div className="max-w-3xl">
              <Badge
                variant="outline"
                className="border-white/12 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--color-gold)] sm:tracking-[0.3em]"
              >
                Gallery Images
              </Badge>
              <h2 className="mt-4 max-w-3xl text-wrap font-display text-[1.9rem] leading-tight text-[var(--color-heading)] min-[390px]:text-4xl lg:text-5xl">
                Explore the clinic story through a treatment gallery.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68 sm:mt-4 sm:text-base">
                Signature skin, laser, contour, and finishing treatments unfold
                as you scroll, so the homepage moves from the hero straight into
                a more visual consultation journey.
              </p>
            </div>
          </div>

          <div className="relative mt-5 flex flex-col gap-3 sm:mt-6 sm:gap-4 [@media(max-height:700px)]:mt-4">
            <div
              className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-3 pr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden"
              aria-label="Swipe through treatment gallery"
            >
              {firstRow.map((item) => (
                <div key={item.title} className="shrink-0 snap-start">
                  <GalleryCard item={item} note={item.note} />
                </div>
              ))}
            </div>

            <ScrollXCarouselWrap
              xRange={['4%', '-56%']}
              className="hidden gap-4 pr-6 sm:flex sm:gap-6 lg:gap-7 [&>*:first-child]:ml-4 sm:[&>*:first-child]:ml-6 lg:[&>*:first-child]:ml-8"
            >
              {firstRow.map((item) => (
                <GalleryCard key={item.title} item={item} note={item.note} />
              ))}
            </ScrollXCarouselWrap>

            {/* <ScrollXCarouselWrap
              xRange={['-46%', '4%']}
              className="flex gap-4 pr-6 sm:gap-6 lg:gap-7 [&>*:first-child]:ml-4 sm:[&>*:first-child]:ml-6 lg:[&>*:first-child]:ml-8"
            >
              {secondRow.map((item) => (
                <GalleryCard key={item.title} item={item} note={item.note} />
              ))}
            </ScrollXCarouselWrap> */}
          </div>

        </ScrollXCarouselContainer>
      </ScrollXCarousel>
    </section>
  )
}

export default HeroGallerySection
