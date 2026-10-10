import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

type Dir = 'up' | 'down' | 'left' | 'right' | 'none'

const OFFSETS: Record<Dir, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 60 },
  right: { x: -60 },
  none: {},
}

/** Fade + directional slide on viewport entry. */
export function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  direction = 'up',
  className,
  once = true,
  amount = 0.25,
}: {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: Dir
  className?: string
  once?: boolean
  amount?: number
}) {
  const reduced = useReducedMotion()
  const offset = OFFSETS[direction]
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduced ? 0.3 : duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  className,
}: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0.2 : duration, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: reduced ? 0.3 : 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Staggers direct motion children on viewport entry. */
export function Stagger({
  children,
  className,
  stagger = 0.12,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export const staggerItemScale = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export { EASE }
