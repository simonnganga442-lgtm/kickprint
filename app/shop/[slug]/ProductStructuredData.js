'use client';
import Script from 'next/script';

export default function ProductStructuredData({ product }) {
  const jsonLd = {

    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [product.primary_url],
    description: product.longdescription || '',
    sku: product.sku || product.id,
    brand: {
      "@type": "Brand",
      name: product.brands_id || 'KickPrints',
    },
    offers: {
      "@type": "Offer",
      url: `https://kickprints.netlify.app/shop/${product.slug}`,
      priceCurrency: "KES",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock"
    },
  };

  return (
    <Script
      id={`product-ld-${product.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
