'use client';

import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useCart } from '@/context.js/CartContext';
import { useProductContext } from '@/context.js/ProductContext';
import {
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
  ShareIcon,
} from '@heroicons/react/24/solid';
import RecommendedProducts from '@/Components/RecommendedProducts';

export default function ProductClientPage({ product }) {
  const {
    getQuantity,
    addToCart,
    updateQuantity,
    removeFromCart,
    generateWhatsAppLink,
  } = useCart();

  const {
    categories,
    brands,
    tags,
  } = useProductContext();

  const FALLBACK_IMAGE = 'https://res.cloudinary.com/djidjtrfg/image/upload/v1756539115/ChatGPT_Image_Aug_30_2025_10_30_40_AM_ngecde.png';
  const shortDescription =
    product.shortdescription ||
    product['short description'] ||
    '';
  const longDescription =
    product.longdescription ||
    product['long description'] ||
    product['long  description'] ||
    '';

  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [descOpen, setDescOpen] = useState(false);

  const quantity = getQuantity(product.id);
  const shareUrl = `https://kickprints.netlify.app/shop/${product.slug}`;

  // Get names from context
  const categoryName =
    categories.find((c) => c.id === product.category_id)?.name || 'Uncategorized';
  const brandName =
    brands.find((b) => b.id === product.brands_id)?.name || 'Unbranded';
  const tagNames = (Array.isArray(product.tags_id)
    ? product.tags_id
    : String(product.tags_id || '')
      .split(',')
      .map((id) => id.trim())
  )
    .map((id) => tags.find((t) => t.id === id)?.name)
    .filter(Boolean);

  useEffect(() => {
    const mainImage =
      product.primary_url?.trim() ||
      product.thumbnails?.[0]?.trim() ||
      FALLBACK_IMAGE;

    const filteredThumbs =
      product.thumbnails
        ?.map((img) => img.trim())
        .filter((img) => img && img !== mainImage) || [];

    setSelectedImage(mainImage);
    setGalleryImages(filteredThumbs);
  }, [product]);

  const handleImageSwap = (img) => {
    setGalleryImages((prev) =>
      prev.map((i) => (i === img ? selectedImage : i))
    );
    setSelectedImage(img);
  };

  const handleAddToCart = () => addToCart(product, 1);
  const increase = () => updateQuantity(product.id, quantity + 1);
  const decrease = () => {
    if (quantity <= 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  if (!product || !product.name) {
    return <div className="p-10 text-center text-gray-500">Loading product...</div>;
  }

  return (
    <>



      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Image Section */}
          <div>
            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <Image
                src={selectedImage || FALLBACK_IMAGE}
                alt={product.name}
                width={400}
                height={400}
                priority={false}
                className="w-full h-[450px] object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
              />
            </div>

            <div className="mt-6 flex space-x-4 overflow-x-auto">
              {[selectedImage, ...galleryImages]
                .filter((img, i, arr) => arr.indexOf(img) === i)
                .map((img, i) => (
                  <button
                    key={i}
                    onClick={() => handleImageSwap(img)}
                    className={`w-20 h-20 rounded-lg border-2 focus:outline-none ${selectedImage === img
                        ? 'border-black ring-2 ring-black'
                        : 'border-transparent hover:border-gray-400'
                      }`}
                  >
                    <Image
                      src={img || FALLBACK_IMAGE}
                      alt={`Thumbnail ${i + 1}`}
                      width={400}
                      height={400}
                      priority={false}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-10 lg:mt-0 flex flex-col">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {product.name}
            </h1>

            {/* Labels */}
            {product.labels?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {product.labels.map((label, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}

            {/* Category/Brand/Tags */}
            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <p><strong>Category:</strong> {categoryName}</p>
              <p><strong>Brand:</strong> {brandName}</p>
              {tagNames.length > 0 && (
                <p><strong>Tags:</strong> {tagNames.join(', ')}</p>
              )}
            </div>

            <p className="text-gray-700 text-lg mt-4 mb-2">{shortDescription}</p>

            {/* Pricing */}
            <div className="mb-6 flex items-center gap-4">
              <p className="text-3xl font-bold text-gray-900">
                KSh {product.price.toFixed(0)}
              </p>
              {product.originalPrice > product.price && (
                <>
                  <p className="text-lg text-gray-500 line-through">
                    KSh {product.originalPrice.toFixed(0)}
                  </p>
                  <span className="bg-red-100 text-red-700 px-2 py-1 text-sm rounded">
                    -{Math.round(product.discount)} KSh
                  </span>
                </>
              )}
            </div>

            {/* Quantity & Cart */}
            <div className="flex items-center gap-6 mb-6 flex-wrap">
              {quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 bg-black text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-900 transition"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-3 bg-gray-100 rounded-md px-3 py-1">
                  <button
                    onClick={decrease}
                    className="bg-white hover:bg-gray-200 transition rounded-md p-2"
                  >
                    <MinusIcon className="w-5 h-5 text-gray-700" />
                  </button>

                  <span className="text-lg font-medium min-w-[24px] text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={increase}
                    className="bg-white hover:bg-gray-200 transition rounded-md p-2"
                  >
                    <PlusIcon className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}

              <a
                href={generateWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-green-600 text-green-600 py-3 px-6 rounded-md font-semibold hover:bg-green-50 transition"
              >
                Buy Now (WhatsApp)
              </a>

              {/* Share Button */}
              {typeof window !== 'undefined' && navigator.share && (
                <button
                  onClick={() =>
                    navigator.share({
                      title: product.name,
                      text: shortDescription,
                      url: shareUrl,
                    })
                  }
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <ShareIcon className="w-5 h-5" />
                  Share
                </button>
              )}
            </div>

            {/* Description Toggle */}
            <div className="mt-auto">
              <button
                onClick={() => setDescOpen(!descOpen)}
                className="flex justify-between w-full text-left text-xl font-semibold text-gray-900 border-b pb-3"
              >
                <span>Description</span>
                <svg
                  className={`w-7 h-7 transform transition-transform ${descOpen ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`mt-4 text-gray-700 transition-all duration-300 ease-in-out ${descOpen ? 'max-h-[500px]' : 'max-h-0 overflow-hidden'
                  }`}
              >
                <p>{longDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended */}
        <div className="mt-20">
          <RecommendedProducts
            currentProductId={product.id}
            currentCategoryId={product.category_id}
          />
        </div>
      </div>
    </>
  );
}
