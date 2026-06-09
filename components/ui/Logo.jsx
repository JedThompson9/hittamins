import Image from 'next/image'
import Link from 'next/link'

export default function Logo({ className = '', size = 'md' }) {
  const sizes = {
    sm: { w: 100, h: 40 },
    md: { w: 140, h: 56 },
    lg: { w: 200, h: 80 },
  }
  const { w, h } = sizes[size] || sizes.md

  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo/hittamins-logo.png"
        alt="Hittamins — Whatever Feels Right"
        width={w}
        height={h}
        className="object-contain"
        priority
      />
    </Link>
  )
}
