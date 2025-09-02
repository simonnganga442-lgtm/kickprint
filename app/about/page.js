export const metadata = {
  title: "About | KickPrints",
  description: "Learn more about KickPrints — where style meets tech. We bring you the best in sneaker and print culture.",
};

import Image from "next/image";

export default function About() {
  return (
    <main className="bg-[#fffef9] text-gray-800 px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* Intro Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About KickPrints</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            KickPrints is where style meets tech. We’re passionate about giving you premium prints and fire sneakers — all in one place.
          </p>
        </section>

        {/* Story Section */}
        <section className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <Image
              src="/KickPrints.png"
              alt="Story image"
              width={700}
              height={500}
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Born out of a love for both tech and fashion, KickPrints started in a college dorm room. We saw a gap in the market — people needed access to reliable tech gear *and* wanted to express themselves through their style. So we combined both.
            </p>
            <p className="mt-4 text-gray-600">
              From printers to limited-edition kicks, we’ve created a platform that curates the best — so you can focus on doing what you love, whether that’s creating, gaming, or flexing.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2">
            <Image
              src="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg"
              alt="Mission image"
              width={700}
              height={500}
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To deliver premium products that fuel your creativity, productivity, and individuality — without compromise.
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-600 space-y-1">
              <li>Fast shipping & seamless shopping</li>
              <li>Top-quality tech & fashion drops</li>
              <li>Curated collections with care</li>
            </ul>
          </div>
        </section>

        {/* Team/Product Section (Optional) */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">What We Bring</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            We&apos;re more than a store — we&apos;re a movement. Here’s a peek at what you’ll find at KickPrints.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Image
                src="/KickPrints.png"
                alt="Product 1"
                width={400}
                height={300}
                className="rounded-md mb-4"
              />
              <h3 className="font-semibold">Custom Prints</h3>
              <p className="text-sm text-gray-500">Vibrant, sharp, and fast — get your projects done right.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Image
                src="https://images.pexels.com/photos/33597709/pexels-photo-33597709.jpeg"
                alt="Product 2"
                width={400}
                height={300}
                className="rounded-md mb-4"
              />
              <h3 className="font-semibold">Limited Sneakers</h3>
              <p className="text-sm text-gray-500">Streetwear icons and hype drops delivered to your door.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Image
                src="https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg"
                alt="Product 3"
                width={400}
                height={300}
                className="rounded-md mb-4"
              />
              <h3 className="font-semibold">Reliable Tech</h3>
              <p className="text-sm text-gray-500">Desktops, accessories & more — built to last, easy to love.</p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-2">We&apos;d love to hear from you! Reach out anytime.</p>
          <p className="text-lg font-medium">📞 Phone: <a href="tel:0115809030" className="text-blue-600 hover:underline">0115809030</a></p>
          <p className="text-lg font-medium">📧 Email: <a href="mailto:simonnganga932@gmail.com" className="text-blue-600 hover:underline">simonnganga932@gmail.com</a></p>
        </section>

      </div>
    </main>
  );
}
