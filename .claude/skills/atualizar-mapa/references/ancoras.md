# Âncoras para recalcular linhas sem ler o arquivo

Cada linha de `docs/MAPA.md` e do "Mapa rápido" de `AGENTS.md` tem um padrão único. Rode `Grep -n` com o padrão **no arquivo onde o trecho está hoje** (HTML, ou o `.css`/`.js` para onde foi). Para blocos, a linha final é a próxima âncora menos 1, ou o fechamento (`</style>`, `</script>`, `}` no nível zero).

## `<head>`

| Linha do MAPA | Padrão (`Grep -n`) | Observação |
|---|---|---|
| `<html lang` | `<html lang=` | |
| title / description | `<title>` e `name="description"` | |
| favicon | `rel="icon"` | |
| classe `js` | `classList.add\('js'\)` | pegadinha: não remover |
| Tailwind CDN | `cdn.tailwindcss.com` | |
| Google Fonts | `fonts.googleapis.com/css2` | |
| Font Awesome | `font-awesome` | |
| `tailwind.config` | `tailwind.config = \{` | após a Etapa 3 está em `js/tailwind.config.js` |
| `<style>` | `<style>` … `</style>` | some ao fim da Etapa 4 |

## CSS próprio (dentro do `<style>` ou em `css/*.css`)

| Grupo | Padrão | Destino após Etapa 4 |
|---|---|---|
| Scrollbar | `::-webkit-scrollbar` | `css/base.css` |
| Texturas | `\.leather-texture \{` | `css/texturas.css` |
| Mármore | `\.marble-texture \{` | `css/texturas.css` |
| Costura | `\.stitch \{` | `css/texturas.css` |
| Gradiente texto | `\.bronze-gradient-text` | `css/componentes.css` |
| Nav | `\.nav-link \{` | `css/componentes.css` |
| Keyframes | `@keyframes fadeUp` | `css/animacoes.css` |
| Reveal | `\.js \.reveal` | `css/animacoes.css` |
| Card lift | `\.card-lift \{` | `css/componentes.css` |
| Divider | `\.divider \{` | `css/componentes.css` |
| Reduced motion | `prefers-reduced-motion` | `css/base.css` (unificado: deve aparecer 1 vez) |
| Focus | `focus-visible` | `css/base.css` |

## Seções do `<body>`

| Bloco | Padrão |
|---|---|
| Barra de progresso | `id="scrollBar"` |
| Barra superior | `<!-- Barra superior -->` ou `Dilermando` (1ª ocorrência) |
| Header | `<header` |
| Menu mobile | `id="mobileMenu"` |
| Hero | `id="inicio"` |
| Sobre | `id="sobre"` |
| Serviços | `id="servicos"` |
| Diferenciais | `id="diferenciais"` |
| Contato | `id="contato"` |
| Rodapé | `<footer` |
| WhatsApp flutuante | `<!-- WhatsApp flutuante -->` ou `animate-ping` |

## JavaScript (dentro do `<script>` ou em `js/*.js`)

| Bloco | Padrão | Destino após Etapa 5 |
|---|---|---|
| Menu mobile | `getElementById\('mobileMenuBtn'\)` | `js/menu-mobile.js` |
| Link ativo | `function setActiveSection` | `js/nav-ativa.js` |
| Reveal | `const revealObs` | `js/revelar-scroll.js` |
| Barra de progresso | `getElementById\('scrollBar'\)` (a 2ª ocorrência, no JS) | `js/barra-progresso.js` |

## Contagens que o MAPA cita (conferir com `Grep -c`)

| Afirmação | Comando |
|---|---|
| logo aparece 6 vezes | `Grep -c "image-removebg-preview \(1\)"` (ou `logo.png` após Etapa 2) |
| WhatsApp 7 vezes | `Grep -c "wa.me/5582987498857"` |
| 4 cards de serviço | `Grep -c "card-lift group" ` dentro de `#servicos` ≈ 3 + 1 destacado |

## Mermaid — "Quem toca em quem"

Só quando existir ≥1 `js/*.js` e ≥1 `css/*.css`. Gere a partir de `Grep`:

- Para cada `js/*.js`: `Grep -o "getElementById\('[^']+'\)|querySelector(All)?\('[^']+'\)"` → os `id`s/seletores que o arquivo usa.
- Para cada `css/*.css`: `Grep -o "^\.[a-zA-Z-]+"` → as classes que define.

Formato (atualize, não duplique):

```mermaid
graph LR
  subgraph HTML
    H1[#mobileMenuBtn / #mobileMenu]
    H2[section#id]
    H3[#scrollBar]
    H4[.reveal]
  end
  subgraph js/
    J1[menu-mobile.js] --> H1
    J2[nav-ativa.js] --> H2
    J3[revelar-scroll.js] --> H4
    J4[barra-progresso.js] --> H3
  end
  subgraph css/
    C1[base.css] -.-> H2
    C2[texturas.css] -.->|.leather-texture .marble-texture .stitch| H2
    C3[componentes.css] -.->|.nav-link .card-lift .divider| H2
    C4[animacoes.css] -.->|@keyframes .hero-in .reveal| H4
  end
```

Seta cheia = JS lê/escreve o elemento. Seta tracejada = CSS define classe usada ali.
