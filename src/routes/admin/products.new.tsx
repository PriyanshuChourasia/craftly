import { createFileRoute } from '@tanstack/react-router'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ProductForm } from '@/components/admin/ProductForm'

export const Route = createFileRoute('/admin/products/new')({
  head: () => ({ meta: [{ title: 'New product — OBJECTS Admin' }] }),
  component: NewProduct,
})

function NewProduct() {
  return (
    <AdminLayout title="New product">
      <ProductForm />
    </AdminLayout>
  )
}
