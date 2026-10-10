import { Card, StatValue } from './bits'
import type { AdminStats } from '@/lib/products/api'

export function ProductStats({ stats }: { stats: AdminStats }) {
  const items = [
    { label: 'Total objects', value: stats.total },
    { label: 'Featured', value: stats.featured },
    { label: 'Available', value: stats.available },
    { label: 'Sold out', value: stats.soldOut },
    { label: 'Drafts', value: stats.drafts },
  ]
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <Card key={item.label}>
          <p className="text-meta text-muted">{item.label}</p>
          <StatValue value={item.value} />
        </Card>
      ))}
    </div>
  )
}
