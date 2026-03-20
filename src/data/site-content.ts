import {
  BarChart3,
  Cloud,
  Headset,
  Server,
  ShieldCheck,
  Wifi,
} from 'lucide-react'

import type {
  FeedbackItem,
  HighlightItem,
  MetricItem,
  NavItem,
  PrincipleItem,
  ProjectItem,
  SectionId,
  ServiceItem,
} from '@/types/site'

export const sectionIds: SectionId[] = [
  'home',
  'quem-somos',
  'servicos',
  'projetos',
  'clientes',
  'feedback',
  'contato',
]

export const navItems: NavItem[] = [
  { id: 'quem-somos', label: 'Quem somos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'contato', label: 'Contato' },
]

export const principles: PrincipleItem[] = [
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

export const highlights: HighlightItem[] = [
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

export const projectMetrics: MetricItem[] = [
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

export const services: ServiceItem[] = [
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

export const projects: ProjectItem[] = [
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

export const clients = [
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

export const feedbackItems: FeedbackItem[] = [
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
