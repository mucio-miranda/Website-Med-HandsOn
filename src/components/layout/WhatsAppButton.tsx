"use client";

import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "5581982252905";
const WHATSAPP_MESSAGE = "Olá! Vim do site da MedHandsOn e gostaria de mais informações, por favor.";

export function WhatsAppButton() {
  const pathname = usePathname();

  // Não exibe dentro do Sanity Studio
  if (pathname?.startsWith("/studio")) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Clique e fale com a nossa equipe no WhatsApp"
      className="wa-enter fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-8 sm:bottom-8 z-50 h-16 bg-[#1F1F1F] hover:bg-[#292929] rounded-full flex items-center gap-3 pr-1.5 pl-1.5 sm:pl-6 shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-[background-color,translate] duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 border border-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0085FF]"
    >
      <span className="hidden sm:flex flex-col leading-tight text-white">
        <span className="text-xs text-white/70">Clique e fale com</span>
        <span className="text-sm font-semibold">a nossa equipe.</span>
      </span>
      <img src="/zapzap.svg" alt="" aria-hidden="true" className="w-[50px] h-[50px] shrink-0" />
    </a>
  );
}
