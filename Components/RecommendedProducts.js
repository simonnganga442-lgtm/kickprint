"use client";

import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useProductContext } from "@/context.js/ProductContext";

export default function RecommendedProducts({ excludeProductIds = [], currentProductId = null, currentCategoryId = null }) {
  const { products } = useProductContext();
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    // Start with all products except excluded ones
    let filtered = products.filter((p) => !excludeProductIds.includes(p.id));

    // Exclude current product if provided
    if (currentProductId) {
      filtered = filtered.filter((p) => p.id !== currentProductId);
    }

    // Prefer same category if available and at least 3 products in category
    if (currentCategoryId) {
      const sameCategory = filtered.filter((p) => p.category_id === currentCategoryId);
      if (sameCategory.length >= 3) {
        filtered = sameCategory;
      }
    }

    // Shuffle and pick top 3
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    setRecommended(shuffled.slice(0, 3));
  }, [products]);

  if (recommended.length === 0) return null;

  return (
    <section className="mt-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommended.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
