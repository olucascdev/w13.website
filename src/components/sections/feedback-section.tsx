import { m } from 'framer-motion'

import { SectionReveal } from '@/components/section-reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { siteContainerClass } from '@/data/site-config'
import { feedbackItems } from '@/data/site-content'

type FeedbackSectionProps = {
  prefersReducedMotion: boolean
}

export function FeedbackSection({
  prefersReducedMotion,
}: FeedbackSectionProps) {
  return (
    <section id="feedback" className="py-24 sm:py-28">
      <div className={siteContainerClass}>
        <SectionHeading title="Feedback" titleClassName="max-w-[12ch]" />

        <SectionReveal delay={0.08} className="marquee-mask mt-12 overflow-hidden">
          <div
            className="flex w-max animate-marquee gap-4 pr-4"
            style={{ animationDuration: '30s' }}
          >
            {[...feedbackItems, ...feedbackItems].map((item, index) => (
              <m.article
                key={`${item.author}-${index}`}
                whileHover={
                  prefersReducedMotion ? undefined : { y: -6, scale: 1.01 }
                }
                transition={{ duration: 0.22 }}
                aria-hidden={index >= feedbackItems.length}
                className="feedback-panel flex min-h-[260px] w-[18rem] min-w-[18rem] flex-col justify-between gap-8 sm:w-[21rem] sm:min-w-[21rem]"
              >
                <p className="text-[1.15rem] leading-8 text-[hsl(var(--ivory))]">
                  "{item.quote}"
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white">{item.author}</p>
                  <p className="text-sm text-white/56">{item.role}</p>
                </div>
              </m.article>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
