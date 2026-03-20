import { useState } from 'react'
import { LazyMotion, domAnimation, useReducedMotion } from 'framer-motion'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { AboutSection } from '@/components/sections/about-section'
import { ClientsSection } from '@/components/sections/clients-section'
import { FeedbackSection } from '@/components/sections/feedback-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ServicesSection } from '@/components/sections/services-section'
import { FloatingWhatsAppButton } from '@/components/site/floating-whatsapp-button'
import { sectionIds } from '@/data/site-content'
import { useActiveSection } from '@/hooks/use-active-section'
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock'
import { useHeaderScrolled } from '@/hooks/use-header-scrolled'

function App() {
  const prefersReducedMotion = useReducedMotion() ?? false
  const activeSection = useActiveSection(sectionIds)
  const isHeaderScrolled = useHeaderScrolled()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useBodyScrollLock(isMobileMenuOpen)

  return (
    <LazyMotion features={domAnimation}>
      <div className="site-shell">
        <SiteHeader
          activeSection={activeSection}
          isHeaderScrolled={isHeaderScrolled}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() => setIsMobileMenuOpen((current) => !current)}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />

        <main>
          <HeroSection prefersReducedMotion={prefersReducedMotion} />
          <AboutSection />
          <ServicesSection prefersReducedMotion={prefersReducedMotion} />
          <ProjectsSection prefersReducedMotion={prefersReducedMotion} />
          <ClientsSection />
          <FeedbackSection prefersReducedMotion={prefersReducedMotion} />
        </main>
        <SiteFooter />
        <FloatingWhatsAppButton />
      </div>
    </LazyMotion>
  )
}

export default App
