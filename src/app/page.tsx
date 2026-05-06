/**
 * Página Inicial - Vacina One
 *
 * Esta é a página principal do site Vacina One, composta pelo Header e Hero Section.
 * Implementa design pixel-perfect baseado no Figma fornecido.
 *
 * Estrutura:
 * - Header: Navegação e branding
 * - Hero: Conteúdo principal com mosaico de imagens e CTA
 *
 * Performance:
 * - Componentes otimizados com Next.js
 * - Imagens lazy-loaded exceto acima da dobra
 * - Animações suaves com Framer Motion
 *
 * SEO:
 * - Metadata otimizada
 * - Estrutura semântica HTML
 * - Conteúdo acessível
 */

import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Header />
      <Hero />
    </main>
  );
}
