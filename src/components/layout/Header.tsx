import { useEffect, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { getLenis } from '@/lib/animations/gsap'

const NAV = [
  { label: 'About', href: '/#about', center: false },
  { label: 'Shop', href: '/collection', center: false },
  { label: 'Collection', href: '/collection', center: false },
  { label: 'Categories', href: '/collection#categories', center: false },
  { label: 'Contact', href: '/#contact', right: true },
]

function scrollToAnchor(hash: string) {
  const lenis = getLenis()
  const el = document.querySelector(hash)
  if (!el) return
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Compact fixed navigation. Handles `/#anchor` links by smooth-scrolling
 * when already on the home route, otherwise navigating first.
 */
export function Header({ compact = false }: { compact?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (compact) return
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [compact])

  const showBar = compact || scrolled

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.slice(1)
      if (location.pathname === '/') {
        e.preventDefault()
        scrollToAnchor(hash)
      } else {
        e.preventDefault()
        window.location.hash = ''
        // navigate home, then scroll after render
        window.history.pushState(null, '', href)
        requestAnimationFrame(() => scrollToAnchor(hash))
      }
    }
  }

  return (
    <AnimatePresence>
      {showBar && (
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-sm"
        >
          <nav
            aria-label="Main"
            className="mx-auto grid max-w-[1600px] grid-cols-3 items-center px-5 py-4 md:px-10"
          >
            <div className="flex items-center gap-6">
              {NAV.filter((n) => !n.center && !n.right).map((n) => (
                <NavLink key={n.label} {...n} onClick={handleNav} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link
                to="/"
                className="font-display text-lg leading-none tracking-tight"
                aria-label="SB Creation"
              >
                SB <span title="SB creation">Creation</span>
              </Link>
            </div>
            <div className="flex items-center justify-end gap-6">
              {NAV.filter((n) => n.right).map((n) => (
                <NavLink key={n.label} {...n} onClick={handleNav} />
              ))}
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  )
}

function NavLink({
  label,
  href,
  onClick,
  className,
}: {
  label: string
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
  className?: string
}) {
  return (
    <Link
      to={href}
      onClick={(e) => onClick?.(e, href)}
      className={cn(
        'text-meta link-underline-hover text-foreground-secondary transition-colors hover:text-foreground',
        className,
      )}
    >
      {label}
    </Link>
  )
}
