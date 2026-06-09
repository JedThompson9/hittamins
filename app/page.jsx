import Hero from '@/components/sections/Hero'
import BuiltForSection from '@/components/sections/BuiltForSection'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import WhyHittamins from '@/components/sections/WhyHittamins'
import BrandBanner from '@/components/sections/BrandBanner'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BuiltForSection />
      <FeaturedProducts />
      <WhyHittamins />
      <BrandBanner />
    </main>
  )
}
