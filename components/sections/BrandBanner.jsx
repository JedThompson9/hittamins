'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BrandBanner() {
  const bannerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.banner-text',
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        '.banner-sub',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 80%',
          },
        }
      )
    }, bannerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={bannerRef}
      className="py-24 px-6 text-center bg-brand-navy border-t border-brand-border"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="banner-text font-display text-[clamp(4rem,12vw,12rem)] leading-none text-brand-mint mb-6">
          WHATEVER FEELS RIGHT
        </h2>
        <p className="banner-sub font-mono text-sm text-white/60 tracking-widest max-w-md mx-auto uppercase">
          Hittamins — Recovery for fighters, workers, and everyone in between.
        </p>
      </div>
    </section>
  )
}
