"use client";

import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About */}
        <div>
          <h2 className="text-2xl font-bold text-white">KickPrints</h2>
          <p className="mt-2 text-sm text-gray-400">
            Blending tech & style — printers, toners, desktops, and the hottest sneakers.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <Link href="/shop" className="hover:text-white">Home</Link>
          <Link href="/categories" className="hover:text-white">Shop</Link>
          <Link href="/cart" className="hover:text-white">cart</Link>
          <Link href="/about" className="hover:text-white">About Us</Link>
        </div>

        {/* Social & Copyright */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="Instagram" className="hover:text-white"><FaInstagram /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white"><FaTwitter /></a>
            <a href="#" aria-label="Facebook" className="hover:text-white"><FaFacebook /></a>
          </div>
          <p className="text-xs text-gray-500 mt-4">&copy; {new Date().getFullYear()} KickPrints. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
