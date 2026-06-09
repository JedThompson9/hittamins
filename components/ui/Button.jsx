import Link from 'next/link'

export default function Button({ children, href, onClick, variant = 'primary', colour, className = '', ...props }) {
  const base = 'inline-block font-display tracking-wide transition-opacity duration-200 hover:opacity-80 text-center'

  const variants = {
    primary: 'px-8 py-3 text-2xl text-black',
    secondary: 'px-8 py-3 text-2xl border text-hittamins-text hover:text-white',
    ghost: 'px-6 py-2 text-xl font-mono text-xs tracking-widest border border-hittamins-border text-hittamins-muted hover:border-hittamins-text hover:text-hittamins-text',
  }

  const style =
    variant === 'primary'
      ? { backgroundColor: colour || '#3ECFCF', color: '#000' }
      : variant === 'secondary'
      ? { borderColor: colour || '#2A2A2A', color: colour || '#F0F0F0' }
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
