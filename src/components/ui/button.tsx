import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-meta transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3.5 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-dark text-[#f3ecea] hover:bg-accent',
        outline: 'border border-border bg-transparent text-foreground hover:border-foreground',
        ghost: 'text-foreground-secondary hover:text-foreground hover:bg-foreground/5',
        accent: 'bg-accent text-white hover:bg-dark',
        link: 'text-foreground underline-offset-4 hover:underline',
        destructive: 'border border-accent/40 text-accent hover:bg-accent hover:text-white',
      },
      size: {
        default: 'h-10 px-5',
        sm: 'h-8 px-3.5 text-[10px]',
        lg: 'h-12 px-8',
        icon: 'size-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
