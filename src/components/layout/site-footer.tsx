import { Mail, Phone } from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import {
  companyInfo,
  contactInfo,
  locationInfo,
  officeHours,
  siteContainerClass,
  supportHours,
} from '@/data/site-config'
import { navItems } from '@/data/site-content'

export function SiteFooter() {
  return (
    <footer id="contato" className="pb-10 pt-8 sm:pb-12">
      <div className={siteContainerClass}>
        <SectionReveal className="cut-panel overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="space-y-8">
            <div className="space-y-4 text-center">
              <h2 className="mx-auto font-display text-[clamp(2rem,7vw,4.1rem)] leading-[1.02] text-[hsl(var(--ivory))]">
                Vamos conversar
                <br />
                <span className="whitespace-nowrap">sobre o seu projeto.</span>
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="mx-auto w-full max-w-[320px] space-y-8 text-left">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-white">
                    Horário de funcionamento
                  </h3>
                  <div className="space-y-4 text-sm leading-7 text-white/78">
                    {officeHours.map((item) => (
                      <p key={item.days}>
                        {item.days}
                        <br />
                        {item.hours}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-white">
                    Atendimento suporte
                  </h3>
                  <p className="text-sm leading-7 text-white/78">
                    {supportHours.hours}
                    <br />
                    {supportHours.note}
                  </p>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[320px] space-y-8 text-left">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-white">Endereço sede</h3>
                  <p className="text-sm leading-7 text-white/78">
                    {locationInfo.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="space-y-4 text-left">
                  <h3 className="text-lg font-medium text-white">Contato</h3>
                  <div className="space-y-4 text-sm leading-7 text-white/78">
                    <a
                      href={contactInfo.phoneHref}
                      className="flex items-center gap-3 text-white transition-colors hover:text-accent"
                    >
                      <Phone className="size-4" />
                      <span>{contactInfo.phoneDisplay}</span>
                    </a>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-3 text-white transition-colors hover:text-accent"
                    >
                      <Mail className="size-4" />
                      <span>{contactInfo.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="cut-panel overflow-hidden p-3 sm:p-4">
              <iframe
                title="Mapa da sede da W13 Tecnologia"
                src={locationInfo.mapEmbedSrc}
                className="h-[360px] w-full rounded-[1.4rem] border-0 sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
              <img
                src="/logo_navbar.svg"
                alt="W13 Tecnologia"
                className="h-7 w-auto opacity-80 sm:h-8"
              />
              <div className="flex flex-wrap justify-center gap-3 text-sm text-white/52 lg:justify-start">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="https://recruiter.w13.com.br/cadastro-tecnico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Trabalhe conosco
                </a>
              </div>
            </div>

            <div className="text-sm text-white/46">
              © {companyInfo.copyrightYear} {companyInfo.name}. Todos os direitos
              reservados.
            </div>
          </div>
        </SectionReveal>
      </div>
    </footer>
  )
}
