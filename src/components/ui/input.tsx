import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils'

const fieldBase =
  'w-full border border-border bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors focus:border-foreground focus-visible:outline-none disabled:opacity-50'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(fieldBase, 'h-10', className)} {...props} />
  ),
)
Input.displayName = 'Input'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldBase, 'min-h-[100px] resize-y', className)} {...props} />
))
Textarea.displayName = 'Textarea'

const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn('text-meta mb-1.5 block text-foreground-secondary', className)}
    {...props}
  />
))
Label.displayName = 'Label'

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p role="alert" className="mt-1.5 text-xs text-accent">
      {message}
    </p>
  ) : null

export { Input, Textarea, Label, FieldError }
