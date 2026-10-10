import { Link, useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

export type CategoryExploreOnSelect = (next: {
  category?: string
  brand?: string
  availability?: string
}) => void

export function CategoryExplore({
  categories,
  onSelect,
}: {
  categories: string[]
  onSelect: CategoryExploreOnSelect
}) {
  const navigate = useNavigate()

  const select = (category: string) => {
    onSelect({ category })
    navigate({
      to: '/collection',
      search: { category },
      replace: true,
    })
  }

  return (
    <nav aria-label="Explore categories" className="flex flex-col gap-3">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => select(category)}
          className={cn(
            'text-meta border border-border/60 px-3 py-2 transition-colors hover:border-border hover:text-foreground',
          )}
        >
          {category}
        </button>
      ))}
    </nav>
  )
}
