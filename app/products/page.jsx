'use client'
import { useState, useEffect, useRef } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '@/components/ui/ProductCard'
import products from '@/data/products.json'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['All', 'Muscle Recovery', 'Pre-Workout', 'Vitamins & Supplements']

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const sectionRef = useRef(null)

  // AutoAnimate drives the smooth add/remove transitions when filter changes
  const [gridRef] = useAutoAnimate()

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)

  // Section heading + filter bar entrance via GSAP ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.products-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.products-title',
            start: 'top 85%',
          },
        }
      )

      gsap.fromTo(
        '.filter-btn',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.filter-row',
            start: 'top 85%',
          },
        }
      )

      // Initial product card scroll-reveal (one-time on mount)
      gsap.fromTo(
        '.product-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={sectionRef} className="min-h-screen bg-brand-light pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-12">
          <p className="font-mono text-xs tracking-widest text-brand-muted uppercase mb-3">
            Hittamins Range
          </p>
          <h1 className="products-title font-display text-[clamp(4rem,12vw,10rem)] leading-none text-brand-navy">
            PRODUCTS
          </h1>
        </div>

        {/* Filter bar */}
        <div className="filter-row flex flex-wrap gap-3 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn font-mono text-[10px] tracking-widest uppercase px-5 py-2.5 border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-brand-blue border-brand-blue text-white'
                  : 'border-brand-border text-brand-muted hover:border-brand-blue hover:text-brand-blue'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid — AutoAnimate on the container handles filter transitions */}
        <div
          ref={gridRef}
          className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}
