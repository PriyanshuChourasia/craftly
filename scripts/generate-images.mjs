// Generates abstract, warm-toned editorial SVG artwork for the mock catalogue.
// Run: node scripts/generate-images.mjs
import { mkdirSync, writeFileSync } from 'node:fs'

const OUT = 'public/images'
mkdirSync(OUT, { recursive: true })

const palettes = [
  ['#e8ded4', '#c65b36', '#111111', '#f3ecea'],
  ['#dcd2c8', '#2f2a26', '#c0a48c', '#f6f1ec'],
  ['#e3d5c5', '#8a5a3b', '#1d1a17', '#efe7dd'],
  ['#d9d3cb', '#b3542f', '#3c352f', '#f1ebe5'],
  ['#e6dccb', '#6b625a', '#c65b36', '#f4efe9'],
  ['#d8cec4', '#20242a', '#c8b39a', '#ece4dc'],
]

function art(i) {
  const [bg, a, b, c] = palettes[i % palettes.length]
  const r = (n) => 40 + ((i * 37 + n * 53) % 140)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
  <rect width="1200" height="1500" fill="${bg}"/>
  <circle cx="${200 + r(1)}" cy="${300 + r(2)}" r="${r(3)}" fill="${a}" opacity="0.9"/>
  <rect x="${500 + r(4) / 3}" y="${500 + r(5) / 2}" width="${200 + r(6)}" height="${260 + r(7)}" fill="${b}" transform="rotate(${-8 + r(8) / 12} 700 700)"/>
  <path d="M0 ${1100 + r(9)} Q 600 ${900 + r(10)} 1200 ${1150 + r(11)} L1200 1500 L0 1500 Z" fill="${c}" opacity="0.85"/>
  <circle cx="${900 - r(12) / 2}" cy="${250 + r(13)}" r="${60 + r(14) / 4}" fill="none" stroke="${b}" stroke-width="6" opacity="0.7"/>
  <rect x="60" y="60" width="1080" height="1380" fill="none" stroke="${b}" stroke-width="2" opacity="0.35"/>
  <text x="80" y="1430" font-family="monospace" font-size="34" letter-spacing="8" fill="${b}" opacity="0.55">OBJECT / ${String(i + 1).padStart(2, '0')}</text>
</svg>`
}

// Three aspect variants per object: primary 4:5, wide 3:2, square 1:1
for (let i = 0; i < 16; i++) {
  const base = art(i)
  writeFileSync(`${OUT}/p${String(i + 1).padStart(2, '0')}.svg`, base)
  const wide = base.replace('width="1200" height="1500" viewBox="0 0 1200 1500"', 'width="1500" height="1000" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"')
  writeFileSync(`${OUT}/p${String(i + 1).padStart(2, '0')}-b.svg`, wide)
  const sq = base.replace('width="1200" height="1500" viewBox="0 0 1200 1500"', 'width="1200" height="1200" viewBox="0 0 1200 1000" preserveAspectRatio="xMidYMid slice"')
  writeFileSync(`${OUT}/p${String(i + 1).padStart(2, '0')}-c.svg`, sq)
}
console.log('Generated 48 SVGs in', OUT)
