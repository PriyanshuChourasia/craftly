import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

function Badge({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'outline' | 'accent' | 'muted'
}) {
  return (
    <span
      className={cn(
        'text-meta inline-flex items-center border px-2 py-0.5',
        variant === 'default' && 'border-foreground bg-foreground text-background',
        variant === 'outline' && 'border-border text-foreground-secondary',
        variant === 'accent' && 'border-accent/40 text-accent',
        variant === 'muted' && 'border-border/60 text-muted',
        className,
      )}
      {...props}
    />
  )
}

const Separator = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-border/50',
      orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
      className,
    )}
    {...props}
  />
))
Separator.displayName = 'Separator'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse bg-foreground/[0.06]', className)} {...props} />
}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer size-4 shrink-0 border border-border bg-transparent transition-colors hover:border-foreground data-[state=checked]:border-foreground data-[state=checked]:bg-foreground focus-visible:outline-2 focus-visible:outline-accent',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-background">
      <Check className="size-3" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = 'Checkbox'

export { Badge, Separator, Skeleton, Checkbox }
