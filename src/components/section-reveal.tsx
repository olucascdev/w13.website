import { useRef } from 'react'
import {
  m,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from 'framer-motion'

import { cn } from '@/lib/utils'

type SectionRevealProps = HTMLMotionProps<'div'> & {
  delay?: number
}

export function SectionReveal({
  className,
  children,
  delay = 0,
  ...props
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.18 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <m.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
      animate={
        prefersReducedMotion || isInView ? { opacity: 1, y: 0 } : undefined
      }
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </m.div>
  )
}
