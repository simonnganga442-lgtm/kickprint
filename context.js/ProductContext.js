"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { fetchSheetData } from "./fetchFromGoogleSheet";
import { setItemWithExpiry, getItemWithExpiry } from "./localStorageHelpers";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const FALLBACK_IMAGE = "/KickPrints.png";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState({ id: "all", name: "All" });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [onSale, setOnSale] = useState(false);

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const loadSheets = async () => {
      setLoading(true);

      const [productData, categoryData, brandData, tagData] = await Promise.all([
        fetchSheetData(1),
        fetchSheetData(2),
        fetchSheetData(3),
        fetchSheetData(4),
      ]);

      // Normalize products
      const normalizedProducts = productData.map((p, index) => {
        const price = parseFloat(p.price || "0");
        const originalPrice = parseFloat(p.originalPrice || p.price || "0");
        const discount = originalPrice > price ? originalPrice - price : 0;

        let thumbnails = p.thumbnails
          ? p.thumbnails.split(",").map((img) => img.trim()).filter(Boolean)
          : [];

        if (thumbnails.length === 0) {
          thumbnails = [FALLBACK_IMAGE];
        }

        return {
          ...p,
          id: (p.id || index.toString()).trim(),
          name: p.name?.trim() || "",
          slug: p.slug
            ? p.slug.trim().toLowerCase()
            : (p.name || `product-${index}`)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, ""),
          category_id: p.category_id?.toString().trim() ?? "0",
          brands_id: (p.brands_id || "0").trim(),
          primary_url: p.primary_url?.trim() || FALLBACK_IMAGE,
          tags_id: p.tags_id
            ? p.tags_id.split(",").map((id) => id.trim())
            : [],
          thumbnails,
          onSale: discount > 0,
          price,
          originalPrice,
          discount,
        };
      });

      // SMART LABELING

      // 1. Brand Average Prices
      const brandAvgPrice = {};
      const brandCounts = {};

      normalizedProducts.forEach((p) => {
        const brand = p.brands_id;
        if (!brand) return;

        const price = parseFloat(p.price || "0");
        brandAvgPrice[brand] = (brandAvgPrice[brand] || 0) + price;
        brandCounts[brand] = (brandCounts[brand] || 0) + 1;
      });

      Object.keys(brandAvgPrice).forEach((brand) => {
        brandAvgPrice[brand] /= brandCounts[brand];
      });

      // 2. Most Common Discount
      const discountFreq = {};
      let mostCommonDiscount = 0;
      let maxCount = 0;

      normalizedProducts.forEach((p) => {
        const d = p.originalPrice - p.price;
        if (d <= 0) return;

        const rounded = d.toFixed(0);
        discountFreq[rounded] = (discountFreq[rounded] || 0) + 1;

        if (discountFreq[rounded] > maxCount) {
          mostCommonDiscount = parseFloat(rounded);
          maxCount = discountFreq[rounded];
        }
      });

      // 3. Top 10% best deals
      const sortedByDiscount = [...normalizedProducts]
        .filter((p) => p.discount > 0)
        .sort((a, b) => b.discount - a.discount);

      const topDeals = sortedByDiscount.slice(0, Math.ceil(sortedByDiscount.length * 0.1));
      const bestDealIds = new Set(topDeals.map((p) => p.id));

      // 4. Apply smart labels
      const smartProducts = normalizedProducts.map((p) => {
        const labels = [];

        if (p.discount > 0) labels.push("SALE");
        if (p.discount.toFixed(0) === mostCommonDiscount.toFixed(0)) labels.push("HOT DEAL");
        if (p.price < brandAvgPrice[p.brands_id]) labels.push("PRICE DROP");
        if (bestDealIds.has(p.id)) labels.push("BEST DEAL");

        return { ...p, labels };
      });

      // Normalize other data
      const normalizedCategories = categoryData.map((cat) => {
        const productsInCategory = smartProducts.filter(
          (p) => p.category_id === cat.id?.trim()
        );

        const productImages = productsInCategory
          .flatMap((p) => [p.primary_url, ...p.thumbnails])
          .filter(Boolean);

        return {
          ...cat,
          id: cat.id?.trim(),
          name: cat.name?.trim() || "Unnamed Category",
          image: cat.image?.trim(),
          product_images: productImages.length > 0 ? productImages : [cat.image],
        };
      });

      const normalizedBrands = brandData.map((b) => ({
        id: (b["id "] || b.id)?.trim(),
        name: b.name?.trim() || "Unnamed",
      }));

      const normalizedTags = tagData.map((tag) => ({
        id: (tag["id "] || tag.id)?.trim(),
        name: tag.name?.trim() || "Unnamed",
      }));

      setProducts(shuffleArray(smartProducts));
      setCategories(normalizedCategories);
      setBrands(normalizedBrands);
      setTags(normalizedTags);
      setLoading(false);
    };

    loadSheets();
  }, []);

  // Load saved filters from localStorage
  useEffect(() => {
    const saved = getItemWithExpiry("filters");
    if (saved) {
      setSelectedCategory(saved.category || { id: "all", name: "All" });
      setSelectedBrands(saved.brands || []);
      setSelectedTags(saved.tags || []);
      setOnSale(saved.onSale || false);
    }
  }, []);

  // Save filters to localStorage
  useEffect(() => {
    setItemWithExpiry("filters", {
      category: selectedCategory,
      brands: selectedBrands,
      tags: selectedTags,
      onSale,
    });
  }, [selectedCategory, selectedBrands, selectedTags, onSale]);

  // FILTERED PRODUCTS
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory.id !== "all") {
      filtered = filtered.filter((p) => p.category_id === selectedCategory.id);
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brands_id));
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) => {
        const tags = Array.isArray(p.tags_id)
          ? p.tags_id
          : String(p.tags_id || "")
              .split(",")
              .map((t) => t.trim());
        return tags.some((tag) => selectedTags.includes(tag));
      });
    }

    if (onSale) {
      filtered = filtered.filter((p) => p.onSale === true);
    }

    return filtered;
  }, [products, selectedCategory, selectedBrands, selectedTags, onSale]);

  // AVAILABLE BRANDS
  const availableBrands = useMemo(() => {
    if (selectedCategory.id === "all") return brands;

    const productsInCategory = products.filter(
      (p) => p.category_id === selectedCategory.id
    );
    const brandIds = new Set(productsInCategory.map((p) => p.brands_id));
    return brands.filter((b) => brandIds.has(b.id));
  }, [products, brands, selectedCategory]);

  // AVAILABLE TAGS
  const availableTags = useMemo(() => {
    if (selectedCategory.id === "all") return tags;

    const productsInCategory = products.filter(
      (p) => p.category_id === selectedCategory.id
    );

    const tagIds = new Set(
      productsInCategory.flatMap((p) =>
        Array.isArray(p.tags_id)
          ? p.tags_id
          : String(p.tags_id || "")
              .split(",")
              .map((id) => id.trim())
      )
    );

    return tags.filter((t) => tagIds.has(t.id));
    }, [products, tags, selectedCategory]);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        brands,
        tags,
        loading,
        availableBrands,
        availableTags,
        filteredProducts,
        selectedCategory,
        setSelectedCategory,
        selectedBrands,
        setSelectedBrands,
        selectedTags,
        setSelectedTags,
        onSale,
        setOnSale,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

