"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { useProductContext } from "@/context.js/ProductContext";

const LABEL_GROUPS = [
  { key: "HOT DEAL", label: "🔥 Hot Deals" },
  { key: "SALE", label: "🏷️ On Sale" },
  { key: "PRICE DROP", label: "📉 Price Drops" },
  { key: "BEST DEAL", label: "⭐ Best Deals" },
];

export default function SmartProductsSection() {
  const { products } = useProductContext();
  const [activeLabel, setActiveLabel] = useState(LABEL_GROUPS[0].key);

  const filtered = useMemo(() => {
    return products
      .filter((product) => product.labels?.includes(activeLabel))
      .slice(0, 12);
  }, [products, activeLabel]);

  return (
    <section className="py-16 px-4 md:px-16 bg-white">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Smart Picks</h2>
        <p className="text-gray-500 text-sm mt-2">
          Curated collections powered by your data.
        </p>
      </div>

      {/* Label Tabs */}
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {LABEL_GROUPS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveLabel(key)}
            className={`px-4 py-1 rounded-full text-sm border transition ${
              activeLabel === key
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-sm">
          No products found under <strong>{activeLabel}</strong>.
        </div>
      )}
    </section>
  );
}
