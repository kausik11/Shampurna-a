import { useEffect, useState } from 'react'
import { FiExternalLink, FiPlay, FiShare2 } from 'react-icons/fi'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MasonryGrid } from '@/components/ui/image-testimonial-grid'
import SectionHeading from '../ui/SectionHeading'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'
import useSiteContent from '../../hooks/useSiteContent'

function VideoTestimonialCard({
  profileImage,
  name,
  feedback,
  mainImage,
  videoUrl,
  facebookUrl,
}) {
  return (
    <article className="group relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-[rgba(1,0,2,0.52)] shadow-[0_18px_48px_rgba(1,0,2,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 sm:rounded-[1.5rem]">
      <div className="relative">
        <img
          src={mainImage}
          alt={feedback}
          className="max-h-[28rem] min-h-[20rem] w-full object-cover transition duration-500 group-hover:scale-105 sm:max-h-[34rem]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/72" />

        <a
          href={videoUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(252,223,92,0.18)] text-[var(--color-gold)] backdrop-blur-xl transition hover:bg-[rgba(252,223,92,0.28)] sm:right-4 sm:top-4"
          aria-label={`Play video testimonial from ${name}`}
        >
          <FiPlay className="h-4 w-4" />
        </a>

        <div className="absolute inset-x-0 top-0 p-3 text-white sm:p-4">
          <div className="mb-3 flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-white/30">
              <AvatarImage src={profileImage} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold drop-shadow-md">{name}</span>
          </div>
          <p className="max-w-[min(13rem,72vw)] text-sm font-medium leading-tight text-white/92 drop-shadow-md sm:max-w-[14rem]">
            {feedback}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 p-3 sm:gap-3 sm:p-4">
          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl transition hover:bg-white/16"
          >
            <FiPlay className="h-3.5 w-3.5" />
            Watch
          </a>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[rgba(245,73,145,0.14)] px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl transition hover:bg-[rgba(245,73,145,0.22)]"
          >
            <FiShare2 className="h-3.5 w-3.5" />
            Facebook
            <FiExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  )
}

function ResponsiveVideoMasonry({ videoTestimonials }) {
  const [columns, setColumns] = useState(2)

  useEffect(() => {
    const getColumns = (width) => {
      if (width < 768) return 1
      if (width < 1280) return 2
      return 2
    }

    const handleResize = () => {
      setColumns(getColumns(window.innerWidth))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <MasonryGrid columns={columns} gap={4}>
      {videoTestimonials.map((card, index) => (
        <VideoTestimonialCard key={`${card.name}-${index}`} {...card} />
      ))}
    </MasonryGrid>
  )
}

function VideoTestimonialsSection() {
  const sectionRef = useRevealAnimations()
  const { videoTestimonials } = useSiteContent()

  if (!videoTestimonials.length) {
    return null
  }

  return (
    <section
      ref={sectionRef}
      id="video-testimonials"
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:py-28"
    >
      <div className="reveal rounded-[1.35rem] border border-white/12 bg-[rgba(1,0,2,0.46)] p-3 shadow-[0_24px_60px_rgba(1,0,2,0.36)] backdrop-blur-2xl sm:rounded-[1.75rem] sm:p-6">
        <SectionHeading
          align="left"
          eyebrow="Video Testimonials"
          title="Social proof with dummy video and Facebook links."
          description="This separate section is ready for real patient stories, embedded reel links, Facebook video posts, or hosted testimonial videos."
        />

        <div className="mt-8">
          <ResponsiveVideoMasonry videoTestimonials={videoTestimonials} />
        </div>
      </div>
    </section>
  )
}

export default VideoTestimonialsSection
