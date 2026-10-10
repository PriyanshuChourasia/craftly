import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'
import { ProductGallery } from '@/components/products/ProductGallery'
import { BuyButton } from '@/components/products/BuyButton'
import { NotFoundState, LoadingState } from '@/components/states/States'
import { Reveal } from '@/components/animations/Reveal'
import { ScrollParallax } from '@/components/parallax'
import { formatPrice, availabilityLabel } from '@/lib/format'
import { padNumber } from '@/lib/utils'
import { fetchProductBySlug, fetchPublishedProducts } from '@/lib/products/api'
import type { Product } from '@/types/product'
import { ProductImage } from '@/components/products/ProductImage'

function ProductCaption({ product }: { product: Product }) {
  return (
    <div className="px-3.5 py-3">
      <p className="font-display text-base">{product.name}</p>
      <p className="text-meta mt-1 text-muted">
        {product.category} / {product.year}
      </p>
    </div>
  )
}

export const Route = createFileRoute('/products/$slug')({
  loader: async ({ params }) => {
    const product = await fetchProductBySlug({ data: params.slug })
    if (!product) throw notFound()
    const related = (await fetchPublishedProducts())
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 3)
    return { product, related }
  },
  head: ({ match }) => {
    const product = (match.loaderData as
      | { product: Product; related: Product[] }
      | undefined)?.product
    if (!product) return { meta: [{ title: 'Object not found — OBJECTS' }] }
    const title = product.seo?.metaTitle || `${product.name} — OBJECTS`
    const description =
      product.seo?.metaDescription || product.shortDescription || product.description.slice(0, 150)
    const image = product.seo?.ogImage || product.primaryImage
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      links: [
        {
          rel: 'canonical',
          href: `https://objects.example.com/products/${product.slug}`,
        },
      ],
    }
  },
  pendingComponent: () => <LoadingState label="Loading object" />,
  notFoundComponent: () => (
    <NotFoundState
      code="404"
      title="Object not found"
      description="The object you're looking for has left the archive."
    />
  ),
  component: ProductDetail,
})

function ProductDetail() {
  const { product, related } = Route.useLoaderData()

  const specs: Array<[string, string | undefined]> = [
    ['Material', product.material],
    ['Dimensions', product.dimensions],
    ['Color', product.color],
    ['Brand', product.brand],
  ]

  return (
    <>
      <article className="px-5 pb-24 pt-28 md:px-10 md:pt-40">
        <div className="mx-auto max-w-[1600px]">
          {/* breadcrumb */}
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-meta flex items-center gap-2 text-muted">
              <Link to="/collection" className="hover:text-foreground">
                Collection
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-foreground-secondary">{product.category}</span>
              <span aria-hidden="true">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </Reveal>

          <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
            {/* Gallery — LEFT */}
            <div className="md:col-span-7">
              <Reveal direction="none">
                <ProductGallery images={product.images} />
              </Reveal>
            </div>

            {/* Metadata — RIGHT */}
            <div className="md:col-span-5">
              <Reveal delay={0.1}>
                <p className="text-meta text-muted">
                  Object {product.slug.split('-').pop()?.replace(/\D/g, '').padStart(2, '0') ?? padNumber(1)} — {product.year}
                </p>
                <h1 className="font-display text-display-lg mt-4 leading-[0.92]">
                  {product.name}
                </h1>
                <p className="text-meta mt-5 text-foreground-secondary">
                  {product.category} / {product.year} /{' '}
                  <span className={product.availability === 'available' ? 'text-foreground' : product.availability === 'sold_out' ? 'text-muted' : 'text-accent'}>
                    {availabilityLabel(product.availability)}
                  </span>
                </p>

                <p className="font-display mt-8 text-4xl">
                  {product.availability === 'coming_soon'
                    ? '—'
                    : formatPrice(product.price, product.currency)}
                </p>

                <p className="mt-8 max-w-lg text-sm leading-relaxed text-foreground-secondary">
                  {product.description}
                </p>

                {/* tags */}
                {product.tags.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
                    {product.tags.map((t) => (
                      <li key={t} className="text-meta border border-border/60 px-2 py-1 text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                {/* spec table */}
                <dl className="mt-10 border-t border-border/50">
                  {specs
                    .filter(([, v]) => v)
                    .map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-baseline justify-between border-b border-border/40 py-3.5"
                      >
                        <dt className="text-meta text-muted">{label}</dt>
                        <dd className="text-sm">{value}</dd>
                      </div>
                    ))}
                  <div className="flex items-baseline justify-between border-b border-border/40 py-3.5">
                    <dt className="text-meta text-muted">Availability</dt>
                    <dd className="text-meta">{availabilityLabel(product.availability)}</dd>
                  </div>
                </dl>

                {/* seller / buy */}
                <div className="mt-10 border border-border p-5">
                  <p className="text-meta text-muted">Buy from</p>
                  <p className="mt-2 flex items-center gap-2 font-display text-xl tracking-wide">
                    {product.sellerName ?? 'Archive'}
                    {product.sellerUrl && (
                      <a
                        href={product.sellerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${product.sellerName}'s website`}
                        className="text-muted transition-colors hover:text-foreground"
                      >
                        <ExternalLink className="size-3.5" />
                      </a>
                    )}
                  </p>
                  <div className="mt-5">
                    <BuyButton href={product.buyUrl} size="lg" className="w-full" />
                  </div>
                  {product.availability === 'sold_out' && (
                    <p className="text-meta mt-4 text-muted">
                      This object has been sold — the listing remains as part of the archive.
                    </p>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {/* related */}
          {related.length > 0 && (
            <section aria-label="Related objects" className="mt-32">
              <ScrollParallax speed={0.05}>
                <span aria-hidden="true" className="bg-type absolute left-0 text-[16vw] opacity-[0.03]">
                  More
                </span>
              </ScrollParallax>
              <div className="relative">
                <Reveal>
                  <h2 className="font-display text-display-md">Related objects</h2>
                </Reveal>
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((p, i) => (
                    <Reveal key={p.id} delay={i * 0.1}>
                      <Link
                        to="/products/$slug"
                        params={{ slug: p.slug }}
                        data-cursor="view"
                        className="group block border border-border-soft bg-paper/60 transition-shadow hover:shadow-[var(--shadow-frame)]"
                      >
                        <div className="aspect-[4/5] overflow-hidden">
                          <ProductImage
                            image={p.images[0] ?? { id: '', url: p.primaryImage ?? '', alt: p.name, order: 0 }}
                            objectFit="cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        </div>
                        <ProductCaption product={p} />
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  )
}
