import { useRef, useState } from 'react'
import { UploadCloud, Trash2, Star, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { imageStorage, MAX_FILE_SIZE_MB } from '@/lib/image/image-storage'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/types/product'

type DraftImage = Omit<ProductImage, 'id' | 'order'>

/**
 * Reusable image uploader: drag & drop or browse, multi-select,
 * preview, remove, reorder, set primary. Validates type + size and
 * persists through the ImageStorage abstraction (local mock for now).
 */
export function ImageUploader({
  images,
  onChange,
}: {
  images: DraftImage[]
  onChange: (images: DraftImage[]) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [busy, setBusy] = useState(false)

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return
    setBusy(true)
    setErrors([])
    const nextErrors: string[] = []
    const uploaded: DraftImage[] = []
    for (const file of Array.from(files)) {
      const error = (imageStorage as { validate?: (f: File) => string | null }).validate?.(file)
      if (error) {
        nextErrors.push(`${file.name}: ${error}`)
        continue
      }
      try {
        const result = await imageStorage.upload(file)
        uploaded.push({ url: result.url, alt: file.name.replace(/\.[^.]+$/, ''), width: result.width, height: result.height })
      } catch {
        nextErrors.push(`${file.name}: upload failed`)
      }
    }
    if (nextErrors.length) setErrors(nextErrors)
    if (uploaded.length) onChange([...images, ...uploaded])
    setBusy(false)
  }

  const remove = (i: number) => {
    const next = [...images]
    next.splice(i, 1)
    onChange(next)
  }

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= images.length) return
    const next = [...images]
    ;[next[i], next[j]] = [next[j]!, next[i]!]
    onChange(next)
  }

  const setPrimary = (i: number) => {
    const next = [...images]
    const [picked] = next.splice(i, 1)
    if (picked) onChange([picked, ...next])
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload images"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          void handleFiles(e.dataTransfer.files)
        }}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed px-6 py-10 text-center transition-colors',
          dragging ? 'border-accent bg-accent/5' : 'border-border hover:border-foreground',
        )}
      >
        {busy ? (
          <Loader2 className="size-5 animate-spin text-muted" aria-hidden="true" />
        ) : (
          <UploadCloud className="size-5 text-muted" aria-hidden="true" />
        )}
        <p className="text-sm">Drag & drop images here, or click to browse</p>
        <p className="text-meta text-muted">
          JPEG · PNG · WebP · AVIF — max {MAX_FILE_SIZE_MB}MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          className="sr-only"
          onChange={(e) => {
            void handleFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      {errors.length > 0 && (
        <ul role="alert" className="mt-3 space-y-1">
          {errors.map((e) => (
            <li key={e} className="text-xs text-accent">
              {e}
            </li>
          ))}
        </ul>
      )}

      {images.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Uploaded images">
          {images.map((img, i) => (
            <li key={`${img.url}-${i}`} className="group relative border border-border/60">
              <img src={img.url} alt={img.alt} className="aspect-square w-full object-cover" />
              {i === 0 && (
                <span className="text-meta absolute left-1.5 top-1.5 bg-dark px-1.5 py-0.5 text-[9px] text-[#f3ecea]">
                  Primary
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/90 px-1 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex gap-0.5">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move earlier" className="p-1 text-muted hover:text-foreground disabled:opacity-30">
                    <ArrowLeft className="size-3" />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === images.length - 1} aria-label="Move later" className="p-1 text-muted hover:text-foreground disabled:opacity-30">
                    <ArrowRight className="size-3" />
                  </button>
                </div>
                <div className="flex gap-0.5">
                  <button type="button" onClick={() => setPrimary(i)} disabled={i === 0} aria-label="Set as primary" className="p-1 text-muted hover:text-accent disabled:opacity-30">
                    <Star className="size-3" />
                  </button>
                  <button type="button" onClick={() => remove(i)} aria-label="Remove image" className="p-1 text-muted hover:text-accent">
                    <Trash2 className="size-3" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
