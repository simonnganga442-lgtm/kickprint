import ProductClientWrapper from './ProductClientWrapper';
import { fetchSheetData } from '@/context.js/fetchFromGoogleSheet';
const FALLBACK_IMAGE = 'https://res.cloudinary.com/djidjtrfg/image/upload/v1756539115/ChatGPT_Image_Aug_30_2025_10_30_40_AM_ngecde.png';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const products = await fetchSheetData(1); // server-side fetch
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | KickPrints',
      description: 'Sorry, this product does not exist.',
    };
  }

  const imageUrl = product.primary_url?.startsWith('http') ? product.primary_url : FALLBACK_IMAGE;
console.log(product);

  return {
    title: `${product.name} | KickPrints`,
    description: product.shortdescription || 'Discover premium products on KickPrints',
    openGraph: {
      url: `https://kickprints.netlify.app/shop/${slug}`,
      title: `${product.name} | KickPrints`,
      description: product.shortdescription || '',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: product.name }],
      siteName: 'KickPrints',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | KickPrints`,
      description: product.shortdescription || '',
      images: imageUrl,
    },
  };
}

export default async function ProductPageServer({ params }) {
  const resolvedParams = await params;
  return <ProductClientWrapper slug={resolvedParams.slug} />;
}
