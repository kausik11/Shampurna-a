import { useEffect, useMemo, useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import TestimonialCard from '../ui/TestimonialCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Marquee } from '@/components/ui/3d-testimonails'
import { testimonials } from '../../data/siteData'
import { useRevealAnimations } from '../../hooks/useRevealAnimations'

function MarqueeTestimonialCard({ image, name, username, quote, country }) {
  return (
    <Card className="w-60 rounded-[1.25rem] border-white/12 bg-[rgba(1,0,2,0.52)] shadow-[0_18px_50px_rgba(1,0,2,0.3)] sm:w-64 sm:rounded-[1.5rem]">
      <CardContent className="p-5 pt-5">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 border border-[rgba(252,223,92,0.25)]">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="flex flex-wrap items-center gap-1 text-sm font-medium leading-tight text-[var(--color-heading)]">
              {name}
              <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-gold)]">
                {country}
              </span>
            </figcaption>
            <p className="text-xs font-medium text-white/45">{username}</p>
          </div>
        </div>
        <blockquote className="mt-4 text-sm leading-6 text-white/65">
          {quote}
        </blockquote>
      </CardContent>
    </Card>
  )
}

function TestimonialsSection() {
  const sectionRef = useRevealAnimations()
  const [activeIndex, setActiveIndex] = useState(0)
  const featuredTestimonials = useMemo(
    () => testimonials.slice(0, 3),
    [],
  )

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 4800)

    return () => window.clearInterval(timerId)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:py-28"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center xl:gap-10">
        <div className="reveal">
          <SectionHeading
            align="left"
            eyebrow="Testimonials"
            title="Trust-building reviews with a featured editorial card and a 3D marquee wall."
            description="The left side keeps a controlled featured-review state, while the right side now carries the scrolling depth effect you asked to integrate."
          />

          <div className="mt-8 flex gap-3">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-12 bg-[var(--color-gold)]'
                    : 'w-6 bg-white/15 hover:bg-white/30'
                }`}
                type="button"
                aria-label={`Show testimonial from ${item.name}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <div className="mt-8 min-h-[20rem] sm:min-h-[23rem]">
            <TestimonialCard testimonial={featuredTestimonials[activeIndex % featuredTestimonials.length]} />
          </div>
        </div>

        <div className="reveal relative overflow-hidden rounded-[1.35rem] border border-white/12 bg-[rgba(1,0,2,0.52)] p-2 shadow-[0_24px_60px_rgba(1,0,2,0.36)] backdrop-blur-2xl sm:rounded-[1.75rem] sm:p-3">
          <div className="relative flex h-[26rem] w-full flex-row items-center justify-center overflow-hidden [perspective:300px] sm:h-[30rem] lg:h-[32rem]">
            <div
              className="flex flex-row items-center gap-4"
              style={{
                transform:
                  'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
              }}
            >
              <Marquee
                vertical
                pauseOnHover
                repeat={2}
                className="[--duration:34s]"
              >
                {testimonials.map((review) => (
                  <MarqueeTestimonialCard key={`${review.username}-a`} {...review} />
                ))}
              </Marquee>
              <Marquee
                vertical
                pauseOnHover
                reverse
                repeat={2}
                className="[--duration:36s]"
              >
                {testimonials.map((review) => (
                  <MarqueeTestimonialCard key={`${review.username}-b`} {...review} />
                ))}
              </Marquee>
              <Marquee
                vertical
                pauseOnHover
                repeat={2}
                className="hidden [--duration:38s] xl:flex"
              >
                {testimonials.map((review) => (
                  <MarqueeTestimonialCard key={`${review.username}-c`} {...review} />
                ))}
              </Marquee>
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--color-page)] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-page)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--color-page)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--color-page)] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
