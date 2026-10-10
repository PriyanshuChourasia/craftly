import fs from 'node:fs'

const lines = fs.readFileSync('src/data/products.ts', 'utf8').split('\n')
const groups = []
let slug = ''
let imgs = []

lines.forEach((l) => {
  if (/^\s*slug:\s*/.test(l)) {
    if (slug && imgs.length) groups.push({ slug, imgs })
    slug = l.replace(/^\s*slug:\s*["']?([^'"]+)["']?\s*,?\s*$/, '$1')
    imgs = []
  } else if (/^\s+(primary|view)\(/.test(l)) {
    const m = l.match(/\/products\/([\w ().-]+\.(?:jpeg|jpg|png|webp|avif))/)
    if (m) imgs.push('/products/' + m[1])
  }
})
if (slug && imgs.length) groups.push({ slug, imgs })

const dup = new Map()
groups.forEach((g) => g.imgs.forEach((u) => { dup.set(u, (dup.get(u) || 0) + 1) }))
const multi = Array.from(dup.entries()).filter(([, c]) => c > 1).map(([u]) => u)

console.log({ products: groups.length, totalRefs: [...dup.values()].reduce((a, b) => a + b, 0), uniqueRefs: dup.size, usedMoreThanOnce: multi.length })
if (multi.length) {
  console.log('SHARED IMAGES:')
  multi.forEach((u) => console.log(u))
  console.log('PRODUCTS USING THOSE IMAGES:')
  groups.forEach((g) => {
    const shared = g.imgs.filter((u) => multi.includes(u))
    if (shared.length) console.log(g.slug, shared)
  })
}
