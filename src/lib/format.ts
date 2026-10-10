import type { Currency } from '@/types/product'

const CURRENCY_LOCALE: Record<Currency, string> = {
  INR: 'en-IN',
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
}

/** Format a numeric price with the correct currency symbol & grouping. */
export function formatPrice(amount: number, currency: Currency | string = 'INR'): string {
  const cur = (currency as Currency) in CURRENCY_LOCALE ? (currency as Currency) : 'INR'
  try {
    return new Intl.NumberFormat(CURRENCY_LOCALE[cur], {
      style: 'currency',
      currency: cur,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${amount} ${cur}`
  }
}

/** Uppercase, human-readable availability label. */
export function availabilityLabel(a: string): string {
  switch (a) {
    case 'available':
      return 'Available'
    case 'sold_out':
      return 'Sold'
    case 'coming_soon':
      return 'Coming Soon'
    default:
      return a
  }
}
