import * as React from 'react'
import { motion as Motion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

const ScrollXCarouselContext = React.createContext(null)

function useScrollXCarousel() {
  const context = React.useContext(ScrollXCarouselContext)

  if (!context) {
    throw new Error('useScrollXCarousel must be used within a ScrollXCarousel')
  }

  return context
}

function ScrollXCarousel({ children, className, ...props }) {
  const carouselRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: carouselRef,
  })

  return (
    <ScrollXCarouselContext.Provider value={{ scrollYProgress }}>
      <div
        ref={carouselRef}
        className={cn('relative w-screen max-w-full', className)}
        {...props}
      >
        {children}
      </div>
    </ScrollXCarouselContext.Provider>
  )
}

function ScrollXCarouselContainer({ className, ...props }) {
  return (
    <div
      className={cn('sticky left-0 top-0 w-full overflow-hidden', className)}
      {...props}
    />
  )
}

function ScrollXCarouselWrap({
  className,
  style,
  xRange,
  xRagnge,
  ...props
}) {
  const { scrollYProgress } = useScrollXCarousel()
  const range = xRange ?? xRagnge ?? ['-0%', '-80%']
  const x = useTransform(scrollYProgress, [0, 1], range)

  return (
    <Motion.div
      className={cn('w-fit', className)}
      style={{ x, ...style }}
      {...props}
    />
  )
}

function ScrollXCarouselProgress({
  className,
  style,
  progressStyle,
  ...props
}) {
  const { scrollYProgress } = useScrollXCarousel()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className={cn('max-w-screen overflow-hidden', className)} {...props}>
      <Motion.div
        className={cn('origin-left', progressStyle)}
        style={{ scaleX, ...style }}
      />
    </div>
  )
}

export {
  ScrollXCarousel,
  ScrollXCarouselContainer,
  ScrollXCarouselWrap,
  ScrollXCarouselProgress,
}
