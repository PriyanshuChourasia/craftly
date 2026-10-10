import { ProductCard } from './ProductCard'
import { ParallaxItem } from '@/components/parallax'
import { cn, padNumber } from '@/lib/utils'
import type { Product } from '@/types/product'

type Pattern = {
  size: 'small' | 'medium' | 'large'
  rotation: number
  depth: number
  speed: number
  /** static Tailwind placement classes, desktop */
  place: string
  /** small offset on mobile for staggered flow */
  mobileShift: string
}

/**
 * Six alternating hanging patterns produce an asymmetric, gallery-hung
 * layout — configuration is generated from the product index, never
 * hardcoded per product in JSX.
 */
const PATTERNS: Pattern[] = [
  { size: 'large', rotation: -1.2, depth: 0.7, speed: 0.35, place: 'md:col-start-1 md:col-span-7', mobileShift: '-ml-2' },
  { size: 'small', rotation: 2, depth: 0.4, speed: 0.6, place: 'md:col-start-9 md:col-span-4', mobileShift: 'ml-6' },
  { size: 'medium', rotation: 0.8, depth: 0.55, speed: 0.45, place: 'md:col-start-3 md:col-span-5', mobileShift: '-ml-4' },
  { size: 'large', rotation: 1.6, depth: 0.65, speed: 0.3, place: 'md:col-start-6 md:col-span-7', mobileShift: 'ml-3' },
  { size: 'medium', rotation: -2.2, depth: 0.5, speed: 0.5, place: 'md:col-start-1 md:col-span-5', mobileShift: 'ml-8' },
  { size: 'small', rotation: 1, depth: 0.35, speed: 0.65, place: 'md:col-start-8 md:col-span-4', mobileShift: '-ml-3' },
]

const MAX_W = { large: 560, medium: 420, small: 310 } as const

export function EditorialProductGrid({
  products,
  className,
}: {
  products: Product[]
  className?: string
}) {
  return (
    <div className={cn('grid grid-cols-2 gap-x-6 gap-y-20 md:grid-cols-12 md:gap-x-10 md:gap-y-8', className)}>
      {products.map((product, i) => {
        const cfg = PATTERNS[i % PATTERNS.length]!
        return (
          <ParallaxItem
            key={product.id}
            as="article"
            depth={cfg.depth}
            speed={cfg.speed}
            scrollRotation={cfg.rotation / 2}
            className={cn('col-span-2', cfg.place)}
          >
            <div
              className="mx-auto w-full"
              style={{ maxWidth: MAX_W[cfg.size] }}
            >
              <div style={{ transform: `rotate(${cfg.rotation}deg)` }}>
                <ProductCard product={product} index={i} size={cfg.size} />
              </div>
              <p className="text-meta mt-3 text-muted">
                No. {padNumber(i + 1)}
              </p>
            </div>
          </ParallaxItem>
        )
      })}
    </div>
  )
}
