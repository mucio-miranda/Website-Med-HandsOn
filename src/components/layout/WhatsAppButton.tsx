"use client";

import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "5581982252905";
const WHATSAPP_MESSAGE = "Olá! Vi no site da MedHandsOn e gostaria de mais informações, por favor.";

export function WhatsAppButton() {
  const pathname = usePathname();

  // Não exibe dentro do Sanity Studio
  if (pathname?.startsWith("/studio")) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-8 bottom-8 z-50 w-16 h-16 bg-[#1F1F1F] hover:bg-[#292929] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 border border-white/10"
    >
      <img src="/zapzap.svg" alt="WhatsApp" className="w-[50px] h-[50px]" />
    </a>
  );
}
