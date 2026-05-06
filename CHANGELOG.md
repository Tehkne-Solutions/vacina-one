# CHANGELOG - Vacina One

## [Unreleased]

### Added
- **Setup Inicial do Projeto** (2026-05-06)
  - Inicialização do projeto Next.js 14 com TypeScript, ESLint, Tailwind CSS
  - Estrutura de diretórios: src/app, src/components
  - Configuração do Design System com cores oficiais do Figma
  - Fonte Plus Jakarta Sans como fallback para Franie
  - Arquivo content-map-home.md para controle de conteúdo oficial

- **Componente Header** (2026-05-06)
  - Implementação pixel-perfect do header conforme Figma
  - Logo Vacina One (221x53px)
  - Menu de navegação com 8 links (Home destacado em preto, outros em cinza)
  - Botão "Seja um Franqueado" com borda teal e radius 50px
  - Responsividade: Menu desktop, placeholder para mobile
  - Performance: Imagem priority para LCP

- **Componente Hero** (2026-05-06)
  - Layout grid 2 colunas (desktop) / stack (mobile)
  - Mosaico de 3 imagens principais conforme design Figma
  - Título H1: "Proteção e cuidado para todas as fases da vida" (80px, teal)
  - Subtítulo: Descrição dos serviços (22px, cinza)
  - CTA: "Agendar Vacinação" (fundo amarelo, texto branco, 22px bold)
  - Badge estatístico: "75% of doctors..." (fundo teal, sobreposto na imagem)
  - Seção Social Proof: Marcas dos laboratórios (5 logos)
  - Animações Framer Motion: Fade-in sequencial

- **Página Inicial** (2026-05-06)
  - Integração Header + Hero
  - Metadata SEO otimizada
  - Estrutura semântica HTML

### Technical Details
- **Framework:** Next.js 14.2.3 (App Router)
- **Styling:** Tailwind CSS 3.4.0
- **Animations:** Framer Motion 11.0.0
- **Fonts:** Plus Jakarta Sans (Google Fonts)
- **Images:** Next.js Image component com otimização
- **TypeScript:** Configurado com alias @/
- **Linting:** ESLint configurado

### Branch Strategy
- **main:** Código de produção estável
- **develop:** Integração de features
- **feature/header-hero:** Desenvolvimento atual (a ser merged após testes)

### Next Steps
- Testes visuais contra design Figma
- Validação de performance (Lighthouse)
- Implementação de menu mobile
- Próximas seções: Services, About, Contact, etc.

---

## Guidelines
- Commits devem ser comentados em português
- Branches feature/ para desenvolvimento
- Merge para main apenas após testes e validação
- Changelog atualizado em cada release