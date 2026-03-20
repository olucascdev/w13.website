import { m } from 'framer-motion'

import { CountUp } from '@/components/count-up'
import { SectionReveal } from '@/components/section-reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { siteContainerClass } from '@/data/site-config'
import { projectMetrics, projects } from '@/data/site-content'
import { cn } from '@/lib/utils'

type ProjectsSectionProps = {
  prefersReducedMotion: boolean
}

export function ProjectsSection({
  prefersReducedMotion,
}: ProjectsSectionProps) {
  return (
    <section id="projetos" className="py-24 sm:py-28">
      <div className={siteContainerClass}>
        <SectionHeading
          chip="Casos de Sucesso"
          title={
            <>
              <span className="block sm:whitespace-nowrap">
                Projetos que transformaram
              </span>
              <span className="block sm:whitespace-nowrap">operações.</span>
            </>
          }
          className="space-y-5"
          titleClassName="max-w-[20ch] text-[clamp(1.9rem,5vw,4.2rem)]"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <SectionReveal
              key={project.title}
              delay={index * 0.06}
              className="project-card"
            >
              <m.article
                whileHover={
                  prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }
                }
                transition={{ duration: 0.24 }}
                className="flex h-full flex-col gap-6"
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  className={cn(
                    'h-56 w-full rounded-[1.55rem] border border-white/10 object-cover',
                    project.imageClassName,
                  )}
                />

                <div className="space-y-4">
                  <div className="project-card__meta">
                    <span>{project.category}</span>
                  </div>
                  <h3 className="card-title text-[1.5rem] font-medium text-[hsl(var(--ivory))] sm:text-[1.65rem]">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-7 text-white/72">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </m.article>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectMetrics.map((metric, index) => (
            <SectionReveal
              key={metric.label}
              delay={0.1 + index * 0.06}
              className="stat-panel text-center"
            >
              <div className="flex items-center justify-center gap-4">
                <img
                  src={metric.icon}
                  alt={metric.iconAlt}
                  className="h-14 w-14 rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
                />
                <CountUp
                  value={metric.value}
                  suffix={metric.suffix}
                  className="stat-panel__value"
                />
              </div>
              <h3 className="card-title mt-5 text-lg font-medium text-white sm:text-xl">
                {metric.label}
              </h3>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
