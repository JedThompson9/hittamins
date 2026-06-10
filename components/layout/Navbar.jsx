'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import { useCart } from '@/components/cart/CartContext'

export default function Navbar() {
  const navRef = useRef(null)
  const { count, setIsOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.nav-item',
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07 }
      )
    }, navRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? 'bg-hittamins-black/95 backdrop-blur-md border-b border-hittamins-border' : 'bg-transparent'
      }`}
    >
      {/* Announcement bar */}
      <div className="nav-item w-full bg-hittamins-cyan text-hittamins-black py-2 text-center font-mono text-[10px] tracking-[0.28em] uppercase">
        Free UK shipping on all orders →
      </div>

      <nav className="max-w-7xl mx-auto px-6 h-24 grid grid-cols-3 items-center">

        {/* Animated logo */}
        <Link href="/" className="nav-item flex items-center hover:opacity-80 transition-opacity">
          <video
            src="/logo/logo.webm"
            autoPlay
            muted
            playsInline
            className="h-28 w-auto object-contain"
          />
        </Link>

        {/* Desktop links — centered */}
        <div className="nav-item hidden md:flex items-center justify-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-widest text-hittamins-muted hover:text-hittamins-text transition-colors uppercase"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart + mobile menu */}
        <div className="nav-item flex items-center justify-end gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-hittamins-muted hover:text-hittamins-text transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={22} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-hittamins-cyan text-hittamins-black font-mono text-[10px] font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-hittamins-muted hover:text-hittamins-text transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-hittamins-dark border-t border-hittamins-border px-6 py-6 flex flex-col gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-4xl text-hittamins-text hover:text-hittamins-green transition-colors"
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
