'use client'
import { useCart } from '@/components/cart/CartContext'

export default function AddToCartButton({ product }) {
  const { addItem } = useCart()

  return (
    <button
      onClick={() => addItem(product)}
      className="w-full py-5 font-display text-3xl tracking-wide text-black transition-opacity hover:opacity-80"
      style={{ backgroundColor: product.colour }}
    >
      ADD TO CART
    </button>
  )
}
