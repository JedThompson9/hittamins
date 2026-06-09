'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  { year: '01', label: 'Founded with a purpose', body: 'Built in the gym, not a lab. Every decision starts with real people and real physical demands.' },
  { year: '02', label: 'Formulated with intent', body: 'Natural ingredients, honest formulations, and nothing that does not belong in your body.' },
  { year: '03', label: 'Built for real people', body: 'Fighters, workers, runners, gym-goers. If you push your body, Hittamins is for you.' },
]

export default function AboutPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-title',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      )

      gsap.fromTo(
        '.about-body p',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.about-body',
            start: 'top 85%',
          },
        }
      )

      gsap.fromTo(
        '.value-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.values-section',
            start: 'top 82%',
          },
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef} className="min-h-screen bg-hittamins-black pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-widest text-hittamins-muted uppercase mb-4">About</p>
          <h1 className="about-title font-display text-[clamp(4rem,12vw,10rem)] leading-none text-hittamins-text">
            HITTAMINS
          </h1>
        </div>

        {/* Main copy */}
        <div className="about-body space-y-6 mb-24 border-l-2 border-hittamins-green pl-8">
          <p className="text-hittamins-text text-xl leading-relaxed">
            Hittamins was built for the people who push their bodies hard and need real recovery — not marketing fluff.
          </p>
          <p className="text-hittamins-muted text-base leading-relaxed">
            We're not a lab in a sterile white room. We're a brand built around the gym, the ring, the track, and the job site. Every product we make is designed around one question: does this actually help you recover and perform?
          </p>
          <p className="text-hittamins-muted text-base leading-relaxed">
            Our approach is simple: natural ingredients, honest formulations, and products that do what they say.
          </p>
          <p className="font-display text-4xl text-hittamins-green">
            WHATEVER FEELS RIGHT.
          </p>
        </div>

        {/* Values */}
        <div className="values-section">
          <h2 className="font-display text-5xl text-hittamins-text mb-12">OUR APPROACH</h2>
          <div className="space-y-0 divide-y divide-hittamins-border border-t border-hittamins-border">
            {VALUES.map((v) => (
              <div key={v.year} className="value-item py-8 flex gap-8">
                <span className="font-mono text-xs text-hittamins-muted mt-1 flex-shrink-0">{v.year}</span>
                <div>
                  <h3 className="font-display text-3xl text-hittamins-text mb-2">{v.label.toUpperCase()}</h3>
                  <p className="text-hittamins-muted text-sm leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
