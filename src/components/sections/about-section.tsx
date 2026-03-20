import { SectionReveal } from '@/components/section-reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { siteContainerClass } from '@/data/site-config'
import { highlights, principles } from '@/data/site-content'

export function AboutSection() {
  return (
    <section
      id="quem-somos"
      className="relative z-10 pb-24 pt-12 sm:pb-28 sm:pt-20 lg:pt-24"
    >
      <div
        className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,hsl(var(--background))_0%,rgba(6,9,19,0.82)_52%,rgba(6,9,19,0)_100%)] sm:h-32 lg:h-36"
        aria-hidden="true"
      />

      <div className={siteContainerClass}>
        <SectionHeading
          chip="Quem somos"
          title={
            <>
              <span className="block sm:whitespace-nowrap">
                Soluções integradas para operações
              </span>
              <span className="block sm:whitespace-nowrap">
                conectadas em todo o Brasil.
              </span>
            </>
          }
          className="space-y-5"
          titleClassName="max-w-[24ch] text-[clamp(1.9rem,5vw,4.2rem)]"
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {principles.map((item, index) => (
            <SectionReveal
              key={item.title}
              delay={index * 0.06}
              className="cut-panel p-6 sm:p-8"
            >
              <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/46">
                {item.eyebrow}
              </p>
              <h3 className="card-title mt-5 text-[1.45rem] font-medium text-[hsl(var(--ivory))] sm:text-[1.55rem]">
                {item.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/68 sm:text-base">
                {item.description}
              </p>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {highlights.map((item, index) => (
            <SectionReveal
              key={item.title}
              delay={0.12 + index * 0.06}
              className="stat-panel"
            >
              <p className="card-title text-[1.3rem] font-medium text-[hsl(var(--ivory))] sm:text-[1.4rem]">
                {item.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/62">
                {item.description}
              </p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
