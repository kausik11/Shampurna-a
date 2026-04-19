import { useEffect, useMemo, useState } from 'react'
import { CircularGallery } from '../ui/circular-gallery'
import useServices from '../../hooks/useServices'

function TreatmentGallerySection() {
  const { services } = useServices()
  const [radius, setRadius] = useState(520)
  const [cardHeight, setCardHeight] = useState(
    'clamp(7.75rem, min(32vw, 36svh), 22rem)',
  )

  const galleryItems = useMemo(
    () =>
      services.slice(0, 10).map((service) => ({
        common: service.title,
        binomial: service.focus,
        photo: {
          url: service.image,
          text: service.imageAlt,
          by: 'Unsplash',
        },
      })),
    [services],
  )

  useEffect(() => {
    const syncRadius = () => {
      const viewportWidth = window.innerWidth

      if (viewportWidth < 360) {
        setRadius(228)
        setCardHeight('23.25rem')
        return
      }

      if (viewportWidth < 480) {
        setRadius(246)
        setCardHeight('23.25rem')
        return
      }

      if (viewportWidth < 640) {
        setRadius(282)
        setCardHeight('22rem')
        return
      }

      if (viewportWidth < 768) {
        setRadius(342)
        setCardHeight('clamp(7.75rem, min(32vw, 36svh), 22rem)')
        return
      }

      if (viewportWidth < 1024) {
        setRadius(384)
        setCardHeight('clamp(7.75rem, min(32vw, 36svh), 22rem)')
        return
      }

      if (viewportWidth < 1280) {
        setRadius(504)
        setCardHeight('clamp(7.75rem, min(32vw, 36svh), 22rem)')
        return
      }

      setRadius(648)
      setCardHeight('clamp(7.75rem, min(32vw, 36svh), 22rem)')
    }

    syncRadius()
    window.addEventListener('resize', syncRadius)

    return () => {
      window.removeEventListener('resize', syncRadius)
    }
  }, [])

  return (
    <section
      id="signature-gallery"
      className="full-bleed mb-0 mt-10 h-[108svh] overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,#4a1138_0%,#380828_100%)] min-[390px]:h-[112svh] sm:mb-4 sm:mt-12 sm:h-[160svh] lg:h-[140svh] [@media(max-height:700px)]:h-[112svh] sm:[@media(max-height:700px)]:h-[150svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(245,73,145,0.16),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(252,223,92,0.14),transparent_24%),radial-gradient(circle_at_50%_78%,rgba(143,135,67,0.16),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_16%,transparent_84%,rgba(255,255,255,0.02))]" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col px-4 py-5 sm:px-6 sm:py-8 lg:px-8 [@media(max-height:700px)]:py-4">
          <div className="relative z-20 max-w-xl pt-3 sm:pt-12 lg:pt-16 [@media(max-height:700px)]:pt-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-highlight)] min-[380px]:text-[11px] min-[380px]:tracking-[0.22em] sm:text-xs sm:tracking-[0.34em]">
              Signature Visual Journey
            </p>
            <h2 className="mt-3 max-w-[18rem] text-wrap font-display text-[1.7rem] leading-[1.08] text-[var(--color-heading)] min-[390px]:max-w-sm min-[390px]:text-[1.9rem] sm:mt-4 sm:max-w-xl sm:text-4xl lg:text-5xl [@media(max-height:700px)]:mt-2">
              Scroll through the treatments in a rotating image gallery.
            </h2>
            <p className="mt-4 hidden max-w-lg text-sm leading-7 text-white/68 sm:block sm:mt-5 sm:text-base [@media(max-height:700px)]:mt-3 [@media(max-height:700px)]:max-w-md [@media(max-height:700px)]:text-sm [@media(max-height:700px)]:leading-6">
              This section turns the homepage into a more immersive treatment showcase, using the
              existing service imagery in a 3D ring that responds to scroll.
            </p>
          </div>

          <div className="relative mt-4 min-h-[15rem] flex-1 min-[390px]:min-h-[17rem] sm:mt-16 sm:min-h-[27rem] lg:mt-12 lg:min-h-0 [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:min-h-[14rem]">
            <CircularGallery
              className="absolute inset-x-0 bottom-0 top-1 min-[390px]:bottom-1 sm:bottom-8 sm:top-10 lg:bottom-10 lg:top-8 [@media(max-height:700px)]:bottom-0 [@media(max-height:700px)]:top-1 sm:[@media(max-height:700px)]:bottom-8"
              items={galleryItems}
              radius={radius}
              cardHeight={cardHeight}
              autoRotateSpeed={0.03}
            />
          </div>

          {/* <div className="relative z-10 flex flex-col gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-gold)]">
                Best Use In This App
              </p>
              <p className="mt-3 text-sm leading-7 text-white/62">
                This fits cleanly on the homepage after the services overview, where it can expand
                the same treatment list into a richer visual story without creating another static
                card grid.
              </p>
            </div>

            <p className="text-sm uppercase tracking-[0.28em] text-white/45">
              Scroll down to rotate the ring
            </p>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default TreatmentGallerySection
