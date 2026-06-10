'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ICONS = [
  { emoji: '🥊', label: 'Boxers' },
  { emoji: '🏋️', label: 'Gym Goers' },
  { emoji: '🏃', label: 'Runners' },
  { emoji: '🦺', label: 'Labourers' },
  { emoji: '💪', label: 'Everyday Aches & Pains' },
]

export default function BuiltForIcons() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.built-for-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-8 md:gap-16">
      {ICONS.map((icon) => (
        <div key={icon.label} className="built-for-item flex flex-col items-center gap-3">
          <span className="text-5xl">{icon.emoji}</span>
          <span className="font-mono text-xs text-brand-muted tracking-widest uppercase text-center">
            {icon.label}
          </span>
        </div>
      ))}
    </div>
  )
}
