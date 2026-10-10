import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export type MouseSubscriber = {
  el: HTMLElement
  /** 0–1, how strongly this layer reacts */
  depth: number
  /** max pixel movement at this depth */
  strength: number
  /** degrees of rotateX/rotateY at this depth */
  rotate?: number
}

type ParallaxContextValue = {
  subscribe: (s: MouseSubscriber) => () => void
  enabled: boolean
}

const ParallaxContext = createContext<ParallaxContextValue>({
  subscribe: () => () => {},
  enabled: false,
})

export function useParallaxContext() {
  return useContext(ParallaxContext)
}

/**
 * Owns the single rAF loop that drives all mouse parallax.
 * Mouse target → smoothed current (lerp), then each registered element
 * receives a transform. No React re-renders during pointer movement.
 */
export function ParallaxProvider({ children }: { children: ReactNode }) {
  const subscribers = useRef(new Set<MouseSubscriber>())
  const enabled = useRef(false)
  const [, force] = useState(0)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 767px)').matches
    enabled.current = fine && !reduced && !mobile
    force((n) => n + 1)
    if (!enabled.current) return

    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1
      targetY = (e.clientY / window.innerHeight) * 2 - 1
    }

    const tick = () => {
      // Spring-ish smoothing; faster response on large jumps.
      curX += (targetX - curX) * 0.06
      curY += (targetY - curY) * 0.06
      for (const s of subscribers.current) {
        const x = curX * s.strength
        const y = curY * s.strength
        const rot = s.rotate
          ? ` rotateY(${curX * s.rotate}deg) rotateX(${curY * -s.rotate}deg)`
          : ''
        s.el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)${rot}`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      for (const s of subscribers.current) s.el.style.transform = ''
    }
  }, [])

  const value = useMemo<ParallaxContextValue>(
    () => ({
      subscribe: (s) => {
        subscribers.current.add(s)
        return () => subscribers.current.delete(s)
      },
      enabled: enabled.current,
    }),
    [],
  )

  return <ParallaxContext.Provider value={value}>{children}</ParallaxContext.Provider>
}
