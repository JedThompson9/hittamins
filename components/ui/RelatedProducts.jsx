'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from './ProductCard'

gsap.registerPlugin(ScrollTrigger)

export default function RelatedProducts({ products }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
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
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
