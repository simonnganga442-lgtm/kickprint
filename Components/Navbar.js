"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context.js/CartContext";
import SearchBar from "./SearchBar";
export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useCart(); // ✅ get cart state
  const [showSearch, setShowSearch] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: <HomeIcon className="h-5 w-5" /> },
    { name: "Shop", path: "/shop", icon: <ShoppingBagIcon className="h-5 w-5" /> },
    {
      name: "Cart",
      path: "/cart",
      icon: (
        <Badge count={cart.length}>
          <ShoppingCartIcon className="h-5 w-5" />
        </Badge>
      ),
    },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-indigo-600">
            Kick.<span className="text-gray-900">Prints</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            {navLinks.map(({ name, path, icon }) => (
              <Link
                key={name}
                href={path}
                className={`flex items-center gap-2 border-b-2 pb-1 transition-all ${
                  pathname === path
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-600 hover:text-indigo-600 hover:border-indigo-400"
                }`}
              >
                {icon}
                <span>{name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block w-64">
          <SearchBar/>
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="md:hidden"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Search Field */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden px-4 pb-3"
            >
          <SearchBar/>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow z-40">
        <div className="flex justify-around items-center py-2 text-xs font-medium">
          {navLinks.map(({ name, path, icon }) => (
            <Link
              key={name}
              href={path}
              className={`flex flex-col items-center gap-1 px-2 ${
                pathname === path ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              <div className="p-2 rounded-full transition-all">
                {icon}
              </div>
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

/** 🔔 Badge wrapper for cart count */
function Badge({ count, children }) {
  return (
    <div className="relative">
      {children}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}
