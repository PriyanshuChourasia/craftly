import { Link } from '@tanstack/react-router'
import { Reveal, Stagger, staggerItem } from '@/components/animations/Reveal'
import { motion } from 'motion/react'
import { formatPrice } from '@/lib/format'
import { padNumber } from '@/lib/utils'
import type { Product } from '@/types/product'
import { ProductImage } from '@/components/products/ProductImage'

/**
 * A ruled index of the archive — rows, not cards. Hovering a row reveals
 * a floating thumbnail, like flipping through a paper catalogue.
 */
export function ArchivePreview({ products }: { products: Product[] }) {
  return (
    <section aria-label="Collection preview" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <div className="mb-14 flex items-end justify-between">
            <h2 className="font-display text-display-lg">Collection</h2>
            <p className="text-meta text-muted">{products.length} products</p>
          </div>
        </Reveal>

        <Stagger>
          <ul>
            {products.map((p, i) => (
              <motion.li
                key={p.id}
                variants={staggerItem}
                className="group border-t border-border/50 last:border-b"
              >
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  data-cursor="view"
                  className="relative grid grid-cols-12 items-center gap-4 py-6 transition-colors md:py-8"
                >
                  <span className="text-meta col-span-2 text-muted md:col-span-1">
                    {padNumber(i + 1)}
                  </span>
                  <span className="font-display col-span-8 text-xl tracking-wide transition-transform duration-300 group-hover:translate-x-3 md:col-span-5 md:text-3xl">
                    {p.name}
                  </span>
                  <span className="text-meta col-span-4 hidden text-foreground-secondary md:col-span-3 md:block">
                    {p.category}
                  </span>
                  <span className="text-meta col-span-2 hidden text-right md:col-span-2 md:block">
                    {formatPrice(p.price, p.currency)}
                  </span>
                  <span className="text-meta col-span-2 text-right text-muted transition-transform duration-300 group-hover:-translate-x-2 md:col-span-1">
                    ↗
                  </span>

                  {/* floating thumbnail on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[18%] top-1/2 z-30 hidden w-44 -translate-y-1/2 rotate-2 border border-border bg-paper opacity-0 shadow-[var(--shadow-frame)] transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100 lg:block"
                  >
                    <ProductImage
                      image={p.images[0] ?? { id: '', url: p.primaryImage ?? '', alt: p.name, order: 0 }}
                      objectFit="cover"
                      sizes="220px"
                    />
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </Stagger>
      </div>
    </section>
  )
}
