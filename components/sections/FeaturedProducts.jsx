'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '@/components/ui/ProductCard'
import products from '@/data/products.json'

gsap.registerPlugin(ScrollTrigger)

const FEATURED = products.filter((p) =>
  ['beating-black-blue', 'off-the-ropes'].includes(p.id)
)

export default function FeaturedProducts() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading entrance
      gsap.fromTo(
        '.featured-heading',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.featured-heading',
            start: 'top 85%',
          },
        }
      )

      // Product cards scroll-reveal with stagger
      gsap.fromTo(
        '.product-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.featured-grid',
            start: 'top 82%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-brand-light border-t border-brand-border">
      <div className="max-w-7xl mx-auto">
        <div className="featured-heading flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 className="font-display text-6xl md:text-8xl text-brand-navy">FEATURED</h2>
          <a
            href="/products"
            className="font-mono text-xs tracking-widest text-brand-muted hover:text-brand-blue transition-colors uppercase underline underline-offset-4"
          >
            View All Products
          </a>
        </div>

        <div className="featured-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
