"use client";
import React from "react";
import { useCart } from "@/context.js/CartContext";
import RecommendedProducts from "@/Components/RecommendedProducts";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, generateWhatsAppLink } = useCart();

  const getPrice = (value) => Number(value); // ✅ always convert to number

  const subtotal = cart.reduce((sum, item) => {
    if (!item.product?.price) return sum;
    return sum + getPrice(item.product.price) * item.qty;
  }, 0);

  const handleCheckout = () => {
    const waLink = generateWhatsAppLink(); // ✅ full cart
    window.open(waLink, "_blank");
  };

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-12 text-gray-900">
      <h1 className="text-4xl font-bold mb-10 text-center">Your Shopping Cart</h1>

      <div className="flex flex-col-reverse lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-20">
              <p className="mb-4">Your cart is looking kinda empty... 🛒</p>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md transition"
              >
                <Link href="/">Go Shopping</Link>
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const price = getPrice(item.product?.price);
              const itemTotal = price * item.qty;

              return (
                <div
                  key={item.product.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 border rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.product?.primary_url}
                      alt={item.product?.name}
                      width={400}
                      height={400}
                      className="w-24 h-24 object-cover rounded-lg"
                      priority={false}
                    />
                    <div>
                      <h2 className="font-semibold text-lg">
                        {item.product?.name}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        ${price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <div className="flex items-center border rounded-md px-2 py-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.qty - 1)
                        }
                        className="text-gray-600 hover:text-black px-2 text-lg font-bold"
                      >
                        −
                      </button>
                      <span className="px-3">{item.qty}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.qty + 1)
                        }
                        className="text-gray-600 hover:text-black px-2 text-lg font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-md font-medium w-full sm:w-20 text-left sm:text-right text-gray-700">
                      ${itemTotal.toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Summary */}
        <div className="w-full lg:max-w-sm h-fit border rounded-xl p-6 shadow-lg bg-white">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Clear Cart */}
          <button
            onClick={clearCart}
            className="mt-4 w-full py-3 rounded-md font-semibold transition bg-gray-200 hover:bg-gray-300 text-gray-800"
            disabled={cart.length === 0}
          >
            Clear Cart
          </button>

          {/* Checkout on WhatsApp */}
          <button
            onClick={handleCheckout}
            className={`mt-4 w-full py-3 rounded-md font-semibold transition text-white ${
              cart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
            disabled={cart.length === 0}
          >
            Checkout on WhatsApp
          </button>
        </div>
      </div>
    </div>
     <RecommendedProducts excludeProductIds={cart.map(item => item.product.id)} />
 
    </>
  );
}
