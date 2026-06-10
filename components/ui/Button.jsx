import Link from 'next/link'

export default function Button({ children, href, onClick, variant = 'primary', colour, className = '', ...props }) {
  const base = 'inline-block font-display tracking-wide transition-opacity duration-200 hover:opacity-80 text-center'

  const variants = {
    primary: 'px-8 py-3 text-2xl text-white',
    secondary: 'px-8 py-3 text-2xl border text-brand-text hover:text-brand-navy',
    ghost: 'px-6 py-2 text-xl font-mono text-xs tracking-widest border border-brand-border text-brand-muted hover:border-brand-text hover:text-brand-text',
  }

  const style =
    variant === 'primary'
      ? { backgroundColor: colour || '#4A90C4', color: '#FFFFFF' }
      : variant === 'secondary'
      ? { borderColor: colour || '#C8DFF0', color: colour || '#1A2D3D' }
      : {}

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} style={style} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes} style={style} {...props}>
      {children}
    </button>
  )
}
