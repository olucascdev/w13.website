import type { ReactNode } from 'react'

import { SectionReveal } from '@/components/section-reveal'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  title: ReactNode
  chip?: string
  className?: string
  titleClassName?: string
}

export function SectionHeading({
  title,
  chip,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <SectionReveal className={cn('text-center', className)}>
      {chip ? <span className="section-chip">{chip}</span> : null}
      <h2 className={cn('section-title mx-auto', titleClassName)}>{title}</h2>
    </SectionReveal>
  )
}
