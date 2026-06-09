'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/cart/CartContext'
import CategoryBadge from './CategoryBadge'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="product-card group relative flex flex-col bg-hittamins-dark border border-hittamins-border hover:border-white/20 transition-all duration-300 overflow-hidden">
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none z-10"
        style={{ background: `radial-gradient(ellipse at center, ${product.colour}, transparent 70%)` }}
      />

      {/* Product image or styled placeholder */}
      <div
        className="relative h-56 overflow-hidden border-b border-hittamins-border"
        style={{ background: `linear-gradient(135deg, #111 0%, ${product.colour}18 100%)` }}
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
              style={{ color: product.colour + '50' }}
            >
              {product.name.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative z-10">
        <CategoryBadge category={product.category} colour={product.colour} />
        <h2 className="font-display text-3xl text-hittamins-text mt-3 leading-tight">{product.name}</h2>
        <p className="font-mono text-xs text-hittamins-muted mt-1 mb-3">{product.subtitle}</p>
        <p className="text-hittamins-muted text-sm leading-relaxed flex-1">{product.shortDescription}</p>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-hittamins-border">
          <span className="font-display text-4xl" style={{ color: product.colour }}>
            ${product.price.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="px-4 py-2 border border-hittamins-border text-hittamins-muted font-mono text-[10px] tracking-widest uppercase hover:border-white/40 hover:text-hittamins-text transition-colors"
            >
              View
            </Link>
            <button
              onClick={() => addItem(product)}
              className="px-4 py-2 font-mono text-[10px] tracking-widest uppercase text-black font-bold transition-opacity hover:opacity-80"
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
