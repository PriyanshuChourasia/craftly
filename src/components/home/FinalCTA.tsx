import { Link } from '@tanstack/react-router'
import { Reveal } from '@/components/animations/Reveal'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section aria-label="Enter the collection" className="relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-5 text-center md:px-10">
        <Reveal>
          <p className="text-meta text-muted">The exhibition is open</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mx-auto mt-6 max-w-5xl text-display-xl leading-[0.88]">
            Enter the<br />
            <span className="text-accent">collection</span>
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-14 flex items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/collection" data-cursor="view">
                Browse all objects <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/admin">Curator login</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
