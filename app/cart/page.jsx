'use client'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/components/cart/CartContext'

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart()

  // AutoAnimate makes cart item add/remove animate smoothly
  const [listRef] = useAutoAnimate()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-hittamins-black flex flex-col items-center justify-center px-6 text-center pt-16">
        <h1 className="font-display text-7xl md:text-9xl text-hittamins-muted mb-6">
          NOTHING IN THE RING YET.
        </h1>
        <p className="text-hittamins-muted mb-10 font-mono text-xs tracking-widest">
          Your cart is empty.
        </p>
        <Link
          href="/products"
          className="font-display text-3xl px-10 py-4 bg-hittamins-green text-black hover:opacity-80 transition-opacity"
        >
          SHOP PRODUCTS
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-hittamins-black pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-[clamp(4rem,10vw,9rem)] leading-none text-hittamins-text mb-16">
          YOUR CART <span className="text-hittamins-muted">({count})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Item list */}
          <div className="lg:col-span-2">
            <ul ref={listRef} className="space-y-0 divide-y divide-hittamins-border border-t border-hittamins-border">
              {items.map((item) => (
                <li key={item.id} className="py-6 flex items-start gap-6">
                  {/* Swatch */}
                  <div
                    className="w-16 h-16 flex-shrink-0 flex items-center justify-center font-display text-2xl"
                    style={{ backgroundColor: item.colour + '22', border: `1px solid ${item.colour}44` }}
                  >
                    <span style={{ color: item.colour }}>{item.name.charAt(0)}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-display text-2xl text-hittamins-text leading-tight">{item.name}</p>
                    <p className="font-mono text-xs text-hittamins-muted mt-1">{item.subtitle}</p>
                    <p className="font-mono text-sm mt-2" style={{ color: item.colour }}>
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-hittamins-muted hover:text-hittamins-red transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-3 border border-hittamins-border px-3 py-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="text-hittamins-muted hover:text-hittamins-text transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-mono text-sm w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="text-hittamins-muted hover:text-hittamins-text transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-display text-2xl text-hittamins-text">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="border border-hittamins-border p-6 sticky top-24">
              <h2 className="font-display text-3xl text-hittamins-text mb-6">ORDER SUMMARY</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-hittamins-border">
                <div className="flex justify-between font-mono text-xs text-hittamins-muted">
                  <span>Subtotal ({count} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-mono text-xs text-hittamins-muted">
                  <span>Shipping</span>
                  <span>TBC</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-xs text-hittamins-muted uppercase tracking-widest">Total</span>
                <span className="font-display text-4xl text-hittamins-green">${total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full py-5 text-center font-display text-2xl tracking-wide bg-hittamins-cyan text-black hover:opacity-80 transition-opacity"
              >
                PROCEED TO CHECKOUT
              </Link>

              <Link
                href="/products"
                className="block text-center font-mono text-xs tracking-widest text-hittamins-muted hover:text-hittamins-text transition-colors mt-4 uppercase"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
