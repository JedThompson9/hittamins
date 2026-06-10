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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Header always on top (z-30) so menu never covers the banner */}
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-hittamins-black/95 backdrop-blur-md border-b border-hittamins-border'
            : 'bg-transparent'
        }`}
      >
        {/* Announcement bar */}
        <div className="nav-item w-full bg-hittamins-cyan text-hittamins-black py-2 text-center font-mono text-[10px] tracking-[0.28em] uppercase">
          Free UK shipping on all orders →
        </div>

        <nav className="max-w-7xl mx-auto px-1 md:px-6 h-24 flex items-center justify-between md:grid md:grid-cols-3">

          {/* Animated logo */}
          <Link href="/" className="nav-item mr-auto flex items-center hover:opacity-80 transition-opacity md:mr-0 md:justify-self-start">
            <video
              autoPlay
              muted
              playsInline
              className="h-20 md:h-28 w-auto object-contain"
            >
              <source src="/logo/logo-safari.mov" type="video/quicktime" />
              <source src="/logo/logo.webm" type="video/webm" />
            </video>
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

          {/* Cart + burger/close */}
          <div className="nav-item flex items-center justify-end gap-4 pr-3 md:pr-0">
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

            {/* Burger toggles to X in the same position */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-hittamins-muted hover:text-hittamins-text transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile menu — z-20 so header (z-30) always sits on top */}
      <div
        className={`fixed inset-0 z-20 bg-hittamins-black flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Push content below the header (announcement bar ~34px + nav 96px) */}
        <div className="flex flex-col px-8 pt-36 gap-0">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-display text-4xl text-hittamins-text hover:text-hittamins-cyan transition-colors py-5 ${
                i < links.length - 1 ? 'border-b border-white/10' : ''
              }`}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
