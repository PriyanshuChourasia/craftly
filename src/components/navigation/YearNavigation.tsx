import { Link, useNavigate } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { CollectionSearch } from '@/routes/collection'

export type YearNavigationProps = {
  years: number[]
  active?: number
  orientation?: 'vertical' | 'horizontal'
  basePath?: string
}

export function YearNavigation({
  years,
  active,
  orientation = 'vertical',
  basePath = '/collection',
}: YearNavigationProps) {
  const navigate = useNavigate()
  const all = [undefined, ...years]

  const makeHref = (y?: number) =>
    y === undefined ? basePath : `${basePath}?year=${y}`

  const select = (y?: number) => {
    navigate({
      to: basePath,
      search: (prev: CollectionSearch) => ({ ...prev, year: y }),
    })
  }

  return (
    <nav
      aria-label="Filter by year"
      className={cn(
        orientation === 'vertical'
          ? 'flex flex-col items-start gap-3'
          : 'flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      )}
    >
      {all.map((y, i) => {
        const isActive = (y ?? undefined) === active
        return (
          <motion.button
            key={y ?? 'all'}
            type="button"
            onClick={() => select(y)}
            whileHover={{ x: orientation === 'vertical' ? 4 : 0 }}
            className={cn(
              'font-display cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-accent',
              orientation === 'vertical'
                ? cn('text-right text-3xl leading-none md:text-4xl', isActive && 'md:text-5xl')
                : 'text-2xl',
              isActive ? 'text-foreground' : 'text-muted/70 hover:text-foreground-secondary',
            )}
            aria-current={isActive ? 'true' : undefined}
            style={{ transition: 'color .3s, font-size .3s' }}
          >
            <Link
              to={makeHref(y)}
              onClick={(e) => {
                e.preventDefault()
                select(y)
              }}
              preload="intent"
              className="block"
            >
              <span className="relative">
                {y ?? 'All'}
                {isActive && (
                  <motion.span
                    layoutId={`year-indicator-${orientation}`}
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </span>
              <span className="text-meta sr-only">
                {y ? `Objects from ${y}` : 'All objects'} — {i === 0 ? 'newest first' : ''}
              </span>
            </Link>
          </motion.button>
        )
      })}
    </nav>
  )
}
