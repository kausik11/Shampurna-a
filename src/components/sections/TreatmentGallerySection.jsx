import { useEffect, useMemo, useState } from 'react'
import { services } from '../../data/siteData'
import { CircularGallery } from '../ui/circular-gallery'

function TreatmentGallerySection() {
  const [radius, setRadius] = useState(520)

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
    [],
  )

  useEffect(() => {
    const syncRadius = () => {
      const viewportWidth = window.innerWidth

      if (viewportWidth < 480) {
        setRadius(150)
        return
      }

      if (viewportWidth < 640) {
        setRadius(190)
        return
      }

      if (viewportWidth < 768) {
        setRadius(230)
        return
      }

      if (viewportWidth < 1024) {
        setRadius(320)
        return
      }

      if (viewportWidth < 1280) {
        setRadius(420)
        return
      }

      setRadius(540)
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
      className="relative left-1/2 right-1/2 my-12 w-screen -translate-x-1/2 overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,#4a1138_0%,#380828_100%)]"
      style={{ height: '360svh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(245,73,145,0.16),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(252,223,92,0.14),transparent_24%),radial-gradient(circle_at_50%_78%,rgba(143,135,67,0.16),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_16%,transparent_84%,rgba(255,255,255,0.02))]" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
          <div className="relative z-10 max-w-xl pt-12 sm:pt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-highlight)]">
              Signature Visual Journey
            </p>
            <h2 className="mt-4 font-display text-4xl leading-none text-[var(--color-heading)] sm:text-5xl">
              Scroll through the treatments in a rotating image gallery.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/68 sm:text-base">
              This section turns the homepage into a more immersive treatment showcase, using the
              existing service imagery in a 3D ring that responds to scroll.
            </p>
          </div>

          <div className="relative flex-1">
            <CircularGallery
              className="absolute inset-0"
              items={galleryItems}
              radius={radius}
              autoRotateSpeed={0.03}
            />
          </div>

          <div className="relative z-10 flex flex-col gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between">
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default TreatmentGallerySection
