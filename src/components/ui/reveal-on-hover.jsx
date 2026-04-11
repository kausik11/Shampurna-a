import * as React from 'react'
import { cn } from '@/lib/utils'

const CardHoverRevealContext = React.createContext(null)

function useCardHoverRevealContext() {
  const context = React.useContext(CardHoverRevealContext)

  if (!context) {
    throw new Error(
      'useCardHoverRevealContext must be used within a CardHoverRevealProvider',
    )
  }

  return context
}

const CardHoverReveal = React.forwardRef(
  ({ className, onBlur, onFocus, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const handleMouseEnter = (event) => {
      setIsHovered(true)
      onMouseEnter?.(event)
    }

    const handleMouseLeave = (event) => {
      setIsHovered(false)
      onMouseLeave?.(event)
    }

    const handleFocus = (event) => {
      setIsHovered(true)
      onFocus?.(event)
    }

    const handleBlur = (event) => {
      setIsHovered(false)
      onBlur?.(event)
    }

    return (
      <CardHoverRevealContext.Provider value={{ isHovered, setIsHovered }}>
        <div
          ref={ref}
          className={cn('relative overflow-hidden', className)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        />
      </CardHoverRevealContext.Provider>
    )
  },
)
CardHoverReveal.displayName = 'CardHoverReveal'

const CardHoverRevealMain = React.forwardRef(
  (
    { className, initialScale = 1, hoverScale = 1.05, style, ...props },
    ref,
  ) => {
    const { isHovered } = useCardHoverRevealContext()

    return (
      <div
        ref={ref}
        className={cn('size-full transition-transform duration-300', className)}
        style={{
          transform: isHovered
            ? `scale(${hoverScale})`
            : `scale(${initialScale})`,
          ...style,
        }}
        {...props}
      />
    )
  },
)
CardHoverRevealMain.displayName = 'CardHoverRevealMain'

const CardHoverRevealContent = React.forwardRef(
  ({ className, style, ...props }, ref) => {
    const { isHovered } = useCardHoverRevealContext()

    return (
      <div
        ref={ref}
        className={cn(
          'absolute inset-[auto_1.5rem_1.5rem] p-6 backdrop-blur-lg transition-all duration-500 ease-in-out',
          className,
        )}
        style={{
          translate: isHovered ? '0%' : '0% 120%',
          opacity: isHovered ? 1 : 0,
          ...style,
        }}
        {...props}
      />
    )
  },
)
CardHoverRevealContent.displayName = 'CardHoverRevealContent'

export { CardHoverReveal, CardHoverRevealMain, CardHoverRevealContent }
