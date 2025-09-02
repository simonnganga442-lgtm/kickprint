import About from '@/Components/AboutSection'
import CategoryGrid from '@/Components/CategoryGrid'
import ExclusiveProductsSection from '@/Components/FeaturedProducts'
import Hero from '@/Components/Hero'
import React from 'react'

export const metadata = {
  title: "KickPrints | Home",
  description: "KickPrints is where style meets tech. Premium prints and fire sneakers, all in one place.",
};

function HomePage() {
  return (
    <div>
      <Hero />
      <CategoryGrid />
      <ExclusiveProductsSection />
    </div>
  )
}

export default HomePage
