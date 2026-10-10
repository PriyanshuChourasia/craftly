import type { CSSProperties, ReactNode } from 'react'
import { ParallaxItem } from './ParallaxItem'
import { cn } from '@/lib/utils'

type FloatingObjectProps = {
  children: ReactNode
  depth?: number
  speed?: number
  rotation?: number
  rotate3d?: number
  offsetX?: number
  offsetY?: number
  scale?: number
  className?: string
  style?: CSSProperties
}

/**
 * Absolutely-positioned decorative/product object floating in a scene.
 * Place inside a relative parent with a perspective context.
 */
export function FloatingObject(props: FloatingObjectProps) {
  const { className, style, ...rest } = props
  return (
    <ParallaxItem
      {...rest}
      className={cn('pointer-events-auto absolute', className)}
      style={style}
    />
  )
}

/** Mouse-only parallax (no scroll transform). */
export function MouseParallax({
  children,
  depth = 0.5,
  rotate3d = 0,
  className,
}: {
  children: ReactNode
  depth?: number
  rotate3d?: number
  className?: string
}) {
  return (
    <ParallaxItem depth={depth} rotate3d={rotate3d} speed={0} className={className}>
      {children}
    </ParallaxItem>
  )
}

/** Scroll-only parallax (no mouse transform). */
export function ScrollParallax({
  children,
  speed = 0.3,
  scrollRotation = 0,
  className,
}: {
  children: ReactNode
  speed?: number
  scrollRotation?: number
  className?: string
}) {
  return (
    <ParallaxItem
      depth={0}
      speed={speed}
      scrollRotation={scrollRotation}
      className={className}
    >
      {children}
    </ParallaxItem>
  )
}
