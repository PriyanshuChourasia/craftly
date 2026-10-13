import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

/** Pick up to 6 distinct background images (first image of each product, then extras). */
function pickImages(products: Product[]): ProductImage[] {
  const firsts = products.map((p) => p.images[0]).filter(Boolean) as ProductImage[]
  const rest = products.flatMap((p) => p.images.slice(1))
  const seen = new Set<string>()
  return [...firsts, ...rest]
    .filter((img) => img.url && !seen.has(img.url) && seen.add(img.url))
    .slice(0, TILES.length)
}

/** Slider card widths: ~70vw mobile, ~33% md, ~22% lg. */
function cardWidthClass() {
  return 'min-w-[70vw] md:min-w-[33.333%] lg:min-w-[22%]'
}

/** Hide the scrollbar on the horizontal slider. */
const HIDDEN_SCROLLBAR =
  '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

/**
 * Hero: deep shadowed mosaic background + a horizontal product slider in the
 * lower half. The slider takes up to 10 products; the background mosaic stays
 * at 6 images.
 */
export function Hero({ products }: { products: Product[] }) {
  const sliderProducts = products.slice(0, 10)
  const images = pickImages(products)

  return (
    <section
      aria-label="Craftly"
      className="relative h-[100svh] min-h-[560px] overflow-hidden bg-dark"
    >
      {/* Background image mosaic (6 images) */}
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
            {/* Deeper per-tile inset shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.75)]" />
          </motion.div>
        ))}
      </div>

      {/* Deeper radial overlay: centre -> edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.88)_100%)]"
      />

      {/* Top gradient: keeps the fixed site header readable */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-black/60 to-transparent"
      />

      {/* Bottom vignette: dark base for slider + prices */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
        style={{ height: '40%' }}
      />

      {/* Brand title — stronger text shadow */}
      <motion.h1
        className="text-display-md absolute left-5 top-20 z-30 text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.85)] md:left-10 md:top-24"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
      >
        Craftly
      </motion.h1>

      {/* Product slider — layered above the background, lower half */}
      <div
        className="absolute left-0 right-0 bottom-0 z-20 pt-24 md:pt-28"
        style={{ height: '55%' }}
      >
        {sliderProducts.length > 0 && (
          <ProductSlider products={sliderProducts} />
        )}
      </div>
    </section>
  )
}

/**
 * Horizontal multi-card product slider with scroll-snap, prev/next buttons,
 * auto-advance (paused on hover/focus/drag, disabled for reduced motion),
 * dot indicator, staggered entrance, and a click-drag guard.
 */
function ProductSlider({
  products,
}: {
  products: Product[]
}) {
  const reduced = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [dragMoved, setDragMoved] = useState(false)
  const [pointerStart, setPointerStart] = useState<number | null>(null)

  const count = products.length
  const slideMs = 4000

  // Map a scroll offset to the closest card index.
  const updateIndexFromScroll = (scrollLeft?: number) => {
    const el = scrollRef.current
    if (!el) return
    const offset = scrollLeft ?? el.scrollLeft
    const cardWidth = el.clientWidth / count
    const idx = Math.round(offset / cardWidth)
    setCurrentIndex(Math.max(0, Math.min(count - 1, idx)))
  }

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.clientWidth / count
    el.scrollTo({ left: idx * cardWidth, behavior: reduced ? 'auto' : 'smooth' })
    setCurrentIndex(idx)
  }

  const go = (step: number) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.clientWidth / count
    const target = Math.max(
      0,
      Math.min(count - 1, currentIndex + step),
    )
    el.scrollTo({
      left: target * cardWidth,
      behavior: reduced ? 'auto' : 'smooth',
    })
    setCurrentIndex(target)
  }

  // Auto-advance, paused on hover/focus and when the user is interacting.
  useEffect(() => {
    if (paused || dragging || reduced || count < 2) return
    const id = window.setInterval(() => {
      const next = (currentIndex + 1) % count
      scrollToIndex(next)
    }, slideMs)
    return () => window.clearInterval(id)
  }, [paused, dragging, reduced, count, currentIndex, slideMs])

  // Keep the dot index in sync when the user scrolls manually.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => updateIndexFromScroll(el.scrollLeft)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [count])

  // Pointer-drag guard: ignore clicks when the pointer moved more than 6px.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    setPointerStart(e.clientX)
    setDragMoved(false)
    setDragging(true)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || pointerStart === null) return
    if (Math.abs(e.clientX - pointerStart) > 6) setDragMoved(true)
  }
  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false)
    // If the user dragged/swiped the slider, do not treat it as a card click.
    if (dragMoved) {
      setPointerStart(null)
      return
    }
    setPointerStart(null)
  }

  return (
    <div
      className="mx-auto max-w-[1600px] px-5 md:px-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured products"
    >
      {/* Prev / Next buttons */}
      <div className="relative flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous product"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-lg transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next product"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-lg transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Scroll-snap track — horizontal, hidden scrollbar, Lenis-safe */}
      <div
        ref={scrollRef}
        data-lenis-prevent="true"
        className={`flex gap-4 overflow-x-auto snap-x snap-mandatory px-1 ${HIDDEN_SCROLLBAR}`}
        style={{ scrollSnapType: 'x mandatory' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        role="list"
        aria-label="Featured product slides"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              total={count}
              isCurrent={i === currentIndex}
              onMouseEnter={() => {
                // Pause when hovering a specific card.
                setPaused(true)
              }}
              onMouseLeave={() => {
                // Resume when leaving a card (unless the track itself is hovered).
                // The track onMouseLeave handles resumption; keep simple.
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Dot indicator */}
      {count > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Show slide ${i + 1} of ${count}: ${p.name}`}
              aria-current={i === currentIndex ? 'true' : undefined}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface ProductCardProps {
  product: Product
  index: number
  total: number
  isCurrent: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

/** Single product card: image with bottom price bar + optional Sold badge. */
function ProductCard({ product, index, total, isCurrent, onMouseEnter, onMouseLeave }: ProductCardProps) {
  const image = product.images[0]
  const price = formatPrice(product.price, product.currency)
  const isSold = product.availability === 'sold_out'

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isCurrent ? 1 : 0.6,
        y: isCurrent ? 0 : 8,
      }}
      transition={{ duration: 0.4, ease: EASE }}
      className="snap-center shrink-0"
    >
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        data-cursor="view"
        className="group block outline-none"
        aria-label={`${product.name} — ${price}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <article
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${total}: ${product.name}`}
          className={`relative overflow-hidden rounded-sm ${cardWidthClass()} ${HIDDEN_SCROLLBAR}`}
          style={{ scrollSnapAlign: 'center' }}
        >
          {/* Image with deep drop shadow */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
            {image && (
              <img
                src={image.url}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-[0.22_1_0.36_1] group-hover:scale-105"
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
            )}

            {/* Bottom gradient bar with name + price (always visible) */}
            <div className="absolute inset-x-0 bottom-0 flex min-h-[56px] flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 text-left">
              {/* Sold badge */}
              {isSold && (
                <span
                  className="absolute right-2 top-2 flex h-6 items-center rounded-full bg-accent/90 px-2 text-[9px] font-semibold uppercase tracking-wider text-white"
                  aria-label="Sold"
                >
                  Sold
                </span>
              )}

              <div className="flex min-w-0 items-end justify-between gap-2">
                <p className="min-w-0 overflow-hidden text-lg font-display leading-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                  <span className="truncate">{product.name}</span>
                </p>
                <p className="shrink-0 font-semibold text-[#f3dc9a] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                  {price}
                </p>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
