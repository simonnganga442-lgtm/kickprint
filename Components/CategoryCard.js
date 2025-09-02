import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CategoryCard({ cat, fallbackImage, size = "mobile" }) {
  const images =
    cat.product_images && cat.product_images.length > 0
      ? cat.product_images
      : [cat.image || fallbackImage];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  const image = images[currentImageIndex];

  const baseClasses =
    "rounded-xl overflow-hidden relative shadow hover:shadow-lg transition";
  const desktopStyles = "aspect-square bg-gray-100";
  const mobileStyles = "flex-shrink-0 snap-start w-64 h-64";

  const className = `${baseClasses} ${
    size === "desktop" ? desktopStyles : mobileStyles
  }`;

  return (
    <Link
       href={`/shop?category=${encodeURIComponent(cat.name)}`}
      className={className}
      style={{ display: "block", position: "relative", color: "white", textDecoration: "none" }}
    >
      <Image
        src={image}
        alt={cat.name}
        width={400}
        height={400}
        className="w-full h-full object-cover transition duration-300"
        style={{ filter: "brightness(0.8)" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          transition: "background-color 0.3s",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          fontWeight: "600",
          fontSize: size === "desktop" ? "1.25rem" : "1rem",
          zIndex: 10,
        }}
      >
        {cat.name}
      </div>
    </Link>
  );
}
