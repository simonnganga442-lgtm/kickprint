"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/KickPrints.png",
  "https://images.pexels.com/photos/19037726/pexels-photo-19037726.jpeg",
  "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg",
];

function getGreetingTagline() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good Morning, Shop Now!";
  } else if (hour < 18) {
    return "Good Afternoon, Explore the Collection!";
  } else {
    return "Good Evening, Find Your Perfect Fit!";
  }
}

export default function Hero() {
  const [index, setIndex] = useState(0);
const [tagline, setTagline] = useState("Welcome!"); 

useEffect(() => {
  setTagline(getGreetingTagline());
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-20 overflow-hidden bg-black">
      {/* Background image carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`Hero background ${index + 1}`}
              fill
              priority
              className="object-cover filter blur-sm brightness-[0.5]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-pink-400/10 to-yellow-300/10 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          {/* Dynamic greeting */}
          <p className="text-indigo-300 text-sm sm:text-base mb-2 font-medium tracking-wide">
            {tagline}
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl leading-tight">
            Premium Prints. Trusted Tech. Killer Kicks.
          </h1>

          <p className="mt-4 text-lg text-gray-100 max-w-md mx-auto md:mx-0 drop-shadow">
            Everything you need, delivered fast. Printers, toners, desktops, and fresh sneakers — in one place.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/shop"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition shadow-lg"
            >
              🛒 Shop Now
            </Link>
            <Link
              href="/about"
              className="text-white underline underline-offset-4 hover:text-indigo-300 transition"
            >
              About
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 text-center">
          <Image
            src="/KickPrints.png"
            alt="KickPrints Featured"
            width={420}
            height={300}
            priority
            className="mx-auto relative z-10 rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
