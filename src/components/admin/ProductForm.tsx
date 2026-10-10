import { useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input, Textarea, Label, FieldError } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/misc'
import { ImageUploader } from './ImageUploader'
import { productInputSchema } from '@/lib/products/schema'
import { createProductFn, updateProductFn, deleteProductFn } from '@/lib/products/api'
import { slugify } from '@/lib/utils'
import { formatPrice } from '@/lib/format'
import type { Currency, Product } from '@/types/product'

type FormState = {
  name: string
  slug: string
  category: string
  brand: string
  year: number
  shortDescription: string
  description: string
  price: number
  currency: Currency
  material: string
  dimensions: string
  color: string
  availability: 'available' | 'sold_out' | 'coming_soon'
  sellerName: string
  sellerUrl: string
  buyUrl: string
  featured: boolean
  published: boolean
  metaTitle: string
  metaDescription: string
  images: Array<{ url: string; alt: string; width?: number; height?: number }>
}

const CATEGORIES = ['Furniture', 'Ceramic', 'Lighting', 'Accessories', 'Technology', 'Art', 'Objects']

function toFormState(p?: Product): FormState {
  return {
    name: p?.name ?? '',
    slug: p?.slug ?? '',
    category: p?.category ?? 'Objects',
    brand: p?.brand ?? '',
    year: p?.year ?? new Date().getFullYear(),
    shortDescription: p?.shortDescription ?? '',
    description: p?.description ?? '',
    price: p?.price ?? 0,
    currency: p?.currency ?? 'INR',
    material: p?.material ?? '',
    dimensions: p?.dimensions ?? '',
    color: p?.color ?? '',
    availability: p?.availability ?? 'available',
    sellerName: p?.sellerName ?? '',
    sellerUrl: p?.sellerUrl ?? '',
    buyUrl: p?.buyUrl ?? '',
    featured: p?.featured ?? false,
    published: p?.published ?? true,
    metaTitle: p?.seo?.metaTitle ?? '',
    metaDescription: p?.seo?.metaDescription ?? '',
    images: (p?.images ?? []).map(({ url, alt, width, height }) => ({ url, alt, width, height })),
  }
}

/** Tabbed admin product form with a live public preview. Create + edit. */
export function ProductForm({ product }: { product?: Product }) {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>(() => toFormState(product))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const slugTouched = form.slug !== '' && product?.slug !== form.slug
  const previewSlug = useMemo(
    () => (form.slug && slugTouched ? form.slug : slugify(form.name || 'object')),
    [form.slug, form.name, slugTouched],
  )

  const buildPayload = () => ({
    ...form,
    slug: form.slug || previewSlug,
    shortDescription: form.shortDescription || undefined,
    brand: form.brand || undefined,
    material: form.material || undefined,
    dimensions: form.dimensions || undefined,
    color: form.color || undefined,
    sellerName: form.sellerName || undefined,
    sellerUrl: form.sellerUrl || undefined,
    buyUrl: form.buyUrl || undefined,
    seo: {
      metaTitle: form.metaTitle || undefined,
      metaDescription: form.metaDescription || undefined,
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = productInputSchema.safeParse(buildPayload())
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? 'form')
        if (!fieldErrors[key]) fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      toast.error('Please fix the highlighted fields')
      return
    }
    setErrors({})
    setSaving(true)
    try {
      if (product) {
        await updateProductFn({ data: { id: product.id, data: parsed.data } })
        toast.success('Object updated')
        navigate({ to: '/admin/products' })
      } else {
        await createProductFn({ data: parsed.data })
        toast.success('Object added to the archive')
        navigate({ to: '/admin/products' })
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!product) return
    if (!window.confirm(`Delete "${product.name}" from the archive? This cannot be undone.`)) return
    await deleteProductFn({ data: product.id })
    toast.success('Object deleted')
    navigate({ to: '/admin/products' })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-12">
      {/* FORM — left */}
      <div className="lg:col-span-8">
        <Tabs defaultValue="general">
          <TabsList aria-label="Form sections">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="seller">Seller</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Section title="General">
              <Field label="Product name" error={errors.name}>
                <Input
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  onBlur={() => !form.slug && form.name && set('slug', slugify(form.name))}
                  required
                />
              </Field>
              <Field label="Slug" error={errors.slug} hint="/products/{slug}">
                <Input value={form.slug} onChange={(e) => set('slug', slugify(e.target.value))} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Category" error={errors.category}>
                  <Select value={form.category} onValueChange={(v) => set('category', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Brand">
                  <Input value={form.brand} onChange={(e) => set('brand', e.target.value)} />
                </Field>
                <Field label="Year" error={errors.year}>
                  <Input
                    type="number"
                    value={form.year}
                    onChange={(e) => set('year', Number(e.target.value) || 0)}
                  />
                </Field>
              </div>
            </Section>
            <Section title="Description">
              <Field label="Short description" hint="Shown on cards and previews">
                <Textarea
                  className="min-h-[70px]"
                  value={form.shortDescription}
                  onChange={(e) => set('shortDescription', e.target.value)}
                />
              </Field>
              <Field label="Long description" error={errors.description}>
                <Textarea
                  className="min-h-[140px]"
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  required
                />
              </Field>
            </Section>
          </TabsContent>

          <TabsContent value="media">
            <Section title="Media" error={errors.images}>
              <ImageUploader
                images={form.images}
                onChange={(images) => set('images', images)}
              />
              <p className="text-meta mt-3 text-muted">
                The first image is the primary image. Use the arrows to reorder.
              </p>
            </Section>
          </TabsContent>

          <TabsContent value="details">
            <Section title="Product details">
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Material">
                  <Input value={form.material} onChange={(e) => set('material', e.target.value)} />
                </Field>
                <Field label="Dimensions">
                  <Input
                    value={form.dimensions}
                    onChange={(e) => set('dimensions', e.target.value)}
                    placeholder="25 × 12 × 10 CM"
                  />
                </Field>
                <Field label="Color">
                  <Input value={form.color} onChange={(e) => set('color', e.target.value)} />
                </Field>
              </div>
              <Field label="Availability" error={errors.availability}>
                <Select
                  value={form.availability}
                  onValueChange={(v) => set('availability', v as FormState['availability'])}
                >
                  <SelectTrigger className="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="sold_out">Sold out</SelectItem>
                    <SelectItem value="coming_soon">Coming soon</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </Section>
          </TabsContent>

          <TabsContent value="pricing">
            <Section title="Pricing">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Price" error={errors.price}>
                  <Input
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) => set('price', Number(e.target.value) || 0)}
                  />
                </Field>
                <Field label="Currency" error={errors.currency}>
                  <Select
                    value={form.currency}
                    onValueChange={(v) => set('currency', v as Currency)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(['INR', 'USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="seller">
            <Section title="Seller">
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Seller name">
                  <Input value={form.sellerName} onChange={(e) => set('sellerName', e.target.value)} />
                </Field>
                <Field label="Seller URL" error={errors.sellerUrl}>
                  <Input
                    type="url"
                    value={form.sellerUrl}
                    onChange={(e) => set('sellerUrl', e.target.value)}
                    placeholder="https://…"
                  />
                </Field>
                <Field label="Buy URL" error={errors.buyUrl} hint="External store link">
                  <Input
                    type="url"
                    value={form.buyUrl}
                    onChange={(e) => set('buyUrl', e.target.value)}
                    placeholder="https://…"
                  />
                </Field>
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="seo">
            <Section title="SEO">
              <Field label="Meta title">
                <Input value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} />
              </Field>
              <Field label="Meta description">
                <Textarea
                  className="min-h-[70px]"
                  value={form.metaDescription}
                  onChange={(e) => set('metaDescription', e.target.value)}
                />
              </Field>
              <p className="text-meta text-muted">
                Canonical URL: /products/{previewSlug}
              </p>
            </Section>
          </TabsContent>

          <TabsContent value="settings">
            <Section title="Settings">
              <label className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={form.featured}
                  onCheckedChange={(v) => set('featured', v === true)}
                />
                Featured — show in the hero and featured sections
              </label>
              <label className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={form.published}
                  onCheckedChange={(v) => set('published', v === true)}
                />
                Published — visible on the public site
              </label>
            </Section>
          </TabsContent>
        </Tabs>
      </div>

      {/* ACTIONS + LIVE PREVIEW — right */}
      <div className="space-y-6 lg:col-span-4">
        <div className="sticky top-6 space-y-4">
          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={saving} size="lg">
              {saving ? 'Saving…' : product ? 'Save changes' : 'Create product'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/products' })}>
              Cancel
            </Button>
            {product && (
              <Button type="button" variant="destructive" onClick={handleDelete}>
                Delete product
              </Button>
            )}
          </div>

          {/* Live public preview */}
          <div className="border border-border bg-paper/50 p-4">
            <p className="text-meta mb-3 text-muted">Public preview</p>              <div className="border border-border-soft bg-background">
              {form.images[0] ? (
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={form.images[0].url}
                    alt={form.images[0].alt}
                    className="h-full w-full object-cover"
                    onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.style.display = 'none' }}
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center text-meta text-muted">
                  No image
                </div>
              )}
              <div className="p-3">
                <p className="text-meta text-muted">Object — {form.year}</p>
                <p className="mt-1 font-display text-base leading-tight">
                  {form.name || 'Untitled object'}
                </p>
                <p className="text-meta mt-1 text-foreground-secondary">
                  {form.category} / {form.year}
                </p>
                <p className="text-meta mt-1.5">
                  {form.availability === 'coming_soon' ? '—' : formatPrice(form.price, form.currency)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

function Section({
  title,
  children,
  error,
}: {
  title: string
  children: React.ReactNode
  error?: string
}) {
  return (
    <section className="space-y-5">
      <h2 className="text-meta border-b border-border/40 pb-2 text-muted">{title}</h2>
      {children}
      <FieldError message={error} />
    </section>
  )
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {hint && <p className="text-meta mt-1 text-muted">{hint}</p>}
      <FieldError message={error} />
    </div>
  )
}
