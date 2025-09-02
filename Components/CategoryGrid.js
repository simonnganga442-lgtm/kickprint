"use client";

import React, { useRef } from "react";
import CategoryCard from "./CategoryCard";
import { useProductContext } from "@/context.js/ProductContext";

export default function CategoryGrid() {
  const sliderRef = useRef();
  const { categories, loading } = useProductContext();

  
  if (loading || categories.length === 0) {
    return <p className="text-center py-10">Loading categories...</p>;
  }

  return (
    <section className="py-14 px-4 md:px-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
        🛍️ Shop by Category
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Explore curated collections tailored for your lifestyle.
      </p>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-4 gap-6 max-w-7xl mx-auto">
        {categories.map((cat, index) => (
          <CategoryCard key={index} cat={cat} size="desktop" />
        ))}
      </div>

      {/* Mobile Carousel */}
      <div
        ref={sliderRef}
        className="md:hidden flex gap-4 overflow-x-auto px-1 scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {categories.map((cat, index) => (
          <CategoryCard key={index} cat={cat} size="mobile" />
        ))}
      </div>
    </section>
  );
}
