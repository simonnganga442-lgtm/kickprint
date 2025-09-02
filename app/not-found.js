import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-[#fffef9] text-gray-800">
      <h1 className="text-7xl font-extrabold mb-6">404</h1>
      
      <p className="text-2xl mb-6 max-w-md text-center italic text-gray-600">
        Well, this is awkward... you’re as lost as a cactus in the Sahara.
      </p>

      <div className="mb-8">
        <Image
          src="https://images.pexels.com/photos/774835/pexels-photo-774835.jpeg"
          alt="Desert showing lost feeling"
          width={200}
          height={200}
          className="mx-auto rounded-lg shadow-md"
        />
      </div>

      <Link
        href="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition mb-4"
        aria-label="Go back to homepage"
      >
        Find your way home
      </Link>

      <Link
        href="/about"
        className="text-sm text-blue-600 hover:underline"
        aria-label="Learn more about KickPrints"
      >
        Or maybe learn more about us while you&apos;re here
      </Link>
    </main>
  );
}
