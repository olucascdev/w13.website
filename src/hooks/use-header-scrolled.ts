import { useEffect, useState } from 'react'

export function useHeaderScrolled() {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsHeaderScrolled(window.scrollY > 32)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return isHeaderScrolled
}
