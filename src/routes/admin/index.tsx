import { createFileRoute, Link } from '@tanstack/react-router'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ProductStats } from '@/components/admin/ProductStats'
import { RecentProducts } from '@/components/admin/bits'
import { Card } from '@/components/admin/bits'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { fetchAdminStats } from '@/lib/products/api'

export const Route = createFileRoute('/admin/')({
  loader: () => fetchAdminStats(),
  head: () => ({ meta: [{ title: 'Dashboard — OBJECTS Admin' }] }),
  component: AdminDashboard,
})

function AdminDashboard() {
  const stats = Route.useLoaderData()

  return (
    <AdminLayout
      title="Dashboard"
      actions={
        <Button asChild size="sm">
          <Link to="/admin/products/new">
            <Plus aria-hidden="true" /> New product
          </Link>
        </Button>
      }
    >
      <ProductStats stats={stats} />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-meta text-muted">Recent products</h2>
            <Link to="/admin/products" className="text-meta hover:underline">
              View all →
            </Link>
          </div>
          <RecentProducts products={stats.recent} />
        </Card>
        <Card>
          <h2 className="text-meta text-muted">Recent activity</h2>
          <ul className="mt-3 space-y-3">
            {stats.recent.slice(0, 4).map((p) => (
              <li key={p.id} className="flex items-baseline justify-between gap-3 text-sm">
                <span>
                  <span className="text-foreground">{p.name}</span>{' '}
                  <span className="text-foreground-secondary">
                    updated {new Date(p.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </span>
                </span>
                <span className="text-meta shrink-0 text-muted">
                  {p.featured ? 'Featured' : 'Catalogued'}
                </span>
              </li>
            ))}
            {stats.recent.length === 0 && (
              <li className="text-meta text-muted">No activity yet</li>
            )}
          </ul>
        </Card>
      </div>
    </AdminLayout>
  )
}
