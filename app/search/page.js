import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading search...</div>}>
      <SearchClient />
    </Suspense>
  );
}
