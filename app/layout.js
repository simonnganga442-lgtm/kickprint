import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import { ProductProvider } from "@/context.js/ProductContext";
import { CartProvider } from "@/context.js/CartContext";
import WhatsAppChatButton from "@/Components/Whatsappchat";
import Footer from "@/Components/Footer";
import Breadcrumbs from "@/Components/Breadcrumbs";
import GoogleAnalyticsTracker from "./analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kick prints",
  description:
    "kickPrints is where style meets tech. We’re passionate about giving you premium prints and fire sneakers — all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Google Analytics script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-33P087QFW1');
          `,
        }}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProductProvider>
          <CartProvider>
            <Navbar />
            <main className="pt-20">
              <Breadcrumbs />
              <GoogleAnalyticsTracker/>
              {children}
              <WhatsAppChatButton />
            </main>
            <Footer />
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
