# Landing page — Barbearia WM

Site de uma página da **Barbearia WM** (R. Dilermando Réis, 921 — Santa Lúcia, Maceió/AL), desenvolvido por estudantes em um projeto de extensão do CESMAC.

Além de servir à barbearia, o repositório é um **projeto de estudo de front-end**: o objetivo é que cada pessoa envolvida entenda cada linha, e que o código fique cada vez mais separado e legível.

## Como abrir

Não precisa instalar nada.

1. Clone o repositório.
2. Dê dois cliques em `barbearia_wm_landing_page.html` **ou** abra a pasta no VS Code e use "Open with Live Server".

## O que tem aqui

```
barbearia_wm_landing_page.html   a página inteira (HTML + CSS + JS, por enquanto)
imgs/                            logo da barbearia
docs/
  MAPA.md         o que existe na página, seção por seção, e onde está no código
  GLOSSARIO.md    termos de front-end que aparecem no projeto, explicados
  REFATORACAO.md  plano combinado para separar o código, etapa por etapa
AGENTS.md                        regras para assistentes de IA (fonte única)
CLAUDE.md                        ponteiro para AGENTS.md + ajustes do Claude Code
.github/copilot-instructions.md  ponteiro para AGENTS.md + lembrete para o Copilot
.github/instructions/            regras por tipo de arquivo (.html, .css, .js) para o VS Code
.claude/skills/                  skills da IA (Claude Code e VS Code leem):
  guia/                            porta única — classifica o pedido e roteia
  explicar/                        explica um trecho para iniciante
  proxima-etapa/                   plano de UMA etapa de refatoração, depois para
  verificar-pagina/                abre no navegador e compara antes × depois
  atualizar-mapa/                  sincroniza docs com o código (fim de toda etapa)
  exercicio/                       exercício no DevTools com gabarito
  revisar-refatoracao/             revisão de PR: "só moveu?" com script determinístico
.claude/launch.json              servidor local para a skill verificar-pagina abrir a página
```

## Tecnologias

- **HTML5** semântico.
- **Tailwind CSS** carregado via CDN (sem build). As cores da marca e as fontes estão configuradas em `tailwind.config` dentro do `<head>`.
- **CSS próprio** para o que o Tailwind não cobre: texturas de couro e mármore, animações, sublinhado do menu.
- **JavaScript puro** para: menu mobile, destaque do link ativo, animação de entrada ao rolar e barra de progresso.
- Fontes **Cinzel** e **Montserrat** (Google Fonts) e ícones **Font Awesome 6**.

## Como usar IA neste projeto

A IA (Claude Code, GitHub Copilot, Cursor, Codex ou outro) tem **duas funções** aqui, e só duas:

1. **Explicar** o que existe na página e por quê, para quem está aprendendo.
2. **Refatorar** para separar o código em arquivos menores, **sem mudar nada do que a página faz ou mostra**.

Funcionalidades novas e mudanças visuais são decisões do time, feitas à mão. As regras completas estão em [`AGENTS.md`](AGENTS.md); qualquer ferramenta que leia `AGENTS.md`, `CLAUDE.md` ou `.github/copilot-instructions.md` vai segui-las.

O fluxo esperado numa refatoração: você pede → a IA diz qual etapa de [`docs/REFATORACAO.md`](docs/REFATORACAO.md) é e mostra um **plano** → **você lê e responde "pode seguir"** → a IA executa, verifica a página antes × depois, sincroniza os docs e cola o checklist → **você** confere no navegador e faz o commit → quem revisa o PR roda `revisar-refatoracao`. A IA nunca commita.

Pedidos que funcionam bem (ou digite `/guia` seguido do pedido, que ele encaminha):

- "Me explica a seção de serviços." → skill `explicar`
- "Por que tem um `IntersectionObserver` no JS?" → `explicar`
- "Faz a próxima etapa do `docs/REFATORACAO.md`." → `proxima-etapa`
- "Separa o JavaScript do menu mobile num arquivo próprio." → `proxima-etapa`
- "Confere se a página está igual." → `verificar-pagina`
- "Me dá um exercício sobre o menu mobile." → `exercicio`
- "Revisa esse PR, só moveu código?" → `revisar-refatoracao`

## Como contribuir

1. Crie uma branch a partir de `main`: `git checkout -b tipo/descricao-curta` (`docs/`, `refactor/`, `fix/`).
2. Uma mudança por commit, mensagem em português no imperativo: `Extrai CSS de texturas para css/texturas.css`.
3. Antes de abrir o PR, passe pelo checklist de verificação de `AGENTS.md` com a página aberta no navegador.
4. Se a refatoração seguiu `docs/REFATORACAO.md`, marque a etapa como concluída lá.

## Créditos

Projeto de extensão — CESMAC. Conteúdo e marca pertencem à Barbearia WM.
