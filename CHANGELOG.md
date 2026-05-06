# CHANGELOG - Vacina One

## [Unreleased]

### Changed — Refactor v3 (feature/fase2-header-hero)

- **Hero — Container de Projecao Anti-Distorcao** (2026-05-06)
  - Substituido `max-w-[1920px] mx-auto` por `absolute left-1/2 -translate-x-1/2 w-[1920px]`
  - Coordenadas absolutas do Figma preservadas em qualquer resolucao (fix quebra em 1360px)
  - Altura da secao reduzida: 1150px -> 1050px
  - Imagens do mosaico: removido `rounded-[20px]` (sem bordas arredondadas)
  - Menino: top 100 -> 80
  - Pessoa vacinada: top 150 -> 130
  - Bebe: top 460 -> 440
  - Titulo: `font-black`, `leading-[90px]`, cor base `text-vacina-dark`, quebras manuais em 3 linhas
  - Botao CTA: `font-extrabold` -> `font-black`
  - Divisor: top 850 -> 800
  - Carrossel: top 920 -> 870

- **LaboratoryCarousel — Loop Infinito + Setas Funcionais + Drag** (2026-05-06)
  - Substituido `useState offset` por `useAnimation` + `useRef` para controle preciso do x
  - Loop automatico: `x: [xRef, xRef - STRIP_WIDTH]`, 20s linear, repeat Infinity
  - Pausa no hover: `onMouseEnter` para animacao, `onMouseLeave` retoma
  - Setas funcionais: spring animation (stiffness 300, damping 30) + retoma loop apos spring
  - Prev limitado a x=0 para nao ultrapassar o inicio
  - Drag habilitado: `drag="x"`, `dragConstraints left: -STRIP_WIDTH*2, right: 0`
  - 4 repeticoes da lista para garantir continuidade visual sem gap branco
  - STRIP_WIDTH calculado: 1447px (soma real das larguras + 4 gaps de 100px)

- **Header — Sticky com Sombra Premium** (2026-05-06)
  - `absolute top-0 left-0` -> `sticky top-0`
  - Sombra: `shadow-[0_2px_12px_rgba(0,0,0,0.06)]`
  - `pt-[90px]` removido do `main` (sticky ocupa fluxo normal)

---
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
