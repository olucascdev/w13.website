import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

type CountUpProps = {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

const formatter = new Intl.NumberFormat('pt-BR')

export function CountUp({
  value,
  suffix = '',
  prefix = '',
  duration = 1400,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReducedMotion = useReducedMotion()
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      return
    }

    let frame = 0
    const startedAt = performance.now()

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrentValue(Math.round(value * eased))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [duration, isInView, prefersReducedMotion, value])

  const displayedValue = prefersReducedMotion ? value : currentValue

  return (
    <span
      ref={ref}
      className={cn(className)}
      aria-label={`${prefix}${formatter.format(value)}${suffix}`}
    >
      {prefix}
      {formatter.format(displayedValue)}
      {suffix}
    </span>
  )
}
