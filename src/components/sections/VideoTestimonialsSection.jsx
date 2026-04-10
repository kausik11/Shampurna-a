import { useEffect, useState } from 'react'
import { ExternalLink, Play, Share2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MasonryGrid } from '@/components/ui/image-testimonial-grid'
import SectionHeading from '../ui/SectionHeading'
import { videoTestimonials } from '../../data/siteData'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'

function VideoTestimonialCard({
  profileImage,
  name,
  feedback,
  mainImage,
  videoUrl,
  facebookUrl,
}) {
  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] bg-[rgba(10,10,12,0.7)] shadow-[0_18px_48px_rgba(0,0,0,0.26)] backdrop-blur-xl transition duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={mainImage}
          alt={feedback}
          className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/72" />

        <a
          href={videoUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(252,223,92,0.18)] text-[var(--color-gold)] backdrop-blur-xl transition hover:bg-[rgba(252,223,92,0.28)]"
          aria-label={`Play video testimonial from ${name}`}
        >
          <Play className="h-4 w-4 fill-current" />
        </a>

        <div className="absolute inset-x-0 top-0 p-4 text-white">
          <div className="mb-3 flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-white/30">
              <AvatarImage src={profileImage} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold drop-shadow-md">{name}</span>
          </div>
          <p className="max-w-[14rem] text-sm font-medium leading-tight text-white/92 drop-shadow-md">
            {feedback}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl transition hover:bg-white/16"
          >
            <Play className="h-3.5 w-3.5" />
            Watch
          </a>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[rgba(245,73,145,0.14)] px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl transition hover:bg-[rgba(245,73,145,0.22)]"
          >
            <Share2 className="h-3.5 w-3.5" />
            Facebook
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  )
}

function ResponsiveVideoMasonry() {
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

  return (
    <section
      ref={sectionRef}
      id="video-testimonials"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="reveal rounded-[1.75rem] bg-[rgba(8,8,10,0.52)] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6">
        <SectionHeading
          align="left"
          eyebrow="Video Testimonials"
          title="Social proof with dummy video and Facebook links."
          description="This separate section is ready for real patient stories, embedded reel links, Facebook video posts, or hosted testimonial videos."
        />

        <div className="mt-8">
          <ResponsiveVideoMasonry />
        </div>
      </div>
    </section>
  )
}

export default VideoTestimonialsSection
