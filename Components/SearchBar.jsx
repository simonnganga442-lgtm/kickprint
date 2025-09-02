"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useProductContext } from "@/context.js/ProductContext";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SearchBar() {
  const { products, brands, tags } = useProductContext();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const inputRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length < 1) {
      setSuggestions([]);
      return;
    }

    const results = [];

    products.forEach((product) => {
      const name = product.name?.toLowerCase() || "";
      const desc = product.longdescription?.toLowerCase() || "";
      const brand = brands.find((b) => b.id === product.brands_id)?.name?.toLowerCase() || "";
      const tagNames = (product.tags_id || []).map(
        (id) => tags.find((t) => t.id === id)?.name?.toLowerCase() || ""
      );

      let rank = 0;
      let reason = "";

      if (name.includes(trimmed)) {
        rank = 1;
        reason = "Matched in name";
      } else if (
        brand.includes(trimmed) ||
        tagNames.some((tag) => tag.includes(trimmed))
      ) {
        rank = 2;
        reason = "Matched in brand/tag";
      } else if (desc.includes(trimmed)) {
        rank = 3;
        reason = "Matched in description";
      }

      if (rank > 0) {
        results.push({ ...product, rank, reason });
      }
    });

    // Sort by rank, then name
    const sorted = results
      .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name))
      .slice(0, 6);

    setSuggestions(sorted);
  }, [query, products, brands, tags]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
    }
  };

  const clearInput = () => {
    setQuery("");
    setSuggestions([]);
    setHighlightIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      router.push(`/shop/${suggestions[highlightIndex].slug}`);
      clearInput();
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightIndex(-1);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search for products..."
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
        />
        {query && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {query && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-xl max-h-64 overflow-y-auto">
          {suggestions.map((product, index) => (
            <li
              key={product.id}
              className={`flex flex-col px-4 py-2 text-sm cursor-pointer transition ${
                index === highlightIndex
                  ? "bg-indigo-100 text-indigo-800"
                  : "hover:bg-indigo-50"
              }`}
              onMouseEnter={() => setHighlightIndex(index)}
              onClick={() => {
                router.push(`/shop/${product.slug}`);
                clearInput();
              }}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={product.primary_url || "/placeholder.jpg"}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <span className="truncate font-medium">{product.name}</span>
              </div>
              <span className="ml-12 text-[10px] text-red-400">
                {product.reason}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
