import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  const whatsappUrl =
    'https://wa.me/919488331932?text=' +
    encodeURIComponent(
      'Hello Sree Murugan Sons, I would like to inquire about building materials and agricultural supplies.'
    );

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-auto">
      {/* WhatsApp Action Button in Glossy Green */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Sree Murugan Sons"
        className="glossy-btn group flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-full bg-emerald-600/95 backdrop-blur-md text-white font-extrabold text-xs shadow-[0_8px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.5)] hover:scale-105 transition-all duration-300 border border-white/30"
      >
        <MessageCircle size={18} className="fill-white shrink-0" />
        <span className="hidden sm:inline-block pr-1 tracking-wide">
          WhatsApp Us
        </span>
      </a>

      {/* Direct Call Button in Golden Sunrise Amber */}
      <a
        href="tel:+919488331932"
        aria-label="Call Sree Murugan Sons"
        className="golden-btn group relative flex items-center gap-2 p-3 sm:px-4.5 sm:py-3 rounded-full text-white font-black text-xs hover:scale-105 transition-all duration-300"
      >
        <span className="absolute -inset-1 rounded-full bg-[#F59E0B] opacity-40 animate-ping pointer-events-none" />
        <Phone size={18} className="relative z-10 shrink-0" />
        <span className="relative z-10 hidden sm:inline-block pr-1 tracking-wide font-mono">
          +91 94883 31932
        </span>
      </a>
    </div>
  );
}
