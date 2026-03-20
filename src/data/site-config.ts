export const siteContainerClass = 'mx-auto w-[min(1200px,calc(100%-2rem))]'

export const companyInfo = {
  name: 'W13 Tecnologia',
  copyrightYear: 2026,
} as const

export const contactInfo = {
  email: 'contato@w13.com.br',
  phoneDisplay: '(27) 998502376',
  phoneHref: 'tel:+5527998502376',
  whatsappHref: 'https://wa.me/5527998502376',
} as const

export const officeHours = [
  {
    days: 'Segunda a sexta',
    hours: '9:00 às 18:00',
  },
  {
    days: 'Sábados',
    hours: '09:00 às 13:00',
  },
] as const

export const supportHours = {
  hours: '08:00 às 22:00',
  note: 'Pelo telefone suporte',
} as const

export const locationInfo = {
  addressLines: [
    'Avenida Jerônimo Monteiro, 1000',
    '18º Andar - 18º Andar',
    'Edifício Trade Center',
    'Centro, Vitória - ES',
    'CEP 29010-935',
  ],
  mapEmbedSrc:
    'https://www.google.com/maps?q=Avenida%20Jer%C3%B4nimo%20Monteiro%2C%201000%2C%20Vit%C3%B3ria%20ES&z=16&output=embed',
} as const
