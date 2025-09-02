// WhatsAppChatButton.jsx
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppChatButton() {
  return (
<a
  href="https://wa.me/254745635805"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed right-4 z-50 bottom-20 sm:bottom-8 transition-transform duration-500 ease-out transform translate-y-4 sm:translate-y-0"
>
  <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center animate-bounce">
    <FaWhatsapp className="w-7 h-7" />
  </div>
</a>

  );
}
