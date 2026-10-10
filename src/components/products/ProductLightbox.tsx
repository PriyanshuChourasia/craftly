import { useCallback, useEffect } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ProductImage } from '@/types/product'

/**
 * Fullscreen, near-black lightbox. Escape closes; arrows navigate.
 * Built directly on Radix Dialog primitives for a11y.
 */
export function ProductLightbox({
  images,
  index,
  open,
  onOpenChange,
  onIndexChange,
}: {
  images: ProductImage[]
  index: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onIndexChange: (i: number) => void
}) {
  const reduced = useReducedMotion()

  const next = useCallback(
    () => onIndexChange((index + 1) % images.length),
    [index, images.length, onIndexChange],
  )
  const prev = useCallback(
    () => onIndexChange((index - 1 + images.length) % images.length),
    [index, images.length, onIndexChange],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, next, prev])

  const image = images[index]

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[120] bg-[#080808]/95 backdrop-blur-sm" />
        <DialogPrimitive.Content
          aria-label={`Image viewer, image ${index + 1} of ${images.length}`}
          className="fixed inset-0 z-[120] flex flex-col focus:outline-none"
        >
          {/* top bar */}
          <div className="flex items-center justify-between px-5 py-4 text-[#f3ecea]">
            <p className="text-meta">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </p>
            <DialogPrimitive.Close
              aria-label="Close lightbox"
              className="flex size-10 items-center justify-center border border-[#f3ecea]/20 transition-colors hover:border-[#f3ecea]/60 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </div>

          {/* image */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center border border-[#f3ecea]/20 text-[#f3ecea] transition-colors hover:border-[#f3ecea]/60 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={image?.url}
                src={image?.url}
                alt={image?.alt}
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-full max-w-full object-contain"
              />
            </AnimatePresence>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center border border-[#f3ecea]/20 text-[#f3ecea] transition-colors hover:border-[#f3ecea]/60 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          {/* caption */}
          <p className="pb-8 text-center text-meta text-[#f3ecea]/60">{image?.alt}</p>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
