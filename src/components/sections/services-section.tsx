import { m } from 'framer-motion'

import { SectionReveal } from '@/components/section-reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { siteContainerClass } from '@/data/site-config'
import { services } from '@/data/site-content'

type ServicesSectionProps = {
  prefersReducedMotion: boolean
}

export function ServicesSection({
  prefersReducedMotion,
}: ServicesSectionProps) {
  return (
    <section id="servicos" className="py-24 sm:py-28">
      <div className={siteContainerClass}>
        <SectionHeading
          chip="O que fazemos"
          title={
            <>
              <span className="block sm:whitespace-nowrap">
                Soluções completas em
              </span>
              <span className="block sm:whitespace-nowrap">
                tecnologia e telecomunicações.
              </span>
            </>
          }
          className="space-y-5"
          titleClassName="max-w-[24ch] text-[clamp(1.9rem,5vw,4.2rem)]"
        />

        <div className="mt-12 grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <SectionReveal className="cut-panel overflow-hidden p-4 sm:p-5">
            <div className="space-y-5">
              <img
                src="/media/services/service-industrial.png"
                alt="Foto aérea de operação industrial com infraestrutura de tecnologia e telecomunicações"
                className="h-[280px] w-full rounded-[1.55rem] border border-white/10 bg-white/[0.03] object-cover sm:h-[320px]"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.04] p-5">
                  <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/46">
                    Atuação nacional
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    Estrutura para implantar, sustentar e escalar projetos em
                    diferentes estados e contextos operacionais.
                  </p>
                </div>
                <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.04] p-5">
                  <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/46">
                    Entrega end-to-end
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    Da infraestrutura física ao suporte contínuo, com uma mesma
                    linha técnica e governança de processos.
                  </p>
                </div>
              </div>
              <div className="rounded-[1.55rem] border border-white/10 bg-white/[0.03] p-3 sm:p-4">
                <img
                  src="/media/services/service-satellite.png"
                  alt="Foto de antena satelital usada em soluções de conectividade remota"
                  className="h-[360px] w-full rounded-[1.2rem] object-cover sm:h-[460px]"
                />
              </div>
            </div>
          </SectionReveal>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon

              return (
                <SectionReveal
                  key={service.title}
                  delay={index * 0.05}
                  className="cut-panel h-full p-6 sm:p-7"
                >
                  <m.article
                    whileHover={
                      prefersReducedMotion ? undefined : { y: -6, scale: 1.01 }
                    }
                    transition={{ duration: 0.22 }}
                    className="flex h-full flex-col gap-6"
                  >
                    <div className="service-icon">
                      <Icon className="size-5" />
                    </div>
                    <div className="space-y-3">
                      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/44">
                        {service.eyebrow}
                      </p>
                      <h3 className="card-title text-[1.15rem] font-medium text-white sm:text-[1.2rem]">
                        {service.title}
                      </h3>
                      <p className="text-sm leading-7 text-white/64">
                        {service.description}
                      </p>
                    </div>
                  </m.article>
                </SectionReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
