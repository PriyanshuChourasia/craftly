import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * External purchase link — there is no internal checkout.
 * Opens the seller's store in a new tab with hardened rel attrs.
 */
export function BuyButton({
  href,
  sellerName,
  size = 'lg',
  className,
}: {
  href?: string
  sellerName?: string
  size?: 'sm' | 'default' | 'lg'
  className?: string
}) {
  if (!href) {
    return (
      <Button variant="outline" size={size} disabled className={className}>
        Not yet available
      </Button>
    )
  }
  return (
    <Button asChild size={size} data-cursor="buy" className={className}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        Buy Now{sellerName ? ` — ${sellerName}` : ''} <ArrowUpRight aria-hidden="true" />
      </a>
    </Button>
  )
}
