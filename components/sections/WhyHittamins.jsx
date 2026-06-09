'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    label: 'NATURAL INGREDIENTS',
    body: 'No synthetic junk. No fillers. Every ingredient is there for a reason.',
    colour: '#8FBF8F',
  },
  {
    label: 'BUILT FOR PERFORMANCE',
    body: 'Designed around real training demands — not marketing copy.',
    colour: '#3ECFCF',
  },
  {
    label: 'REAL RECOVERY',
    body: 'Backed by what actually works. Honest formulations. Full stop.',
    colour: '#1A8FFF',
  },
]

export default function WhyHittamins() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-heading',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.why-heading',
            start: 'top 85%',
          },
        }
      )

      gsap.fromTo(
        '.why-pillar',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.why-grid',
            start: 'top 82%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-hittamins-dark border-t border-hittamins-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="why-heading font-display text-6xl md:text-8xl text-hittamins-text mb-16">
          WHY HITTAMINS
        </h2>

        <div className="why-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.label}
              className="why-pillar border border-hittamins-border p-8 hover:border-white/20 transition-colors duration-300"
            >
              <div
                className="w-8 h-1 mb-6"
                style={{ backgroundColor: pillar.colour }}
              />
              <h3
                className="font-display text-3xl mb-4 leading-tight"
                style={{ color: pillar.colour }}
              >
                {pillar.label}
              </h3>
              <p className="text-hittamins-muted text-sm leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
