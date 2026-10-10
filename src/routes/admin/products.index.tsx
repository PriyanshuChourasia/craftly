import { createFileRoute, Link } from '@tanstack/react-router'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ProductTable } from '@/components/admin/ProductTable'
import { Button } from '@/components/ui/button'
import { LoadingState } from '@/components/states/States'
import { Plus } from 'lucide-react'
import { fetchProducts } from '@/lib/products/api'

export const Route = createFileRoute('/admin/products/')({
  loader: () => fetchProducts(),
  head: () => ({ meta: [{ title: 'Products — OBJECTS Admin' }] }),
  pendingComponent: () => <LoadingState label="Loading archive" />,
  component: AdminProducts,
})

function AdminProducts() {
  const products = Route.useLoaderData()

  return (
    <AdminLayout
      title="Products"
      actions={
        <Button asChild size="sm">
          <Link to="/admin/products/new">
            <Plus aria-hidden="true" /> New product
          </Link>
        </Button>
      }
    >
      <ProductTable products={products} />
    </AdminLayout>
  )
}
