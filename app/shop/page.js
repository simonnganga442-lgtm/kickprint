// app/shop/page.js
import { Suspense } from 'react';
import ShopClientPage from './ShopClientPage';

export const metadata = {
  title: 'Shop | KickPrints',
  description: 'Browse all products from KickPrints. Filter by brand, category, tags and discover what fits your style.',
  openGraph: {
    title: 'Shop | KickPrints',
    description: 'Explore all products from KickPrints with advanced filters and sorting.',
    url: `https://kickprints.netlify.app/shop`,
    images: [
      {
        url: 'https://res.cloudinary.com/djidjtrfg/image/upload/v1756539115/ChatGPT_Image_Aug_30_2025_10_30_40_AM_ngecde.png', // ✅ clean absolute Cloudinary URL
        width: 1200,
        height: 630,
        alt: 'KickPrints Shop Banner',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function ShopPage() {
  return (
       <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading shop...</div>}>
      <ShopClientPage />
    </Suspense>
  )
}
