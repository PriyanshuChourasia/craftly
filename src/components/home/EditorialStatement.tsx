import { Reveal } from '@/components/animations/Reveal'
import { ScrollParallax } from '@/components/parallax'
import { useReducedMotion } from '@/hooks'
import { motion } from 'motion/react'

export function EditorialStatement() {
  const reduced = useReducedMotion()
  const words = 'Objects are not just things.'.split(' ')

  return (
    <section id="about" aria-label="Editorial statement" className="relative overflow-hidden py-32 md:py-56">
      <ScrollParallax speed={0.08}>
        <span aria-hidden="true" className="bg-type absolute left-0 top-1/2 -translate-y-1/2 text-[30vw] opacity-[0.035]">
          Matter
        </span>
      </ScrollParallax>

      <div className="relative mx-auto max-w-5xl px-5 md:px-10">
        <Reveal>
          <p className="text-meta text-muted">Section 03 — Statement</p>
        </Reveal>
        <h2 className="font-display mt-10 text-display-lg leading-[0.92]">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="mr-[0.35em] inline-block"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 50, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {word === 'not' || word === 'things.' ? (
                <span className="text-accent">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h2>
        <Reveal delay={0.3}>
          <p className="mt-12 max-w-xl text-base leading-relaxed text-foreground-secondary">
            Objects carry the traces of the hands, places and moments that shaped them. The
            collection gathers those traces — carved, cast, thrown and worn — and puts each one
            exactly where it deserves to stand: alone, in the light, at full scale.
          </p>
        </Reveal>
        <div className="mt-16 flex items-center gap-6">
          <span className="h-px w-24 bg-foreground/40" aria-hidden="true" />
          <p className="text-meta text-muted">Editorial — Vol. I / Matter</p>
        </div>
      </div>
    </section>
  )
}
