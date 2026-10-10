import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'motion/react'
import { formatPrice, availabilityLabel } from '@/lib/format'
import { padNumber, cn } from '@/lib/utils'
import type { Product } from '@/types/product'
import { ProductImage } from './ProductImage'

export type CardSize = 'small' | 'medium' | 'large'

/**
 * A framed gallery object, not an ecommerce card.
 * Thin border, warm paper background, editorial caption, subtle 3D hover.
 */
export function ProductCard({
  product,
  index = 0,
  size = 'medium',
  frame = 'thin',
  showPrice = true,
  className,
}: {
  product: Product
  index?: number
  size?: CardSize
  frame?: 'none' | 'thin' | 'thick' | 'dark'
  showPrice?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const frameClass = {
    none: '',
    thin: 'border border-border-soft',
    thick: 'border-[6px] border-border-soft',
    dark: 'border-[6px] border-dark/80',
  }[frame]

  const height = { small: 'aspect-[4/5]', medium: 'aspect-[4/5]', large: 'aspect-[3/4]' }[size]

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateX(${-py * 4}deg) rotateY(${px * 4}deg) translateZ(14px)`
  }
  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }

  return (
    <motion.div whileHover={reduced ? undefined : { y: -6 }} transition={{ duration: 0.4 }}>
      <Link
        ref={ref}
        to="/products/$slug"
        params={{ slug: product.slug }}
        data-cursor="view"
        aria-label={`${product.name} — ${product.category}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(
          'group block bg-paper/60 transition-[border-color,box-shadow] duration-300 [transition:transform_.4s_cubic-bezier(.22,1,.36,1)] hover:shadow-[0_24px_70px_rgba(8,8,8,0.1)]',
          frameClass,
          className,
        )}
      >
        <div className={cn('overflow-hidden', height)}>
          <ProductImage
            image={product.images[0] ?? { id: '', url: product.primaryImage ?? '', alt: product.name, order: 0 }}
            priority={index < 3}
            objectFit={product.images[0]?.isPrimary ? 'contain' : 'cover'}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <ProductCaption product={product} index={index} showPrice={showPrice} />
      </Link>
    </motion.div>
  )
}

function ProductCaption({
  product,
  index,
  showPrice,
}: {
  product: Product
  index: number
  showPrice: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-3 px-3.5 py-3">
      <div>
        <p className="text-meta text-muted">
          Object {padNumber(index + 1)}
        </p>
        <p className="mt-1 font-display text-base leading-tight tracking-wide">
          {product.name}
        </p>
        <p className="text-meta mt-1 text-foreground-secondary">
          {product.category}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        {showPrice && product.availability !== 'coming_soon' && (
          <p className="text-meta text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {formatPrice(product.price, product.currency)}
          </p>
        )}
        {product.availability !== 'available' && (
          <p
            className={cn(
              'text-meta',
              product.availability === 'sold_out' ? 'text-muted' : 'text-accent',
            )}
          >
            {availabilityLabel(product.availability)}
          </p>
        )}
      </div>
    </div>
  )
}
