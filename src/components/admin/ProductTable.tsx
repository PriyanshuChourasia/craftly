import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Copy, ExternalLink, Eye, Star, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge, Checkbox } from '@/components/ui/misc'
import { deleteProductFn, duplicateProductFn, toggleFeaturedFn } from '@/lib/products/api'
import { formatPrice, availabilityLabel } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/product'
import { ProductImage } from '@/components/products/ProductImage'

const PAGE_SIZE = 8
type SortKey = 'name' | 'category' | 'year' | 'price' | 'updatedAt'

export function ProductTable({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | Product['availability'] | 'draft'>('all')
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt')
  const [sortAsc, setSortAsc] = useState(false)
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    let list = [...products]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter((p) =>
        [p.name, p.category, p.brand, String(p.year), ...p.tags].join(' ').toLowerCase().includes(q),
      )
    }
    if (statusFilter === 'draft') list = list.filter((p) => !p.published)
    else if (statusFilter !== 'all') list = list.filter((p) => p.availability === statusFilter)
    list.sort((a, b) => {
      const dir = sortAsc ? 1 : -1
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir
      return String(av ?? '').localeCompare(String(bv ?? '')) * dir
    })
    return list
  }, [products, query, statusFilter, sortKey, sortAsc])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v)
    else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const bulkDelete = async () => {
    if (selected.size === 0) return
    if (!window.confirm(`Delete ${selected.size} object(s)? This cannot be undone.`)) return
    for (const id of selected) await deleteProductFn({ data: id })
    toast.success(`${selected.size} object(s) deleted`)
    setSelected(new Set())
  }

  const onToggleFeatured = async (p: Product) => {
    await toggleFeaturedFn({ data: p.id })
    toast.success(p.featured ? `${p.name} removed from featured` : `${p.name} featured`)
  }

  const onDuplicate = async (p: Product) => {
    const copy = await duplicateProductFn({ data: p.id })
    toast.success(copy ? `Duplicated as “${copy.name}”` : 'Duplicate failed')
  }

  const onDelete = async (p: Product) => {
    if (!window.confirm(`Delete "${p.name}"? This cannot be undone.`)) return
    await deleteProductFn({ data: p.id })
    toast.success(`${p.name} deleted`)
  }

  return (
    <div>
      {/* controls */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setPage(0)
          }}
          placeholder="Search products…"
          aria-label="Search products"
          className="h-9 w-56 border border-border bg-transparent px-3 text-sm placeholder:text-muted focus:border-foreground focus:outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as typeof statusFilter)
            setPage(0)
          }}
          aria-label="Filter by status"
          className="h-9 border border-border bg-transparent px-2 text-sm focus:border-foreground focus:outline-none"
        >
          <option value="all">All statuses</option>
          <option value="available">Available</option>
          <option value="sold_out">Sold out</option>
          <option value="coming_soon">Coming soon</option>
          <option value="draft">Drafts</option>
        </select>
        {selected.size > 0 && (
          <Button variant="destructive" size="sm" onClick={bulkDelete}>
            Delete {selected.size}
          </Button>
        )}
        <p className="text-meta ml-auto text-muted" aria-live="polite">
          {filtered.length} products
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                aria-label="Select all on page"
                checked={pageItems.length > 0 && pageItems.every((p) => selected.has(p.id))}
                onCheckedChange={(v) =>
                  setSelected((prev) => {
                    const next = new Set(prev)
                    for (const p of pageItems) {
                      if (v) next.add(p.id)
                      else next.delete(p.id)
                    }
                    return next
                  })
                }
              />
            </TableHead>
            <TableHead className="w-14">Image</TableHead>
            <TableHead>
              <SortHead label="Product" active={sortKey === 'name'} asc={sortAsc} onClick={() => toggleSort('name')} />
            </TableHead>
            <TableHead>
              <SortHead label="Category" active={sortKey === 'category'} asc={sortAsc} onClick={() => toggleSort('category')} />
            </TableHead>
            <TableHead>
              <SortHead label="Year" active={sortKey === 'year'} asc={sortAsc} onClick={() => toggleSort('year')} />
            </TableHead>
            <TableHead>
              <SortHead label="Price" active={sortKey === 'price'} asc={sortAsc} onClick={() => toggleSort('price')} />
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Featured</TableHead>
            <TableHead>
              <SortHead label="Updated" active={sortKey === 'updatedAt'} asc={sortAsc} onClick={() => toggleSort('updatedAt')} />
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageItems.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <Checkbox
                  aria-label={`Select ${p.name}`}
                  checked={selected.has(p.id)}
                  onCheckedChange={() => toggleSelect(p.id)}
                />
              </TableCell>
              <TableCell>
                <div className="size-10 border border-border/50 overflow-hidden">
                  <ProductImage
                    image={p.images[0] ?? { id: '', url: p.primaryImage ?? '', alt: p.name, order: 0 }}
                    sizes="80px"
                    aspect="1/1"
                  />
                </div>
              </TableCell>
              <TableCell>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-meta text-muted">{p.slug}</p>
              </TableCell>
              <TableCell className="text-sm">{p.category}</TableCell>
              <TableCell className="text-sm">{p.year}</TableCell>
              <TableCell className="text-sm">{formatPrice(p.price, p.currency)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    p.availability === 'available'
                      ? 'default'
                      : p.availability === 'coming_soon'
                        ? 'accent'
                        : 'muted'
                  }
                >
                  {availabilityLabel(p.availability)}
                </Badge>
                {!p.published && (
                  <Badge variant="outline" className="ml-1.5">
                    Draft
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-center">
                <button
                  type="button"
                  onClick={() => onToggleFeatured(p)}
                  aria-label={p.featured ? `Unfeature ${p.name}` : `Feature ${p.name}`}
                  className={cn(
                    'inline-flex size-7 items-center justify-center transition-colors',
                    p.featured ? 'text-accent' : 'text-muted hover:text-foreground',
                  )}
                >
                  <Star className={cn('size-4', p.featured && 'fill-current')} />
                </button>
              </TableCell>
              <TableCell className="text-meta text-muted">
                {new Date(p.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button asChild variant="ghost" size="icon" aria-label={`View ${p.name} on site`}>
                    <Link to="/products/$slug" params={{ slug: p.slug }}>
                      <Eye className="size-3.5" />
                    </Link>
                  </Button>
                  {p.buyUrl && (
                    <Button asChild variant="ghost" size="icon" aria-label="Open store page">
                      <a href={p.buyUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-3.5" />
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" aria-label={`Duplicate ${p.name}`} onClick={() => onDuplicate(p)}>
                    <Copy className="size-3.5" />
                  </Button>
                  <Button asChild variant="ghost" size="icon" aria-label={`Edit ${p.name}`}>
                    <Link to="/admin/products/$id/edit" params={{ id: p.id }}>
                      <span aria-hidden="true" className="text-meta px-0.5">Edit</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" aria-label={`Delete ${p.name}`} onClick={() => onDelete(p)}>
                    <Trash2 className="size-3.5 text-accent" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {pageItems.length === 0 && (
            <TableRow>
              <TableCell colSpan={10} className="py-16 text-center">
                <p className="font-display text-xl text-foreground/30">No products found</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* pagination */}
      {pageCount > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-meta text-muted">
            Page {page + 1} / {pageCount}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pageCount - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function SortHead({
  label,
  active,
  asc,
  onClick,
}: {
  label: string
  active: boolean
  asc: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'text-meta inline-flex items-center gap-1 uppercase transition-colors hover:text-foreground',
        active && 'text-foreground',
      )}
      aria-label={`Sort by ${label}`}
    >
      {label}
      <span aria-hidden="true" className="text-[9px]">
        {active ? (asc ? '↑' : '↓') : '↕'}
      </span>
    </button>
  )
}
