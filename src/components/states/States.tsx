import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function LoadingState({ label = 'Loading object' }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6" role="status" aria-live="polite">
      <p className="font-display text-display-md animate-pulse">{label}</p>
      <div className="h-px w-40 overflow-hidden bg-border/50">
        <div className="h-full w-1/3 animate-[loading-slide_1.2s_ease-in-out_infinite] bg-foreground" />
      </div>
      <style>{`@keyframes loading-slide { 0% { transform: translateX(-100%);} 100% { transform: translateX(400%);} }`}</style>
    </div>
  )
}

export function EmptyState({ label = 'Nothing on display' }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="font-display text-display-md text-foreground/25">Empty</p>
      <p className="text-meta text-muted">{label}</p>
    </div>
  )
}

export function NotFoundState({
  code = '404',
  title = 'Object not found',
  description = "The object you're looking for has left the collection.",
}: {
  code?: string
  title?: string
  description?: string
}) {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <span aria-hidden="true" className="bg-type absolute inset-0 flex items-center justify-center text-[38vw]">
        {code}
      </span>            <p className="text-meta relative text-muted">{code} — Collection</p>
      <h1 className="font-display text-display-lg relative mt-4">{title}</h1>
      <p className="relative mt-4 max-w-md text-sm text-foreground-secondary">{description}</p>
      <Button asChild size="lg" className="relative mt-10">
        <Link to="/collection">Return to collection</Link>
      </Button>
    </div>
  )
}

export function ErrorState({
  description = 'The collection is temporarily unavailable.',
  onRetry,
}: {
  description?: string
  onRetry?: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="font-display text-display-md">Collection unavailable</h1>
      <p className="max-w-md text-sm text-foreground-secondary">{description}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  )
}
