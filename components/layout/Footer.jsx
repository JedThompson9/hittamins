import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-hittamins-dark border-t border-hittamins-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo/hittamins-logo.png"
                alt="Hittamins"
                width={160}
                height={64}
                className="object-contain h-16 w-auto"
              />
            </div>
            <p className="font-mono text-xs text-hittamins-muted tracking-widest uppercase">
              Whatever Feels Right
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-xs text-hittamins-muted tracking-widest uppercase mb-4">Navigate</p>
            <div className="flex flex-col gap-3">
              {[
                { href: '/products', label: 'Products' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
                { href: '/cart', label: 'Cart' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-hittamins-muted hover:text-hittamins-text transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="font-mono text-xs text-hittamins-muted tracking-widest uppercase mb-4">Follow</p>
            <div className="flex flex-col gap-3">
              {[
                { label: '@hittamins', platform: 'Instagram' },
                { label: '@hittamins', platform: 'TikTok' },
              ].map((s) => (
                <span key={s.platform} className="text-hittamins-muted text-sm">
                  {s.platform} — {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-hittamins-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-hittamins-muted">
            &copy; {new Date().getFullYear()} Hittamins. All rights reserved.
          </p>
          <p className="font-mono text-xs text-hittamins-muted">
            Recovery for fighters, workers, and everyone in between.
          </p>
        </div>
      </div>
    </footer>
  )
}
