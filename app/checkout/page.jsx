'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, Tag, ArrowLeft, CreditCard, X } from 'lucide-react'
import { useCart } from '@/components/cart/CartContext'

const SHIPPING = 4.99

// ── Payment badges ──────────────────────────────────────────────────────────

function VisaBadge() {
  return (
    <div className="flex items-center justify-center w-14 h-8 bg-white border border-brand-border rounded">
      <span className="font-black text-sm italic tracking-wider text-[#1434CB]">VISA</span>
    </div>
  )
}

function MastercardBadge() {
  return (
    <div className="relative flex items-center justify-center w-14 h-8 bg-white border border-brand-border rounded overflow-hidden flex-shrink-0">
      <div className="absolute left-2 w-5 h-5 rounded-full bg-[#EB001B] opacity-90" />
      <div className="absolute left-[18px] w-5 h-5 rounded-full bg-[#F79E1B] opacity-90" />
    </div>
  )
}

function PayPalBadge() {
  return (
    <div className="flex items-center justify-center w-14 h-8 bg-white border border-brand-border rounded px-1.5">
      <span className="font-black text-xs italic">
        <span className="text-[#003087]">Pay</span>
        <span className="text-[#009CDE]">Pal</span>
      </span>
    </div>
  )
}

function ApplePayBadge() {
  return (
    <div className="flex items-center justify-center gap-1 w-16 h-8 bg-black rounded px-2">
      <svg viewBox="0 0 14 17" className="w-3 h-3 fill-white flex-shrink-0">
        <path d="M13.17 5.9c-.08.06-1.52.88-1.52 2.69 0 2.1 1.84 2.84 1.9 2.86-.02.06-.3 1.02-.98 2-.6.88-1.22 1.76-2.2 1.76s-1.24-.58-2.36-.58c-1.1 0-1.48.6-2.4.6s-1.5-.84-2.22-1.86C2.58 12.1 1.84 10.04 1.84 8.08c0-3.06 2-4.68 3.94-4.68 1.04 0 1.9.68 2.56.68.62 0 1.6-.72 2.8-.72.46 0 1.66.04 2.52 1.26v.28h.01zm-3.3-2.32c.48-.58.82-1.38.82-2.18 0-.1-.01-.22-.02-.32-.78.03-1.72.52-2.28 1.18-.44.5-.84 1.3-.84 2.1 0 .12.02.24.02.28.06.01.14.02.22.02.7 0 1.6-.46 2.08-1.08z" />
      </svg>
      <span className="text-white text-[11px] font-semibold tracking-tight">Pay</span>
    </div>
  )
}

function GooglePayBadge() {
  return (
    <div className="flex items-center justify-center gap-0.5 w-16 h-8 bg-white border border-brand-border rounded px-2">
      <span className="font-bold text-xs text-[#4285F4]">G</span>
      <span className="text-[10px] text-brand-text font-medium">Pay</span>
    </div>
  )
}

// ── Payment type modal ───────────────────────────────────────────────────────

const PAYMENT_OPTIONS = [
  {
    id: 'card',
    label: 'Credit / Debit Card',
    description: 'Visa, Mastercard & more',
    badges: [<VisaBadge key="v" />, <MastercardBadge key="m" />],
    always: true,
  },
  {
    id: 'paypal',
    label: 'PayPal',
    description: 'Pay via your PayPal account',
    badges: [<PayPalBadge key="p" />],
    always: true,
  },
  {
    id: 'apple-pay',
    label: 'Apple Pay',
    description: 'Touch ID or Face ID',
    badges: [<ApplePayBadge key="ap" />],
    always: false,
  },
  {
    id: 'google-pay',
    label: 'Google Pay',
    description: 'Pay with your Google account',
    badges: [<GooglePayBadge key="gp" />],
    always: false,
  },
]

function PaymentModal({ available, selected, onSelect, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-brand-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-brand-white border border-brand-border w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-brand-border flex items-center justify-between">
          <h3 className="font-display text-2xl text-brand-navy">CHOOSE PAYMENT TYPE</h3>
          <button onClick={onClose} className="text-brand-muted hover:text-brand-text transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {available.map((opt) => (
            <button
              key={opt.id}
              onClick={() => { onSelect(opt.id); onClose() }}
              className={`w-full flex items-center gap-4 px-4 py-4 border transition-all duration-150 text-left ${
                selected === opt.id
                  ? 'border-brand-blue bg-brand-soft'
                  : 'border-brand-border hover:border-brand-navy/30'
              }`}
            >
              <div className="flex items-center gap-2 flex-shrink-0">
                {opt.badges}
              </div>
              <div className="flex-1">
                <p className="font-display text-xl text-brand-navy leading-tight">{opt.label}</p>
                <p className="font-mono text-[10px] text-brand-muted mt-0.5">{opt.description}</p>
              </div>
              {selected === opt.id && (
                <div className="w-4 h-4 rounded-full border-2 border-brand-blue flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-brand-blue" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            className="w-full py-3 font-mono text-xs tracking-widest text-brand-muted border border-brand-border hover:border-brand-navy/30 hover:text-brand-text transition-colors uppercase"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Input style ──────────────────────────────────────────────────────────────

const inputClass =
  'w-full bg-white border border-brand-border px-4 py-3 font-mono text-sm text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors'

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const { items, total } = useCart()

  const [promo, setPromo] = useState('')
  const [promoState, setPromoState] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentType, setPaymentType] = useState('card')
  const [supportsApplePay, setSupportsApplePay] = useState(false)
  const [supportsGooglePay, setSupportsGooglePay] = useState(false)

  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    address: '', city: '', postcode: '', country: 'United Kingdom',
  })

  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })

  const formatCardNumber = (val) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + ' / ' + digits.slice(2)
    if (digits.length === 2 && !val.includes('/')) return digits + ' / '
    return digits
  }

  const handleCard = (field, raw) => {
    let value = raw
    if (field === 'number') value = formatCardNumber(raw)
    if (field === 'expiry') value = formatExpiry(raw)
    if (field === 'cvv') value = raw.replace(/\D/g, '').slice(0, 4)
    setCard((c) => ({ ...c, [field]: value }))
  }

  // Detect Apple Pay and Google Pay availability client-side
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Apple Pay: available in Safari on Apple devices
    if (window.ApplePaySession?.canMakePayments?.()) {
      setSupportsApplePay(true)
    }

    // Google Pay: available in Chrome (desktop and Android)
    const { userAgent } = navigator
    const isChrome = /Chrome/.test(userAgent) && !/Chromium|EdgA?\/|OPR\//.test(userAgent)
    if (isChrome) setSupportsGooglePay(true)
  }, [])

  const availablePaymentOptions = PAYMENT_OPTIONS.filter(
    (o) => o.always || (o.id === 'apple-pay' && supportsApplePay) || (o.id === 'google-pay' && supportsGooglePay)
  )

  const selectedOption = availablePaymentOptions.find((o) => o.id === paymentType) || availablePaymentOptions[0]

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
  })

  const discount = promoState === 'applied' ? total * 0.1 : 0
  const shipping = items.length > 0 ? SHIPPING : 0
  const grandTotal = total - discount + shipping
  const itemCount = items.reduce((s, i) => s + i.qty, 0)

  const handlePromo = () => {
    setPromoState(promo.toUpperCase() === 'HITTAMINS10' ? 'applied' : 'invalid')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-brand-light flex flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="w-20 h-20 rounded-full border-2 border-brand-mint flex items-center justify-center mb-8">
          <span className="text-brand-blue text-4xl font-bold">✓</span>
        </div>
        <h1 className="font-display text-7xl text-brand-navy mb-4">ORDER CONFIRMED</h1>
        <p className="font-mono text-sm text-brand-muted mb-10 max-w-sm">
          Thanks for your order. We'll send shipping details to {form.email || 'your email'}.
        </p>
        <Link href="/" className="font-display text-2xl px-10 py-4 bg-brand-blue text-white hover:opacity-80 transition-opacity">
          BACK TO HOME
        </Link>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-brand-light flex flex-col items-center justify-center px-6 pt-24 text-center">
        <h1 className="font-display text-6xl text-brand-muted mb-6">NOTHING TO CHECK OUT</h1>
        <Link href="/products" className="font-display text-2xl px-8 py-4 bg-brand-blue text-white hover:opacity-80 transition-opacity">
          SHOP PRODUCTS
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-brand-light pt-32 pb-24 px-6">
      {/* Payment type modal */}
      {showPaymentModal && (
        <PaymentModal
          available={availablePaymentOptions}
          selected={paymentType}
          onSelect={setPaymentType}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <Link href="/cart" className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-brand-muted hover:text-brand-text transition-colors uppercase mb-4">
            <ArrowLeft size={12} /> Back to cart
          </Link>
          <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-none text-brand-navy">CHECKOUT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="space-y-10 lg:order-first order-last">

            {/* Contact */}
            <section>
              <h2 className="font-display text-3xl text-brand-navy mb-5 pb-3 border-b border-brand-border">CONTACT</h2>
              <input type="email" required placeholder="Email address" className={inputClass} {...field('email')} />
            </section>

            {/* Shipping */}
            <section>
              <h2 className="font-display text-3xl text-brand-navy mb-5 pb-3 border-b border-brand-border">SHIPPING ADDRESS</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="First name" className={inputClass} {...field('firstName')} />
                  <input required placeholder="Last name" className={inputClass} {...field('lastName')} />
                </div>
                <input required placeholder="Address line 1" className={inputClass} {...field('address')} />
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="City" className={inputClass} {...field('city')} />
                  <input required placeholder="Postcode" className={inputClass} {...field('postcode')} />
                </div>
                <div className="relative">
                  <select required className={`${inputClass} appearance-none cursor-pointer`} {...field('country')}>
                    {['United Kingdom', 'Australia', 'United States', 'Canada', 'Ireland', 'New Zealand'].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none text-xs">▼</span>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="font-display text-3xl text-brand-navy mb-5 pb-3 border-b border-brand-border">PAYMENT</h2>

              {/* Current payment type bar */}
              <div className="flex items-center justify-between px-4 py-3 border border-brand-border bg-brand-soft mb-4">
                <div className="flex items-center gap-3">
                  {selectedOption.badges}
                  <span className="font-mono text-sm text-brand-text">{selectedOption.label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  className="px-4 py-1.5 bg-brand-blue text-white font-mono text-[10px] tracking-widest uppercase rounded-full hover:opacity-80 transition-opacity flex-shrink-0"
                >
                  Change
                </button>
              </div>

              {/* Conditional payment fields */}
              {paymentType === 'card' && (
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                      value={card.number}
                      onChange={(e) => handleCard('number', e.target.value)}
                      maxLength={19}
                      className={inputClass}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <VisaBadge />
                      <MastercardBadge />
                    </div>
                  </div>
                  <input
                    placeholder="Name on card"
                    value={card.name}
                    onChange={(e) => handleCard('name', e.target.value)}
                    className={inputClass}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="MM / YY"
                      inputMode="numeric"
                      value={card.expiry}
                      onChange={(e) => handleCard('expiry', e.target.value)}
                      maxLength={7}
                      className={inputClass}
                    />
                    <input
                      placeholder="CVV"
                      inputMode="numeric"
                      value={card.cvv}
                      onChange={(e) => handleCard('cvv', e.target.value)}
                      maxLength={4}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {paymentType === 'paypal' && (
                <div className="border border-brand-border bg-brand-soft p-6 text-center">
                  <PayPalBadge />
                  <p className="font-mono text-xs text-brand-muted mt-3 leading-relaxed">
                    You'll be redirected to PayPal to complete your payment securely.
                  </p>
                </div>
              )}

              {paymentType === 'apple-pay' && (
                <button
                  type="button"
                  className="w-full h-14 bg-black border border-white/20 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                  style={{ WebkitAppearance: 'none' }}
                >
                  <span className="text-white text-xl"> Pay</span>
                </button>
              )}

              {paymentType === 'google-pay' && (
                <button
                  type="button"
                  className="w-full h-14 bg-white rounded-xl flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <span className="font-bold text-lg">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                  <span className="font-semibold text-[#3C4043] text-lg ml-1">Pay</span>
                </button>
              )}
            </section>

            <button
              type="submit"
              className="w-full py-5 font-display text-3xl tracking-widest bg-brand-blue text-white hover:opacity-85 transition-opacity"
            >
              COMPLETE ORDER
            </button>

            <p className="font-mono text-[10px] tracking-widest text-brand-muted text-center uppercase">
              Demo store — no payment will be processed
            </p>
          </form>

          {/* ── Order summary ── */}
          <aside className="order-first lg:order-last sticky top-32">
            <div className="bg-brand-white border border-brand-border">

              <div className="px-6 pt-6 pb-4 border-b border-brand-border">
                <h2 className="font-display text-3xl text-brand-navy">ORDER SUMMARY</h2>
              </div>

              {/* Items */}
              <div className="px-6 py-5 space-y-4 border-b border-brand-border">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 flex-shrink-0 flex items-center justify-center font-display text-2xl rounded border"
                      style={{ backgroundColor: item.colour + '18', borderColor: item.colour + '44', color: item.colour }}
                    >
                      {item.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-xl leading-tight text-brand-text">{item.name}</p>
                      <p className="font-mono text-xs text-brand-muted mt-0.5">{item.subtitle}</p>
                      <p className="font-mono text-xs text-brand-muted mt-1">x{item.qty}</p>
                    </div>
                    <p className="font-mono text-sm text-brand-text flex-shrink-0">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Promo */}
              <div className="px-6 py-5 border-b border-brand-border">
                <p className="font-mono text-[10px] tracking-widest text-brand-muted uppercase mb-3 flex items-center gap-2">
                  <Tag size={11} /> Promo code
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promo}
                    onChange={(e) => { setPromo(e.target.value); setPromoState(null) }}
                    placeholder="Enter code"
                    className="flex-1 bg-brand-light border border-brand-border px-4 py-2.5 font-mono text-sm text-brand-text placeholder:text-brand-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handlePromo}
                    className="px-5 py-2.5 border border-brand-blue text-brand-blue font-mono text-[10px] tracking-widest uppercase hover:bg-brand-blue hover:text-white transition-all"
                  >
                    Apply
                  </button>
                </div>
                {promoState === 'applied' && <p className="font-mono text-xs text-brand-mint mt-2">✓ HITTAMINS10 — 10% off applied</p>}
                {promoState === 'invalid' && <p className="font-mono text-xs text-red-500 mt-2">Invalid promo code</p>}
              </div>

              {/* Totals */}
              <div className="px-6 py-5 space-y-3 border-b border-brand-border">
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-brand-muted">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span className="text-brand-text">${total.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between font-mono text-sm">
                    <span className="text-brand-mint">Discount (10%)</span>
                    <span className="text-brand-mint">−${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-brand-muted">Shipping</span>
                  <span className="text-brand-text">${shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="px-6 py-5 flex items-center justify-between border-b border-brand-border">
                <span className="font-mono text-xs tracking-widest text-brand-muted uppercase">Total to pay</span>
                <span className="font-display text-4xl text-brand-blue">${grandTotal.toFixed(2)}</span>
              </div>

              <div className="px-6 py-4 flex items-center gap-3">
                <Shield size={15} className="text-brand-mint flex-shrink-0" />
                <p className="font-mono text-xs text-brand-muted leading-relaxed">
                  Secure checkout. Natural ingredients.{' '}
                  <span className="text-brand-text font-bold">Real recovery.</span>
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  )
}
