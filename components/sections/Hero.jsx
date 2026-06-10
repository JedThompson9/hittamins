'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-driven parallax on the background
      gsap.to('.hero-bg',{
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative w-full h-[70vh] md:h-screen min-h-[500px] overflow-hidden bg-brand-light">

      {/* ── Background ──────────────────────────────────────────────── */}
      <div className="hero-bg absolute inset-0 scale-[1.12] origin-center">
        {/* Light blue-tinted gradient filler */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, #EAF2F8 0%, #D0E8F4 25%, #C0DCEE 50%, #D4E8F2 75%, #EAF2F8 100%)',
          }}
        />
        {/* Sky atmosphere */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 68% 44%, #6AAFCF 0%, transparent 55%)',
          }}
        />
        {/* Blue atmosphere */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              'radial-gradient(ellipse at 40% 70%, #4A90C4 0%, transparent 50%)',
          }}
        />
        {/* Subtle cross-hatch texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #1A3A5C 0, #1A3A5C 1px, transparent 0, transparent 50%)',
            backgroundSize: '18px 18px',
          }}
        />
      </div>

      {/* ── Gradient overlays ────────────────────────────────────────────── */}
      {/* Left-heavy so bottom-left text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-light/80 via-brand-light/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-light/60 via-transparent to-brand-light/10 pointer-events-none" />

      {/* ── Content — anchored bottom-left, top-clamped below the nav ──────── */}
      {/* pt-36 = 144px clears announcement bar (~34px) + navbar (~96px)       */}
      <div className="absolute inset-0 flex items-center pt-32 md:pt-28 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 pb-14 md:pb-20">
          <div className="max-w-lg">

            {/* Headline */}
            <h1 className="font-display leading-[0.88] mb-6">
              <span className="hero-line block text-brand-navy text-[clamp(3rem,7vw,6.5rem)]">
                BEAT IT.
              </span>
              <span
                className="hero-line block text-brand-blue text-[clamp(3rem,7vw,6.5rem)]"
              >
                RECOVER.
              </span>
              <span className="hero-line block text-brand-navy text-[clamp(3rem,7vw,6.5rem)]">
                REPEAT.
              </span>
            </h1>

            <p className="font-mono text-[10px] tracking-[0.35em] text-brand-muted uppercase mb-6">
              Recovery for fighters &amp; athletes
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/products/beating-black-blue"
                className="hero-cta inline-block px-6 py-3 bg-brand-blue text-white font-display text-xl md:text-2xl rounded-full hover:opacity-90 transition-opacity duration-200 whitespace-nowrap"
              >
                SHOP MUSCLE RUB
              </Link>
              <Link
                href="/products"
                className="hero-cta inline-block px-6 py-3 bg-brand-mint text-brand-navy font-display text-xl md:text-2xl rounded-full hover:opacity-90 transition-opacity duration-200 whitespace-nowrap"
              >
                ALL PRODUCTS
              </Link>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}
