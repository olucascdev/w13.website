import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Cloud,
  Headset,
  Mail,
  MessageCircle,
  Menu,
  Phone,
  Server,
  ShieldCheck,
  Wifi,
  X,
  type LucideIcon,
} from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import { CountUp } from '@/components/count-up'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SectionId =
  | 'home'
  | 'quem-somos'
  | 'servicos'
  | 'projetos'
  | 'clientes'
  | 'feedback'
  | 'contato'

type ServiceItem = {
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
}

type ProjectItem = {
  category: string
  title: string
  description: string
  tags: string[]
  image: string
  alt: string
  imageClassName?: string
}

type PrincipleItem = {
  eyebrow: string
  title: string
  description: string
}

type HighlightItem = {
  title: string
  description: string
}

type MetricItem = {
  value: number
  suffix?: string
  label: string
  icon: string
  iconAlt: string
}

type FeedbackItem = {
  quote: string
  author: string
  role: string
}

const sectionIds: SectionId[] = [
  'home',
  'quem-somos',
  'servicos',
  'projetos',
  'clientes',
  'feedback',
  'contato',
]

const navItems: { id: Exclude<SectionId, 'home'>; label: string }[] = [
  { id: 'quem-somos', label: 'Quem somos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'contato', label: 'Contato' },
]

const principles: PrincipleItem[] = [
  {
    eyebrow: 'Nossa missão',
    title: 'Soluções abrangentes, com governança e entrega consistente.',
    description:
      'Oferecer soluções abrangentes em comunicações, incluindo internet via satélite, redes de computadores, links 4G e comunicação GPRS, superando as expectativas de nossos parceiros e clientes por meio de inovação tecnológica e governança de processos.',
  },
  {
    eyebrow: 'Nossos valores',
    title: 'Tecnologia com responsabilidade, ética e sustentabilidade.',
    description:
      'Acreditamos que tecnologia deve caminhar lado a lado com responsabilidade. Por isso, atuamos de forma sustentável e ética em todas as nossas operações, minimizando impactos ambientais e contribuindo ativamente para o desenvolvimento das comunidades onde estamos presentes.',
  },
  {
    eyebrow: 'Nosso propósito',
    title: 'Levar comunicação rentável e inovadora para qualquer lugar do Brasil.',
    description:
      'Impulsionar o crescimento e o sucesso dos nossos clientes com soluções de comunicação completas, rentáveis e inovadoras, em qualquer tecnologia e em qualquer lugar do Brasil.',
  },
]

const highlights: HighlightItem[] = [
  {
    title: 'Abrangência nacional',
    description:
      'Presença em todas as capitais e principais cidades do Brasil.',
  },
  {
    title: '5 regiões atendidas',
    description: 'Norte, Nordeste, Sudeste, Centro-Oeste e Sul.',
  },
  {
    title: 'Bases próprias e rede de parceiros',
    description:
      'Estrutura para atender qualquer demanda, em qualquer localidade.',
  },
]

const projectMetrics: MetricItem[] = [
  {
    value: 261,
    suffix: '+',
    label: 'Projetos concluídos',
    icon: '/metric-projects.png',
    iconAlt: 'Ícone de troféu representando projetos concluídos',
  },
  {
    value: 259,
    suffix: '+',
    label: 'Atendimentos executados',
    icon: '/metric-support.png',
    iconAlt: 'Ícone de headset representando atendimentos executados',
  },
  {
    value: 2354,
    suffix: '+',
    label: 'Clientes atendidos',
    icon: '/metric-clients.png',
    iconAlt: 'Ícone de grupo de pessoas representando clientes atendidos',
  },
]

const services: ServiceItem[] = [
  {
    eyebrow: 'Continuidade operacional',
    title: 'Manutenção de TI e Telecom',
    description:
      'Manutenção preventiva e corretiva de equipamentos de tecnologia da informação e telecomunicações, garantindo a continuidade operacional da sua infraestrutura.',
    icon: Server,
  },
  {
    eyebrow: 'Cobertura dedicada',
    title: 'Implantação de 4G Privado (LTE)',
    description:
      'Implementação e manutenção de redes 4G privadas para ambientes corporativos, industriais e de missão crítica, com cobertura, segurança e performance dedicadas.',
    icon: Wifi,
  },
  {
    eyebrow: 'Conectividade remota',
    title: 'Internet via Satélite (VSAT)',
    description:
      'Implantação de sistemas satelitais VSAT para conectividade em regiões remotas ou de difícil acesso, onde outras tecnologias não chegam.',
    icon: Cloud,
  },
  {
    eyebrow: 'Infraestrutura física',
    title: 'Cabeamento Estruturado',
    description:
      'Projeto e execução de infraestrutura de cabeamento estruturado para redes corporativas, do planejamento à certificação, com padrões internacionais de qualidade.',
    icon: BarChart3,
  },
  {
    eyebrow: 'Projetos completos',
    title: 'Projetos de Infraestrutura Telecom',
    description:
      'Desenvolvimento e execução de projetos completos de infraestrutura em telecomunicações, incluindo montagem de rack, site survey, testes com teleportos e migrações de plataformas.',
    icon: ShieldCheck,
  },
  {
    eyebrow: 'Gestão end-to-end',
    title: 'Outsourcing de TI',
    description:
      'Gestão completa da infraestrutura de tecnologia da sua empresa, incluindo implantação de sistemas, treinamento de equipes, suporte contínuo e gerenciamento de roteadores e redes.',
    icon: Headset,
  },
]

const projects: ProjectItem[] = [
  {
    category: 'Telecomunicações',
    title: 'Implantação de Rede VSAT em Área Remota',
    description:
      'Implantação de sistema de internet via satélite para operação em região de difícil acesso, garantindo conectividade estável e contínua para equipes de campo com zero downtime operacional.',
    tags: ['VSAT', 'Satélite', 'Conectividade', 'Infraestrutura'],
    image: '/media/projects/project-vsat.jpg',
    alt: 'Foto de operação remota com infraestrutura de conectividade via satélite.',
    imageClassName: 'object-center object-[50%_65%]',
  },
  {
    category: '4G Privado',
    title: 'Rede LTE Privada para Ambiente Industrial',
    description:
      'Implementação de rede 4G privada, baseada em LTE, em ambiente industrial, com cobertura dedicada, baixa latência e segurança de dados para operações críticas e contínuas.',
    tags: ['LTE', '4G Privado', 'Redes Corporativas'],
    image: '/media/projects/project-lte.jpeg',
    alt: 'Foto de infraestrutura de telecomunicações para rede LTE privada.',
    imageClassName: 'object-center object-[50%_8%]',
  },
  {
    category: 'Infraestrutura',
    title: 'Projeto de Cabeamento Estruturado Multisede',
    description:
      'Planejamento, execução e certificação de infraestrutura de cabeamento estruturado para empresa com múltiplas unidades, integrando todas as sedes em uma única rede corporativa de alto desempenho.',
    tags: ['Cabeamento', 'Site Survey', 'Rack', 'Certificação'],
    image: '/media/projects/project-cabling.png',
    alt: 'Foto de instalação de cabeamento estruturado e infraestrutura de rede.',
    imageClassName: 'object-center object-[50%_8%]',
  },
  {
    category: 'Outsourcing',
    title: 'Gestão Terceirizada de TI para Grupo Empresarial',
    description:
      'Outsourcing completo da infraestrutura de TI com suporte técnico dedicado, gerenciamento de roteadores, implantação de sistemas e treinamento das equipes internas.',
    tags: ['Outsourcing', 'Suporte TI', 'Gestão de Infraestrutura'],
    image: '/media/projects/project-outsourcing.jpg',
    alt: 'Foto de ambiente corporativo representando gestão terceirizada de TI.',
    imageClassName: 'object-center object-[50%_8%]',
  },
]

const clients = [
  'Global Eagle',
  'Hughes',
  'Kroton',
  'Level 3 Communications',
  'CenturyLink',
  'Cirion',
  'Embratel',
  'NTT / Cisco',
  'EBS Perfurações',
  'Perbras',
]

const feedbackItems: FeedbackItem[] = [
  {
    quote:
      'A W13 organizou a operação e trouxe previsibilidade onde antes havia urgência o tempo todo.',
    author: 'Diretoria de Operações',
    role: 'Grupo logístico multisede',
  },
  {
    quote:
      'O diferencial foi unir implantação e sustentação no mesmo raciocínio técnico. Isso reduziu muito o retrabalho.',
    author: 'Liderança de Infraestrutura',
    role: 'Rede corporativa em expansão',
  },
  {
    quote:
      'Não foi uma entrega de prateleira. O time entendeu o contexto, ajustou o plano e executou com ritmo.',
    author: 'Gestão de Tecnologia',
    role: 'Operação com alta criticidade',
  },
]

const containerClass = 'mx-auto w-[min(1200px,calc(100%-2rem))]'

function App() {
  const prefersReducedMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  const [isHeroAvailable, setIsHeroAvailable] = useState(true)

  useEffect(() => {
    const handleScroll = () => setIsHeaderScrolled(window.scrollY > 32)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) => second.intersectionRatio - first.intersectionRatio,
          )

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id as SectionId)
        }
      },
      {
        threshold: [0.18, 0.35, 0.52],
        rootMargin: '-26% 0px -48% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleNavigation = () => setIsMobileMenuOpen(false)

  return (
    <LazyMotion features={domAnimation}>
      <div className="site-shell">
        <header
          className={cn(
            'fixed inset-x-0 top-0 z-50 transition-all duration-300',
            isHeaderScrolled ? 'py-2' : 'py-3',
          )}
        >
          <div
            className={cn(
              `${containerClass} nav-shell liquid-glass pl-6 sm:pl-10`,
              isHeaderScrolled
                ? 'border-transparent bg-black/56'
                : 'border-transparent bg-black/36',
            )}
          >
            <a
              href="#home"
              className="shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src="/logo_navbar.svg"
                alt="W13 Tecnologia"
                className="mr-10 h-6 w-auto sm:h-7"
              />
            </a>

            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.id

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      'nav-link',
                      isActive ? 'text-white' : 'text-white/64',
                    )}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href="mailto:contato@w13.com.br"
                className="text-[0.66rem] uppercase tracking-[0.2em] text-white/64 transition-colors hover:text-white"
              >
                contato@w13.com.br
              </a>
              <Button
                asChild
                variant="glass"
                size="default"
                className="border-0 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-white shadow-none"
              >
                <a href="#contato">
                  Fale com nossa equipe
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              className="inline-flex size-9 items-center justify-center rounded-full border-0 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen ? (
              <m.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className={`${containerClass} mt-3 lg:hidden`}
              >
                <div className="liquid-glass rounded-[1.35rem] border-0 p-3">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-[1.1rem] px-4 py-3 text-sm text-white/84 transition-colors hover:bg-white/[0.08]"
                      onClick={handleNavigation}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button
                    asChild
                    variant="glass"
                    size="lg"
                    className="mt-2 justify-center border-0 text-[0.68rem] uppercase tracking-[0.2em] text-white shadow-none"
                  >
                    <a href="#contato" onClick={handleNavigation}>
                      Fale com nossa equipe
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </div>
              </m.div>
            ) : null}
          </AnimatePresence>
        </header>

        <main>
          <section
            id="home"
            className="relative flex min-h-screen flex-col overflow-hidden"
          >
            <h2 className="sr-only">
              Home da W13 Tecnologia com outsourcing de TI e telecomunicações
            </h2>

            <div
              className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(36,84,185,0.34),transparent_42%),linear-gradient(180deg,rgba(8,12,24,0.76)_0%,rgba(6,9,19,0.52)_38%,rgba(6,9,19,0.96)_100%)]"
              aria-hidden="true"
            />

            {!prefersReducedMotion && isHeroAvailable ? (
              <img
                src="/hero.gif"
                alt="Visual animado de conectividade global e infraestrutura digital"
                aria-hidden="true"
                loading="eager"
                decoding="async"
                className={cn(
                  'absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700',
                  isHeroLoaded ? 'opacity-60' : 'opacity-0',
                )}
                onLoad={() => setIsHeroLoaded(true)}
                onError={() => {
                  setIsHeroAvailable(false)
                  setIsHeroLoaded(false)
                }}
              />
            ) : null}

            <div
              className="absolute bottom-0 right-0 z-0 h-28 w-36 bg-[radial-gradient(circle_at_bottom_right,rgba(6,9,19,0.98)_0%,rgba(6,9,19,0.9)_34%,rgba(6,9,19,0.55)_58%,rgba(6,9,19,0)_82%)] blur-xl sm:h-36 sm:w-48 lg:h-44 lg:w-64"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 z-0 h-24 bg-[linear-gradient(180deg,rgba(6,9,19,0)_0%,rgba(6,9,19,0.18)_26%,rgba(6,9,19,0.68)_78%,rgba(6,9,19,0.92)_100%)]"
              aria-hidden="true"
            />

            <div
              className={cn(
                containerClass,
                'relative z-10 flex flex-1 flex-col items-center justify-center px-0 pb-20 pt-32 text-center sm:pb-28 sm:pt-36 lg:pt-40',
              )}
            >
              <SectionReveal
                className="max-w-[20rem] sm:max-w-3xl xl:max-w-5xl"
              >
                <h1 className="font-display text-[2.85rem] leading-[0.94] font-medium tracking-[-0.05em] text-[hsl(var(--ivory))] sm:text-6xl lg:text-7xl xl:text-[6.35rem]">
                  Tecnologia que <span className="text-accent">move</span> o seu
                  negócio.
                </h1>
              </SectionReveal>

              <SectionReveal delay={0.08} className="mt-6 max-w-[35rem]">
                <p className="text-[1rem] leading-relaxed text-white/76 sm:text-[1.05rem] md:text-lg">
                  Especialistas em outsourcing de tecnologia e
                  telecomunicações. Soluções integradas para empresas que
                  precisam de escala, agilidade e resultado real.
                </p>
              </SectionReveal>

              <SectionReveal
                delay={0.16}
                className="mt-10 flex w-full max-w-[300px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4"
              >
                <Button asChild size="lg" className="w-full justify-center sm:w-auto">
                  <a href="#contato">
                    Fale com nossa equipe
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="glass"
                  size="lg"
                  className="w-full justify-center border border-white/12 text-white sm:w-auto"
                >
                  <a href="#servicos">Conhecer serviços</a>
                </Button>
              </SectionReveal>
            </div>
          </section>

          <section
            id="quem-somos"
            className="relative z-10 pb-24 pt-12 sm:pb-28 sm:pt-20 lg:pt-24"
          >
            <div
              className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,hsl(var(--background))_0%,rgba(6,9,19,0.82)_52%,rgba(6,9,19,0)_100%)] sm:h-32 lg:h-36"
              aria-hidden="true"
            />

            <div className={containerClass}>
              <SectionReveal className="space-y-5 text-center">
                <span className="section-chip">Quem somos</span>
                <h2 className="section-title mx-auto max-w-[24ch] text-[clamp(1.9rem,5vw,4.2rem)]">
                  <span className="block sm:whitespace-nowrap">
                    Soluções integradas para operações
                  </span>
                  <span className="block sm:whitespace-nowrap">
                    conectadas em todo o Brasil.
                  </span>
                </h2>
              </SectionReveal>

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

          <section id="servicos" className="py-24 sm:py-28">
            <div className={containerClass}>
              <SectionReveal className="space-y-5 text-center">
                <span className="section-chip">O que fazemos</span>
                <h2 className="section-title mx-auto max-w-[24ch] text-[clamp(1.9rem,5vw,4.2rem)]">
                  <span className="block sm:whitespace-nowrap">
                    Soluções completas em
                  </span>
                  <span className="block sm:whitespace-nowrap">
                    tecnologia e telecomunicações.
                  </span>
                </h2>
              </SectionReveal>

              <div className="mt-12 grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <SectionReveal className="cut-panel overflow-hidden p-4 sm:p-5">
                  <div className="space-y-5">
                    <img
                      src="/media/services/service-industrial.png"
                      alt="Foto aérea de operação industrial com infraestrutura de tecnologia e telecomunicações"
                      className="h-[280px] w-full rounded-[1.55rem] border border-white/10 object-cover bg-white/[0.03] sm:h-[320px]"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.04] p-5">
                        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/46">
                          Atuação nacional
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/68">
                          Estrutura para implantar, sustentar e escalar projetos
                          em diferentes estados e contextos operacionais.
                        </p>
                      </div>
                      <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.04] p-5">
                        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/46">
                          Entrega end-to-end
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/68">
                          Da infraestrutura física ao suporte contínuo, com uma
                          mesma linha técnica e governança de processos.
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

          <section id="projetos" className="py-24 sm:py-28">
            <div className={containerClass}>
              <SectionReveal className="space-y-5 text-center">
                <span className="section-chip">Casos de Sucesso</span>
                <h2 className="section-title mx-auto max-w-[20ch] text-[clamp(1.9rem,5vw,4.2rem)]">
                  <span className="block sm:whitespace-nowrap">
                    Projetos que transformaram
                  </span>
                  <span className="block sm:whitespace-nowrap">operações.</span>
                </h2>
              </SectionReveal>

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

          <section id="clientes" className="py-24 sm:py-28">
            <div className={containerClass}>
              <SectionReveal className="text-center">
                <h2 className="section-title mx-auto max-w-[14ch]">
                  Clientes atendidos
                </h2>
              </SectionReveal>

              <SectionReveal delay={0.08} className="marquee-mask mt-12 overflow-hidden">
                <div
                  className="flex w-max gap-4 animate-marquee pr-4"
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

          <section id="feedback" className="py-24 sm:py-28">
            <div className={containerClass}>
              <SectionReveal className="text-center">
                <h2 className="section-title mx-auto max-w-[12ch]">
                  Feedback
                </h2>
              </SectionReveal>

              <SectionReveal delay={0.08} className="marquee-mask mt-12 overflow-hidden">
                <div
                  className="flex w-max gap-4 animate-marquee pr-4"
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
        </main>

        <footer id="contato" className="pb-10 pt-8 sm:pb-12">
          <div className={containerClass}>
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
                        <p>
                          Segunda a sexta
                          <br />
                          9:00 às 18:00
                        </p>
                        <p>
                          Sábados
                          <br />
                          09:00 às 13:00
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-medium text-white">
                        Atendimento suporte
                      </h3>
                      <p className="text-sm leading-7 text-white/78">
                        08:00 às 22:00
                        <br />
                        Pelo telefone suporte
                      </p>
                    </div>
                  </div>

                  <div className="mx-auto w-full max-w-[320px] space-y-8 text-left">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium text-white">
                        Endereço sede
                      </h3>
                      <p className="text-sm leading-7 text-white/78">
                        Avenida Jerônimo Monteiro, 1000
                        <br />
                        18º Andar - 18º Andar
                        <br />
                        Edifício Trade Center
                        <br />
                        Centro, Vitória - ES
                        <br />
                        CEP 29010-935
                      </p>
                    </div>

                    <div className="space-y-4 text-left">
                      <h3 className="text-lg font-medium text-white">Contato</h3>
                      <div className="space-y-4 text-sm leading-7 text-white/78">
                        <a
                          href="tel:+5527998502376"
                          className="flex items-center gap-3 text-white transition-colors hover:text-accent"
                        >
                          <Phone className="size-4" />
                          <span>(27) 998502376</span>
                        </a>
                        <a
                          href="mailto:contato@w13.com.br"
                          className="flex items-center gap-3 text-white transition-colors hover:text-accent"
                        >
                          <Mail className="size-4" />
                          <span>contato@w13.com.br</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cut-panel overflow-hidden p-3 sm:p-4">
                  <iframe
                    title="Mapa da sede da W13 Tecnologia"
                    src="https://www.google.com/maps?q=Avenida%20Jer%C3%B4nimo%20Monteiro%2C%201000%2C%20Vit%C3%B3ria%20ES&z=16&output=embed"
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
                  </div>
                </div>

                <div className="text-sm text-white/46">
                  © 2026 W13 Tecnologia. Todos os direitos reservados.
                </div>
              </div>
            </SectionReveal>
          </div>
        </footer>

        <a
          href="https://wa.me/5527998502376"
          target="_blank"
          rel="noreferrer"
          aria-label="Conversar no WhatsApp com a W13 Tecnologia"
          className="fixed bottom-4 right-4 z-[60] inline-flex min-h-14 min-w-14 items-center justify-center rounded-full bg-[#25D366] px-4 text-white shadow-[0_18px_40px_rgba(37,211,102,0.32)] transition-transform duration-200 hover:scale-[1.04] hover:bg-[#20bd5c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6"
        >
          <MessageCircle className="size-6" />
        </a>
      </div>
    </LazyMotion>
  )
}

export default App
