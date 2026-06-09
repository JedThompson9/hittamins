'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered title entrance — each line slides up from below
      gsap.fromTo(
        '.hero-line',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
        }
      )

      // Subtitle fades in after title
      gsap.fromTo(
        '.hero-sub',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.55 }
      )

      // CTA buttons stagger in
      gsap.fromTo(
        '.hero-cta',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.75,
        }
      )

      // Scroll-driven parallax on the radial glow
      gsap.to('.hero-glow', {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Tagline fades in on scroll
      gsap.fromTo(
        '.hero-tagline',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.hero-tagline',
            start: 'top 90%',
          },
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hittamins-black"
    >
      {/* Background glow */}
      <div className="hero-glow absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #3ECFCF 0%, #1A8FFF 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24">
        {/* Main headline */}
        <div className="overflow-hidden mb-8">
          <h1 className="font-display leading-none">
            <span className="hero-line block text-[clamp(5rem,14vw,14rem)] text-hittamins-text">
              BEAT IT.
            </span>
            <span className="hero-line block text-[clamp(5rem,14vw,14rem)]" style={{ color: '#3ECFCF' }}>
              RECOVER.
            </span>
            <span className="hero-line block text-[clamp(5rem,14vw,14rem)] text-hittamins-text">
              REPEAT.
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="hero-sub text-hittamins-muted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-body">
          Recovery supplements built for people who actually get hit. Boxers, fighters, gym-goers, runners, labourers.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Button
            href="/products/beating-black-blue"
            variant="primary"
            colour="#3ECFCF"
            className="hero-cta text-2xl"
          >
            SHOP MUSCLE RUB
          </Button>
          <Button
            href="/products/off-the-ropes"
            variant="secondary"
            colour="#1A8FFF"
            className="hero-cta text-2xl"
          >
            SHOP PRE-WORKOUT
          </Button>
        </div>

        {/* Scroll hint */}
        <p className="hero-tagline font-mono text-xs tracking-[0.4em] text-hittamins-muted mt-20 uppercase">
          Whatever Feels Right
        </p>
      </div>
    </section>
  )
}
