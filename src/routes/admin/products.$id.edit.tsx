import { createFileRoute, notFound } from '@tanstack/react-router'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ProductForm } from '@/components/admin/ProductForm'
import { LoadingState } from '@/components/states/States'
import { fetchProductById } from '@/lib/products/api'

export const Route = createFileRoute('/admin/products/$id/edit')({
  loader: async ({ params }) => {
    const product = await fetchProductById({ data: params.id })
    if (!product) throw notFound()
    return { product }
  },
  head: ({ match }) => {
    const product = match.loaderData as { product: { name: string } } | undefined
    return {
      meta: [{ title: product ? `${product.product.name} — OBJECTS Admin` : 'Edit — OBJECTS Admin' }],
    }
  },
  pendingComponent: () => <LoadingState label="Loading object" />,
  component: EditProduct,
})

function EditProduct() {
  const { product } = Route.useLoaderData()
  return (
    <AdminLayout title={`Edit — ${product.name}`}>
      <ProductForm product={product} />
    </AdminLayout>
  )
}
