'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/cart/CartContext'
import CategoryBadge from './CategoryBadge'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="product-card group relative flex flex-col bg-brand-white border border-brand-border hover:shadow-lg transition-all duration-300 overflow-hidden"
      style={{ '--hover-shadow': product.colour }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none z-10"
        style={{ background: `radial-gradient(ellipse at center, ${product.colour}, transparent 70%)` }}
      />

      {/* Product image or styled placeholder */}
      <div
        className="relative h-56 overflow-hidden border-b border-brand-border"
        style={{ background: `linear-gradient(135deg, #EAF2F8 0%, ${product.colour}18 100%)` }}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ objectPosition: product.imagePosition || 'center' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display text-center px-6 leading-tight text-[clamp(1.5rem,4vw,3.5rem)]"
              style={{ color: product.colour + '80' }}
            >
              {product.name.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative z-10">
        <CategoryBadge category={product.category} colour={product.colour} />
        <h2 className="font-display text-3xl text-brand-text mt-3 leading-tight">{product.name}</h2>
        <p className="font-mono text-xs text-brand-muted mt-1 mb-3">{product.subtitle}</p>
        <p className="text-brand-muted text-sm leading-relaxed flex-1">{product.shortDescription}</p>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-brand-border">
          <span className="font-display text-4xl" style={{ color: product.colour }}>
            ${product.price.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="px-4 py-2 border border-brand-border text-brand-muted font-mono text-[10px] tracking-widest uppercase hover:border-brand-navy/40 hover:text-brand-text transition-colors"
            >
              View
            </Link>
            <button
              onClick={() => addItem(product)}
              className="px-4 py-2 font-mono text-[10px] tracking-widest uppercase text-white font-bold transition-opacity hover:opacity-80"
              style={{ backgroundColor: product.colour }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
