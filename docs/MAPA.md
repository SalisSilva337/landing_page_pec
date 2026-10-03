# Mapa da landing page

O que existe em `barbearia_wm_landing_page.html`, de cima para baixo. As linhas são da versão atual (571 linhas); quando o código for separado, atualize este arquivo.


## `<head>` (linhas 1–126)

| Linhas | O que é | Para que serve |
|---|---|---|
| 2 | `<html lang="pt-BR" class="scroll-smooth">` | Idioma da página e rolagem suave ao clicar nos links do menu |
| 6–7 | `<title>` e `<meta name="description">` | O que aparece na aba do navegador e no Google |
| 8 | `<link rel="icon">` | Ícone da aba (favicon), usa o logo |
| 9 | `classList.add('js')` | Marca que o JS está ativo. Sem isso, o CSS esconderia os `.reveal` para sempre |
| 11 | `<script src="https://cdn.tailwindcss.com">` | Carrega o Tailwind (gera as classes utilitárias em tempo real) |
| 12–14 | Google Fonts | Fontes Cinzel (títulos) e Montserrat (texto); `preconnect` acelera a conexão |
| 15 | Font Awesome 6.4 | Ícones (`fa-scissors`, `fa-whatsapp` etc.) |
| 17–39 | `tailwind.config` | Cores da marca (`leather`, `bronze`, `sand`, `marble`...) e fontes `font-serif`/`font-sans` |
| 41–125 | `<style>` | CSS próprio (detalhado abaixo) |

### CSS próprio (`<style>`, linhas 41–125)

| Linhas | Grupo | Classes / regras |
|---|---|---|
| 42–44 | Scrollbar | `::-webkit-scrollbar*` (barra de rolagem marrom/caramelo) |
| 46–66 | Texturas | `.leather-texture` (pontinhos = couro), `.marble-texture` (veios = mármore), `.stitch` e `.stitch-dark` (borda tracejada = costura) |
| 68–75 | Gradientes bronze | `.bronze-gradient-text` (texto dourado), `.bronze-gradient-bg` (botão dourado + hover) |
| 77–88 | Menu | `.nav-link` com sublinhado animado via `::after`; `.active-nav` destaca o link da seção visível; versão mobile |
| 91–105 | Animações | `@keyframes` `fadeUp`, `popIn`, `spinSlow`, `floatY`, `snip`, `glow`, `bob` e as classes que os usam (`.hero-in`, `.hero-pop`, `.spin-slow`, `.float-y`, `.snip`, `.crown-bob`) |
| 107–108 | Revelar ao rolar | `.js .reveal` começa invisível; `.visible` dispara `fadeUp` com atraso `--d` |
| 110–111 | Cards | `.card-lift` sobe 6px no hover |
| 113–115 | Divisor | `.divider` com linhas antes/depois do ícone de tesoura; `.left` tira a linha da esquerda |
| 117–121, 124 | Acessibilidade | `prefers-reduced-motion`: desliga animações para quem pediu no sistema |
| 123 | Acessibilidade | `:focus-visible` com contorno dourado ao navegar por teclado |

## `<body>` (linhas 127–571)

A ordem visual da página:

| Linhas | Bloco | `id` | Fundo | O que tem |
|---|---|---|---|---|
| 129 | Barra de progresso | `#scrollBar` | bronze | Linha de 3px no topo que cresce com a rolagem (controlada por JS) |
| 131–151 | Barra superior | — | `leatherDeep` | Endereço (link para Maps), horário, telefone, ícones Instagram/WhatsApp |
| 153–199 | Cabeçalho fixo | `<header>` | `leather/95` + blur | Logo + nome, menu desktop (5 links), botão WhatsApp, botão hambúrguer `#mobileMenuBtn`, menu mobile `#mobileMenu` (começa `hidden`) |
| 201–248 | Hero | `#inicio` | couro | Selo "desde 2021", título com gradiente, parágrafo, 2 botões (ver serviços / WhatsApp), emblema circular girando e flutuando |
| 250–296 | Sobre | `#sobre` | mármore | Card escuro com logo e 3 checks; título, 2 parágrafos, botão "Ver como chegar" |
| 298–359 | Serviços | `#servicos` | `leatherDeep` | 4 cards: Corte R$ 28, **Corte e barba R$ 38** (destacado "Mais pedido"), Barba R$ 15, Corte com luzes R$ 70 |
| 361–395 | Diferenciais | `#diferenciais` | areia | 3 cards: Ordem de chegada, Profissionais experientes, Preço justo |
| 397–462 | Contato | `#contato` | couro | Endereço, telefone, horário, Instagram; card com botões WhatsApp e Maps |
| 464–488 | Rodapé | `<footer>` | `leatherDeep` | Logo, copyright 2021–2026, ícones sociais |
| 490–496 | WhatsApp flutuante | — | verde | Botão fixo no canto inferior direito com `animate-ping` |
| 498–569 | `<script>` | — | — | JavaScript (detalhado abaixo) |

### Padrões que se repetem no HTML

Vale conhecer porque aparecem muitas vezes (e porque, sem build, não dá para transformar em "componente"):

- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` — centraliza e limita a largura. Aparece em toda seção.
- **Título de seção**: `font-serif text-3xl sm:text-4xl font-bold` + `.divider` com tesoura logo abaixo.
- **Card de serviço** (4x, linhas 310–355): `bg-leatherCard stitch rounded-xl p-6 ... card-lift group` → ícone em quadrado → `h3` → `p` → preço.
- **Ícone em caixa** (contato, linhas 411–433): `w-10 h-10 rounded-lg bg-leatherDeep border border-bronze/40 ...`.
- **Link do WhatsApp**: a mesma URL `https://wa.me/5582987498857?text=...` aparece 7 vezes.
- **Logo**: `imgs/image-removebg-preview (1).png` aparece 6 vezes (favicon, header, hero, sobre, contato, rodapé).

## JavaScript (`<script>`, linhas 498–569)

Três blocos independentes. Nenhum depende do outro.

### 1. Menu mobile (linhas 499–509)

- Pega `#mobileMenuBtn` e `#mobileMenu`.
- Ao clicar no botão: alterna a classe `hidden` do menu e atualiza `aria-expanded` (acessibilidade: leitor de tela sabe se está aberto).
- Ao clicar em qualquer link dentro do menu: fecha o menu.
- Roda direto (sem `DOMContentLoaded`) porque o `<script>` está no fim do `<body>`, então os elementos já existem.

### 2. Link ativo no menu (linhas 512–542)

- Observa todas as `section[id]` com um `IntersectionObserver`.
- `rootMargin: '-20% 0px -60% 0px'` cria uma "faixa" no meio da tela (de 20% a 40% da altura, contada do topo).
- Guarda num `Set` (`visiveis`) as seções que estão na faixa agora: entra na lista quando o aviso é `true` e sai quando é `false`. Depois escolhe a **última** da lista com `findLast`, isto é, a mais de baixo no HTML. Agir também no `false` evita o bug em que Diferenciais ficava sem destaque ao subir a partir do fim da página.
- `setActiveSection(id)` liga/desliga `.active-nav` nos links que têm `data-section` igual ao `id`.
- O `scroll` extra trata dois casos que o observer erra: topo da página (força `inicio`) e fim da página (força `contato`, porque a última seção pode ser curta demais para cruzar a faixa).

### 3. Revelar ao rolar + barra de progresso (linhas 545–568)

- Seleciona blocos específicos das seções (`#sobre .grid > div`, `#servicos .grid > div` etc.).
- Para cada um: calcula a posição entre os irmãos (`idx`), define `--d = idx * 0.12s` (atraso em cascata) e adiciona `.reveal`.
- Um segundo `IntersectionObserver` (`threshold: 0.15` = 15% visível) adiciona `.visible` e para de observar (`unobserve`) — a animação acontece uma vez só.
- Barra de progresso: a cada `scroll`, largura de `#scrollBar` = porcentagem rolada. `{ passive: true }` diz ao navegador que o handler não vai cancelar o scroll, o que melhora a performance.

## Dependências externas

| O quê | De onde | Observação |
|---|---|---|
| Tailwind CSS | `cdn.tailwindcss.com` | Versão de desenvolvimento (Play CDN). Funciona sem build, mas é mais pesada que um CSS compilado. Decisão do projeto: manter. |
| Cinzel, Montserrat | Google Fonts | |
| Font Awesome 6.4.0 | cdnjs | Só CSS; os ícones são classes `fa-*` |
