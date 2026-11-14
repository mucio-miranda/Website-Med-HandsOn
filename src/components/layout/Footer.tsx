"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09111F] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo e Sobre */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
               <img src="/logo-footer.svg" alt="Med HandsOn" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>
              O futuro do ensino médico é real. Aprenda na prática com especialistas.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>Navegação</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/quem-somos#contato" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>Contato</h3>
            <ul className="space-y-4">
              <li className="text-gray-400 text-sm">
                medhandson.br@gmail.com
              </li>
              <li className="text-gray-400 text-sm">
                +55 (81) 98225-2905
              </li>
              <li className="text-gray-400 text-sm">
                Recife, PE
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'var(--font-open-sans), sans-serif' }}>Redes Sociais</h3>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/medhandson" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#077DEA] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#077DEA] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.youtube.com/@MedHandsOn" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#077DEA] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Desenvolvido por <a href="https://kommu.com.br" target="_blank" rel="noopener noreferrer" className="text-white font-medium">KOMMU</a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Med HandsOn. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/termos" className="text-gray-500 hover:text-white text-sm">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="text-gray-500 hover:text-white text-sm">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
