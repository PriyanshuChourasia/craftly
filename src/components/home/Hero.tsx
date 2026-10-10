import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { formatPrice } from '@/lib/format'
import type { Product, ProductImage } from '@/types/product'

const EASE = [0.22, 1, 0.36, 1] as const

/** Mosaic layout: 4 columns × 3 rows on desktop, 2 columns on mobile. */
const TILES = [
  'col-span-2 row-span-2 md:col-span-2 md:row-span-2',
  'col-span-1 row-span-1 md:col-span-1 md:row-span-2',
  'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
  'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
  'col-span-1 row-span-1 md:col-span-2 md:row-span-1',
  'col-span-2 row-span-1 md:col-span-2 md:row-span-1',
]

/** Pick 6 distinct images: first image of each product, then extra images to fill. */
function pickImages(products: Product[]): ProductImage[] {
  const firsts = products.map((p) => p.images[0]).filter(Boolean) as ProductImage[]
  const rest = products.flatMap((p) => p.images.slice(1))
  const seen = new Set<string>()
  return [...firsts, ...rest]
    .filter((img) => img.url && !seen.has(img.url) && seen.add(img.url))
    .slice(0, TILES.length)
}

export function Hero({ products }: { products: Product[] }) {
  const images = pickImages(products)

  return (
    <section aria-label="SB Creation" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-dark">
      {/* Background image mosaic */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 grid-rows-4 gap-1.5 p-1.5 md:grid-cols-4 md:grid-rows-3 md:gap-2 md:p-2"
      >
        {images.map((img, i) => (
          <motion.div
            key={img.url}
            className={`relative overflow-hidden ${TILES[i]}`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1 + i * 0.1, ease: EASE }}
          >
            <img
              src={img.url}
              alt=""
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover"
            />
            {/* Per-tile inner shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.55)]" />
          </motion.div>
        ))}
      </div>

      {/* Overall shadow so the title stays readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.7)_100%)]"
      />

      <motion.h1
        className="text-display-md absolute left-5 top-6 z-20 text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)] md:left-10 md:top-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
      >
        SB Creation
      </motion.h1>

      <motion.div
        className="relative z-10 flex h-full items-center justify-center px-5 pt-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
      >
        {products.length > 0 && <PriceSlider products={products} />}
      </motion.div>
    </section>
  )
}

const SLIDE_MS = 4000

/** Centered auto-advancing product slide with name and price. */
function PriceSlider({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const count = products.length
  const product = products[index % count]!
  const image = product.images[0]

  const go = (step: number) => setIndex((i) => (i + step + count) % count)

  useEffect(() => {
    if (paused || reduced || count < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), SLIDE_MS)
    return () => clearInterval(id)
  }, [paused, reduced, count])

  return (
    <div
      className="w-full max-w-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured products"
    >
      {/* Slides stack in one grid cell so the outgoing and incoming slide crossfade */}
      <div className="relative grid">
        <AnimatePresence initial={false}>
          <motion.div
            key={product.id}
            className="[grid-area:1/1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          >
            <Link
              to="/products/$slug"
              params={{ slug: product.slug }}
              data-cursor="view"
              className="group block outline-none"
              aria-label={`${product.name} — ${formatPrice(product.price, product.currency)}`}
            >
              {/* Gallery frame: gilded moulding → dark fillet → cream mat → artwork */}
              <div className="rounded-[2px] bg-[linear-gradient(135deg,#f3dc9a_0%,#b8862f_22%,#f7e3a6_45%,#8a5f1c_70%,#d9b462_100%)] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,240,200,0.6),inset_0_2px_3px_rgba(255,255,255,0.5),inset_0_-3px_6px_rgba(60,35,5,0.6)] md:p-4">
                <div className="bg-[#2a1c0c] p-[3px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)]">
                  <div className="bg-[#f6f0e4] p-4 shadow-[inset_0_0_0_1px_rgba(180,150,100,0.35),inset_0_6px_14px_rgba(0,0,0,0.18)] md:p-6">
                    <div className="relative aspect-[4/3] overflow-hidden shadow-[0_0_0_1px_rgba(120,90,40,0.35),0_2px_6px_rgba(0,0,0,0.25)]">
                      {image && (
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      {/* Name + price revealed on hover (always shown on touch screens) */}
                      <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-10 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                        <p className="font-display min-w-0 truncate text-2xl text-white">{product.name}</p>
                        <p className="shrink-0 text-base font-semibold text-[#f3dc9a]">
                          {formatPrice(product.price, product.currency)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous product"
              className="absolute left-0 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-colors hover:bg-white md:-translate-x-[130%]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next product"
              className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-colors hover:bg-white md:translate-x-[130%]"
            >
              →
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-5 flex justify-center gap-2">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${p.name}`}
              aria-current={i === index ? 'true' : undefined}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
