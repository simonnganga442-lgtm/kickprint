"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { setItemWithExpiry, getItemWithExpiry, removeItem } from "./localStorageHelpers";

const CartContext = createContext();

const STORAGE_KEY = "cart_items";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const saved = getItemWithExpiry(STORAGE_KEY);
    if (saved) setCart(saved);
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart) => {
    setCart(newCart);
    setItemWithExpiry(STORAGE_KEY, newCart, 7); // 7 days expiry
  };

  // Core actions
  const addToCart = (product, qty = 1) => {
    if (!product?.id) return;

    setCart((prev) => {
      const index = prev.findIndex((i) => i.id === product.id);
      let updated;
      if (index === -1) {
        updated = [...prev, { id: product.id, qty, product }];
      } else {
        updated = [...prev];
        updated[index].qty += qty;
      }
      saveCart(updated);
      return updated;
    });
  };

  const updateQuantity = (productId, qty) => {
    setCart((prev) => {
      const index = prev.findIndex((i) => i.id === productId);
      if (index === -1) return prev;

      let updated = [...prev];
      if (qty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].qty = qty;
      }
      saveCart(updated);
      return updated;
    });
  };

  const removeFromCart = (productId) => updateQuantity(productId, 0);

  const clearCart = () => {
    setCart([]);
    removeItem(STORAGE_KEY);
  };

  // Helpers
  const getQuantity = (productId) =>
    cart.find((item) => item.id === productId)?.qty || 0;

  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.qty, 0);

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + (parseFloat(item.product.price) || 0) * item.qty, 0);

  // WhatsApp checkout
  const generateWhatsAppLink = (singleProduct = null) => {
    let message;

    if (singleProduct) {
      message = `Hello, I’d like to order:\n- ${singleProduct.name} (x1) - $${singleProduct.price}`;
    } else if (cart.length > 0) {
      const lines = cart.map(
        (item) =>
          `- ${item.product.name} (x${item.qty}) - $${(
            parseFloat(item.product.price) * item.qty
          ).toFixed(2)}`
      );
      message = `Hello, I’d like to order:\n${lines.join("\n")}\n\nTotal: $${getTotalPrice().toFixed(2)}`;
    } else {
      message = "Hello, I’d like to browse your products.";
    }

    return `https://wa.me/254745635805?text=${encodeURIComponent(message)}`;
    // 👆 replace number with your WhatsApp business number
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getQuantity,
        getTotalItems,
        getTotalPrice,
        generateWhatsAppLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
