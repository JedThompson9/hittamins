'use client'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useSpring, animated } from '@react-spring/web'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/components/cart/CartContext'

function CartItem({ item }) {
  const { removeItem, updateQty } = useCart()

  return (
    <li className="flex items-start gap-4 py-4 border-b border-hittamins-border last:border-0">
      {/* Colour swatch */}
      <div
        className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded font-display text-lg text-black"
        style={{ backgroundColor: item.colour + '33', border: `1px solid ${item.colour}44` }}
      >
        <span style={{ color: item.colour }} className="text-xs font-mono font-bold">
          {item.name.charAt(0)}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-display text-xl text-hittamins-text leading-tight">{item.name}</p>
        <p className="font-mono text-xs text-hittamins-muted mt-0.5">{item.subtitle}</p>
        <p className="font-mono text-sm mt-1" style={{ color: item.colour }}>
          ${(item.price * item.qty).toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => removeItem(item.id)}
          className="text-hittamins-muted hover:text-hittamins-red transition-colors"
          aria-label="Remove item"
        >
          <Trash2 size={14} />
        </button>
        <div className="flex items-center gap-2 border border-hittamins-border rounded px-2 py-1">
          <button
            onClick={() => updateQty(item.id, item.qty - 1)}
            className="text-hittamins-muted hover:text-hittamins-text transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="font-mono text-xs w-4 text-center text-hittamins-text">{item.qty}</span>
          <button
            onClick={() => updateQty(item.id, item.qty + 1)}
            className="text-hittamins-muted hover:text-hittamins-text transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    </li>
  )
}

export default function CartDrawer() {
  const { items, total, count, isOpen, setIsOpen } = useCart()

  // AutoAnimate handles smooth add/remove transitions on the cart list
  const [listRef] = useAutoAnimate()

  // react-spring drives the slide-in animation for the drawer panel
  const drawerSpring = useSpring({
    transform: isOpen ? 'translateX(0%)' : 'translateX(100%)',
    config: { tension: 280, friction: 26 },
  })

  const overlaySpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 30 },
  })

  return (
    <>
      {/* Backdrop */}
      <animated.div
        style={{
          ...overlaySpring,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <animated.div
        style={drawerSpring}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-hittamins-dark border-l border-hittamins-border z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-hittamins-border">
          <h2 className="font-display text-4xl text-hittamins-text">
            CART <span className="text-hittamins-muted text-2xl">({count})</span>
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-hittamins-muted hover:text-hittamins-text transition-colors"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="font-display text-4xl text-hittamins-muted">NOTHING IN THE RING YET.</p>
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="font-mono text-xs tracking-widest text-hittamins-green border border-hittamins-green px-6 py-3 hover:bg-hittamins-green hover:text-black transition-colors uppercase"
            >
              Shop Products
            </Link>
          </div>
        ) : (
          <>
            <ul ref={listRef} className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>

            <div className="px-6 py-6 border-t border-hittamins-border bg-hittamins-black">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs tracking-widest text-hittamins-muted uppercase">Subtotal</span>
                <span className="font-display text-4xl text-hittamins-text">${total.toFixed(2)}</span>
              </div>
              <p className="font-mono text-xs text-hittamins-muted mb-4">Shipping calculated at checkout</p>
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 text-center font-display text-2xl tracking-wide bg-hittamins-cyan text-black hover:opacity-90 transition-opacity"
                >
                  CHECKOUT
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 text-center font-mono text-xs tracking-widest text-hittamins-muted border border-hittamins-border hover:border-white/30 hover:text-hittamins-text transition-colors uppercase"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </>
        )}
      </animated.div>
    </>
  )
}
