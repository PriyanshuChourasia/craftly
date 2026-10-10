import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border/60">
      {/* Giant faded O */}
      <span
        aria-hidden="true"
        className="bg-type pointer-events-none absolute -bottom-[18vw] left-1/2 -translate-x-1/2 text-[46vw] opacity-[0.05]"
      >
        O
      </span>

      <div className="relative mx-auto max-w-[1600px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-display-md">Shobhanjana</p>
            <p className="text-meta mt-3 text-muted">A digital creation studio — shop and collection.</p>
          </div>
          <nav className="md:col-span-3" aria-label="Footer">
            <p className="text-meta mb-5 text-muted">Index</p>
            <ul className="space-y-3">
              <li><Link to="/" className="link-underline-hover text-sm">About</Link></li>
              <li><Link to="/collection" className="link-underline-hover text-sm">Collection</Link></li>
              <li><Link to="/collection" className="link-underline-hover text-sm">Archive</Link></li>
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="text-meta mb-5 text-muted">Elsewhere</p>
            <ul className="space-y-3">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="link-underline-hover inline-flex items-center gap-1 text-sm">
                  Instagram <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href="https://example.com/store" target="_blank" rel="noopener noreferrer" className="link-underline-hover inline-flex items-center gap-1 text-sm">
                  Store <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-meta mb-5 text-muted">Coordinates</p>
            <p className="text-meta leading-loose text-foreground-secondary">
              43°12'08" N<br />
              5°32'37" E<br />
              Archive / 2026
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-4 border-t border-border/40 pt-6">            <p className="text-meta text-muted">© SB Creation</p>
          <p className="text-meta text-muted">No. 07 — Edition of one</p>
        </div>
      </div>
    </footer>
  )
}
