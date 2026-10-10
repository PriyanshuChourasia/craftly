import type { ReactNode } from 'react'
import { useEffect } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useLocation,
} from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Toaster } from 'sonner'
import { ParallaxProvider } from '@/components/parallax'
import { CustomCursor } from '@/components/cursor'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { NotFoundState, ErrorState } from '@/components/states/States'
import { initSmoothScroll } from '@/lib/animations/gsap'
import '@/styles/global.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'OBJECTS — A Digital Exhibition' },
      {
        name: 'description',
        content:
          'A digital exhibition of carefully curated objects. Browse, filter and explore a 3D product showroom.',
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => (
    <NotFoundState
      code="404"
      title="Page not found"
      description="This room of the archive does not exist."
    />
  ),
  errorComponent: ({ error }) => (
    <ErrorState description={error instanceof Error ? error.message : undefined} />
  ),
})

function RootComponent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const reduced = useReducedMotion()

  useEffect(() => {
    initSmoothScroll()
  }, [])

  return (
    <RootDocument>
      <ParallaxProvider>
        <LoadingScreen />
        <CustomCursor />
        {!isAdmin && <Header />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={location.pathname}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        {!isAdmin && <Footer />}
        <Toaster position="bottom-right" theme="light" />
      </ParallaxProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
