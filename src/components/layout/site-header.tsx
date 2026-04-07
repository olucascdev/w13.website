import { AnimatePresence, m } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { contactInfo, siteContainerClass } from '@/data/site-config'
import { navItems } from '@/data/site-content'
import { cn } from '@/lib/utils'
import type { SectionId } from '@/types/site'

type SiteHeaderProps = {
  activeSection: SectionId
  isHeaderScrolled: boolean
  isMobileMenuOpen: boolean
  onToggleMobileMenu: () => void
  onCloseMobileMenu: () => void
}

export function SiteHeader({
  activeSection,
  isHeaderScrolled,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
}: SiteHeaderProps) {
  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isHeaderScrolled ? 'py-2' : 'py-3',
      )}
    >
      <div
        className={cn(
          siteContainerClass,
          'nav-shell liquid-glass pl-6 sm:pl-10',
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
                className={cn('nav-link', isActive ? 'text-white' : 'text-white/64')}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://recruiter.w13.com.br/cadastro-tecnico"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.66rem] uppercase tracking-[0.2em] text-white/64 transition-colors hover:text-white"
          >
            Trabalhe conosco
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-[0.66rem] uppercase tracking-[0.2em] text-white/64 transition-colors hover:text-white"
          >
            {contactInfo.email}
          </a>
          <Button
            asChild
            variant="glass"
            size="default"
            className="border-0 px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-white shadow-none"
          >
            <a href="#contato">Fale com nossa equipe<ArrowRight className="size-4" /></a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMobileMenuOpen}
          className="inline-flex size-9 items-center justify-center rounded-full border-0 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
          onClick={onToggleMobileMenu}
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
            className={cn(siteContainerClass, 'mt-3 lg:hidden')}
          >
            <div className="liquid-glass rounded-[1.35rem] border-0 p-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block rounded-[1.1rem] px-4 py-3 text-sm text-white/84 transition-colors hover:bg-white/[0.08]"
                  onClick={onCloseMobileMenu}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://recruiter.w13.com.br/cadastro-tecnico"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-[1.1rem] px-4 py-3 text-sm text-white/84 transition-colors hover:bg-white/[0.08]"
                onClick={onCloseMobileMenu}
              >
                Trabalhe conosco
              </a>
              <Button
                asChild
                variant="glass"
                size="lg"
                className="mt-2 justify-center border-0 text-[0.68rem] uppercase tracking-[0.2em] text-white shadow-none"
              >
                <a href="#contato" onClick={onCloseMobileMenu}>
                  Fale com nossa equipe
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
