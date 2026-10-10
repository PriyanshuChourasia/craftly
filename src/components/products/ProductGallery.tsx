import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Expand } from 'lucide-react'
import { ProductLightbox } from './ProductLightbox'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/types/product'

/**
 * Exhibition-room image gallery.
 * Desktop: large image + thumbnail column, subtle cursor-driven tilt.
 * Mobile: swipeable horizontal carousel.
 */
export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const reduced = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)

  const active = images[index] ?? images[0]
  if (!active) return null

  // Subtle depth: image rotates away from the cursor.
  const onMove = (e: React.MouseEvent) => {
    if (reduced || !stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    stageRef.current.style.transform = `perspective(1400px) rotateY(${px * -5}deg) rotateX(${py * 4}deg)`
  }
  const onLeave = () => {
    if (stageRef.current)
      stageRef.current.style.transform = 'perspective(1400px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div>
      {/* main stage */}
      <div
        className="preserve-3d relative [transition:transform_.5s_cubic-bezier(.22,1,.36,1)]"
        ref={stageRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <button
          type="button"
          data-cursor="open"
          onClick={() => setLightboxOpen(true)}
          aria-label="Open fullscreen image viewer"
          className="group relative block w-full cursor-pointer border border-border bg-paper text-left shadow-[var(--shadow-frame-lg)] focus-visible:outline-2 focus-visible:outline-accent"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.url}
                className="aspect-[4/5] w-full overflow-hidden"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.04, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={active.url}
                  alt={active.alt}
                  width={active.width}
                  height={active.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    // eslint-disable-next-line no-console
                    console.warn('Product gallery image failed to load:', active.url)
                    const target = e.currentTarget as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <span className="text-meta absolute bottom-3 right-3 flex items-center gap-1.5 border border-border bg-background/80 px-2 py-1 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <Expand aria-hidden="true" className="size-3" /> Open
          </span>
        </button>
      </div>

      {/* desktop thumbnails */}
      <div className="mt-4 hidden gap-3 md:flex" role="tablist" aria-label="Product views">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`View image ${i + 1}: ${img.alt}`}
            onClick={() => setIndex(i)}
            className={cn(
              'aspect-[4/5] w-20 overflow-hidden border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent',
              i === index
                ? 'border-foreground opacity-100'
                : 'border-border-soft opacity-60 hover:opacity-100',
            )}
          >
            <img src={img.url} alt="" loading="lazy" className="h-full w-full object-cover" onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.display = 'none' }} />
          </button>
        ))}
      </div>

      {/* mobile carousel */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`View image ${i + 1}: ${img.alt}`}
            aria-current={i === index}
            className={cn(
              'aspect-[4/5] w-16 shrink-0 overflow-hidden border',
              i === index ? 'border-foreground' : 'border-border-soft opacity-60',
            )}
          >
            <img src={img.url} alt="" loading="lazy" className="h-full w-full object-cover" onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.display = 'none' }} />
          </button>
        ))}
      </div>

      <ProductLightbox
        images={images}
        index={index}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onIndexChange={setIndex}
      />
    </div>
  )
}
