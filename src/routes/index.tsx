import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/home/Hero'
import { FeaturedProduct } from '@/components/home/FeaturedProduct'
import { EditorialStatement } from '@/components/home/EditorialStatement'
import { ArchivePreview } from '@/components/home/ArchivePreview'
import { FinalCTA } from '@/components/home/FinalCTA'
import { Reveal } from '@/components/animations/Reveal'
import { EditorialProductGrid } from '@/components/products/EditorialProductGrid'
import { fetchFeaturedProducts, fetchPublishedProducts } from '@/lib/products/api'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [featured, all] = await Promise.all([fetchFeaturedProducts(), fetchPublishedProducts()])
    return { featured, all }
  },
  head: () => ({
    meta: [
      { title: 'SB Creation — A Digital Creation Studio' },
      {
        name: 'description',
        content:
          'A digital creation studio. Explore the collection — furniture, ceramic, lighting, art and objects.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://shobhanjana.example.com/' }],
  }),
  component: Home,
})

function Home() {
  const { featured, all } = Route.useLoaderData()
  // Up to 10 products feed the hero slider; the mosaic background stays at 6 images.
  const hero = [...featured, ...all.filter((p) => !featured.includes(p))].slice(0, 10)
  const main = featured[0] ?? all[0]
  const second = featured[1] ?? all[1]
  const preview = all.slice(0, 8)

  return (
    <>
      <Hero products={hero} />

      {main && <FeaturedProduct product={main} index={0} />}

      <EditorialStatement />

      {/* Collection preview — asymmetric grid */}
      <section aria-label="Collection preview" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <Reveal>
            <div className="mb-20 flex items-end justify-between">
              <h2 className="font-display text-display-lg">Collection</h2>
              <p className="text-meta text-muted">
                {second ? 'Selected works' : 'Selected works'} / 04
              </p>
            </div>
          </Reveal>
          <EditorialProductGrid products={all.slice(2, 6)} />
        </div>
      </section>

      {second && <FeaturedProduct product={second} index={1} />}

      <ArchivePreview products={preview} />

      <FinalCTA />
    </>
  )
}
