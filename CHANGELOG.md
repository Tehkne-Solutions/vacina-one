# CHANGELOG - Vacina One

## [Unreleased]

### Added - Fase 4 Sobre a VacinaOne

- Criada a seção `AboutVacinaOne` conforme referência do Figma.
- Incluído o mascote oficial da seção em `public/images`.
- Implementados blocos com tarja azul retangular e divisórias sutis.
- Ajustada responsividade para desktop, notebook e mobile.
- Atualizado `docs/content-map-home.md` com o conteúdo oficial da seção.

### Fixed - Fase 3 Ajuste final de tipografia

- Reduzido o peso dos titulos dos cards da secao `WhyChoose`.
- Aumentado o line-height dos titulos para evitar sobreposicao entre linhas.
- Suavizado o peso dos textos e ajustado o respiro vertical entre titulo e descricao.

### Fixed - Fase 3 Pixel Perfect Por que escolher a VacinaOne

- Removidos os círculos duplicados ao redor dos SVGs oficiais.
- Corrigidos título bicolor, quebras de linha, espaçamentos e tipografia responsiva.
- Mantido o grid responsivo sem alterar Header, Hero, carrossel ou `Services`.

### Added - Fase 3 Por que escolher a Vacina One

- Criado componente `WhyChoose` com layout fiel a faixa azul-escura do Figma.
- Adicionados os quatro diferenciais com SVGs oficiais em `public/images`.
- Atualizada a Home para posicionar a seção entre Hero/carrossel e `Services`.
- Atualizado `docs/content-map-home.md` com textos e paths oficiais da seção.

### Changed — Refactor v5 Responsivo (feature/fase2-header-hero)

- **Header — Container 90% e Menu Corrigido** (2026-05-06)
  - Container: max-w-[1440px] px-[112px] -> w-[90%] mx-auto (padding 5% constante)
  - Altura: h-[80px] mobile / h-[110px] desktop
  - Nav: gap-4 xl / gap-8 2xl, font-size 15px xl / 16px 2xl, whitespace-nowrap
  - CTA desktop: px-6 h-[50px], font-size responsivo 15px xl / 18px 2xl
  - Mobile overlay: w-[90%] mx-auto para alinhar com o container
  - Botao 'Seja um Franqueado' corrigido no mobile (estava sumindo)

- **Hero — Tipografia 2xl, Ordem Mobile e Bebe Ancorado** (2026-05-06)
  - Container: max-w-[1440px] px-[112px] -> w-[90%] mx-auto
  - Tipografia corrigida: text-[38px] mobile / lg:text-[65px] notebook 1360px / 2xl:text-[80px] desktop 1920px
    (2xl = 1536px, garante que 1360px caia no lg e exiba 65px)
  - Quebras de linha fieis ao Figma: 'Protecao e' / 'cuidado para' / 'todas as fases' / 'da vida'
  - Ordem mobile invertida: texto order-1 (aparece primeiro), imagens order-2 (abaixo)
  - Mosaico: menino w-[52%], pessoa vacinada w-[52%] h-[88%], bebe w-[40%] com border-[8px] border-white
  - Bebe ancorado: border branca de 8px impede separacao visual em telas largas
  - Card 75%: hidden sm:block para nao aparecer em mobile muito pequeno
  - pt responsivo: pt-[100px] mobile / pt-[160px] desktop

- **page.tsx** (2026-05-06)
  - pt-[80px] md:pt-[90px] -> pt-[80px] md:pt-[110px]

---

- **Header — Menu Mobile + Fixed** (2026-05-06)
  - sticky -> fixed (garante sobreposicao em qualquer scroll)
  - Altura responsiva: h-[80px] mobile / h-[90px] desktop
  - Logo responsivo: 150x36 mobile / 221x53 desktop
  - Nav desktop: hidden ate xl, gap-8, font-size 16px
  - CTA desktop: hidden ate xl
  - Menu hamburger: 3 barras com animacao CSS (rotate/opacity)
  - Mobile overlay: max-h transition para abrir/fechar suavemente
  - Links mobile com onClick para fechar o menu
  - Botao CTA no mobile overlay com bg-vacina-teal
  - Adicionado "use client" (necessario para useState)

- **Hero — Grid System Responsivo** (2026-05-06)
  - Substituido container absoluto 1920px por grid-cols-1 xl:grid-cols-2
  - max-w-[1440px] com px-6 mobile / px-[112px] desktop
  - Mosaico: coordenadas absolutas em % e aspect-square (proporcional)
    - Menino: left-0 top-0 w-[45%] aspect-square
    - Pessoa vacinada: right-0 top-[8%] w-[50%] h-[82%]
    - Bebe: left-[15%] bottom-0 w-[35%] aspect-square
  - Card 75%: padding responsivo p-4 md:p-6, texto responsivo
  - Titulo: text-[40px] mobile / text-[65px] md / text-[80px] xl
  - Texto centralizado no mobile, alinhado a esquerda no desktop
  - Botao CTA: w-full mobile / w-[339px] desktop
  - Divisor e carrossel via margin (mt-16 md:mt-24) em vez de top absoluto

- **LaboratoryCarousel — Responsivo** (2026-05-06)
  - Larguras dos logos reduzidas para caber em telas menores
  - Gap responsivo: gap-16 mobile / gap-[80px] desktop
  - Altura da faixa: h-8 mobile / h-[52px] desktop
  - Setas ocultas no mobile (hidden md:flex)
  - STRIP_WIDTH recalculado: 1170px
  - Logica de loop/pausa/setas mantida do Refactor v3

- **page.tsx** (2026-05-06)
  - pt-[80px] md:pt-[90px] para compensar header fixed

---

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
