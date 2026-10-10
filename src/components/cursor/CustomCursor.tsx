import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type CursorMode = 'default' | 'view' | 'buy' | 'open' | 'link'

const LABELS: Record<CursorMode, string | null> = {
  default: null,
  view: 'VIEW',
  buy: 'BUY',
  open: 'OPEN',
  link: null,
}

function attrMode(el: Element | null): CursorMode {
  if (!el) return 'default'
  const target = el.closest('[data-cursor]') as HTMLElement | null
  if (target) return (target.dataset.cursor as CursorMode) || 'default'
  if (el.closest('a, button, [role="button"]')) return 'link'
  return 'default'
}

/**
 * Two-layer cursor: an instant dot and a lerped follower ring that grows
 * and shows a label over interactive targets.
 * Desktop (fine pointer) only, disabled with prefers-reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<CursorMode>('default')
  const [active, setActive] = useState(false)

  useEffect(() => {
    const enabled =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !window.matchMedia('(max-width: 1023px)').matches
    if (!enabled) return

    document.documentElement.classList.add('has-custom-cursor')
    setActive(true)

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let fx = tx
    let fy = ty
    let raf = 0

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
      }
      const mode = attrMode(e.target as Element)
      setLabel(mode)
    }

    const tick = () => {
      fx += (tx - fx) * 0.16
      fy += (ty - fy) * 0.16
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${fx}px, ${fy}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    const onLeave = () => document.documentElement.classList.remove('has-custom-cursor')
    const onEnter = () => document.documentElement.classList.add('has-custom-cursor')

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    raf = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!active) return null

  const big = label !== 'default' && label !== 'link'

  return createPortal(
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      {/* follower */}
      <div ref={followerRef} className="absolute left-0 top-0 will-change-transform">
        <div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-out"
          style={{
            width: big ? 64 : 32,
            height: big ? 64 : 32,
            borderColor: big ? 'transparent' : 'rgba(17,17,17,0.35)',
            backgroundColor: big ? 'rgba(17,17,17,0.92)' : 'transparent',
          }}
        >
          <span
            className="font-mono text-[9px] tracking-[0.18em] text-[#f3ecea] opacity-0 transition-opacity duration-200"
            style={{ opacity: big ? 1 : 0 }}
          >
            {LABELS[label]}
          </span>
        </div>
      </div>
      {/* dot */}
      <div ref={dotRef} className="absolute left-0 top-0 will-change-transform">
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111] transition-opacity duration-200"
          style={{ width: 6, height: 6, opacity: big ? 0 : 1 }}
        />
      </div>
    </div>,
    document.body,
  )
}
