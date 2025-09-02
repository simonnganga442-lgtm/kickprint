import { fetchSheetData } from './fetchFromGoogleSheet';

export async function getProducts() {
  const productData = await fetchSheetData(1);

  return productData.map((p, index) => {
    const price = parseFloat(p.price || "0");
    const originalPrice = parseFloat(p.originalPrice || p.price || "0");

    // Generate slug similarly to your context
    const slug = p.slug
      ? p.slug.trim().toLowerCase()
      : (p.name || `product-${index}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

    return {
      ...p,
      id: (p.id || index.toString()).trim(),
      slug,
      primary_url: p.primary_url?.trim() || '/KickPrints.png',
      price,
      originalPrice,
    };
  });
}
