import type { LucideIcon } from 'lucide-react'

export type SectionId =
  | 'home'
  | 'quem-somos'
  | 'servicos'
  | 'projetos'
  | 'clientes'
  | 'feedback'
  | 'contato'

export type NavItem = {
  id: Exclude<SectionId, 'home'>
  label: string
}

export type ServiceItem = {
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
}

export type ProjectItem = {
  category: string
  title: string
  description: string
  tags: string[]
  image: string
  alt: string
  imageClassName?: string
}

export type PrincipleItem = {
  eyebrow: string
  title: string
  description: string
}

export type HighlightItem = {
  title: string
  description: string
}

export type MetricItem = {
  value: number
  suffix?: string
  label: string
  icon: string
  iconAlt: string
}

export type FeedbackItem = {
  quote: string
  author: string
  role: string
}
