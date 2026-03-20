# W13 Site

Landing page institucional da W13 Tecnologia, construída com React, TypeScript, Vite, Tailwind CSS e Framer Motion. O projeto foi organizado para manter conteúdo, layout, comportamento e componentes em camadas separadas, facilitando manutenção e evolução do site.

## Visão Geral

O site apresenta:

- hero com mídia animada e fallback para navegação com redução de movimento
- seções institucionais com conteúdo estático centralizado
- cards de serviços e projetos com animações leves
- área de contato com mapa incorporado, telefone, e-mail e CTA para WhatsApp

## Stack

| Camada | Tecnologia |
| --- | --- |
| Build | Vite |
| UI | React 19 |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS 4 |
| Animação | Framer Motion |
| Ícones | Lucide React |
| Qualidade | ESLint |

## Estrutura

```txt
src/
  components/
    layout/
      site-footer.tsx
      site-header.tsx
    sections/
      about-section.tsx
      clients-section.tsx
      feedback-section.tsx
      hero-section.tsx
      projects-section.tsx
      services-section.tsx
    site/
      floating-whatsapp-button.tsx
      section-heading.tsx
    ui/
      button.tsx
    count-up.tsx
    section-reveal.tsx
  data/
    site-config.ts
    site-content.ts
  hooks/
    use-active-section.ts
    use-body-scroll-lock.ts
    use-header-scrolled.ts
  lib/
    utils.ts
  types/
    site.ts
  App.tsx
```

## Organização adotada

- `src/App.tsx`: compõe a página e conecta hooks de navegação e responsividade.
- `src/components/sections`: guarda cada seção principal da landing page.
- `src/components/layout`: concentra header e footer.
- `src/components/site`: componentes menores ligados à estrutura do site.
- `src/data/site-content.ts`: todo o conteúdo estático das seções.
- `src/data/site-config.ts`: contatos, endereço, horário e constantes globais.
- `src/hooks`: comportamentos isolados, como scroll do header e lock do body no menu mobile.
- `src/types/site.ts`: contratos tipados para os blocos de conteúdo.

## Como rodar

### Requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Como editar conteúdo

Se a mudança for textual ou de mídia, os pontos principais são:

- `src/data/site-content.ts`: serviços, projetos, feedbacks, clientes e destaques
- `src/data/site-config.ts`: telefone, e-mail, endereço, horários e links institucionais
- `public/media`: imagens usadas nas seções

Isso evita alterações em componentes quando a mudança é apenas de conteúdo.

## Padrão de manutenção

- manter componentes focados em uma única responsabilidade
- evitar conteúdo estático dentro de `App.tsx`
- colocar dados institucionais em `data/`
- extrair interações recorrentes para `hooks/`
- preservar a linguagem visual e as classes utilitárias já adotadas pelo projeto

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Deploy

O projeto gera uma aplicação estática em `dist/`, compatível com provedores como Vercel, Netlify, Cloudflare Pages ou hospedagem tradicional de arquivos estáticos.
