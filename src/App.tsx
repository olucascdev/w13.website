import { startTransition, useEffect, useState } from 'react'
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
  Globe,
  Headset,
  Instagram,
  Mail,
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
  | 'participacao'
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

type ParticipationItem = {
  id: 'estrategia' | 'implantacao' | 'sustentacao'
  label: string
  eyebrow: string
  title: string
  description: string
  bullets: string[]
}

type MetricItem = {
  value: number
  suffix?: string
  label: string
  description: string
}

type FeedbackItem = {
  quote: string
  author: string
  role: string
}

type ContactItem = {
  label: string
  value: string
  href: string
  icon: LucideIcon
}

const sectionIds: SectionId[] = [
  'home',
  'quem-somos',
  'servicos',
  'projetos',
  'participacao',
  'clientes',
  'feedback',
  'contato',
]

const navItems: { id: Exclude<SectionId, 'home'>; label: string }[] = [
  { id: 'quem-somos', label: 'Quem somos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'participacao', label: 'Participação' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'feedback', label: 'Feedback' },
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

const participationItems: ParticipationItem[] = [
  {
    id: 'estrategia',
    label: 'Estratégia',
    eyebrow: 'Participação em projetos',
    title: 'Entramos cedo para reduzir ruído, dependências e retrabalho.',
    description:
      'Antes da execução, organizamos escopo, prioridade, risco e ritmo de implantação para o projeto nascer orientado por viabilidade técnica e operacional.',
    bullets: [
      'Diagnóstico técnico e leitura de maturidade operacional.',
      'Desenho de arquitetura, cronograma e marcos de entrega.',
      'Mapeamento de dependências, janelas e criticidades do negócio.',
    ],
  },
  {
    id: 'implantacao',
    label: 'Implantação',
    eyebrow: 'Participação em projetos',
    title: 'Executamos rollout, ativação e entrega com disciplina operacional.',
    description:
      'Coordenamos frentes técnicas, times de campo e validação para que a implantação aconteça com visibilidade, controle e documentação adequada.',
    bullets: [
      'Execução em campo, checklist técnico e aceite estruturado.',
      'Acompanhamento de milestones, tratativa de bloqueios e comunicação clara.',
      'Documentação do que foi entregue para facilitar sustentação e expansão.',
    ],
  },
  {
    id: 'sustentacao',
    label: 'Sustentação',
    eyebrow: 'Participação em projetos',
    title: 'Seguimos no pós-go-live para estabilizar, atender e evoluir.',
    description:
      'A W13 permanece na camada operacional para manter SLA, absorver incidentes e transformar aprendizado em evolução contínua da operação.',
    bullets: [
      'Monitoramento, atendimento e gestão de incidentes com critério técnico.',
      'Ajustes finos, manutenção preventiva e backlog evolutivo.',
      'Visibilidade de performance para decisão rápida e continuidade operacional.',
    ],
  },
]

const projectMetrics: MetricItem[] = [
  {
    value: 261,
    label: 'Projetos concluídos',
    description:
      'Entregas fechadas com método, governança técnica e transição organizada.',
  },
  {
    value: 259,
    label: 'Atendimentos executados',
    description:
      'Chamados, visitas técnicas e frentes operacionais conduzidas com previsibilidade.',
  },
  {
    value: 2354,
    suffix: '+',
    label: 'Clientes atendidos',
    description:
      'Operações apoiadas em conectividade, sustentação, telecom e outsourcing.',
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
    image: '/project-vsat.svg',
    alt: 'Ilustração de rede VSAT com antena satelital e conectividade remota.',
  },
  {
    category: '4G Privado',
    title: 'Rede LTE Privada para Ambiente Industrial',
    description:
      'Implementação de rede 4G privada, baseada em LTE, em ambiente industrial, com cobertura dedicada, baixa latência e segurança de dados para operações críticas e contínuas.',
    tags: ['LTE', '4G Privado', 'Redes Corporativas'],
    image: '/project-lte.svg',
    alt: 'Ilustração de torre LTE privada em ambiente industrial.',
  },
  {
    category: 'Infraestrutura',
    title: 'Projeto de Cabeamento Estruturado Multisede',
    description:
      'Planejamento, execução e certificação de infraestrutura de cabeamento estruturado para empresa com múltiplas unidades, integrando todas as sedes em uma única rede corporativa de alto desempenho.',
    tags: ['Cabeamento', 'Site Survey', 'Rack', 'Certificação'],
    image: '/project-cabling.svg',
    alt: 'Ilustração de racks, cabos e infraestrutura de rede multisede.',
  },
  {
    category: 'Outsourcing',
    title: 'Gestão Terceirizada de TI para Grupo Empresarial',
    description:
      'Outsourcing completo da infraestrutura de TI com suporte técnico dedicado, gerenciamento de roteadores, implantação de sistemas e treinamento das equipes internas.',
    tags: ['Outsourcing', 'Suporte TI', 'Gestão de Infraestrutura'],
    image: '/project-outsourcing.svg',
    alt: 'Ilustração de operação de TI terceirizada com painéis e monitoramento.',
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

const contactItems: ContactItem[] = [
  {
    label: 'Telefone e WhatsApp',
    value: '(89) 99979-5973',
    href: 'https://wa.me/5589999795973',
    icon: Phone,
  },
  {
    label: 'E-mail',
    value: 'contato@w13.com.br',
    href: 'mailto:contato@w13.com.br',
    icon: Mail,
  },
  {
    label: 'Instagram',
    value: '@w13tecnologia',
    href: 'https://www.instagram.com/w13tecnologia',
    icon: Instagram,
  },
  {
    label: 'Site',
    value: 'www.w13.com.br',
    href: 'https://www.w13.com.br',
    icon: Globe,
  },
]

const containerClass = 'mx-auto w-[min(1200px,calc(100%-2rem))]'
const formFieldClassName =
  'w-full rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/38 focus:border-white/20 focus:bg-white/[0.06]'

function App() {
  const prefersReducedMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  const [isHeroAvailable, setIsHeroAvailable] = useState(true)
  const [activeParticipation, setActiveParticipation] =
    useState<ParticipationItem['id']>('estrategia')

  const activeParticipationItem =
    participationItems.find((item) => item.id === activeParticipation) ??
    participationItems[0]

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

            <div className="hero-grid absolute inset-0 z-0" aria-hidden="true" />

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
              <SectionReveal className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
                <div className="space-y-5">
                  <span className="section-chip">Quem somos</span>
                  <h2 className="section-title max-w-[12ch]">
                    Soluções integradas para operações conectadas em todo o
                    Brasil.
                  </h2>
                </div>
                <p className="section-copy max-w-[40rem]">
                  A W13 Tecnologia é uma empresa especializada em soluções
                  integradas de comunicações, tecnologia e telecomunicações.
                  Nossa atuação vai desde a implantação de redes e sistemas até
                  a gestão completa de infraestrutura, sempre com foco em
                  inovação, excelência e resultados concretos para nossos
                  clientes.
                </p>
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
                    <h3 className="mt-5 text-[1.6rem] font-medium leading-tight text-[hsl(var(--ivory))]">
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
                    <p className="text-[1.45rem] font-medium leading-tight text-[hsl(var(--ivory))]">
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
              <SectionReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-5">
                  <span className="section-chip">O que fazemos</span>
                  <h2 className="section-title max-w-[12ch]">
                    Soluções completas em tecnologia e telecomunicações.
                  </h2>
                </div>
                <p className="section-copy max-w-[40rem]">
                  Com expertise técnica e atuação nacional, entregamos serviços
                  end-to-end para empresas que precisam de infraestrutura
                  confiável, conectividade de alto desempenho e suporte
                  especializado.
                </p>
              </SectionReveal>

              <div className="mt-12 grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <SectionReveal className="cut-panel overflow-hidden p-4 sm:p-5">
                  <div className="space-y-5">
                    <img
                      src="/services-showcase.svg"
                      alt="Ilustração de operação integrada com racks, painéis e conectividade de telecomunicações"
                      className="w-full rounded-[1.55rem] border border-white/10 bg-white/[0.03]"
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
                            <h3 className="text-[1.25rem] font-medium text-white">
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
              <SectionReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-5">
                  <span className="section-chip">Casos de Sucesso</span>
                  <h2 className="section-title max-w-[12ch]">
                    Projetos que transformaram operações.
                  </h2>
                </div>
                <p className="section-copy max-w-[42rem]">
                  Da implantação à manutenção, entregamos projetos de alto
                  impacto para empresas de diferentes setores em todo o Brasil.
                  Cada projeto é uma prova do nosso compromisso com qualidade,
                  prazo e resultado.
                </p>
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
                        className="h-56 w-full rounded-[1.55rem] border border-white/10 object-cover"
                      />

                      <div className="space-y-4">
                        <div className="project-card__meta">
                          <span>{project.category}</span>
                        </div>
                        <h3 className="text-[1.75rem] font-medium leading-tight text-[hsl(var(--ivory))]">
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
            </div>
          </section>

          <section id="participacao" className="py-24 sm:py-28">
            <div className={containerClass}>
              <SectionReveal className="space-y-5">
                <span className="section-chip">Participação em projetos</span>
                <h2 className="section-title max-w-[13ch]">
                  Atuamos em pontos diferentes do projeto sem perder a mesma
                  linha de raciocínio.
                </h2>
                <p className="section-copy max-w-[42rem]">
                  A W13 pode entrar no desenho, acelerar a implantação ou
                  assumir a sustentação. O valor está em manter critério,
                  contexto e ritmo em cada etapa.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.08} className="mt-10 overflow-x-auto pb-2">
                <div className="flex min-w-max gap-3">
                  {participationItems.map((item) => {
                    const isActive = item.id === activeParticipation

                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`panel-${item.id}`}
                        className={cn(
                          'relative overflow-hidden rounded-full border px-5 py-3 text-sm transition-colors',
                          isActive
                            ? 'border-transparent text-[hsl(var(--ivory))]'
                            : 'border-white/12 bg-white/[0.03] text-white/62 hover:text-white',
                        )}
                        onClick={() =>
                          startTransition(() => setActiveParticipation(item.id))
                        }
                      >
                        {isActive ? (
                          <m.span
                            layoutId="participation-pill"
                            className="absolute inset-0 rounded-full bg-[hsl(var(--accent))]"
                            transition={{
                              type: 'spring',
                              stiffness: 240,
                              damping: 24,
                            }}
                          />
                        ) : null}
                        <span className="relative z-10">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </SectionReveal>

              <AnimatePresence mode="wait">
                <m.div
                  key={activeParticipationItem.id}
                  id={`panel-${activeParticipationItem.id}`}
                  role="tabpanel"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
                >
                  <div className="cut-panel p-6 sm:p-8">
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/46">
                      {activeParticipationItem.eyebrow}
                    </p>
                    <h3 className="mt-5 max-w-[16ch] text-[2rem] font-medium leading-tight text-white sm:text-[2.35rem]">
                      {activeParticipationItem.title}
                    </h3>
                    <p className="mt-5 max-w-[34rem] text-sm leading-7 text-white/68 sm:text-base">
                      {activeParticipationItem.description}
                    </p>
                  </div>

                  <div className="cut-panel p-6 sm:p-8">
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/46">
                      Escopo de atuação
                    </p>
                    <div className="mt-6 space-y-4">
                      {activeParticipationItem.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="flex items-start gap-4 rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-5"
                        >
                          <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
                          <p className="text-sm leading-7 text-white/72">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </m.div>
              </AnimatePresence>

              <div className="mt-10 grid gap-4 lg:grid-cols-3">
                {projectMetrics.map((metric, index) => (
                  <SectionReveal
                    key={metric.label}
                    delay={0.12 + index * 0.06}
                    className="stat-panel"
                  >
                    <CountUp
                      value={metric.value}
                      suffix={metric.suffix}
                      className="stat-panel__value"
                    />
                    <h3 className="mt-5 text-xl font-medium text-white">
                      {metric.label}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/62">
                      {metric.description}
                    </p>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>

          <section id="clientes" className="py-24 sm:py-28">
            <div className={containerClass}>
              <SectionReveal className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                <div className="space-y-5">
                  <span className="section-chip">Clientes atendidos</span>
                  <h2 className="section-title max-w-[11ch]">
                    Empresas que confiaram projetos críticos à W13.
                  </h2>
                  <p className="section-copy max-w-[38rem]">
                    Atuamos lado a lado com empresas de conectividade,
                    telecomunicações, educação, energia e indústria, sustentando
                    operações que exigem resposta técnica e execução confiável.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {clients.map((client, index) => (
                    <SectionReveal
                      key={client}
                      delay={index * 0.04}
                      className="profile-panel flex min-h-[124px] items-center justify-center text-center"
                    >
                      <p className="text-base font-medium text-white">{client}</p>
                    </SectionReveal>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </section>

          <section id="feedback" className="py-24 sm:py-28">
            <div className={containerClass}>
              <SectionReveal className="space-y-5">
                <span className="section-chip">Feedback</span>
                <h2 className="section-title max-w-[12ch]">
                  Percepções de quem precisou organizar a operação e seguir
                  escalando.
                </h2>
              </SectionReveal>

              <div className="mt-12 grid gap-4 xl:grid-cols-3">
                {feedbackItems.map((item, index) => (
                  <SectionReveal
                    key={item.author + item.role}
                    delay={index * 0.05}
                    className="feedback-panel"
                  >
                    <m.article
                      whileHover={
                        prefersReducedMotion ? undefined : { y: -6, scale: 1.01 }
                      }
                      transition={{ duration: 0.22 }}
                      className="flex h-full flex-col justify-between gap-10"
                    >
                      <p className="text-[1.15rem] leading-8 text-[hsl(var(--ivory))]">
                        "{item.quote}"
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-white">{item.author}</p>
                        <p className="text-sm text-white/56">{item.role}</p>
                      </div>
                    </m.article>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer id="contato" className="pb-10 pt-8 sm:pb-12">
          <div className={containerClass}>
            <SectionReveal className="cut-panel overflow-hidden p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="/logo_navbar.svg"
                      alt="W13 Tecnologia"
                      className="h-9 w-auto opacity-90"
                    />
                    <div className="space-y-1">
                      <p className="font-display text-xl text-[hsl(var(--ivory))]">
                        Soluções em Tecnologia
                      </p>
                      <p className="text-sm text-white/46">
                        Abra as portas para a tecnologia.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <span className="section-chip">Entre em contato</span>
                    <h2 className="section-title max-w-[10ch]">
                      Vamos conversar sobre o seu projeto.
                    </h2>
                    <p className="section-copy max-w-[36rem]">
                      Nossa equipe está pronta para entender as necessidades da
                      sua empresa e apresentar a solução mais adequada.
                      Respondemos em até 24 horas úteis.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {contactItems.map((item) => {
                      const Icon = item.icon

                      return (
                        <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                          <div className="contact-panel h-full">
                            <div className="service-icon">
                              <Icon className="size-5" />
                            </div>
                            <div className="space-y-2">
                              <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/46">
                                {item.label}
                              </p>
                              <p className="text-sm text-white/84">{item.value}</p>
                            </div>
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </div>

                <div className="cut-panel p-6 sm:p-8">
                  <form action="#" method="POST" className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-[0.72rem] uppercase tracking-[0.2em] text-white/46">
                          Nome completo
                        </span>
                        <input
                          type="text"
                          name="nome"
                          placeholder="Seu nome"
                          className={formFieldClassName}
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-[0.72rem] uppercase tracking-[0.2em] text-white/46">
                          E-mail corporativo
                        </span>
                        <input
                          type="email"
                          name="email"
                          placeholder="seu.nome@empresa.com.br"
                          className={formFieldClassName}
                        />
                      </label>
                    </div>

                    <label className="space-y-2">
                      <span className="text-[0.72rem] uppercase tracking-[0.2em] text-white/46">
                        Empresa
                      </span>
                      <input
                        type="text"
                        name="empresa"
                        placeholder="Nome da empresa"
                        className={formFieldClassName}
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-[0.72rem] uppercase tracking-[0.2em] text-white/46">
                        Serviço de interesse
                      </span>
                      <select
                        name="servico"
                        defaultValue="Outsourcing de TI"
                        className={formFieldClassName}
                      >
                        <option>Outsourcing de TI</option>
                        <option>Telecomunicações</option>
                        <option>4G Privado</option>
                        <option>VSAT</option>
                        <option>Cabeamento</option>
                        <option>Projetos de Infraestrutura</option>
                        <option>Outro</option>
                      </select>
                    </label>

                    <label className="space-y-2">
                      <span className="text-[0.72rem] uppercase tracking-[0.2em] text-white/46">
                        Mensagem
                      </span>
                      <textarea
                        name="mensagem"
                        rows={5}
                        placeholder="Conte um pouco sobre a necessidade da sua operação."
                        className={cn(formFieldClassName, 'resize-none')}
                      />
                    </label>

                    <Button type="submit" size="lg" className="justify-center sm:justify-start">
                      Enviar mensagem
                      <ArrowRight className="size-4" />
                    </Button>
                  </form>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-3 text-sm text-white/52">
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

                <div className="text-sm text-white/46">
                  © 2026 W13 Tecnologia. Todos os direitos reservados.
                </div>
              </div>
            </SectionReveal>
          </div>
        </footer>
      </div>
    </LazyMotion>
  )
}

export default App
