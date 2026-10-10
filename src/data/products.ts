import type { Availability, Currency, Product, ProductImage } from '@/types/product'

type Seed = {
  slug: string
  name: string
  short: string
  desc: string
  price: number
  currency?: Currency
  category: string
  brand?: string
  year: number
  tags: string[]
  material?: string
  dimensions?: string
  color?: string
  availability?: Availability
  seller?: string
  buyUrl?: string
  featured?: boolean
  images: ProductImage[]
}

/** Primary (cover) image of a product. */
function primary(name: string, alt: string, w = 1200, h = 1500): ProductImage {
  return { id: name, url: name, alt, width: w, height: h, order: 0, isPrimary: true }
}

/** Secondary view of a product. */
function view(name: string, alt: string, w: number, h: number): ProductImage {
  return { id: name, url: name, alt, width: w, height: h, order: 0 }
}

const SEEDS: Seed[] = [
  {
    slug: 'tide-stone',
    name: 'Tide Stone',
    short: 'A hand-carved basalt object shaped by repetition.',
    desc: 'Tide Stone began as a study of erosion — a form worn down, then rebuilt by hand. Each facet is ground until the surface holds light the way wet stone does. The piece carries the traces of the hands, places and moments that shaped it.',
    price: 4500,
    category: 'Objects',
    brand: 'Studio Meridian',
    year: 2026,
    tags: ['stone', 'hand-carved', 'sculptural'],
    material: 'Basalt',
    dimensions: '25 × 12 × 10 CM',
    color: 'Graphite',
    seller: 'Studio Meridian',
    buyUrl: 'https://example.com/product/tide-stone',
    featured: true,
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.55.38.jpeg', 'Tide Stone — front view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.55.34.jpeg', 'Tide Stone — side view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.55.35.jpeg', 'Tide Stone — detail view', 1200, 1200),
    ],
  },
  {
    slug: 'meridian-lamp',
    name: 'Meridian Lamp',
    short: 'A diffused, low-glare table lamp in spun brass.',
    desc: 'The Meridian Lamp is built around a single curved sheet of spun brass that folds light back onto itself. Designed for evenings — its warm 2700K glow pools rather than spreads. The switch is a single brushed toggle recessed into the base.',
    price: 12800,
    category: 'Lighting',
    brand: 'Atelier Nord',
    year: 2026,
    tags: ['brass', 'ambient', 'lighting'],
    material: 'Spun brass, opal glass',
    dimensions: '38 × 22 × 22 CM',
    color: 'Brass',
    seller: 'Atelier Nord',
    buyUrl: 'https://example.com/product/meridian-lamp',
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.56.05.jpeg', 'Meridian Lamp — front view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.05 (1).jpeg', 'Meridian Lamp — side view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.06.jpeg', 'Meridian Lamp — detail view', 1200, 1200),
    ],
  },
  {
    slug: 'half-moon-chair',
    name: 'Half Moon Chair',
    short: 'Sculptural bent-ply lounge chair with a cane seat.',
    desc: 'A single sheet of birch ply, bent twice and resolved with a hand-woven cane seat. The Half Moon holds the body at an angle between sitting and resting. Produced in a numbered run of sixty.',
    price: 32000,
    category: 'Furniture',
    brand: 'Form & Field',
    year: 2025,
    tags: ['plywood', 'cane', 'lounge'],
    material: 'Birch ply, natural cane',
    dimensions: '72 × 64 × 78 CM',
    color: 'Natural',
    seller: 'Form & Field',
    buyUrl: 'https://example.com/product/half-moon-chair',
    featured: true,
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.56.08.jpeg', 'Half Moon Chair — front view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.08 (1).jpeg', 'Half Moon Chair — side view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.09.jpeg', 'Half Moon Chair — detail view', 1200, 1200),
    ],
  },
  {
    slug: 'vessel-07',
    name: 'Vessel No. 07',
    short: 'Hand-thrown stoneware with a dry volcanic glaze.',
    desc: 'Thrown on the wheel in a single morning, then left to find its own slight asymmetry in the firing. The volcanic glaze breaks over the shoulder of the vessel and pools near the foot — no two pieces share the same surface.',
    price: 7900,
    category: 'Ceramic',
    brand: 'Kiln & Co.',
    year: 2026,
    tags: ['stoneware', 'vessel', 'hand-thrown'],
    material: 'Stoneware, volcanic glaze',
    dimensions: '28 Ø × 31 CM',
    color: 'Ash grey',
    seller: 'Kiln & Co.',
    buyUrl: 'https://example.com/product/vessel-07',
    featured: true,
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.56.10.jpeg', 'Vessel No. 07 — front view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.10 (1).jpeg', 'Vessel No. 07 — top view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.11.jpeg', 'Vessel No. 07 — detail view', 1200, 1200),
    ],
  },
  {
    slug: 'errand-bag',
    name: 'Errand Bag',
    short: 'A structured canvas tote with a leather base.',
    desc: 'Cut from a single panel of 18oz waxed canvas and closed with one seam. The leather base takes the weight; the canvas takes the years. Inside, one slip pocket sized for exactly the things you actually carry.',
    price: 6200,
    category: 'Accessories',
    brand: 'Morrow Goods',
    year: 2024,
    tags: ['canvas', 'tote', 'leather'],
    material: 'Waxed canvas, veg-tan leather',
    dimensions: '40 × 32 × 14 CM',
    color: 'Olive',
    seller: 'Morrow Goods',
    buyUrl: 'https://example.com/product/errand-bag',
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.56.12.jpeg', 'Errand Bag — front view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.12 (1).jpeg', 'Errand Bag — open view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.13.jpeg', 'Errand Bag — detail view', 1200, 1200),
    ],
  },
  {
    slug: 'still-camera',
    name: 'Still Camera',
    short: 'A fixed-lens 35mm film camera in magnesium.',
    desc: 'One lens, one shutter speed dial, one purpose. The Still Camera strips 35mm photography back to focus and light. Its magnesium body is bead-blasted to a soft matte that hides the marks of travel.',
    price: 41000,
    category: 'Technology',
    brand: 'Ampersand Optics',
    year: 2024,
    tags: ['film', '35mm', 'analogue'],
    material: 'Magnesium, glass',
    dimensions: '128 × 74 × 40 MM',
    color: 'Matte black',
    seller: 'Ampersand Optics',
    buyUrl: 'https://example.com/product/still-camera',
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.56.14.jpeg', 'Still Camera — front view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.14 (1).jpeg', 'Still Camera — top view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.15.jpeg', 'Still Camera — detail view', 1200, 1200),
    ],
  },
  {
    slug: 'echo-sculpture',
    name: 'Echo Sculpture',
    short: 'A cast bronze form derived from a sound wave.',
    desc: 'Echo takes a three-second recording of the sea and translates its waveform into solid bronze. Cast in a foundry that has operated since 1911, then hand-patinated to a deep umber. Each casting is a unique moment of the same sound.',
    price: 96000,
    category: 'Art',
    brand: 'Studio Meridian',
    year: 2023,
    tags: ['bronze', 'sculpture', 'edition'],
    material: 'Cast bronze',
    dimensions: '42 × 18 × 14 CM',
    color: 'Umber patina',
    availability: 'coming_soon',
    seller: 'Studio Meridian',
    buyUrl: 'https://example.com/product/echo-sculpture',
    featured: true,
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.56.17.jpeg', 'Echo Sculpture — front view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.17 (1).jpeg', 'Echo Sculpture — side view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.18.jpeg', 'Echo Sculpture — detail view', 1200, 1200),
    ],
  },
  {
    slug: 'standing-object',
    name: 'Standing Object',
    short: 'A weighted steel form for desks and shelves.',
    desc: 'A small monument to nothing in particular. Machined from solid steel and left slightly rough, the Standing Object is heavy in the hand and quiet on a shelf. It does exactly what you bring to it.',
    price: 3200,
    category: 'Objects',
    brand: 'Form & Field',
    year: 2025,
    tags: ['steel', 'desk', 'minimal'],
    material: 'Solid steel',
    dimensions: '10 × 10 × 22 CM',
    color: 'Raw steel',
    seller: 'Form & Field',
    buyUrl: 'https://example.com/product/standing-object',
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.56.19.jpeg', 'Standing Object — front view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.19 (1).jpeg', 'Standing Object — side view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.20.jpeg', 'Standing Object — detail view', 1200, 1200),
    ],
  },
  {
    slug: 'halo-light',
    name: 'Halo Light',
    short: 'A wall-mounted ring of warm, indirect light.',
    desc: 'Halo mounts flush to the wall and emits nothing directly — only the warm wash that returns from it. The diffuser is hand-opalescent glass; the frame is blackened oak. For hallways, heads of beds, and rooms without ceilings lights.',
    price: 15400,
    category: 'Lighting',
    brand: 'Atelier Nord',
    year: 2024,
    tags: ['wall', 'glass', 'ambient'],
    material: 'Blackened oak, opal glass',
    dimensions: '44 Ø × 6 CM',
    color: 'Black / white',
    availability: 'sold_out',
    seller: 'Atelier Nord',
    buyUrl: 'https://example.com/product/halo-light',
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.56.21.jpeg', 'Halo Light — front view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.21 (1).jpeg', 'Halo Light — side view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.22.jpeg', 'Halo Light — detail view', 1200, 1200),
    ],
  },
  {
    slug: 'dune-set',
    name: 'Dune Set',
    short: 'Four stacking stoneware bowls in graded glazes.',
    desc: 'Four bowls, thrown as one family, glazed in a gradient that runs from sand to ash. They stack to a single sculptural column and separate for a table. Dishwasher-proof, though they would rather you did not.',
    price: 8900,
    category: 'Ceramic',
    brand: 'Kiln & Co.',
    year: 2023,
    tags: ['stoneware', 'bowls', 'set'],
    material: 'Stoneware',
    dimensions: '16 Ø × 8 CM each',
    color: 'Sand → ash',
    seller: 'Kiln & Co.',
    buyUrl: 'https://example.com/product/dune-set',
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.56.24.jpeg', 'Dune Set — stacked view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.24 (1).jpeg', 'Dune Set — spread view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.25.jpeg', 'Dune Set — detail view', 1200, 1200),
    ],
  },
  {
    slug: 'cairn',
    name: 'Cairn',
    short: 'Three stacked stone forms balanced by weight alone.',
    desc: 'Three stones, cut flat where they meet and nothing more. The Cairn holds itself through mass and patience. Made in collaboration with a quarry that otherwise sells its off-cuts as gravel.',
    price: 5600,
    category: 'Objects',
    brand: 'Studio Meridian',
    year: 2025,
    tags: ['stone', 'stacked', 'sculptural'],
    material: 'Limestone',
    dimensions: '14 × 14 × 26 CM',
    color: 'Chalk',
    seller: 'Studio Meridian',
    buyUrl: 'https://example.com/product/cairn',
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.56.27.jpeg', 'Cairn — front view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.27 (1).jpeg', 'Cairn — side view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.28.jpeg', 'Cairn — detail view', 1200, 1200),
    ],
  },
  {
    slug: 'arc-stool',
    name: 'Arc Stool',
    short: 'A three-legged oak stool with a curved seat.',
    desc: 'The seat of the Arc Stool is a shallow arc of solid oak, dished by hand to meet the body. Three round legs splay at twelve degrees — enough to feel planted, not so much that it argues with a room.',
    price: 9800,
    category: 'Furniture',
    brand: 'Form & Field',
    year: 2026,
    tags: ['oak', 'stool', 'wood'],
    material: 'Solid white oak',
    dimensions: '38 Ø × 46 CM',
    color: 'White oak',
    availability: 'coming_soon',
    seller: 'Form & Field',
    buyUrl: 'https://example.com/product/arc-stool',
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.56.29.jpeg', 'Arc Stool — front view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.56.28.jpeg', 'Arc Stool — side view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.55.30.jpeg', 'Arc Stool — detail view', 1200, 1200),
    ],
  },
  {
    slug: 'carry-keyring',
    name: 'Carry Keyring',
    short: 'A solid brass keyring that ages in weeks.',
    desc: 'A single billet of brass, drilled, chamfered and tumbled until it feels like a river stone. The ring is steel; the rest is brass that will darken, brighten, and record every pocket it has lived in.',
    price: 1400,
    category: 'Accessories',
    brand: 'Morrow Goods',
    year: 2023,
    tags: ['brass', 'everyday', 'carry'],
    material: 'Solid brass, steel ring',
    dimensions: '60 × 18 × 5 MM',
    color: 'Brass',
    seller: 'Morrow Goods',
    buyUrl: 'https://example.com/product/carry-keyring',
    images: [
      primary('/products/WhatsApp Image 2026-10-08 at 14.56.28.jpeg', 'Carry Keyring — front view'),
      view('/products/WhatsApp Image 2026-10-08 at 14.55.30.jpeg', 'Carry Keyring — top view', 1500, 1000),
      view('/products/WhatsApp Image 2026-10-08 at 14.55.33.jpeg', 'Carry Keyring — detail view', 1200, 1200),
    ],
  },
]

const PRODUCTS: Product[] = SEEDS.map((seed, index) => {
  const offset = index * 86400000 * 9
  return {
    id: `prd-${String(index + 1).padStart(2, '0')}`,
    slug: seed.slug,
    name: seed.name,
    shortDescription: seed.short,
    description: seed.desc,
    price: seed.price,
    currency: seed.currency ?? 'INR',
    category: seed.category,
    brand: seed.brand,
    year: seed.year,
    tags: seed.tags,
    images: seed.images,
    primaryImage: seed.images[0]?.url,
    material: seed.material,
    dimensions: seed.dimensions,
    color: seed.color,
    availability: seed.availability ?? 'available',
    sellerName: seed.seller,
    sellerUrl: seed.seller
      ? `https://example.com/seller/${seed.seller.toLowerCase().replace(/[^a-z]+/g, '-')}`
      : undefined,
    buyUrl: seed.buyUrl,
    featured: seed.featured ?? false,
    published: true,
    createdAt: new Date(1761000000000 - offset).toISOString(),
    updatedAt: new Date(1761000000000 - offset / 2).toISOString(),
  }
})

export const initialProducts = PRODUCTS
