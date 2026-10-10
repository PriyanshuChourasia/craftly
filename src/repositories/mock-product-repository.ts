import type {
  Product,
  ProductFilters,
  ProductInput,
  ProductUpdate,
} from '@/types/product'
import type { ProductRepository } from '@/repositories/product-repository'
import { initialProducts } from '@/data/products'
import { isValidHttpUrl, slugify } from '@/lib/utils'

/**
 * In-memory ProductRepository. Data lives for the lifetime of the server
 * process — ideal for the mock stage, trivially replaceable later.
 */
export class MockProductRepository implements ProductRepository {
  private products: Map<string, Product>

  constructor(seed: Product[] = initialProducts) {
    this.products = new Map(seed.map((p) => [p.id, { ...p }]))
  }

  private toInput(p: Product): ProductInput {
    const { id: _id, images, createdAt: _c, updatedAt: _u, primaryImage: _p, ...rest } = p
    return { ...rest, images: images.map(({ id: _i, order: _o, ...img }) => img) }
  }

  private nextId(): string {
    return `prd-${crypto.randomUUID().slice(0, 8)}`
  }

  private ensureUniqueSlug(base: string, ignoreId?: string): string {
    let slug = base || 'object'
    let n = 2
    while (
      [...this.products.values()].some(
        (p) => p.slug === slug && p.id !== ignoreId,
      )
    ) {
      slug = `${base}-${n++}`
    }
    return slug
  }

  async getProducts(): Promise<Product[]> {
    return [...this.products.values()].sort(
      (a, b) => b.year - a.year || a.name.localeCompare(b.name),
    )
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return [...this.products.values()].find((p) => p.slug === slug) ?? null
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.get(id) ?? null
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return (await this.getProducts()).filter((p) => p.featured && p.published)
  }

  async getProductsByYear(year: number): Promise<Product[]> {
    return (await this.getProducts()).filter((p) => p.year === year)
  }

  async searchProducts(query: string): Promise<Product[]> {
    const q = query.trim().toLowerCase()
    if (!q) return this.getProducts()
    return (await this.getProducts()).filter((p) =>
      [p.name, p.category, p.brand, String(p.year), ...p.tags]
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }

  async getAvailableYears(): Promise<number[]> {
    return [...new Set((await this.getProducts()).map((p) => p.year))].sort((a, b) => b - a)
  }

  async getCategories(): Promise<string[]> {
    return [...new Set((await this.getProducts()).map((p) => p.category))].sort()
  }

  async getBrands(): Promise<string[]> {
    return [...new Set((await this.getProducts()).map((p) => p.brand).filter((b): b is string => !!b))].sort()
  }

  async getTags(): Promise<string[]> {
    return [...new Set((await this.getProducts()).flatMap((p) => p.tags))].sort()
  }

  async filterProducts(filters: ProductFilters): Promise<Product[]> {
    let list = await this.getProducts()
    if (!filters) return list
    // Only published products on the public side.
    list = list.filter((p) => p.published)
    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter((p) =>
        [p.name, p.category, p.brand, String(p.year), ...p.tags]
          .join(' ')
          .toLowerCase()
          .includes(q),
      )
    }
    if (filters.category) list = list.filter((p) => p.category === filters.category)
    if (filters.brand) list = list.filter((p) => p.brand === filters.brand)
    if (filters.year) list = list.filter((p) => p.year === filters.year)
    if (typeof filters.minPrice === 'number') list = list.filter((p) => p.price >= filters.minPrice!)
    if (typeof filters.maxPrice === 'number') list = list.filter((p) => p.price <= filters.maxPrice!)
    if (filters.availability) list = list.filter((p) => p.availability === filters.availability)
    if (filters.featured !== undefined) list = list.filter((p) => p.featured === filters.featured)
    if (filters.tags?.length) {
      list = list.filter((p) => filters.tags!.some((t) => p.tags.includes(t)))
    }
    return list
  }

  async createProduct(input: ProductInput): Promise<Product> {
    const now = new Date().toISOString()
    const images = input.images.map((img, i) => ({
      ...img,
      id: `img-${crypto.randomUUID().slice(0, 8)}`,
      order: i,
    }))
    const product: Product = {
      ...input,
      id: this.nextId(),
      slug: this.ensureUniqueSlug(slugify(input.slug || input.name)),
      images,
      primaryImage: images[0]?.url ?? '',
      createdAt: now,
      updatedAt: now,
    }
    this.products.set(product.id, product)
    return product
  }

  async updateProduct(id: string, update: ProductUpdate): Promise<Product | null> {
    const existing = this.products.get(id)
    if (!existing) return null
    const { images: newImages, ...rest } = update
    const merged: Product = { ...existing, ...rest, id: existing.id, updatedAt: new Date().toISOString() }
    if (update.slug !== undefined) merged.slug = this.ensureUniqueSlug(slugify(update.slug), id)
    if (newImages) {
      merged.images = newImages.map((img, i) => ({
        ...img,
        id: existing.images[i]?.id ?? `img-${crypto.randomUUID().slice(0, 8)}`,
        order: i,
      }))
      merged.primaryImage = merged.images[0]?.url ?? merged.primaryImage ?? ''
    }
    if (update.buyUrl !== undefined && update.buyUrl && !isValidHttpUrl(update.buyUrl)) {
      throw new Error('Invalid buy URL')
    }
    this.products.set(id, merged)
    return merged
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id)
  }

  async duplicateProduct(id: string): Promise<Product | null> {
    const source = this.products.get(id)
    if (!source) return null
    const input = this.toInput(source)
    input.name = `${source.name} (Copy)`
    input.featured = false
    return this.createProduct(input)
  }

  async toggleFeatured(id: string): Promise<Product | null> {
    const p = this.products.get(id)
    if (!p) return null
    p.featured = !p.featured
    p.updatedAt = new Date().toISOString()
    return p
  }
}

/** Singleton for the server bundle. */
let instance: MockProductRepository | null = null
export function getProductRepository(): ProductRepository {
  if (!instance) instance = new MockProductRepository()
  return instance
}
