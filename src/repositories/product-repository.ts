import type { Product, ProductFilters, ProductInput, ProductUpdate } from '@/types/product'

/**
 * Storage-agnostic contract for product persistence.
 * Swap MockProductRepository for PostgreSQL/Drizzle/Prisma/REST/tRPC
 * without touching any UI component.
 */
export interface ProductRepository {
  getProducts(): Promise<Product[]>
  getProductBySlug(slug: string): Promise<Product | null>
  getProductById(id: string): Promise<Product | null>
  getFeaturedProducts(): Promise<Product[]>
  getProductsByYear(year: number): Promise<Product[]>
  searchProducts(query: string): Promise<Product[]>
  getAvailableYears(): Promise<number[]>
  getCategories(): Promise<string[]>
  getBrands(): Promise<string[]>
  getTags(): Promise<string[]>
  filterProducts(filters: ProductFilters): Promise<Product[]>
  createProduct(input: ProductInput): Promise<Product>
  updateProduct(id: string, update: ProductUpdate): Promise<Product | null>
  deleteProduct(id: string): Promise<boolean>
  duplicateProduct(id: string): Promise<Product | null>
  toggleFeatured(id: string): Promise<Product | null>
}
