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
  Headset,
  Mail,
  MapPin,
  Menu,
  Phone,
  Server,
  ShieldCheck,
  Wifi,
  X,
  type LucideIcon,
} from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SectionId =
  | 'home'
  | 'quem-somos'
  | 'servicos'
  | 'projetos'
  | 'participacao'
  | 'numeros'
  | 'clientes'
  | 'feedback'
  | 'contato'

type ServiceItem = {
  title: string
  description: string
  icon: LucideIcon
}

type ProjectItem = {
  category: string
  year: string
  title: string
  description: string
  result: string
  tags: string[]
  gradient: string
}

type ParticipationItem = {
  id: 'estrategia' | 'implantacao' | 'sustentacao'
  label: string
  eyebrow: string
  title: string
  description: string
  bullets: string[]
  metrics: { value: string; label: string }[]
}

type ContactItem = {
  label: string
  value: string
  icon: LucideIcon
  href?: string
}

const sectionIds: SectionId[] = [
  'home',
  'quem-somos',
  'servicos',
  'projetos',
  'participacao',
  'numeros',
  'clientes',
  'feedback',
  'contato',
]

const navItems: { id: Exclude<SectionId, 'home'>; label: string }[] = [
  { id: 'servicos', label: 'Servicos' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'participacao', label: 'Participacao' },
  { id: 'contato', label: 'Contato' },
]

const heroStats = [
  { value: '+200', label: 'Clientes' },
  { value: '15+', label: 'Anos de mercado' },
  { value: '98%', label: 'Satisfacao' },
]

const cultureSignals = [
  {
    title: 'Tecnologia e telecom sob a mesma governanca',
    description:
      'A operacao nao fica fragmentada entre fornecedores, times e camadas tecnicas.',
  },
  {
    title: 'Execucao que conversa com o negocio',
    description:
      'Traduzimos requisito, prazo e criticidade em plano de entrega, rollout e sustentacao.',
  },
  {
    title: 'Presenca do kickoff ao pos-go-live',
    description:
      'Entramos no diagnostico, aceleramos a implantacao e seguimos na evolucao da operacao.',
  },
]

const services: ServiceItem[] = [
  {
    title: 'Outsourcing de TI',
    description:
      'Squads, atendimento especializado e suporte continuo para operacoes que precisam ganhar escala.',
    icon: Server,
  },
  {
    title: 'Telecom e conectividade',
    description:
      'Infraestrutura de redes, enlaces, Wi-Fi corporativo e arquitetura para ambientes criticos.',
    icon: Wifi,
  },
  {
    title: 'Service desk e campo',
    description:
      'Atendimento remoto e presencial com rito operacional claro, escalonamento e rastreabilidade.',
    icon: Headset,
  },
  {
    title: 'Infraestrutura e cloud',
    description:
      'Modernizacao de ambientes, padronizacao de ativos e sustentacao de infra hibrida.',
    icon: Cloud,
  },
  {
    title: 'Seguranca e continuidade',
    description:
      'Protecao, monitoramento e resiliencia para operacoes que nao podem parar.',
    icon: ShieldCheck,
  },
  {
    title: 'Projetos especiais',
    description:
      'Rollouts, expansoes, ativacoes, cutovers e frentes tecnicas desenhadas para velocidade.',
    icon: BarChart3,
  },
]

const featuredProjects: ProjectItem[] = [
  {
    category: 'Telecom',
    year: '2025',
    title: 'Expansao de conectividade para operacao multisede',
    description:
      'Planejamento, ativacao e sustentacao de infraestrutura para unidades distribuidas com janelas de implantacao coordenadas.',
    result: '48 unidades conectadas com padrao unico de rollout',
    tags: ['Rollout', 'Campo', 'Telecom'],
    gradient:
      'linear-gradient(135deg, rgba(16, 36, 89, 0.95) 0%, rgba(8, 14, 30, 0.76) 100%)',
  },
  {
    category: 'Infraestrutura',
    year: '2024',
    title: 'Reorganizacao de base tecnica para operacao critica',
    description:
      'Revisao de ambiente, estabilizacao de atendimento e ganho de previsibilidade para uma estrutura em aceleracao.',
    result: 'Governanca de ativos e atendimento redesenhada em ciclos curtos',
    tags: ['Infra', 'Atendimento', 'SLA'],
    gradient:
      'linear-gradient(135deg, rgba(26, 56, 96, 0.95) 0%, rgba(9, 17, 40, 0.8) 100%)',
  },
  {
    category: 'Suporte',
    year: '2024',
    title: 'Operacao assistida para fase de crescimento',
    description:
      'Suporte remoto, orientacao em campo e acompanhamento pos-implantacao para absorver aumento de demanda sem perda de controle.',
    result: 'Atendimento e sustentacao organizados para pico operacional',
    tags: ['Service Desk', 'Niveis de suporte', 'Evolucao'],
    gradient:
      'linear-gradient(135deg, rgba(11, 34, 73, 0.94) 0%, rgba(7, 15, 34, 0.78) 100%)',
  },
]

const participationItems: ParticipationItem[] = [
  {
    id: 'estrategia',
    label: 'Estrategia',
    eyebrow: 'Participacao em projetos',
    title: 'Entramos cedo para reduzir ruido, dependencias e retrabalho.',
    description:
      'Antes da execucao, organizamos escopo, prioridade, risco e ritmo de implantacao para o projeto nascer orientado por viabilidade tecnica.',
    bullets: [
      'Diagnostico tecnico e leitura de maturidade operacional.',
      'Desenho de arquitetura, cronograma e marcos de entrega.',
      'Mapeamento de dependencias, janelas e criticidades do negocio.',
    ],
    metrics: [
      { value: '72h', label: 'kickoff para leitura inicial' },
      { value: '1 fluxo', label: 'negocio, campo e suporte alinhados' },
      { value: '0 achismo', label: 'decisao guiada por contexto tecnico' },
    ],
  },
  {
    id: 'implantacao',
    label: 'Implantacao',
    eyebrow: 'Participacao em projetos',
    title: 'Executamos rollout, ativacao e entrega com disciplina operacional.',
    description:
      'Coordenamos frentes tecnicas, times de campo e validacao para que a implantacao aconteca com visibilidade e controle.',
    bullets: [
      'Execucao em campo, checklist tecnico e aceite estruturado.',
      'Acompanhamento de milestones, tratativa de bloqueios e comunicacao clara.',
      'Documentacao do que foi entregue para facilitar sustentacao e expansao.',
    ],
    metrics: [
      { value: 'N1 a N3', label: 'escalonamento preparado para a entrega' },
      { value: '100%', label: 'rastreamento dos marcos de implantacao' },
      { value: '1 time', label: 'campo, suporte e lideranca sincronizados' },
    ],
  },
  {
    id: 'sustentacao',
    label: 'Sustentacao',
    eyebrow: 'Participacao em projetos',
    title: 'Seguimos no pos-go-live para estabilizar, atender e evoluir.',
    description:
      'Nao entregamos e saimos. A W13 permanece na camada operacional para manter SLA, absorver incidentes e transformar aprendizado em evolucao.',
    bullets: [
      'Monitoramento, atendimento e gestao de incidentes com criterio tecnico.',
      'Ajustes finos, manutencao preventiva e backlog evolutivo.',
      'Visibilidade de performance para decisao rapida e continuidade operacional.',
    ],
    metrics: [
      { value: '24/7', label: 'ritmo de observacao e resposta' },
      { value: 'SLA vivo', label: 'acompanhamento continuo de atendimento' },
      { value: 'Pos-projeto', label: 'evolucao sem ruptura de contexto' },
    ],
  },
]

const metrics = [
  {
    value: '261',
    label: 'Projetos concluidos',
    description:
      'Entregas fechadas com metodo, governanca tecnica e transicao organizada.',
  },
  {
    value: '259',
    label: 'Atendimentos executados',
    description:
      'Chamados, visitas tecnicas e frentes operacionais conduzidas com previsibilidade.',
  },
  {
    value: '2,354+',
    label: 'Clientes atendidos',
    description:
      'Operacoes apoiadas em conectividade, sustentacao, telecom e outsourcing.',
  },
]

const clientProfiles = [
  {
    title: 'Operadoras e provedores',
    description:
      'Expansao de cobertura, padronizacao operacional e apoio tecnico para ambientes de alta demanda.',
  },
  {
    title: 'Corporacoes multisede',
    description:
      'Operacoes com varias unidades, rollout constante e necessidade de uma base tecnica consistente.',
  },
  {
    title: 'Industria e logistica',
    description:
      'Infraestrutura, conectividade e resposta rapida para ambientes que nao param.',
  },
  {
    title: 'Varejo e franquias',
    description:
      'Ativacoes, suporte e telemetria para pontos que precisam operar com padrao unico.',
  },
  {
    title: 'Saude e educacao',
    description:
      'Ambientes que exigem estabilidade, continuidade e acompanhamento tecnico proximo.',
  },
  {
    title: 'Setor publico e facilities',
    description:
      'Projetos documentados, execucao coordenada e sustentacao com visibilidade.',
  },
]

const feedbackItems = [
  {
    quote:
      'A W13 organizou a operacao e trouxe previsibilidade onde antes havia urgencia o tempo todo.',
    author: 'Diretoria de operacoes',
    role: 'Grupo logistico multisede',
  },
  {
    quote:
      'O diferencial foi unir implantacao e sustentacao no mesmo raciocinio tecnico. Isso reduziu muito o retrabalho.',
    author: 'Lideranca de infraestrutura',
    role: 'Rede corporativa em expansao',
  },
  {
    quote:
      'Nao foi uma entrega de prateleira. O time entendeu o contexto, ajustou o plano e executou com ritmo.',
    author: 'Gestao de tecnologia',
    role: 'Operacao com alta criticidade',
  },
]

const contactItems: ContactItem[] = [
  {
    label: 'Telefone',
    value: '(27) XXXX-XXXX',
    icon: Phone,
  },
  {
    label: 'E-mail',
    value: 'contato@w13.com.br',
    icon: Mail,
    href: 'mailto:contato@w13.com.br',
  },
  {
    label: 'Base operacional',
    value: 'Espirito Santo, Brasil',
    icon: MapPin,
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
              `${containerClass} nav-shell liquid-glass`,
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
                className="h-8 w-auto sm:h-9"
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
                className="border border-white/20 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-white"
              >
                <a href="#contato">
                  Falar com a W13
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
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
                <div className="liquid-glass rounded-[1.35rem] border border-white/32 p-3">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-[1.1rem] px-4 py-3 text-sm text-white/84 transition-colors hover:bg-white/[0.08]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button
                    asChild
                    variant="glass"
                    size="lg"
                    className="mt-2 justify-center border border-white/20 text-[0.68rem] uppercase tracking-[0.2em] text-white"
                  >
                    <a href="#contato" onClick={() => setIsMobileMenuOpen(false)}>
                      Falar com a W13
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
              Home da W13 Tecnologia com outsourcing de TI e telecomunicacoes
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
              className="absolute bottom-0 left-0 right-0 z-0 h-[72%] bg-[linear-gradient(180deg,rgba(6,9,19,0)_0%,rgba(6,9,19,0.14)_14%,rgba(6,9,19,0.48)_34%,rgba(6,9,19,0.82)_58%,rgba(6,9,19,0.98)_82%,rgba(6,9,19,1)_100%)]"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-[-4rem] left-0 right-0 z-0 h-44 bg-background blur-3xl"
              aria-hidden="true"
            />

            <div
              className={cn(
                containerClass,
                'relative z-10 flex flex-1 flex-col items-center justify-center px-0 pb-20 pt-32 text-center sm:pb-28 sm:pt-36 lg:pt-40',
              )}
            >
              <SectionReveal className="max-w-[20rem] sm:max-w-3xl xl:max-w-5xl">
                <h1 className="font-display text-[2.8rem] leading-[0.94] font-medium tracking-[-0.05em] text-[hsl(var(--ivory))] sm:text-6xl lg:text-7xl xl:text-[6.2rem]">
                  Tecnologia que <em className="not-italic text-accent">move</em>{' '}
                  o seu negocio.
                </h1>
              </SectionReveal>

              <SectionReveal delay={0.08} className="mt-6 max-w-[34rem]">
                <p className="text-[0.95rem] leading-relaxed text-white/74 sm:text-base md:text-lg">
                  Especialistas em outsourcing de tecnologia e telecomunicacoes.
                  Solucoes integradas para empresas que precisam de escala,
                  agilidade e resultado real.
                </p>
              </SectionReveal>

              <SectionReveal
                delay={0.16}
                className="mt-10 flex w-full max-w-[280px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4"
              >
                <Button asChild size="lg" className="w-full justify-center sm:w-auto">
                  <a href="#contato">
                    Fale com um especialista
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="glass"
                  size="lg"
                  className="w-full justify-center border border-white/20 text-white sm:w-auto"
                >
                  <a href="#servicos">Conhecer solucoes</a>
                </Button>
              </SectionReveal>
            </div>

            <SectionReveal
              delay={0.24}
              className={cn(containerClass, 'relative z-10 pb-10')}
            >
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:divide-x sm:divide-white/10 sm:gap-0">
                {heroStats.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center px-8 py-2"
                  >
                    <span className="font-display text-[1.85rem] tracking-tight text-[hsl(var(--ivory))]">
                      {item.value}
                    </span>
                    <span className="mt-1 text-[0.72rem] uppercase tracking-[0.24em] text-white/54">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </section>

          <section
            id="quem-somos"
            className="relative z-10 -mt-[4.5rem] pb-24 pt-[4.5rem] sm:-mt-24 sm:pb-28 sm:pt-24 lg:-mt-28 lg:pt-28"
          >
            <div
              className="absolute inset-x-0 top-[-8rem] h-40 bg-[linear-gradient(180deg,rgba(6,9,19,0)_0%,rgba(6,9,19,0.42)_24%,rgba(6,9,19,0.88)_58%,rgba(6,9,19,1)_100%)] blur-2xl sm:top-[-9rem] sm:h-44 lg:top-[-10rem] lg:h-52"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,hsl(var(--background))_0%,rgba(6,9,19,0.82)_54%,rgba(6,9,19,0)_100%)] sm:h-32 lg:h-36"
              aria-hidden="true"
            />
            <div className={containerClass}>
              <SectionReveal className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-end">
                <div className="space-y-5">
                  <span className="section-chip">Quem somos?</span>
                  <h2 className="section-title max-w-[12ch]">
                    A camada operacional que conecta tecnologia, telecom e
                    crescimento.
                  </h2>
                </div>
                <p className="section-copy max-w-[37rem]">
                  A W13 organiza outsourcing, conectividade e atendimento tecnico
                  para empresas que precisam crescer com ritmo, padrao e visibilidade.
                  Entramos no desenho, seguimos na execucao e permanecemos na
                  sustentacao para que a operacao nao perca contexto ao longo do
                  projeto.
                </p>
              </SectionReveal>

              <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                <SectionReveal className="cut-panel p-6 sm:p-8">
                  <div className="flex h-full flex-col justify-between gap-8">
                    <div className="space-y-4">
                      <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/46">
                        Como pensamos
                      </p>
                      <p className="max-w-[24ch] text-2xl font-medium leading-tight text-[hsl(var(--ivory))] sm:text-3xl">
                        Nao entregamos apenas frentes tecnicas. Organizamos a
                        operacao para ela continuar performando depois da entrega.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      {cultureSignals.map((item) => (
                        <div
                          key={item.title}
                          className="rounded-[1.35rem] border border-white/8 bg-white/[0.04] p-5"
                        >
                          <p className="text-sm font-medium text-white">{item.title}</p>
                          <p className="mt-3 text-sm leading-6 text-white/62">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>

                <div className="grid gap-4">
                  <SectionReveal delay={0.08} className="cut-panel p-6">
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/46">
                      Postura
                    </p>
                    <p className="mt-4 text-xl font-medium leading-tight text-white">
                      Leitura tecnica forte, comunicacao objetiva e execucao sem
                      cenografia.
                    </p>
                  </SectionReveal>

                  <SectionReveal delay={0.14} className="cut-panel p-6">
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/46">
                      Direcao
                    </p>
                    <p className="mt-4 text-xl font-medium leading-tight text-white">
                      Escalamos operacoes sem perder controle de ponta a ponta.
                    </p>
                  </SectionReveal>
                </div>
              </div>
            </div>
          </section>

          <section id="servicos" className="py-24 sm:py-28">
            <div className={containerClass}>
              <SectionReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-5">
                  <span className="section-chip">Servicos</span>
                  <h2 className="section-title max-w-[11ch]">
                    Frentes desenhadas para operar com velocidade e criterio.
                  </h2>
                </div>
                <p className="section-copy max-w-[35rem]">
                  Unimos atendimento, conectividade, infraestrutura e sustentacao em
                  um desenho operacional que conversa com a realidade de cada
                  empresa.
                </p>
              </SectionReveal>

              <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
          </section>

          <section id="projetos" className="py-24 sm:py-28">
            <div className={containerClass}>
              <SectionReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-5">
                  <span className="section-chip">Projetos</span>
                  <h2 className="section-title max-w-[12ch]">
                    Entregas pensadas para gerar ritmo operacional, nao apenas
                    ativacao.
                  </h2>
                </div>
                <p className="section-copy max-w-[35rem]">
                  Cada projeto combina planejamento, leitura tecnica e sustentacao
                  para que a entrega continue fazendo sentido depois da implantacao.
                </p>
              </SectionReveal>

              <div className="mt-12 grid gap-4 xl:grid-cols-3">
                {featuredProjects.map((project, index) => (
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
                      className="flex h-full flex-col justify-between gap-10"
                    >
                      <div className="space-y-6">
                        <div
                          className="project-card__surface"
                          style={{ background: project.gradient }}
                        >
                          <div className="project-card__meta">
                            <span>{project.category}</span>
                            <span>{project.year}</span>
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-2xl font-medium leading-tight text-[hsl(var(--ivory))]">
                              {project.title}
                            </h3>
                            <p className="text-sm leading-7 text-white/74">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm leading-7 text-white/68">{project.result}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
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
                <span className="section-chip">Participacao em projetos</span>
                <h2 className="section-title max-w-[12ch]">
                  Atuamos em pontos diferentes do projeto sem perder a mesma linha
                  de raciocinio.
                </h2>
                <p className="section-copy max-w-[38rem]">
                  A W13 pode entrar no desenho, acelerar a implantacao ou assumir a
                  sustentacao. O valor esta em manter criterio, contexto e ritmo em
                  cada etapa.
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

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                      {activeParticipationItem.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-[1.35rem] border border-white/8 bg-white/[0.04] p-5"
                        >
                          <p className="text-2xl font-medium text-[hsl(var(--ivory))]">
                            {metric.value}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-white/60">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="cut-panel p-6 sm:p-8">
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/46">
                      Escopo de atuacao
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
            </div>
          </section>

          <section id="numeros" className="py-24 sm:py-28">
            <div className={containerClass}>
              <SectionReveal className="space-y-5">
                <span className="section-chip">Indicadores</span>
                <h2 className="section-title max-w-[13ch]">
                  Numeros que mostram consistencia operacional.
                </h2>
              </SectionReveal>

              <div className="mt-12 grid gap-4 lg:grid-cols-3">
                {metrics.map((metric, index) => (
                  <SectionReveal
                    key={metric.label}
                    delay={index * 0.06}
                    className="stat-panel"
                  >
                    <p className="stat-panel__value">{metric.value}</p>
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
                    Estruturas diferentes. O mesmo nivel de rigor operacional.
                  </h2>
                  <p className="section-copy max-w-[34rem]">
                    Atuamos em ambientes que precisam de suporte real, conectividade
                    confiavel e uma equipe que consiga transformar demanda tecnica em
                    operacao estavel.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {clientProfiles.map((profile, index) => (
                    <SectionReveal
                      key={profile.title}
                      delay={index * 0.05}
                      className="profile-panel"
                    >
                      <p className="text-lg font-medium text-white">{profile.title}</p>
                      <p className="mt-4 text-sm leading-7 text-white/62">
                        {profile.description}
                      </p>
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
                  Percepcao de quem precisou organizar operacao e continuar escalando.
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
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
                <div className="space-y-5">
                  <span className="section-chip">Footer</span>
                  <h2 className="section-title max-w-[11ch]">
                    Pronto para dar ritmo, escala e controle para a operacao?
                  </h2>
                  <p className="section-copy max-w-[34rem]">
                    Sem formulario. Contato direto para conversar sobre diagnostico,
                    rollout, atendimento e sustentacao tecnica.
                  </p>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                      asChild
                      size="lg"
                      className="justify-center text-[0.74rem] uppercase tracking-[0.24em] sm:justify-start"
                    >
                      <a href="mailto:contato@w13.com.br">
                        Enviar e-mail
                        <ArrowRight className="size-4" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="glass"
                      size="lg"
                      className="justify-center border border-white/12 px-8 text-[0.74rem] uppercase tracking-[0.24em] text-white sm:justify-start"
                    >
                      <a href="#home">Voltar ao topo</a>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {contactItems.map((item) => {
                    const Icon = item.icon
                    const content = (
                      <div className="contact-panel">
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
                    )

                    return item.href ? (
                      <a key={item.label} href={item.href}>
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="/logo_navbar.svg"
                    alt="W13 Tecnologia"
                    className="h-9 w-auto opacity-90"
                  />
                  <p className="text-sm text-white/48">
                    Outsourcing, telecom e TI para operacoes que exigem resultado
                    real.
                  </p>
                </div>

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
              </div>
            </SectionReveal>
          </div>
        </footer>
      </div>
    </LazyMotion>
  )
}

export default App
