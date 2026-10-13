import { chromium } from 'playwright'

async function main() {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await ctx.newPage()
  await page.goto('http://localhost:5180/', { waitUntil: 'networkidle', timeout: 30000 })

  const track = page.locator('[aria-label="Featured product slides"]')

  const scrollBefore = await track.evaluate(el => el.scrollLeft)
  console.log(`scrollBefore: ${scrollBefore}`)

  await page.locator('button[aria-label="Next product"]').click()
  await page.waitForTimeout(600)

  const scrollAfter = await track.evaluate(el => el.scrollLeft)
  console.log(`scrollAfter: ${scrollAfter}`)

  const changed = scrollAfter !== scrollBefore
  console.log(`scroll changed: ${changed} (${scrollBefore} -> ${scrollAfter})`)

  // Also check the first visible card's href changed
  const firstHrefBefore = await track.evaluate(el => {
    const firstChild = el.children[0] as HTMLElement | null
    return firstChild?.closest('a')?.getAttribute('href')
  })
  const firstHrefAfter = await track.evaluate(el => {
    // Find the first card that's mostly visible (centered)
    const children = Array.from(el.children) as HTMLElement[]
    const center = el.scrollLeft + el.clientWidth / 2
    let best = children[0]
    let bestDist = Infinity
    for (const child of children) {
      const rect = child.getBoundingClientRect()
      const childCenter = rect.left + rect.width / 2 - el.getBoundingClientRect().left
      const dist = Math.abs(childCenter - (el.scrollLeft + el.clientWidth / 2))
      if (dist < bestDist) {
        bestDist = dist
        best = child
      }
    }
    return best?.closest('a')?.getAttribute('href')
  })

  console.log(`firstHrefBefore: ${firstHrefBefore}`)
  console.log(`firstHrefAfter: ${firstHrefAfter}`)
  console.log(`href changed: ${firstHrefBefore !== firstHrefAfter}`)

  await browser.close()
  process.exit((!changed || firstHrefBefore === firstHrefAfter) ? 1 : 0)
}

main().catch((e) => { console.error(e); process.exit(1) })
