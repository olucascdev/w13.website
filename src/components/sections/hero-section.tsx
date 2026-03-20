import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import { Button } from '@/components/ui/button'
import { siteContainerClass } from '@/data/site-config'
import { cn } from '@/lib/utils'
import { signalInitialHeroReady } from '@/lib/initial-loader'

type HeroSectionProps = {
  prefersReducedMotion: boolean
}

export function HeroSection({ prefersReducedMotion }: HeroSectionProps) {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false)
  const [isHeroAvailable, setIsHeroAvailable] = useState(true)
  const hasSignaledHeroReady = useRef(false)

  const markHeroReady = () => {
    if (hasSignaledHeroReady.current) {
      return
    }

    hasSignaledHeroReady.current = true
    signalInitialHeroReady()
  }

  useEffect(() => {
    if (prefersReducedMotion) {
      markHeroReady()
    }
  }, [prefersReducedMotion])

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden">
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
          alt=""
          aria-hidden="true"
          width={854}
          height={480}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className={cn(
            'absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700',
            isHeroLoaded ? 'opacity-60' : 'opacity-0',
          )}
          onLoad={() => {
            setIsHeroLoaded(true)
            markHeroReady()
          }}
          onError={() => {
            setIsHeroAvailable(false)
            setIsHeroLoaded(false)
            markHeroReady()
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
          siteContainerClass,
          'relative z-10 flex flex-1 flex-col items-center justify-center px-0 pb-20 pt-32 text-center sm:pb-28 sm:pt-36 lg:pt-40',
        )}
      >
        <SectionReveal className="max-w-[20rem] sm:max-w-3xl xl:max-w-5xl">
          <h1 className="font-display text-[2.85rem] leading-[0.94] font-medium tracking-[-0.05em] text-[hsl(var(--ivory))] sm:text-6xl lg:text-7xl xl:text-[6.35rem]">
            Tecnologia que <span className="text-accent">move</span> o seu
            negócio.
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.08} className="mt-6 max-w-[35rem]">
          <p className="text-[1rem] leading-relaxed text-white/76 sm:text-[1.05rem] md:text-lg">
            Especialistas em outsourcing de tecnologia e telecomunicações.
            Soluções integradas para empresas que precisam de escala, agilidade e
            resultado real.
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
  )
}
