import { createServerFn } from '@tanstack/react-start'
import type { Product, ProductFilters } from '@/types/product'
import { getProductRepository } from '@/repositories/mock-product-repository'
import { productInputSchema } from './schema'

/* ---------------- public reads ---------------- */

export const fetchProducts = createServerFn({ method: 'GET' }).handler(
  () => getProductRepository().getProducts(),
)

export const fetchPublishedProducts = createServerFn({ method: 'GET' }).handler(() =>
  getProductRepository().getProducts(),
)

export const fetchProductBySlug = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(({ data }) => getProductRepository().getProductBySlug(data))

export const fetchProductById = createServerFn({ method: 'GET' })
  .validator((id: string) => id)
  .handler(({ data }) => getProductRepository().getProductById(data))

export const fetchFeaturedProducts = createServerFn({ method: 'GET' }).handler(() =>
  getProductRepository().getFeaturedProducts(),
)

export const fetchFacets = createServerFn({ method: 'GET' }).handler(async () => {
  const repo = getProductRepository()
  const [years, categories, brands, tags] = await Promise.all([
    repo.getAvailableYears(),
    repo.getCategories(),
    repo.getBrands(),
    repo.getTags(),
  ])
  return { years, categories, brands, tags }
})

export const fetchFilteredProducts = createServerFn({ method: 'GET' })
  .validator((d: ProductFilters) => d)
  .handler(({ data }) => getProductRepository().filterProducts(data))

/* ---------------- admin mutations ---------------- */

export const createProductFn = createServerFn({ method: 'POST' })
  .validator((d: unknown) => productInputSchema.parse(d))
  .handler(async ({ data }) => {
    const repo = getProductRepository()
    // ensureUniqueSlug is internal; createProduct already slugifies.
    return repo.createProduct(data as never)
  })

export const updateProductFn = createServerFn({ method: 'POST' })
  .validator((d: { id: string; data: unknown }) => d)
  .handler(async ({ data }) => {
    const parsed = productInputSchema.parse(data.data)
    return getProductRepository().updateProduct(data.id, parsed as never)
  })

export const deleteProductFn = createServerFn({ method: 'POST' })
  .validator((id: string) => id)
  .handler(({ data }) => getProductRepository().deleteProduct(data))

export const duplicateProductFn = createServerFn({ method: 'POST' })
  .validator((id: string) => id)
  .handler(({ data }) => getProductRepository().duplicateProduct(data))

export const toggleFeaturedFn = createServerFn({ method: 'POST' })
  .validator((id: string) => id)
  .handler(({ data }) => getProductRepository().toggleFeatured(data))

export const fetchAdminStats = createServerFn({ method: 'GET' }).handler(async () => {
  const repo = getProductRepository()
  const all = await repo.getProducts()
  return {
    total: all.length,
    featured: all.filter((p) => p.featured).length,
    available: all.filter((p) => p.availability === 'available').length,
    soldOut: all.filter((p) => p.availability === 'sold_out').length,
    drafts: all.filter((p) => !p.published).length,
    recent: [...all]
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 5),
  }
})

export type AdminStats = Awaited<ReturnType<typeof fetchAdminStats>>
export type { Product }
