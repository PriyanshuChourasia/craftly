import { Link } from '@tanstack/react-router'
import { Reveal } from '@/components/animations/Reveal'
import { BuyButton } from '@/components/products/BuyButton'
import { formatPrice, availabilityLabel } from '@/lib/format'
import { padNumber } from '@/lib/utils'
import { useReducedMotion } from '@/hooks'
import { motion } from 'motion/react'
import type { Product } from '@/types/product'
import { ProductImage } from '@/components/products/ProductImage'

/**
 * The centerpiece: ~60% image / 40% content on desktop,
 * image-first stacked layout on mobile.
 */
export function FeaturedProduct({ product, index = 0 }: { product: Product; index?: number }) {
  const reduced = useReducedMotion()

  const imageAnim = reduced
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
    : {
        initial: { opacity: 0, scale: 0.85, y: 60 },
        whileInView: { opacity: 1, scale: 1, y: 0 },
      }
  const textAnim = reduced
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
    : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } }

  return (
    <section aria-label="Featured object" className="relative overflow-hidden py-24 md:py-40">
      <span
        aria-hidden="true"
        className="bg-type absolute -right-10 top-8 text-[24vw] opacity-[0.03]"
      >
        {padNumber(index + 1)}
      </span>

      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 md:grid-cols-12 md:gap-6 md:px-10">
        {/* Image — 60% */}
        <motion.div
          {...imageAnim}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:col-span-7"
        >
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            data-cursor="view"
            aria-label={`View ${product.name}`}
            className="group relative block"
          >
            <div className="border border-border bg-paper shadow-[var(--shadow-frame-lg)]">
              <div className="aspect-[4/5] overflow-hidden md:aspect-[5/6]">
                <ProductImage
                  image={product.images[0] ?? { id: '', url: product.primaryImage ?? '', alt: product.name, order: 0 }}
                  priority
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
            {/* overlapping frame accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -left-6 -z-10 h-full w-full border border-border/60"
            />
          </Link>
          <p className="text-meta mt-4 text-muted">
            Fig. {padNumber(index + 1)} — featured object
          </p>
        </motion.div>

        {/* Content — 40% */}
        <motion.div
          {...textAnim}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-4 md:col-start-9"
        >
          <Reveal direction="none" delay={0.1}>
            <p className="text-meta text-accent">Featured object</p>
          </Reveal>
          <h2 className="font-display text-display-md mt-4 leading-[0.95]">{product.name}</h2>
          <div className="mt-4 flex items-center gap-4 text-meta text-muted">
            <span title="Category">{product.category}</span>
            <span className="text-accent">{availabilityLabel(product.availability)}</span>
          </div>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-foreground-secondary">
            {product.shortDescription}
          </p>
          <p className="font-display mt-8 text-3xl">{formatPrice(product.price, product.currency)}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BuyButton href={product.buyUrl} sellerName={product.sellerName} />
            <Link
              to="/products/$slug"
              params={{ slug: product.slug }}
              className="text-meta link-underline-hover text-foreground-secondary transition-colors hover:text-foreground"
            >
              View object →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
