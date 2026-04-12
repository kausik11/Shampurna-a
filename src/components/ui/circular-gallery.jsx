import { forwardRef, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

function getRelativeOpacity(itemAngle, rotation) {
  const totalRotation = rotation % 360
  const relativeAngle = (itemAngle + totalRotation + 360) % 360
  const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle)

  return Math.max(0.28, 1 - normalizedAngle / 180)
}

const CircularGallery = forwardRef(function CircularGallery(
  { items = [], className, radius = 600, autoRotateSpeed = 0.02, ...props },
  ref,
) {
  const [rotation, setRotation] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef(null)
  const animationFrameRef = useRef(null)
  const dragStateRef = useRef({
    pointerId: null,
    startX: 0,
    startRotation: 0,
    dragging: false,
  })

  useEffect(() => {
    if (!items.length) {
      return undefined
    }

    const handleScroll = () => {
      setIsScrolling(true)

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current)
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
      setRotation(scrollProgress * 360)

      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [items.length])

  useEffect(() => {
    if (!items.length) {
      return undefined
    }

    const autoRotate = () => {
      if (!isScrolling) {
        setRotation((previousRotation) => previousRotation + autoRotateSpeed)
      }

      animationFrameRef.current = window.requestAnimationFrame(autoRotate)
    }

    animationFrameRef.current = window.requestAnimationFrame(autoRotate)

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [autoRotateSpeed, isScrolling, items.length])

  if (!items.length) {
    return null
  }

  const anglePerItem = 360 / items.length
  const dragRotationFactor = 0.18

  const handlePointerDown = (event) => {
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startRotation: rotation,
      dragging: true,
    }

    setIsScrolling(true)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePointerMove = (event) => {
    const dragState = dragStateRef.current

    if (!dragState.dragging || dragState.pointerId !== event.pointerId) {
      return
    }

    const deltaX = event.clientX - dragState.startX
    setRotation(dragState.startRotation + deltaX * dragRotationFactor)
  }

  const endDrag = (event) => {
    const dragState = dragStateRef.current

    if (!dragState.dragging || dragState.pointerId !== event.pointerId) {
      return
    }

    dragStateRef.current = {
      pointerId: null,
      startX: 0,
      startRotation: rotation,
      dragging: false,
    }

    event.currentTarget.releasePointerCapture?.(event.pointerId)
    window.setTimeout(() => {
      setIsScrolling(false)
    }, 120)
  }

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Circular image gallery"
      className={cn(
        'relative flex h-full w-full items-center justify-center touch-pan-y select-none',
        className,
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ perspective: '2200px' }}
      {...props}
    >
      <div
        className="relative h-full w-full"
        style={{
          transform: `rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, index) => {
          const itemAngle = index * anglePerItem
          const opacity = getRelativeOpacity(itemAngle, rotation)

          return (
            <div
              key={`${item.photo.url}-${index}`}
              role="group"
              aria-label={item.common}
              className="absolute left-1/2 top-1/2"
              style={{
                width: 'clamp(9rem, min(22vw, 30svh), 16.5rem)',
                height: 'clamp(11rem, min(28vw, 38svh), 22rem)',
                transform: `translate3d(-50%, -50%, 0) rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                opacity,
                transformStyle: 'preserve-3d',
                transition: 'opacity 0.3s linear',
              }}
            >
              <div className="group relative h-full w-full overflow-hidden rounded-[1.25rem] border border-white/12 bg-[rgba(1,0,2,0.5)] shadow-[0_24px_80px_rgba(1,0,2,0.34)] backdrop-blur-md">
                <img
                  src={item.photo.url}
                  alt={item.photo.text}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  style={{ objectPosition: item.photo.pos || 'center' }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,0,2,0.1),rgba(1,0,2,0.85))]" />
                <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
                    Signature Treatment
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-[var(--color-heading)]">
                    {item.common}
                  </h3>
                  <p className="mt-2 text-sm italic text-white/75">{item.binomial}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})

export { CircularGallery }
