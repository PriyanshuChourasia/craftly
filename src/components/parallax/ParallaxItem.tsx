import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useParallaxContext } from './ParallaxProvider'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export type ParallaxItemProps = {
  children: ReactNode
  /** 0–1 — drives mouse movement intensity */
  depth?: number
  /** 0–1 — scroll speed factor (0.1 background … 0.9 foreground) */
  speed?: number
  /** static rotation in degrees */
  rotation?: number
  /** degrees of rotateX/rotateY on mouse move */
  rotate3d?: number
  offsetX?: number
  offsetY?: number
  scale?: number
  /** scroll-driven extra rotation in degrees across the viewport pass */
  scrollRotation?: number
  className?: string
  style?: CSSProperties
  as?: 'div' | 'li' | 'article'
}

/**
 * Composite parallax element.
 * Outer wrapper: GSAP ScrollTrigger scrub (translateY/rotation from scroll).
 * Inner wrapper: registered with ParallaxProvider (mouse-driven transform).
 */
export function ParallaxItem({
  children,
  depth = 0.5,
  speed = 0.3,
  rotation = 0,
  rotate3d = 0,
  offsetX = 0,
  offsetY = 0,
  scale = 1,
  scrollRotation = 0,
  className,
  style,
  as = 'div',
}: ParallaxItemProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef<HTMLDivElement>(null)
  const { subscribe, enabled } = useParallaxContext()

  // Mouse layer
  useEffect(() => {
    if (!enabled || !mouseRef.current || depth === 0) return
    return subscribe({
      el: mouseRef.current,
      depth,
      strength: depth * 34,
      rotate: rotate3d * depth,
    })
  }, [enabled, subscribe, depth, rotate3d])

  // Scroll layer
  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = scrollRef.current
    if (!el || reduced || speed === 0) return

    const yDistance = speed * -140
    const rotationFrom = rotation + scrollRotation
    const rotationTo = rotation - scrollRotation

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: yDistance, rotate: rotationFrom },
        {
          y: -yDistance,
          rotate: rotationTo,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [speed, rotation, scrollRotation])

  const Tag = as

  return (
    <Tag
      ref={scrollRef as never}
      className={cn('will-change-transform', className)}
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
    >
      <div
        ref={mouseRef}
        className="preserve-3d h-full w-full"
        style={{
          transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale})`,
          willChange: enabled && depth > 0 ? 'transform' : undefined,
        }}
      >
        {children}
      </div>
    </Tag>
  )
}
