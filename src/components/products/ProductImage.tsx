import { cn } from '@/lib/utils'
import type { ProductImage as ProductImageType } from '@/types/product'

type ProductImageProps = {
  image: ProductImageType
  priority?: boolean
  aspect?: string
  objectFit?: 'contain' | 'cover'
  sizes?: string
  className?: string
}

export function ProductImage({
  image,
  priority = false,
  aspect = '4/5',
  objectFit = 'cover',
  sizes = '100vw',
  className,
}: ProductImageProps) {
  return (
    <div
      className={cn('relative overflow-hidden', aspect)}
      style={objectFit === 'contain' && image.url ? { background: 'transparent' } : undefined}
    >
      <img
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        sizes={sizes}
        className={cn(
          'h-full w-full transition-transform duration-700 ease-out',
          objectFit === 'cover' ? 'object-cover' : 'object-contain',
          className,
        )}
        onError={(e) => {
          // eslint-disable-next-line no-console
          console.warn('Product image failed to load:', image.url)
          const target = e.currentTarget as HTMLImageElement
          target.src = ''
          target.alt = image.alt
          target.style.display = 'none'
        }}
      />
      {!image.url && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center text-muted',
            aspect,
          )}
          aria-hidden="true"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      )}
    </div>
  )
}
