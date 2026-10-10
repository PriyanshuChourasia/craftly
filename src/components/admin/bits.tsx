import { Link } from '@tanstack/react-router'
import { formatPrice } from '@/lib/format'
import type { Product } from '@/types/product'
import { ProductImage } from '@/components/products/ProductImage'

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-border bg-paper/50 p-4 ${className ?? ''}`}>{children}</div>
  )
}

export function StatValue({ value }: { value: number }) {
  return <p className="font-display mt-2 text-3xl leading-none">{value}</p>
}

export function RecentProducts({ products }: { products: Product[] }) {
  return (
    <ul className="divide-y divide-border/40">
      {products.map((p) => (
        <li key={p.id} className="flex items-center gap-3 py-2.5">
          <div className="size-10 border border-border/50 overflow-hidden">
            <ProductImage
              image={p.images[0] ?? { id: '', url: p.primaryImage ?? '', alt: p.name, order: 0 }}
              sizes="80px"
              aspect="1/1"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Link
              to="/admin/products/$id/edit"
              params={{ id: p.id }}
              className="block truncate text-sm font-medium hover:underline"
            >
              {p.name}
            </Link>
            <p className="text-meta text-muted">
              {p.category} / {p.year}
            </p>
          </div>
          <p className="text-meta">{formatPrice(p.price, p.currency)}</p>
        </li>
      ))}
      {products.length === 0 && <li className="text-meta py-6 text-center text-muted">No products yet</li>}
    </ul>
  )
}
