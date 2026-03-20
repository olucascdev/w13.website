import { MessageCircle } from 'lucide-react'

import { contactInfo } from '@/data/site-config'

export function FloatingWhatsAppButton() {
  return (
    <a
      href={contactInfo.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar no WhatsApp com a W13 Tecnologia"
      className="fixed bottom-4 right-4 z-[60] inline-flex min-h-14 min-w-14 items-center justify-center rounded-full bg-[#25D366] px-4 text-white shadow-[0_18px_40px_rgba(37,211,102,0.32)] transition-transform duration-200 hover:scale-[1.04] hover:bg-[#20bd5c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="size-6" />
    </a>
  )
}
