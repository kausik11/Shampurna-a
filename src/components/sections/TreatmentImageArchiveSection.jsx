import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'
import useSiteContent from '../../hooks/useSiteContent'

const treatmentImageModules = import.meta.glob(
  '../../assets/treatmentImage/*.{jpeg,jpg,png,JPEG,JPG,PNG}',
  {
    eager: true,
    import: 'default',
  },
)

const treatmentGalleryItems = Object.entries(treatmentImageModules)
  .map(([path, src]) => {
    const fileName = path.split('/').pop() || ''
    const baseName = fileName.replace(/\.[^.]+$/, '')
    const numberMatch = baseName.match(/\((\d+)\)/)

    return {
      src,
      fileName,
      order: numberMatch ? Number(numberMatch[1]) : Number.MAX_SAFE_INTEGER,
      label: numberMatch ? `Image ${numberMatch[1]}` : baseName.replace(/[-_]+/g, ' '),
    }
  })
  .sort((left, right) => {
    if (left.order === right.order) {
      return left.fileName.localeCompare(right.fileName)
    }

    return left.order - right.order
  })

const IMAGES_PER_BATCH = 6

function TreatmentImageArchiveSection() {
  const sectionRef = useRevealAnimations()
  const location = useLocation()
  const { galleryItems } = useSiteContent()
  const sentinelRef = useRef(null)
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_BATCH)
  const archiveItems = galleryItems.length ? galleryItems : treatmentGalleryItems

  const visibleItems = archiveItems.slice(0, visibleCount)
  const hasMoreImages = visibleCount < archiveItems.length

  useEffect(() => {
    if (location.hash !== '#treatment-archive' || !sectionRef.current) {
      return
    }

    window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.hash, sectionRef])

  useEffect(() => {
    if (!sentinelRef.current || !hasMoreImages) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        setVisibleCount((currentCount) =>
          Math.min(currentCount + IMAGES_PER_BATCH, archiveItems.length),
        )
      },
      {
        root: null,
        rootMargin: '240px 0px',
        threshold: 0.1,
      },
    )

    observer.observe(sentinelRef.current)

    return () => observer.disconnect()
  }, [archiveItems.length, hasMoreImages])

  return (
    <section
      id="treatment-archive"
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:py-28"
    >
      <div className="reveal text-center">
        <SectionHeading
          eyebrow="Treatment Archive"
          title="A complete visual gallery of treatment references."
          description={`Browse all ${archiveItems.length} treatment visuals in a progressive gallery that reveals more images as you scroll.`}
        />
      </div>

      <div className="reveal mt-8 flex items-center justify-between gap-3 text-sm text-white/60 sm:mt-10">
        <p>Showing {visibleItems.length} of {archiveItems.length} images</p>
        <p>{hasMoreImages ? 'Scroll to load more' : 'All images loaded'}</p>
      </div>

      <div className="reveal mt-6 grid gap-3 min-[390px]:gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <figure
            key={item.fileName}
            className="group overflow-hidden rounded-[0.5rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-1.5 shadow-[0_18px_42px_rgba(0,0,0,0.16)]"
          >
            <div className="overflow-hidden rounded-[0.4rem]">
              <img
                className="aspect-[4/4.7] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                src={item.src}
                alt={`${item.label} treatment reference`}
                loading="lazy"
              />
            </div>

            <figcaption className="mt-2.5 flex items-center justify-between gap-3 px-1 pb-1">
              <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gold)] sm:text-xs sm:tracking-[0.22em]">
                Treatment
              </span>
              <span className="text-xs text-white/72 sm:text-sm">{item.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div ref={sentinelRef} className="mt-6 flex min-h-10 items-center justify-center sm:mt-8">
        {hasMoreImages ? (
          <p className="text-sm text-white/48">More treatment images will appear as you continue scrolling.</p>
        ) : (
          <p className="text-sm text-white/48">You have reached the end of the treatment archive.</p>
        )}
      </div>
    </section>
  )
}

export default TreatmentImageArchiveSection
