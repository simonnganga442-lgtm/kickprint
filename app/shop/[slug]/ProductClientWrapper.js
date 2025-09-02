'use client';

import { useProductContext } from '@/context.js/ProductContext';
import ProductClientPage from './ProductClientPage';
import ProductStructuredData from './ProductStructuredData';

export default function ProductClientWrapper({ slug }) {
  const { products, loading } = useProductContext();

  if (loading) {
    return <div className="text-center py-10 text-gray-500 animate-pulse">Loading product...</div>;
  }

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div className="text-center py-10 text-red-600 font-semibold">Sorry, we couldn&apos;t find that product.</div>;
  }

  return (
    <>
      <ProductStructuredData product={product} />
      <ProductClientPage product={product} />
    </>
  );
}
