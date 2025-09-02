"use client";

import React from "react";
import Link from "next/link";
import {
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { useCart } from "@/context.js/CartContext";
import Image from "next/image";

export default function ProductCard({ product }) {
  const {
    getQuantity,
    addToCart,
    updateQuantity,
    removeFromCart,
    generateWhatsAppLink,
  } = useCart();

  const quantity = getQuantity(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent link navigation
    addToCart(product, 1);
  };

  const increase = (e) => {
    e.preventDefault();
    updateQuantity(product.id, quantity + 1);
  };

  const decrease = (e) => {
    e.preventDefault();
    if (quantity <= 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleOrderNow = (e) => {
    e.preventDefault();
    const waLink = generateWhatsAppLink(product);
    window.open(waLink, "_blank");
  };

  return (
    <Link
      href={`/shop/${product.slug || product.id}`}
      className="block relative group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 w-full sm:max-w-sm"
    >
      {product.labels?.length > 0 && (
  <span className="absolute top-2 left-2 bg-red-500 text-gray-800 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium z-10">
    {product.labels[0]}
  </span>
)}


      <div className="overflow-hidden">
        <Image
          src={product.primary_url || "https://res.cloudinary.com/djidjtrfg/image/upload/v1755977917/jc_vfqqzo.jpg"}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-40 sm:h-48 md:h-56 object-cover transform transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
      </div>

      <div className="p-3 sm:p-4 space-y-2">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          {product.discount>0 && (
            <span className="text-xs sm:text-sm line-through text-red-400">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded hover:bg-gray-800"
            >
              <ShoppingBagIcon className="w-4 h-4" />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={decrease}
                className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium">{quantity}</span>
              <button
              aria-label="Increase quantity"
                onClick={increase}
                className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={handleOrderNow}
            className="text-xs text-green-600 hover:underline"
          >
            Order Now →
          </button>
        </div>
      </div>
    </Link>
  );
}
