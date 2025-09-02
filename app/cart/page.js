// ✅ Server Component
import CartClientPage from "./CartClientPage"; // no ssr: false here

export const metadata = {
  title: "Cart | KickPrints",
  description: "Review your items and complete your order at KickPrints.",
};

export default function CartPage() {
  return <CartClientPage />;
}
