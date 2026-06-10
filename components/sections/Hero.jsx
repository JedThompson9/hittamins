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
    <section ref={heroRef} className="relative w-full h-screen min-h-[600px] overflow-hidden">

      {/* ── Background image ──────────────────────────────────────────────── */}
      {/*  Place your hero photo at /public/hero/hero.jpg and swap the div    */}
      {/*  below for:                                                          */}
      {/*  <Image src="/hero/hero.jpg" alt="" fill className="object-cover    */}
      {/*    object-center" priority />                                        */}
      <div className="hero-bg absolute inset-0 scale-[1.12] origin-center">
        {/* Filler gradient — looks like a dark gym/sports photo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, #080c0c 0%, #0f1f1f 25%, #182828 50%, #101818 75%, #080c0c 100%)',
          }}
        />
        {/* Teal atmosphere */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              'radial-gradient(ellipse at 68% 44%, #3ECFCF 0%, transparent 55%)',
          }}
        />
        {/* Blue atmosphere */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            background:
              'radial-gradient(ellipse at 40% 70%, #1A8FFF 0%, transparent 50%)',
          }}
        />
        {/* Subtle cross-hatch texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
            backgroundSize: '18px 18px',
          }}
        />
      </div>

      {/* ── Gradient overlays ────────────────────────────────────────────── */}
      {/* Left-heavy so bottom-left text stays readable against any photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10 pointer-events-none" />

      {/* ── Content — anchored bottom-left, top-clamped below the nav ──────── */}
      {/* pt-36 = 144px clears announcement bar (~34px) + navbar (~96px)       */}
      <div className="absolute inset-0 flex items-end pt-36 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 pb-14 md:pb-20">
          <div className="max-w-lg">

            {/* Headline */}
            <h1 className="font-display leading-[0.88] mb-6">
              <span className="hero-line block text-white text-[clamp(3rem,7vw,6.5rem)]">
                BEAT IT.
              </span>
              <span
                className="hero-line block text-[clamp(3rem,7vw,6.5rem)]"
                style={{ color: '#3ECFCF' }}
              >
                RECOVER.
              </span>
              <span className="hero-line block text-white text-[clamp(3rem,7vw,6.5rem)]">
                REPEAT.
              </span>
            </h1>

            <p className="font-mono text-[10px] tracking-[0.35em] text-hittamins-cyan uppercase mb-6">
              Recovery for fighters &amp; athletes
            </p>

            {/* CTA buttons — pill style like Puresport */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products/beating-black-blue"
                className="hero-cta inline-block px-7 py-3.5 bg-white text-black font-display text-2xl rounded-full hover:bg-hittamins-cyan transition-colors duration-200"
              >
                SHOP MUSCLE RUB
              </Link>
              <Link
                href="/products"
                className="hero-cta inline-block px-7 py-3.5 border border-white/40 text-white font-display text-2xl rounded-full hover:bg-white/10 hover:border-white/70 transition-colors duration-200"
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
