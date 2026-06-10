'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function IngredientList({ ingredients, accentColour = '#8FBF8F' }) {
  const listRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ingredient-item',
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.09,
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 85%',
          },
        }
      )
    }, listRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={listRef} className="space-y-2">
      {ingredients.map((ingredient) => (
        <div
          key={ingredient.name}
          className="ingredient-item bg-brand-soft rounded px-4 py-4 border border-brand-border mb-2 last:mb-0"
        >
          <h4
            className="font-mono text-xs tracking-widest uppercase font-bold mb-2"
            style={{ color: accentColour }}
          >
            {ingredient.name}
          </h4>
          <p className="text-brand-text text-sm leading-relaxed">{ingredient.description}</p>
        </div>
      ))}
    </div>
  )
}
