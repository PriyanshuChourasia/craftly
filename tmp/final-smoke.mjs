import { chromium } from 'playwright'

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(err.message))

  const routes = [
    { path: '/admin', desc: 'Admin dashboard' },
    { path: '/admin/products', desc: 'Admin products' },
    { path: '/admin/products/new', desc: 'Admin new product' },
    { path: '/admin/products/999/edit', desc: 'Admin edit (404 product)' },
    { path: '/this-does-not-exist', desc: '404 page' },
    { path: '/', desc: 'Home' },
  ]

  for (const { path, desc } of routes) {
    errors.length = 0
    // Use a fresh context each time to avoid scroll state leaking
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
    const p = await ctx.newPage()
    p.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
    p.on('pageerror', (err) => errors.push(err.message))
    await p.goto(`http://localhost:5175${path}`, { waitUntil: 'networkidle', timeout: 25000 })

    const siteHeaderVisible = await p.locator('header.fixed').isVisible().catch(() => false)
    const adminNavExists = await p.locator('nav[aria-label="Admin"]').count()
    const title = await p.title()
    console.log(`\n== ${desc} (${path}) ==`)
    console.log(`  title: ${title}`)
    console.log(`  site header (fixed) visible: ${siteHeaderVisible}`)
    console.log(`  admin nav (md) present: ${adminNavExists > 0}`)
    if (errors.length) console.log(`  console errors: ${errors.slice(0,2).join(' | ')}`)
    await ctx.close()
  }

  await browser.close()
}

main().catch((e) => { console.error(e); process.exit(1) })
