/**
 * Header Component - Vacina One
 *
 * Este componente representa o cabeçalho da página inicial, contendo o logo,
 * menu de navegação e botão de call-to-action para franquia.
 *
 * Design System:
 * - Altura fixa: 110px
 * - Fundo: Branco puro (#FFFFFF)
 * - Logo: 221px de largura, posicionado à esquerda
 * - Menu: Links em #5A5A5A (exceto 'Home' em #000000), fonte 18px, peso 500, gap 50px
 * - Botão: "Seja um Franqueado" com borda 1px solid #56B0BB, radius 50px, padding 20px 40px
 *
 * Responsividade:
 * - Desktop: Layout horizontal com elementos distribuídos
 * - Mobile: Menu colapsível (a implementar)
 *
 * SEO:
 * - Links com texto descritivo para navegação
 * - Estrutura semântica com nav
 *
 * Performance:
 * - Imagem otimizada com Next.js Image
 * - Lazy loading desabilitado para logo (acima da dobra)
 */

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-[110px] bg-white flex items-center justify-between px-4 lg:px-8">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image
          src="/images/vacina-one-logo.png"
          alt="Vacina One Logo"
          width={221}
          height={53}
          priority // Carrega prioritariamente para LCP
          className="object-contain"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="hidden lg:flex items-center space-x-[50px]">
        <Link
          href="#home"
          className="text-black font-medium text-nav-link leading-[180%] hover:text-brand-teal transition-colors"
        >
          Home
        </Link>
        <Link
          href="#vacinaone"
          className="text-brand-gray font-medium text-nav-link leading-[180%] hover:text-brand-teal transition-colors"
        >
          VacinaOne
        </Link>
        <Link
          href="#unidades"
          className="text-brand-gray font-medium text-nav-link leading-[180%] hover:text-brand-teal transition-colors"
        >
          Unidades
        </Link>
        <Link
          href="#vacinas"
          className="text-brand-gray font-medium text-nav-link leading-[180%] hover:text-brand-teal transition-colors"
        >
          Vacinas
        </Link>
        <Link
          href="#calendario"
          className="text-brand-gray font-medium text-nav-link leading-[180%] hover:text-brand-teal transition-colors"
        >
          Calendário
        </Link>
        <Link
          href="#empresas"
          className="text-brand-gray font-medium text-nav-link leading-[180%] hover:text-brand-teal transition-colors"
        >
          Empresas
        </Link>
        <Link
          href="#blog"
          className="text-brand-gray font-medium text-nav-link leading-[180%] hover:text-brand-teal transition-colors"
        >
          Blog
        </Link>
        <Link
          href="#contato"
          className="text-brand-gray font-medium text-nav-link leading-[180%] hover:text-brand-teal transition-colors"
        >
          Contato
        </Link>
      </nav>

      {/* CTA Button */}
      <div className="hidden lg:flex">
        <button className="px-10 py-5 border border-brand-teal rounded-full text-brand-teal font-medium text-xl leading-[102.52%] hover:bg-brand-teal hover:text-white transition-colors">
          Seja um Franqueado
        </button>
      </div>

      {/* Mobile Menu Button (placeholder) */}
      <div className="lg:hidden">
        <button className="text-brand-gray">
          {/* Hamburger icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
