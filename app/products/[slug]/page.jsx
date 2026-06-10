import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import products from '@/data/products.json'
import CategoryBadge from '@/components/ui/CategoryBadge'
import IngredientList from '@/components/ui/IngredientList'
import AddToCartButton from '@/components/ui/AddToCartButton'
import RelatedProducts from '@/components/ui/RelatedProducts'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — Hittamins`,
    description: product.shortDescription,
  }
}

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) notFound()

  const related = products.filter((p) => p.id !== product.id).slice(0, 2)

  return (
    <main className="min-h-screen bg-brand-light pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-xs text-brand-muted mb-12">
          <Link href="/" className="hover:text-brand-text transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand-text transition-colors">Products</Link>
          <span>/</span>
          <span className="text-brand-text">{product.name}</span>
        </nav>

        {/* Product hero — two column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Image */}
          <div
            className="aspect-square relative border border-brand-border overflow-hidden"
            style={{ background: `linear-gradient(135deg, #EAF2F8 0%, ${product.colour}22 100%)` }}
          >
            {/* Coloured glow behind image */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background: `radial-gradient(circle at center, ${product.colour}20, transparent 65%)`,
              }}
            />
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover z-10 relative"
                style={{ objectPosition: product.imagePosition || 'center' }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span
                  className="font-display text-center px-8 leading-tight text-[clamp(2.5rem,6vw,6rem)]"
                  style={{ color: product.colour + '80' }}
                >
                  {product.name.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <CategoryBadge category={product.category} colour={product.colour} />

            <h1 className="font-display text-[clamp(3rem,6vw,6rem)] leading-none text-brand-navy mt-4 mb-2">
              {product.name}
            </h1>
            <p className="font-mono text-xs text-brand-muted tracking-widest mb-6">
              {product.subtitle}
            </p>

            <p className="text-brand-text leading-relaxed mb-6 text-base">
              {product.longDescription}
            </p>

            <p className="font-display text-5xl mb-8" style={{ color: product.colour }}>
              ${product.price.toFixed(2)}
            </p>

            {/* Add to cart — client component */}
            <AddToCartButton product={product} />

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-brand-border">
              {['Natural Ingredients', 'Made for Athletes', 'Real Recovery'].map((t) => (
                <span key={t} className="font-mono text-[10px] tracking-widest text-brand-muted uppercase">
                  ✓ {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Perfect For */}
        {product.perfectFor && product.perfectFor.length > 0 && (
          <div className="mb-24">
            <p className="font-mono text-xs tracking-widest text-brand-muted uppercase mb-8">
              Perfect For
            </p>
            <div className="flex flex-wrap gap-6 md:gap-12">
              {product.perfectFor.map((label) => (
                <span key={label} className="font-mono text-sm text-brand-text border-b border-brand-border pb-1">
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Ingredients */}
        <div className="mb-24">
          <h2 className="font-display text-5xl md:text-7xl text-brand-navy mb-12">
            WHAT'S INSIDE
          </h2>
          <div className="max-w-2xl">
            <IngredientList ingredients={product.ingredients} accentColour={product.colour} />
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-5xl md:text-7xl text-brand-navy mb-12">
              YOU MIGHT ALSO LIKE
            </h2>
            <RelatedProducts products={related} />
          </div>
        )}
      </div>
    </main>
  )
}
