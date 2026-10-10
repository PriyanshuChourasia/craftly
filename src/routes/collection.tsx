import { useMemo, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ProductFilters, type FilterState } from '@/components/products/ProductFilters'
import { CategoryExplore, type CategoryExploreOnSelect } from '@/components/navigation/CategoryExplore'
import { ProductCard } from '@/components/products/ProductCard'
import { EditorialProductGrid } from '@/components/products/EditorialProductGrid'
import { EmptyState, LoadingState } from '@/components/states/States'
import { Reveal } from '@/components/animations/Reveal'
import { ScrollParallax } from '@/components/parallax'
import { fetchFacets, fetchPublishedProducts } from '@/lib/products/api'
import type { Availability } from '@/types/product'

const EASE = [0.22, 1, 0.36, 1] as const

export type CollectionSearch = {
  q?: string
  category?: string
  brand?: string
  min?: number
  max?: number
  availability?: Availability
  view?: string
}

export const Route = createFileRoute('/collection')({
  validateSearch: (search: Record<string, unknown>): CollectionSearch => {
    const num = (v: unknown) => {
      const n = Number(v)
      return v !== undefined && v !== '' && Number.isFinite(n) ? n : undefined
    }
    return {
      q: typeof search.q === 'string' ? search.q : undefined,
      category: typeof search.category === 'string' ? search.category : undefined,
      brand: typeof search.brand === 'string' ? search.brand : undefined,
      min: num(search.min),
      max: num(search.max),
      availability: typeof search.availability === 'string' ? (search.availability as Availability) : undefined,
      view: typeof search.view === 'string' ? search.view : undefined,
    }
  },
  loader: async () => {
    const [products, facets] = await Promise.all([fetchPublishedProducts(), fetchFacets()])
    return { products, facets }
  },
  head: () => ({
    meta: [
      { title: 'Collection — SB Creation' },
      {
        name: 'description',
        content: 'Browse the collection. Filter by category, brand, material, color, availability and price.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://shobhanjana.example.com/collection' }],
  }),
  pendingComponent: () => <LoadingState label="Loading collection" />,
  component: CollectionPage,
})

function CollectionPage() {
  const { products, facets } = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const isArchive = search.view === 'archive'
  const [filters, setFilters] = useState<FilterState>({
      q: search.q ?? '',
      category: search.category,
      brand: search.brand,
      min: search.min,
      max: search.max,
      availability: search.availability,
    })

  // Keep URL in sync with filters (shareable / refresh-persistent state).
  const applyFilters = (next: FilterState) => {
    setFilters(next)
    navigate({
      to: '/collection',
      search: (prev: CollectionSearch) => ({
        ...prev,
        q: next.q || undefined,
        category: next.category,
        brand: next.brand,
        min: next.min,
        max: next.max,
        availability: next.availability,
      }),
      replace: true,
    })
  }

  const filtered = useMemo(() => {
    let list = [...products].sort((a, b) => a.name.localeCompare(b.name))
    list = list.filter((p) => p.published)
    let categoryCount = list.length
    if (filters.q) {
      const q = filters.q.toLowerCase()
      list = list.filter((p) =>
        [p.name, p.description, p.category, p.brand, ...p.tags, p.material]
          .join(' ')
          .toLowerCase()
          .includes(q),
      )
    }
    if (filters.category) list = list.filter((p) => p.category === filters.category)
    if (filters.brand) list = list.filter((p) => p.brand === filters.brand)
    if (filters.min !== undefined) list = list.filter((p) => p.price >= filters.min!)
    if (filters.max !== undefined) list = list.filter((p) => p.price <= filters.max!)
    if (filters.availability) list = list.filter((p) => p.availability === filters.availability)
    categoryCount = list.length
    return list
  }, [products, filters])

  return (
    <>
      {/* Collection header */}
      <section className="relative overflow-hidden px-5 pb-10 pt-36 md:px-10 md:pt-48">
        <ScrollParallax speed={0.06}>
          <span aria-hidden="true" className="bg-type absolute -right-6 top-16 text-[24vw] opacity-[0.04]">
            Collection
          </span>
        </ScrollParallax>
        <div className="relative mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-meta text-muted">Shobhanjana collection</p>
            <h1 className="font-display text-display-xl mt-4">Collection</h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-foreground-secondary">
              Objects chosen for everyday spaces, workspaces and personal collections.
              Filter by category, brand, material, color, availability and price.
            </p>
          </Reveal>              <div className="mt-16 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="text-meta mb-5 text-muted">Explore</p>
              <CategoryExplore categories={facets.categories} onSelect={(next) => applyFilters({ q: filters.q, category: next.category, brand: next.brand, availability: next.availability as Availability | undefined, min: filters.min, max: filters.max })} />
            </div>
            <div className="md:col-span-10">
              <ProductFilters
                value={filters}
                onChange={applyFilters}
                facets={facets}
                resultCount={filtered.length}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="categories"
        className="relative overflow-hidden px-5 pb-32 pt-24 md:px-10 md:pt-40"
        aria-label="Category"
      >
        <ScrollParallax speed={0.05}>
          <span aria-hidden="true" className="bg-type absolute -right-6 top-16 text-[24vw] opacity-[0.04]">
            Categories
          </span>
        </ScrollParallax>
        <div className="relative mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-meta text-muted">Explore by category</p>
            <h2 className="font-display text-display-md mt-4">Entities</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground-secondary">
              Choose a category to see the related products.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="text-meta mb-5 text-muted">Explore</p>
              <CategoryExplore categories={facets.categories} onSelect={(next) => applyFilters({ q: filters.q, category: next.category, brand: next.brand, availability: next.availability as Availability | undefined, min: filters.min, max: filters.max })} />
            </div>
            <div className="md:col-span-10">
              {filters.category && (
                <section aria-live="polite">
                  <div className="flex items-center gap-4">
                    <h3 className="font-display text-2xl tracking-wide">{filters.category}</h3>
                    <p className="text-meta text-accent">{filtered.length} products</p>
                  </div>
                  <motion.ul
                    className="grid grid-cols-1 gap-x-8 gap-y-14 pt-8 sm:grid-cols-2 lg:grid-cols-3"
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      {filtered.map((p, i) => (
                        <motion.li
                          key={p.id}
                          layout
                          initial={{ opacity: 0, scale: 0.96, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.96, y: -20 }}
                          transition={{ duration: 0.5, ease: EASE }}
                        >
                          <ProductCard product={p} index={i} />
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Full collection listing */}
      <section className="px-5 pb-32 md:px-10" aria-live="polite">
        <div className="mx-auto max-w-[1600px]">
          {filtered.length === 0 ? (
            <EmptyState label="No products match this selection. Adjust the filters." />
          ) : (
            <motion.ul
              className="grid grid-cols-1 gap-x-8 gap-y-14 pt-16 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((p, i) => (
                  <motion.li
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -20 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <ProductCard product={p} index={i} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </section>
    </>
  )
}

