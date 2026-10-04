# Landing page — Barbearia WM

Site de uma página da **Barbearia WM** (R. Dilermando Réis, 921 — Santa Lúcia, Maceió/AL), desenvolvido por estudantes em um projeto de extensão do CESMAC.

Além de servir à barbearia, o repositório é um **projeto de estudo de front-end**: o objetivo é que cada pessoa envolvida entenda cada linha, e que o código fique cada vez mais organizado e pronto para produção.

## Como abrir

Não precisa instalar nada.

1. Clone o repositório.
2. Dê dois cliques em `index.html` **ou** abra a pasta no VS Code e use "Open with Live Server".

Precisa de internet: Tailwind, fontes e ícones vêm de CDN.

## O que tem aqui

```
index.html                       estrutura da página (HTML)
css/                             CSS próprio (base, texturas, componentes, animações)
js/                              configuração do Tailwind e os 4 scripts da página
imgs/                            logo da barbearia
docs/
  MAPA.md         o que existe na página, seção por seção, e onde está no código
  GLOSSARIO.md    termos de front-end que aparecem no projeto, explicados
AGENTS.md                        orientações para assistentes de IA (fonte única)
CLAUDE.md                        ponteiro para AGENTS.md (Claude Code)
.github/copilot-instructions.md  ponteiro para AGENTS.md (Copilot / VS Code)
.claude/launch.json              servidor local (porta 8765) para preview no Claude Code
```

## Tecnologias

- **HTML5** semântico.
- **Tailwind CSS** carregado via CDN (sem build). As cores da marca e as fontes estão em `js/tailwind.config.js`.
- **CSS próprio** para o que o Tailwind não cobre: texturas de couro e mármore, animações, sublinhado do menu.
- **JavaScript puro** para: menu mobile, destaque do link ativo, animação de entrada ao rolar e barra de progresso.
- Fontes **Cinzel** e **Montserrat** (Google Fonts) e ícones **Font Awesome 6**.

## To-do

### Modularizar

Estrutura de destino combinada:

```
index.html
css/
  base.css          reset, scrollbar, foco por teclado, prefers-reduced-motion
  texturas.css      .leather-texture, .marble-texture, .stitch, .stitch-dark
  componentes.css   .nav-link, .mobile-nav-link, .card-lift, .divider, .bronze-gradient-*
  animacoes.css     @keyframes + .hero-in, .hero-pop, .spin-slow, .float-y, .snip, .crown-bob, .reveal
js/
  tailwind.config.js   cores da marca e fontes (logo após o CDN, sem defer)
  menu-mobile.js       abre/fecha o menu no celular
  nav-ativa.js         destaca o link do menu da seção visível
  revelar-scroll.js    animação de entrada dos blocos ao rolar
  barra-progresso.js   barra de 3px no topo
imgs/
  logo.webp
```

- [x] Renomear `barbearia_wm_landing_page.html` → `index.html`
- [x] Renomear o logo para `imgs/logo.png` e atualizar as 6 referências
- [x] Extrair `tailwind.config` para `js/tailwind.config.js`
- [x] Extrair o CSS para `css/` (4 arquivos)
- [x] Extrair o JS para `js/` (4 arquivos)
- [ ] Padronizar os comentários de seção no HTML
- [x] Atualizar `docs/MAPA.md` com os arquivos e linhas novos

### Deixar pronto para produção

- [ ] Trocar o Tailwind Play CDN por CSS compilado (exige build; decisão do time)
- [ ] Adicionar meta tags Open Graph para o link ter preview no WhatsApp e redes
- [x] Comprimir e redimensionar o logo (1,5 MB → 111 KB, WebP 640×640)
- [ ] Publicar no GitHub Pages (depende de `index.html`)

### Funcionalidades novas (ideias, sem compromisso)

- [ ] Depoimentos de clientes
- [ ] Galeria de cortes
- [ ] Agendamento ou fila online

## Dívidas técnicas

O que não está pronto para produção, em ordem de impacto:

| Item | Por que importa |
|---|---|
| **Tailwind Play CDN** | Gera o CSS no navegador a cada carregamento. É versão de desenvolvimento: pesada, lenta no primeiro paint e avisa no console que não deve ir para produção. |
| **Sem meta Open Graph** | O botão principal do site manda para o WhatsApp, mas o link do site, quando compartilhado no WhatsApp, aparece sem imagem nem descrição. |
| **`imgs/image-removebg-preview.png`** | Não é referenciado em lugar nenhum. Candidato a remoção, confirmar com o time. |
| **URL do WhatsApp repetida 7 vezes** | Trocar o número exige localizar e substituir em 7 lugares. |
| **Copyright "2021–2026" fixo** | Precisa de edição manual todo ano. |
| **Dependência total de CDN** | Sem internet, a página abre sem estilo, fontes e ícones. |

## Como contribuir

1. Crie uma branch a partir de `main`: `git checkout -b tipo/descricao-curta` (`docs/`, `refactor/`, `fix/`, `feat/`).
2. Uma mudança por commit, mensagem em português no imperativo: `Extrai CSS de texturas para css/texturas.css`.
3. Antes de abrir o PR, abra a página no navegador e confira: console sem erro, menu mobile, destaque do menu ao rolar, animações, links.
4. Se concluiu um item do to-do, marque aqui.

## Créditos

Projeto de extensão — CESMAC. Conteúdo e marca pertencem à Barbearia WM.
