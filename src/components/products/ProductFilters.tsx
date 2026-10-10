import { useEffect, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input, Label } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'
import type { Availability } from '@/types/product'

export type FilterState = {
  q: string
  category?: string
  brand?: string
  min?: number
  max?: number
  availability?: Availability
}

const AVAILABILITY_OPTIONS: Array<{ value: Availability; label: string }> = [
  { value: 'available', label: 'Available' },
  { value: 'sold_out', label: 'Sold' },
  { value: 'coming_soon', label: 'Coming soon' },
]

function FilterFields({
  value,
  onChange,
  facets,
  priceOnly = false,
}: {
  value: FilterState
  onChange: (next: FilterState) => void
  facets: { categories: string[]; brands: string[] }
  priceOnly?: boolean
}) {
  const [minText, setMinText] = useState(value.min?.toString() ?? '')
  const [maxText, setMaxText] = useState(value.max?.toString() ?? '')
  useEffect(() => {
    setMinText(value.min?.toString() ?? '')
    setMaxText(value.max?.toString() ?? '')
  }, [value.min, value.max])

  const commitPrice = () => {
    onChange({
      ...value,
      min: minText === '' ? undefined : Math.max(0, Number(minText) || 0),
      max: maxText === '' ? undefined : Math.max(0, Number(maxText) || 0),
    })
  }

  return (
    <div className="grid gap-5">
      <div>
        <Label htmlFor="filter-min">Price min</Label>
        <Input
          id="filter-min"
          inputMode="numeric"
          placeholder={formatPrice(0)}
          value={minText}
          onChange={(e) => setMinText(e.target.value.replace(/[^\d]/g, ''))}
          onBlur={commitPrice}
          onKeyDown={(e) => e.key === 'Enter' && commitPrice()}
        />
      </div>
      <div>
        <Label htmlFor="filter-max">Price max</Label>
        <Input
          id="filter-max"
          inputMode="numeric"
          placeholder={formatPrice(100000)}
          value={maxText}
          onChange={(e) => setMaxText(e.target.value.replace(/[^\d]/g, ''))}
          onBlur={commitPrice}
          onKeyDown={(e) => e.key === 'Enter' && commitPrice()}
        />
      </div>
      {priceOnly ? null : (
        <>
          <div>
            <Label>Category</Label>
            <Select
              value={value.category ?? 'all'}
              onValueChange={(v) => onChange({ ...value, category: v === 'all' ? undefined : v })}
            >
              <SelectTrigger aria-label="Category">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {facets.categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Brand</Label>
            <Select
              value={value.brand ?? 'all'}
              onValueChange={(v) => onChange({ ...value, brand: v === 'all' ? undefined : v })}
            >
              <SelectTrigger aria-label="Brand">
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All brands</SelectItem>
                {facets.brands.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Availability</Label>
            <Select
              value={value.availability ?? 'all'}
              onValueChange={(v) =>
                onChange({ ...value, availability: v === 'all' ? undefined : (v as Availability) })
              }
            >
              <SelectTrigger aria-label="Availability">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {AVAILABILITY_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  )
}

/** Desktop: floating horizontal controls. Mobile: dialog. */
export function ProductFilters({
  value,
  onChange,
  facets,
  resultCount,
}: {
  value: FilterState
  onChange: (next: FilterState) => void
  facets: { categories: string[]; brands: string[] }
  resultCount: number
}) {
  // Keep category as a first-class filter even though the backend
  // still supports other filters; we intentionally drop year here.
  return (
    <FilterShell value={value} onChange={onChange} facets={facets} resultCount={resultCount} />
  )
}

function FilterShell({
  value,
  onChange,
  facets,
  resultCount,
}: {
  value: FilterState
  onChange: (next: FilterState) => void
  facets: { categories: string[]; brands: string[] }
  resultCount: number
}) {
  const hasFilters = Boolean(value.category || value.brand || value.availability || value.min !== undefined || value.max !== undefined)

  return (
    <>
      {/* Desktop controls */}
      <div className="sticky top-16 z-40 -mx-5 hidden items-end gap-3 border-b border-border/40 bg-background/90 px-5 pb-4 pt-3 backdrop-blur-sm md:flex md:-mx-10 md:px-10">
        <FilterSearch value={value.q} onChange={(q) => onChange({ ...value, q })} />
        <div className="w-44">
          <Select
            value={value.category ?? 'All'}
            onValueChange={(v) => onChange({ ...value, category: v === 'All' ? undefined : v })}
          >
            <SelectTrigger aria-label="Category" className="h-10">
              <span className="text-meta text-muted">Category</span>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All categories</SelectItem>
              {facets.categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-40">
          <Select
            value={value.brand ?? 'all'}
            onValueChange={(v) => onChange({ ...value, brand: v === 'all' ? undefined : v })}
          >
            <SelectTrigger aria-label="Brand" className="h-10">
              <span className="text-meta text-muted">Brand</span>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All brands</SelectItem>
              {facets.brands.map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <PriceSummary value={value} onChange={onChange} />
        <div className="ml-auto flex items-center gap-4">
          <p className="text-meta text-muted" aria-live="polite">
            {resultCount} products
          </p>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange({ q: value.q, min: undefined, max: undefined })}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Mobile controls */}
      <div className="flex items-center gap-3 md:hidden">
        <FilterSearch value={value.q} onChange={(q) => onChange({ ...value, q })} />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" aria-label="Open filters">
              <SlidersHorizontal aria-hidden="true" />
              <span className="sr-only">Filters</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[min(92vw,420px)]">
            <DialogTitle className="text-2xl">Filter</DialogTitle>
            <div className="mt-6">
              <FilterFields value={value} onChange={onChange} facets={facets} />
            </div>
            <div className="mt-8 flex items-center justify-between">
              <p className="text-meta text-muted">{resultCount} products found</p>
              <Button variant="ghost" size="sm" onClick={() => onChange({ q: value.q })}>
                Reset
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

function FilterSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative w-full max-w-xs">
      <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search objects…"
        aria-label="Search objects"
        className="pl-9 pr-8"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  )
}

function PriceSummary({
  value,
  onChange,
}: {
  value: FilterState
  onChange: (next: FilterState) => void
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-meta h-10 whitespace-nowrap border border-border px-4 transition-colors hover:border-foreground"
        >
          Price{' '}
          <span className="text-muted">
            {value.min !== undefined || value.max !== undefined
              ? `${value.min ?? 0} — ${value.max ?? '∞'}`
              : 'Any'}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[min(92vw,420px)]">
        <DialogTitle className="text-2xl">Price</DialogTitle>            <p className="mt-2 text-sm text-foreground-secondary">
          {value.min !== undefined || value.max !== undefined
            ? `${formatPrice(value.min ?? 0)} — ${value.max !== undefined ? formatPrice(value.max) : 'no limit'}`
            : 'Set a range to narrow the collection.'}
        </p>
        <div className="mt-6">
          <FilterFields
            value={value}
            onChange={onChange}
            facets={{ categories: [], brands: [] }}
            priceOnly
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
