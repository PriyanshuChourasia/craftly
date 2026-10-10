import { z } from 'zod'

const urlSchema = z
  .string()
  .trim()
  .refine((v) => {
    try {
      return ['http:', 'https:'].includes(new URL(v).protocol)
    } catch {
      return false
    }
  }, 'Must be a valid http(s) URL')
  .optional()
  .or(z.literal(''))

export const productImageSchema = z.object({
  url: z.string().min(1, 'Image URL is required'),
  alt: z.string().min(1, 'Alt text is required'),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
})

export const productInputSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Lowercase letters, numbers and dashes only'),
  shortDescription: z.string().max(300).optional().or(z.literal('')),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be 0 or more'),
  currency: z.enum(['INR', 'USD', 'EUR', 'GBP']),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional().or(z.literal('')),
  year: z
    .number()
    .int()
    .min(1900, 'Year looks too old')
    .max(2100, 'Year looks too far ahead'),
  tags: z.array(z.string().min(1)),
  images: z.array(productImageSchema).min(1, 'At least one image is required'),
  material: z.string().optional().or(z.literal('')),
  dimensions: z.string().optional().or(z.literal('')),
  color: z.string().optional().or(z.literal('')),
  availability: z.enum(['available', 'sold_out', 'coming_soon']),
  sellerName: z.string().optional().or(z.literal('')),
  sellerUrl: urlSchema,
  buyUrl: urlSchema,
  featured: z.boolean(),
  published: z.boolean(),
  seo: z
    .object({
      metaTitle: z.string().optional().or(z.literal('')),
      metaDescription: z.string().optional().or(z.literal('')),
      ogImage: z.string().optional().or(z.literal('')),
    })
    .optional(),
})

export type ProductFormValues = z.input<typeof productInputSchema>
