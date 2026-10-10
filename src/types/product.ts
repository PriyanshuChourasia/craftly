export type Availability = 'available' | 'sold_out' | 'coming_soon'

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP'

export type ProductImage = {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
  order: number
  isPrimary?: boolean
}

export type Product = {
  id: string
  slug: string
  name: string
  shortDescription?: string
  description: string
  price: number
  currency: Currency
  category: string
  brand?: string
  year: number
  tags: string[]
  images: ProductImage[]
  primaryImage?: string
  material?: string
  dimensions?: string
  color?: string
  availability: Availability
  sellerName?: string
  sellerUrl?: string
  buyUrl?: string
  featured: boolean
  published: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
  }
  createdAt: string
  updatedAt: string
}

export type ProductInput = Omit<
  Product,
  'id' | 'createdAt' | 'updatedAt' | 'primaryImage' | 'images'
> & {
  images: Omit<ProductImage, 'id' | 'order'>[]
}

export type ProductUpdate = Partial<ProductInput>

export type ProductFilters = {
  search?: string
  category?: string
  brand?: string
  year?: number
  minPrice?: number
  maxPrice?: number
  tags?: string[]
  availability?: Availability
  featured?: boolean
}
