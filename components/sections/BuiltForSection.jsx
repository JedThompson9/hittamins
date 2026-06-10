'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BuiltForIcons from '@/components/ui/BuiltForIcons'

gsap.registerPlugin(ScrollTrigger)

export default function BuiltForSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.built-for-heading',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.built-for-heading',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-brand-soft border-t border-brand-border">
      <div className="max-w-7xl mx-auto text-center">
        <p className="built-for-heading font-mono text-xs tracking-widest text-brand-muted uppercase mb-12">
          Built For
        </p>
        <BuiltForIcons />
      </div>
    </section>
  )
}
