import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

/**
 * Short exhibition loading experience. Tracks real readiness
 * (window load + document fonts), with a 600ms floor and a hard 1500ms cap.
 */
export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const start = performance.now()
    const MIN = 600
    const MAX = 1500
    let cancelled = false

    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    const windowReady = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', () => resolve(), { once: true })
    })

    // Crawl the bar while assets load
    const crawl = setInterval(() => {
      setProgress((p) => Math.min(92, p + Math.random() * 18))
    }, 120)

    Promise.all([fontsReady, windowReady]).then(() => {
      const elapsed = performance.now() - start
      const wait = Math.max(0, MIN - elapsed)
      setTimeout(() => {
        if (cancelled) return
        clearInterval(crawl)
        setProgress(100)
        setTimeout(() => !cancelled && setDone(true), 250)
      }, wait)
    })
    setTimeout(() => {
      if (cancelled) return
      clearInterval(crawl)
      setProgress(100)
      setDone(true)
    }, MAX)

    return () => {
      cancelled = true
      clearInterval(crawl)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={done}
          role="status"
          aria-label="Loading the collection"
        >
          <p className="text-meta text-muted">Shobhanjana Creation</p>
          <h1 className="font-display text-display-lg mt-2">Objects</h1>
          <div className="mt-8 w-72">
            <div className="flex justify-between text-meta text-muted">
              <span>Loading collection</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-2 h-[3px] w-full bg-foreground/10">
              <div
                className="h-full bg-foreground transition-[width] duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
