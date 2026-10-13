import { Link, Outlet, useLocation } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Products', to: '/admin/products' },
  { label: 'New product', to: '/admin/products/new' },
]

export function AdminLayout({ title, actions, children }: { title: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar sits below the fixed site <Header /> (approx. 64px tall). The
          top offset on the inner container keeps the admin nav and actions clear of
          the site header; the border sits under the top bar only. */}
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 pt-16">
          <div className="flex items-center gap-8">
            <nav aria-label="Admin" className="hidden items-center gap-5 md:flex">
              {NAV.map((item) => (
                <AdminNavLink key={item.to} {...item} />
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">{actions}</div>
        </div>
        {/* Mobile admin nav: pinned below the site header with matching top offset. */}
        <nav aria-label="Admin mobile" className="flex gap-5 border-t border-border/40 px-5 py-2 pt-16 md:hidden">
          {NAV.map((item) => (
            <AdminNavLink key={item.to} {...item} />
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8 pt-16">
        <h1 className="font-display text-2xl tracking-wide">{title}</h1>
        <div className="mt-6">{children}</div>
      </main>
    </div>
  )
}

function AdminNavLink({ label, to }: { label: string; to: string }) {
  const location = useLocation()
  const active = to === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(to)
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'text-meta transition-colors',
        active ? 'text-foreground' : 'text-muted hover:text-foreground',
      )}
    >
      {label}
    </Link>
  )
}

export { Outlet }
