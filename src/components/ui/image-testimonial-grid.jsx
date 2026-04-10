import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const MotionDiv = motion.div

const MasonryGrid = React.forwardRef(
  ({ className, columns = 3, gap = 4, children, ...props }, ref) => {
    const style = {
      columnCount: columns,
      columnGap: `${gap * 0.25}rem`,
    }

    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
        },
      },
    }

    return (
      <div ref={ref} style={style} className={cn('w-full', className)} {...props}>
        {React.Children.map(children, (child) => (
          <MotionDiv
            className="mb-4 break-inside-avoid"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {child}
          </MotionDiv>
        ))}
      </div>
    )
  },
)

MasonryGrid.displayName = 'MasonryGrid'

export { MasonryGrid }
