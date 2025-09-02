'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DropdownFilter } from '@/Components/Filter';
import Pagination from '@/Components/Pagination';
import ProductCard from '@/Components/ProductCard';
import { useProductContext } from '@/context.js/ProductContext';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    categories,
    availableBrands,
    availableTags,
    loading,
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    selectedBrands,
    setSelectedBrands,
    selectedTags,
    setSelectedTags,
    onSale,
    setOnSale,
  } = useProductContext();

  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 12;

  const categoryQuery = searchParams.get('category');
  const brandsQuery = searchParams.get('brands');
  const tagsQuery = searchParams.get('tags');
  const onSaleQuery = searchParams.get('onSale');
  const sortByQuery = searchParams.get('sortBy');

  useEffect(() => {
    // Sync from URL
    if (categories.length === 0) return;

    if (categoryQuery) {
      const match = categories.find(cat => cat.name.toLowerCase() === categoryQuery.toLowerCase());
      if (match && selectedCategory.id !== match.id) setSelectedCategory(match);
    } else if (selectedCategory.id !== 'all') {
      setSelectedCategory({ id: 'all', name: 'All' });
    }

    setSelectedBrands(brandsQuery ? brandsQuery.split(',') : []);
    setSelectedTags(tagsQuery ? tagsQuery.split(',') : []);
    setOnSale(onSaleQuery === 'true');
    setSortBy(sortByQuery || '');
    setPage(1);
  }, [
    categoryQuery,
    brandsQuery,
    tagsQuery,
    onSaleQuery,
    sortByQuery,
    categories,
    selectedCategory.id,
    setSelectedCategory, setSelectedBrands,
    setSelectedTags,
    setOnSale
  ]);

  // Update URL
  useEffect(() => {
    const query = {};
    if (selectedCategory.id !== 'all') query.category = selectedCategory.name.toLowerCase();
    if (selectedBrands.length > 0) query.brands = selectedBrands.join(',');
    if (selectedTags.length > 0) query.tags = selectedTags.join(',');
    if (onSale) query.onSale = 'true';
    if (sortBy) query.sortBy = sortBy;

    const queryString = new URLSearchParams(query).toString();
    router.replace(`?${queryString}`, { shallow: true });
  }, [selectedCategory, selectedBrands, selectedTags, onSale, sortBy, router]);

  // Sorting
  const sortedProducts = useMemo(() => {
    let products = [...filteredProducts];
    if (sortBy === 'priceAsc') products.sort((a, b) => a.price - b.price);
    else if (sortBy === 'priceDesc') products.sort((a, b) => b.price - a.price);
    else if (sortBy === 'newest') products.sort((a, b) => (b.id || 0) - (a.id || 0));
    return products;
  }, [filteredProducts, sortBy]);

  // Pagination
  const paginated = useMemo(
    () => sortedProducts.slice((page - 1) * perPage, page * perPage),
    [sortedProducts, page]
  );

  const totalPages = Math.ceil(sortedProducts.length / perPage);
  const filterCategories = useMemo(() => [{ id: 'all', name: 'All' }, ...categories], [categories]);

  const toggleBrand = (id) =>
    setSelectedBrands((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));

  const toggleTag = (id) =>
    setSelectedTags((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));

  const clearAllFilters = () => {
    setSelectedCategory({ id: 'all', name: 'All' });
    setSelectedBrands([]);
    setSelectedTags([]);
    setOnSale(false);
    setSortBy('');
    setPage(1);
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading products...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-50 min-h-screen text-gray-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          {selectedCategory.id === 'all'
            ? `All Products (${sortedProducts.length})`
            : `${selectedCategory.name} (${sortedProducts.length})`}
        </h2>
        <button onClick={clearAllFilters} className="text-sm text-indigo-600 hover:text-indigo-800 transition">
          ✨ Clear All Filters
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-6">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              if (selectedCategory.id === cat.id) return; // no change
              const query = new URLSearchParams(searchParams.toString());
              if (cat.id === 'all') {
                query.delete('category');
              } else {
                query.set('category', cat.name.toLowerCase());
              }
              router.replace(`?${query.toString()}`, { shallow: true });
            }}

            className={`px-4 py-2 text-sm rounded-full transition whitespace-nowrap shadow-sm border ${selectedCategory.id === cat.id
              ? 'bg-indigo-600 text-white'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-indigo-50'
              } hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filters + Sort */}
      <div className="flex flex-wrap items-center gap-6 p-6 bg-white rounded-xl shadow-sm mb-6">
        <DropdownFilter
          label="Brands"
          options={availableBrands}
          selected={selectedBrands}
          onChange={toggleBrand}
          multiple
        />
        <DropdownFilter
          label="Tags"
          options={availableTags}
          selected={selectedTags}
          onChange={toggleTag}
          multiple
        />
        <button
          onClick={() => setOnSale((prev) => !prev)}
          className={`px-4 py-2 text-sm rounded-md border transition focus:outline-none focus:ring-2 focus:ring-indigo-400 ${onSale
            ? 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent'
            : 'bg-white text-gray-800 border-gray-300 hover:bg-indigo-50'
            }`}
        >
          🔥 On Sale
        </button>

        <select
          className="ml-auto border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {selectedCategory.id !== 'all' && (
          <FilterChip label={selectedCategory.name} onRemove={() => setSelectedCategory({ id: 'all', name: 'All' })} />
        )}
        {selectedBrands.map((b) => {
          const brand = availableBrands.find((br) => br.id === b);
          return <FilterChip key={b} label={brand?.name || b} onRemove={() => toggleBrand(b)} />;
        })}
        {selectedTags.map((t) => {
          const tag = availableTags.find((tag) => tag.id === t);
          return <FilterChip key={t} label={tag?.name || t} onRemove={() => toggleTag(t)} />;
        })}
        {onSale && <FilterChip label="On Sale" onRemove={() => setOnSale(false)} />}
        {sortBy && (
          <FilterChip
            label={`Sorted: ${sortBy === 'priceAsc' ? 'Price ↑' : sortBy === 'priceDesc' ? 'Price ↓' : 'Newest'
              }`}
            onRemove={() => setSortBy('')}
          />
        )}
      </div>

      {/* Product Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {paginated.map((product) => (
            <div key={product.id} className="transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-md rounded-lg bg-white">
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <div className="text-sm text-gray-500 text-center mt-8">
        Showing {paginated.length} of {sortedProducts.length} products
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}

// Filter Chip Component
const FilterChip = ({ label, onRemove }) => (
  <div className="bg-indigo-100 text-indigo-800 px-3 py-1.5 text-sm rounded-full flex items-center shadow-sm">
    {label}
    <button
      className="ml-2 text-indigo-500 hover:text-indigo-700"
      onClick={onRemove}
      aria-label={`Remove filter ${label}`}
    >
      ×
    </button>
  </div>
);