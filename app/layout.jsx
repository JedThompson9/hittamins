import { Bebas_Neue, Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import { CartProvider } from '@/components/cart/CartContext'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Hittamins — Whatever Feels Right',
  description: 'Recovery supplements built for people who actually get hit. Boxers, fighters, gym-goers, runners, labourers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${inter.variable} ${spaceMono.variable} font-body bg-brand-light text-brand-text antialiased`}
      >
        <CartProvider>
          <SmoothScrollProvider>
            <Navbar />
            {children}
            <CartDrawer />
            <Footer />
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  )
}
