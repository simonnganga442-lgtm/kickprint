"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function capitalizeWords(str) {
  return str
    .replace(/[-_]/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  // If on root, no crumbs except home
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return {
      name: capitalizeWords(decodeURIComponent(segment)),
      href,
    };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-sm text-gray-600 mb-4 px-4 md:px-10"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li>
          <Link href="/" className="text-indigo-600 hover:underline">
            Home
          </Link>
          <span className="mx-1 text-gray-400" aria-hidden="true">›</span>
        </li>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={crumb.href} className="inline-flex items-center">
              {!isLast ? (
                <>
                  <Link
                    href={crumb.href}
                    className="text-indigo-600 hover:underline"
                  >
                    {crumb.name}
                  </Link>
                  <span className="mx-1 text-gray-400" aria-hidden="true">›</span>
                </>
              ) : (
                <span
                  className="text-gray-800 font-semibold"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
