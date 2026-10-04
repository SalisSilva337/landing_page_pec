# Glossário de front-end deste projeto

Termos que aparecem no código, explicados para quem está começando. Cada entrada diz **o que é**, **onde aparece aqui** e, quando ajuda, **por que foi usado**.


---

### Landing page
Site de uma única página, feito para apresentar algo (um negócio, um produto) e levar o visitante a uma ação. Aqui, a ação é chamar no WhatsApp ou ir à barbearia.

### Tailwind CSS
Framework de CSS baseado em **classes utilitárias**: em vez de criar uma classe `.botao-dourado` com várias regras, você escreve direto no HTML `bg-bronze text-leatherDeep font-bold py-2.5 px-5 rounded-md`. Cada classe faz uma coisa só.
**Aqui:** quase todo o estilo da página. **Por quê:** rápido de escrever e de ler no próprio HTML; sem precisar ir e voltar entre arquivos.

### Classe utilitária
Uma classe CSS que aplica **uma** propriedade. `p-6` = padding de 1.5rem; `hidden` = `display: none`; `text-center` = texto centralizado. Tailwind é feito disso.

### CDN (Content Delivery Network)
Servidor público que entrega arquivos prontos (bibliotecas, fontes). Em vez de baixar a biblioteca e colocar no projeto, a página pega de um endereço público.
**Aqui:** Google Fonts. O Tailwind e o Font Awesome já vieram de CDN; hoje o Tailwind é compilado (ver "Build") e os ícones são SVG em `css/icones.css`. **Por quê:** zero instalação. **Custo:** precisa de internet para abrir a página.

### Play CDN do Tailwind
A versão do Tailwind que roda **no navegador**: lê o HTML, vê quais classes você usou e gera o CSS na hora, a cada visita. É para desenvolvimento; em produção se compila um CSS fixo. Este projeto usou até trocar pelo Tailwind CLI.

### Build
Um passo automático que transforma os arquivos que você escreve nos arquivos que o navegador recebe. **Aqui:** o Tailwind CLI lê `index.html` e `js/`, vê as classes usadas e gera `css/tailwind.css` só com elas. O resultado é commitado, então quem só quer abrir a página não precisa rodar nada.

### `tailwind.config`
Arquivo `tailwind.config.js`, lido pelo Tailwind CLI. Diz onde procurar classes (`content`) e estende o Tailwind. Aqui adiciona as cores da marca (`leather`, `bronze`, `sand`...) e as fontes (`font-serif` = Cinzel, `font-sans` = Montserrat). Depois disso, `bg-leather` e `text-bronze` passam a existir como classes.

### Breakpoints / prefixos responsivos (`sm:`, `md:`, `lg:`)
No Tailwind, `md:flex` significa "a partir de 768px de largura, use `display: flex`". Sem prefixo, vale para todas as larguras. Tailwind é **mobile-first**: você escreve o estilo do celular e vai adicionando prefixos para telas maiores.
**Aqui:** `hidden md:flex` no menu desktop (escondido no celular, visível a partir de 768px); `md:hidden` no botão hambúrguer (o contrário).

### `group` e `group-hover:` (Tailwind)
Jeito de estilizar um **filho** quando o **pai** recebe hover. Marca o pai com `group`; no filho usa `group-hover:scale-110`. Sem isso seria preciso CSS próprio (`.card:hover .icone { ... }`).
**Aqui:** nos cards de serviço (o ícone gira e cresce quando o mouse passa no card inteiro) e no logo do cabeçalho.

### `hidden` (Tailwind)
Classe utilitária que faz `display: none`. **Aqui:** o `#mobileMenu` começa com `hidden`; o JS tira e põe essa classe para abrir e fechar. `md:hidden` esconde só a partir de 768px.

### `animate-ping` / `animate-bounce` (Tailwind)
Animações prontas do Tailwind: `ping` é o "pulso" que cresce e some (botão flutuante do WhatsApp); `bounce` é o quique (seta do botão "Ver serviços").

### Mobile-first
Estratégia de escrever primeiro o estilo para telas pequenas e depois ajustar para as maiores. O oposto (desktop-first) é escrever para desktop e "encolher".

### Semântica HTML (`<header>`, `<nav>`, `<section>`, `<footer>`)
Tags que dizem **o que** o conteúdo é, não só como aparece. Ajudam leitores de tela, buscadores e quem lê o código.
**Aqui:** cada bloco visual é uma `<section id="...">`; o menu está em `<nav>`.

### `id` vs `class`
`id` identifica **um** elemento único na página (`#mobileMenu`); `class` agrupa vários (`.card-lift`). Links `href="#servicos"` rolam até o elemento com `id="servicos"`.

### Atributo `data-*`
Jeito de guardar informação extra em um elemento HTML para o JavaScript ler. `data-section="sobre"` no link do menu diz ao JS "este link corresponde à seção `sobre`".

### ARIA (`aria-label`, `aria-expanded`)
Atributos de acessibilidade. `aria-label="Abrir menu"` dá nome a um botão que só tem ícone; `aria-expanded="true"` avisa que o menu está aberto. Leitores de tela usam isso.

### `prefers-reduced-motion`
Media query que detecta se a pessoa pediu ao sistema operacional para reduzir animações (enjoo, epilepsia, preferência). O CSS então desliga as animações.
**Aqui:** `css/base.css`. **Por quê:** acessibilidade; é boa prática em todo site com animação.

### `:focus-visible`
Pseudo-classe que aplica estilo quando o elemento recebe foco **pelo teclado** (Tab), mas não pelo clique do mouse. Permite dar contorno para quem navega por teclado sem "sujar" o clique.

### `position: sticky`
O elemento rola junto com a página até bater no topo e então fica grudado ali. **Aqui:** o `<header>` (`sticky top-0`).

### `backdrop-blur`
Desfoca o que está **atrás** do elemento. Com `bg-leather/95` (95% opaco) dá o efeito de vidro fosco no cabeçalho.

### `z-index` (`z-40`, `z-50`, `z-[60]`)
Quem fica por cima de quem. Número maior = mais em cima. **Aqui:** barra de progresso (60) > WhatsApp flutuante (50) > cabeçalho (40).

### Pseudo-elementos `::before` / `::after`
"Elementos fantasmas" criados pelo CSS antes/depois do conteúdo real. **Aqui:** o sublinhado animado do menu (`.nav-link::after`) e as linhas do `.divider`.

### `@keyframes` e `animation`
`@keyframes nome { from {...} to {...} }` define os quadros; `animation: nome 0.8s ease forwards` aplica. `forwards` mantém o estado final.
**Aqui:** `fadeUp` (sobe e aparece), `spinSlow` (gira em 40s), `floatY` (flutua), `snip` (tesoura corta), `bob` (coroa balança).

### `transition`
Animação simples entre dois estados (normal → hover, por exemplo). `transition: transform .3s ease` faz o card subir suavemente no hover em vez de pular.

### Variável CSS (`--d`, `var(--d, 0s)`)
Valor nomeado que o CSS lê com `var()`. O JS define `--d` por elemento (`el.style.setProperty('--d', '0.24s')`) e o CSS usa como `animation-delay`. É assim que os cards entram em cascata.

### Gradiente em texto (`background-clip: text`)
Truque: coloca um gradiente como fundo, recorta o fundo pelo formato das letras e deixa o texto transparente. **Aqui:** `.bronze-gradient-text` no título do hero.

### `IntersectionObserver`
API do navegador que avisa quando um elemento **entra ou sai da área visível**. É muito mais eficiente que verificar posições a cada evento de scroll.
**Aqui:** duas vezes — para destacar o link do menu da seção visível e para disparar a animação dos cards.

### `rootMargin` e `threshold` (do `IntersectionObserver`)
`rootMargin: '-20% 0px -60% 0px'` encolhe a "área visível" considerada: 20% de cima e 60% de baixo são ignorados, sobrando uma faixa no meio-alto da tela. `threshold: 0.15` = dispara quando 15% do elemento está visível.

### `DOMContentLoaded`
Evento disparado quando o HTML terminou de ser lido (antes de imagens carregarem). Código dentro dele tem certeza de que os elementos existem.

### `defer` (no `<script src>`)
Diz ao navegador: baixe o script em paralelo, mas só execute depois que o HTML terminar de ser lido. Equivale a colocar o script no fim do `<body>`, mas pode ficar no `<head>`.
**Aqui:** não usado. Os `<script src>` de `js/` ficam no fim do `<body>`, que tem o mesmo efeito.

### `{ passive: true }` (em `addEventListener`)
Promessa ao navegador de que o handler **não** vai chamar `preventDefault()`. Com isso o navegador não precisa esperar o handler terminar para rolar a página — scroll mais fluido.

### `classList.toggle` / `.add` / `.remove`
Métodos para mexer nas classes de um elemento. `toggle('hidden')` adiciona se não tem, remove se tem — e devolve `true` se adicionou.

### `querySelector` / `querySelectorAll`
Buscam elementos usando seletor CSS. `document.querySelectorAll('section[id]')` = todas as `<section>` que têm atributo `id`.

### `preconnect`
`<link rel="preconnect">` manda o navegador abrir a conexão com um servidor **antes** de precisar dele. Economiza tempo quando a fonte for pedida.

### Favicon
O ícone da aba do navegador. `<link rel="icon" href="...">`.

### `rel="noopener"` (em links com `target="_blank"`)
Segurança: impede que a página aberta em nova aba controle a página original via `window.opener`.

### Separação de responsabilidades (HTML / CSS / JS)
Princípio de manter estrutura (HTML), aparência (CSS) e comportamento (JS) em lugares distintos, para cada um poder ser lido e alterado sozinho. É o objetivo da refatoração deste projeto. Tailwind "quebra" isso de propósito ao pôr estilo no HTML — é uma troca consciente, não um erro.

### Refatoração
Mudar a **organização** do código sem mudar o que ele **faz**. Se a página ficou diferente, não foi refatoração.
