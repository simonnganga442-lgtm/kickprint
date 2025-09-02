"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useProductContext } from "@/context.js/ProductContext";
import ProductCard from "@/Components/ProductCard";
import { useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const { products, categories, brands } = useProductContext();

  // Filter matching products
  const results = useMemo(() => {
    if (!query) return [];
    return products.filter((p) =>
      p.name?.toLowerCase().includes(query)
    );
  }, [query, products]);

  // Suggested categories and brands if no product matches
  const suggestedCategories = useMemo(() => {
    if (results.length > 0 || !query) return [];
    return categories.filter(c =>
      c.name.toLowerCase().includes(query)
    );
  }, [query, results, categories]);

  const suggestedBrands = useMemo(() => {
    if (results.length > 0 || !query) return [];
    return brands.filter(b =>
      b.name.toLowerCase().includes(query)
    );
  }, [query, results, brands]);

  const hasSuggestions = suggestedCategories.length > 0 || suggestedBrands.length > 0;

  return (
    <>
    <Head>
  <title>Search for &quot;{query}&quot; | KickPrints</title>
  <meta
    name="description"
    content={`Find results for "${query}" on KickPrints. Browse shoes, apparel, and more.`}
  />
  <meta name="robots" content="noindex, follow" />
</Head>

    <section className="max-w-7xl mx-auto px-6 py-20 min-h-[70vh]">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
        Search results for: <span className="text-indigo-600">&quot;{query}&quot;</span>
      </h1>

      <AnimatePresence mode="wait">
        {results.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {results.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-lg"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center text-gray-700 space-y-8 max-w-md mx-auto"
          >
            <p className="text-lg">
              No products found for &quot;<span className="font-semibold">{query}</span>&quot;.
            </p>

            {hasSuggestions ? (
              <>
                <p className="text-md font-semibold text-gray-900">
                  Maybe try exploring:
                </p>

                {suggestedCategories.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-indigo-600 mb-2">Categories</h3>
                    <ul className="flex flex-wrap justify-center gap-3">
                      {suggestedCategories.map(cat => (
                        <li key={cat.id}>
                          <Link
                            href={`/shop?category=${encodeURIComponent(cat.name)}`}
                            className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm hover:bg-indigo-200 transition"
                            onClick={() => router.refresh()}
                          >
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {suggestedBrands.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-indigo-600 mb-2">Brands</h3>
                    <ul className="flex flex-wrap justify-center gap-3">
                      {suggestedBrands.map(brand => (
                        <li key={brand.id}>
                          <Link
                            href={`/shop?brands=${encodeURIComponent(brand.name)}`}
                            className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm hover:bg-indigo-200 transition"
                            onClick={() => router.refresh()}
                          >
                            {brand.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-gray-500 mb-6">Try searching for other keywords or browse our products.</p>
                <Link
                  href="/shop"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md font-semibold shadow-lg hover:bg-indigo-700 transition"
                >
                  Visit Our Shop
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </>
  );
}
