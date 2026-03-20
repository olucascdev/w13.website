import { SectionReveal } from '@/components/section-reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { siteContainerClass } from '@/data/site-config'
import { clients } from '@/data/site-content'

export function ClientsSection() {
  return (
    <section id="clientes" className="py-24 sm:py-28">
      <div className={siteContainerClass}>
        <SectionHeading
          title="Clientes atendidos"
          titleClassName="max-w-[14ch]"
        />

        <SectionReveal delay={0.08} className="marquee-mask mt-12 overflow-hidden">
          <div
            className="flex w-max animate-marquee gap-4 pr-4"
            style={{ animationDuration: '24s' }}
          >
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client}-${index}`}
                aria-hidden={index >= clients.length}
                className="profile-panel flex min-h-[124px] min-w-[190px] items-center justify-center px-6 text-center sm:min-w-[220px]"
              >
                <p className="text-base font-medium text-white">{client}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
