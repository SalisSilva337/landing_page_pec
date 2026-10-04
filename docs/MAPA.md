# Mapa da landing page

O que existe no projeto e onde está. O HTML fica em `index.html` (400 linhas); o CSS em `css/` e o JavaScript em `js/`. Quando mudar o código, atualize as linhas aqui.

Tudo continua sem build: são arquivos `.css` e `.js` comuns, ligados por `<link>` e `<script src>`. Por isso a página abre com dois cliques no `index.html`.


## Arquivos

```
index.html                só a estrutura (HTML)
css/
  base.css                scrollbar, foco por teclado, prefers-reduced-motion
  texturas.css            .leather-texture, .marble-texture, .stitch, .stitch-dark
  componentes.css         .bronze-gradient-*, .nav-link, .mobile-nav-link, .card-lift, .divider
  animacoes.css           @keyframes + .hero-in, .hero-pop, .spin-slow, .float-y, .snip, .crown-bob, .reveal
js/
  tailwind.config.js      cores da marca e fontes
  menu-mobile.js          abre/fecha o menu no celular
  nav-ativa.js            destaca o link do menu da seção visível
  revelar-scroll.js       animação de entrada dos blocos ao rolar
  barra-progresso.js      barra de 3px no topo
imgs/
  logo.webp               logo, 640×640 (favicon, header, hero, sobre, contato, rodapé)
```

## `<head>` (`index.html`, linhas 1–23)

| Linhas | O que é | Para que serve |
|---|---|---|
| 2 | `<html lang="pt-BR" class="scroll-smooth">` | Idioma da página e rolagem suave ao clicar nos links do menu |
| 6–7 | `<title>` e `<meta name="description">` | O que aparece na aba do navegador e no Google |
| 8 | `<link rel="icon">` | Ícone da aba (favicon), usa o logo |
| 9 | `classList.add('js')` | Marca que o JS está ativo. Sem isso, o CSS esconderia os `.reveal` para sempre. Fica embutido (não em arquivo) porque precisa rodar antes da página aparecer |
| 11 | `<script src="https://cdn.tailwindcss.com">` | Carrega o Tailwind (gera as classes utilitárias em tempo real) |
| 12–14 | Google Fonts | Fontes Cinzel (títulos) e Montserrat (texto); `preconnect` acelera a conexão |
| 15 | Font Awesome 6.4 | Ícones (`fa-scissors`, `fa-whatsapp` etc.) |
| 17 | `js/tailwind.config.js` | Cores da marca e fontes. Tem que vir **depois** do CDN (usa o objeto `tailwind`) e sem `defer` |
| 19–22 | `css/*.css` | CSS próprio, nesta ordem: base, texturas, componentes, animações |

## CSS próprio (`css/`)

| Arquivo | Grupo | Classes / regras |
|---|---|---|
| `base.css` | Scrollbar | `::-webkit-scrollbar*` (barra de rolagem marrom/caramelo) |
| `base.css` | Acessibilidade | `:focus-visible` com contorno dourado ao navegar por teclado |
| `base.css` | Acessibilidade | `prefers-reduced-motion`: um bloco só, desliga animações, transições e rolagem suave para quem pediu no sistema. Usa `!important` porque carrega antes dos arquivos que definem as animações |
| `texturas.css` | Texturas | `.leather-texture` (pontinhos = couro), `.marble-texture` (veios = mármore), `.stitch` e `.stitch-dark` (borda tracejada = costura) |
| `componentes.css` | Gradientes bronze | `.bronze-gradient-text` (texto dourado), `.bronze-gradient-bg` (botão dourado + hover) |
| `componentes.css` | Menu | `.nav-link` com sublinhado animado via `::after`; `.active-nav` destaca o link da seção visível; versão mobile |
| `componentes.css` | Cards | `.card-lift` sobe 6px no hover |
| `componentes.css` | Divisor | `.divider` com linhas antes/depois do ícone de tesoura; `.left` tira a linha da esquerda |
| `animacoes.css` | Animações | `@keyframes` `fadeUp`, `popIn`, `spinSlow`, `floatY`, `snip`, `glow`, `bob` e as classes que os usam (`.hero-in`, `.hero-pop`, `.spin-slow`, `.float-y`, `.snip`, `.crown-bob`) |
| `animacoes.css` | Revelar ao rolar | `.js .reveal` começa invisível; `.visible` dispara `fadeUp` com atraso `--d` |

## `<body>` (`index.html`, linhas 24–400)

A ordem visual da página:

| Linhas | Bloco | `id` | Fundo | O que tem |
|---|---|---|---|---|
| 26 | Barra de progresso | `#scrollBar` | bronze | Linha de 3px no topo que cresce com a rolagem (controlada por JS) |
| 28–48 | Barra superior | — | `leatherDeep` | Endereço (link para Maps), horário, telefone, ícones Instagram/WhatsApp |
| 50–96 | Cabeçalho fixo | `<header>` | `leather/95` + blur | Logo + nome, menu desktop (5 links), botão WhatsApp, botão hambúrguer `#mobileMenuBtn`, menu mobile `#mobileMenu` (começa `hidden`) |
| 98–145 | Hero | `#inicio` | couro | Selo "desde 2021", título com gradiente, parágrafo, 2 botões (ver serviços / WhatsApp), emblema circular girando e flutuando |
| 147–193 | Sobre | `#sobre` | mármore | Card escuro com logo e 3 checks; título, 2 parágrafos, botão "Ver como chegar" |
| 195–256 | Serviços | `#servicos` | `leatherDeep` | 4 cards: Corte R$ 28, **Corte e barba R$ 38** (destacado "Mais pedido"), Barba R$ 15, Corte com luzes R$ 70 |
| 258–292 | Diferenciais | `#diferenciais` | areia | 3 cards: Ordem de chegada, Profissionais experientes, Preço justo |
| 294–359 | Contato | `#contato` | couro | Endereço, telefone, horário, Instagram; card com botões WhatsApp e Maps |
| 361–385 | Rodapé | `<footer>` | `leatherDeep` | Logo, copyright 2021–2026, ícones sociais |
| 387–393 | WhatsApp flutuante | — | verde | Botão fixo no canto inferior direito com `animate-ping` |
| 395–398 | `<script src>` | — | — | Os 4 arquivos de `js/` (detalhados abaixo) |

### Padrões que se repetem no HTML

Vale conhecer porque aparecem muitas vezes (e porque, sem build, não dá para transformar em "componente"):

- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` — centraliza e limita a largura. Aparece em toda seção.
- **Título de seção**: `font-serif text-3xl sm:text-4xl font-bold` + `.divider` com tesoura logo abaixo.
- **Card de serviço** (4x, linhas 207–252): `bg-leatherCard stitch rounded-xl p-6 ... card-lift group` → ícone em quadrado → `h3` → `p` → preço.
- **Ícone em caixa** (contato, linhas 308–330): `w-10 h-10 rounded-lg bg-leatherDeep border border-bronze/40 ...`.
- **Link do WhatsApp**: a mesma URL `https://wa.me/5582987498857?text=...` aparece 7 vezes.
- **Logo**: `imgs/logo.webp` aparece 6 vezes (favicon, header, hero, sobre, contato, rodapé).

## JavaScript (`js/`)

Quatro arquivos independentes, carregados no fim do `<body>` (linhas 395–398). Nenhum depende do outro. São scripts comuns (não `type="module"`), por isso funcionam também abrindo o arquivo direto, sem servidor.

### `menu-mobile.js`

- Pega `#mobileMenuBtn` e `#mobileMenu`.
- Ao clicar no botão: alterna a classe `hidden` do menu e atualiza `aria-expanded` (acessibilidade: leitor de tela sabe se está aberto).
- Ao clicar em qualquer link dentro do menu: fecha o menu.
- Roda direto (sem `DOMContentLoaded`) porque o `<script>` está no fim do `<body>`, então os elementos já existem.

### `nav-ativa.js`

- Observa todas as `section[id]` com um `IntersectionObserver`.
- `rootMargin: '-20% 0px -60% 0px'` cria uma "faixa" no meio da tela (de 20% a 40% da altura, contada do topo).
- Guarda num `Set` (`visiveis`) as seções que estão na faixa agora: entra na lista quando o aviso é `true` e sai quando é `false`. Depois escolhe a **última** da lista (inverte com `reverse()` e pega a primeira com `find`), isto é, a mais de baixo no HTML. Agir também no `false` evita o bug em que Diferenciais ficava sem destaque ao subir a partir do fim da página.
- `setActiveSection(id)` liga/desliga `.active-nav` nos links que têm `data-section` igual ao `id`.
- O `scroll` extra trata dois casos que o observer erra: topo da página (força `inicio`) e fim da página (força `contato`, porque a última seção pode ser curta demais para cruzar a faixa).

### `revelar-scroll.js`

- Seleciona blocos específicos das seções (`#sobre .grid > div`, `#servicos .grid > div` etc.).
- Para cada um: calcula a posição entre os irmãos (`idx`), define `--d = idx * 0.12s` (atraso em cascata) e adiciona `.reveal`.
- Um segundo `IntersectionObserver` (`threshold: 0.15` = 15% visível) adiciona `.visible` e para de observar (`unobserve`) — a animação acontece uma vez só.

### `barra-progresso.js`

- A cada `scroll`, largura de `#scrollBar` = porcentagem rolada. `{ passive: true }` diz ao navegador que o handler não vai cancelar o scroll, o que melhora a performance.

## Dependências externas

| O quê | De onde | Observação |
|---|---|---|
| Tailwind CSS | `cdn.tailwindcss.com` | Versão de desenvolvimento (Play CDN). Funciona sem build, mas é mais pesada que um CSS compilado. Decisão do projeto: manter. |
| Cinzel, Montserrat | Google Fonts | |
| Font Awesome 6.4.0 | cdnjs | Só CSS; os ícones são classes `fa-*` |
