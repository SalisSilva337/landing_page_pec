# Plano de refatoração

Objetivo: sair de **um arquivo de 566 linhas** para uma estrutura em que cada arquivo tem uma responsabilidade clara — e que qualquer pessoa do time consiga ler sozinha.

Regra de ouro: **a página fica idêntica**. Refatoração que muda visual ou comportamento não é refatoração.

> Para a IA: **uma etapa por resposta**. Diga qual etapa é, quais anteriores estão pendentes, escreva o plano e **pare** até o usuário aprovar (ver Procedimento em `AGENTS.md`). Pedido específico ("separa o JS do menu") pode ser atendido fora de ordem — mas a **linha de base** vem sempre antes. "Refatora tudo" = propor só a próxima etapa pendente. Ao terminar, cole o checklist e marque a etapa aqui como `[x]`.

## Estrutura de destino

```
index.html
css/
  base.css          reset, scrollbar, foco por teclado, prefers-reduced-motion
  texturas.css      .leather-texture, .marble-texture, .stitch, .stitch-dark
  componentes.css   .nav-link, .mobile-nav-link, .card-lift, .divider, .bronze-gradient-*
  animacoes.css     @keyframes + .hero-in, .hero-pop, .spin-slow, .float-y, .snip, .crown-bob, .reveal
js/
  tailwind.config.js   cores da marca e fontes (carregado logo após o CDN, sem defer)
  menu-mobile.js       abre/fecha o menu no celular
  nav-ativa.js         destaca o link do menu da seção visível
  revelar-scroll.js    animação de entrada dos blocos ao rolar
  barra-progresso.js   barra de 3px no topo
imgs/
  logo.png
docs/                  (já existe)
```

Por que esses nomes de grupo de CSS e não outros? Porque correspondem às **perguntas** que alguém faz ao abrir o código: "cadê a textura de couro?" → `texturas.css`; "cadê a animação do hero?" → `animacoes.css`.

## Etapas

Cada etapa tem: o que fazer, por que, e como verificar. Cada uma cabe em um commit.

### Linha de base — antes de QUALQUER etapa, sempre
- Abrir a página no navegador e tirar screenshots: topo, meio (serviços), fim (contato), e mobile (< 768px) com menu aberto.
- Rodar o checklist de `AGENTS.md` e confirmar que tudo passa **antes** de mexer.

**Por quê:** sem saber como era, não dá para provar que continuou igual.
**Verificação:** screenshots salvos fora do repositório (não comitar). Isso é leitura; pode ser feito antes de o plano ser aprovado.

### Etapa 1 — Renomear o HTML para `index.html`
- [ ] Renomear o arquivo `barbearia_wm_landing_page.html` → `index.html` (renomeação simples no disco; **não** use `git mv` — o git detecta a renomeação quando a pessoa fizer o `git add`).
- [ ] Atualizar `README.md`, `AGENTS.md`, `docs/MAPA.md` onde citam o nome antigo.

**Por quê:** `index.html` é o nome que servidores e o GitHub Pages abrem por padrão.
**Verificação:** `index.html` abre no navegador igual ao antes. Nenhuma referência ao nome antigo sobra (`grep -r barbearia_wm_landing_page .`).

### Etapa 2 — Renomear o logo para `imgs/logo.png`
- [ ] Renomear `imgs/image-removebg-preview (1).png` → `imgs/logo.png` (no disco, sem `git mv`).
- [ ] Trocar as **6** referências no HTML (favicon, header, hero, sobre, contato, rodapé).
- [ ] Decidir com o time o que fazer com `imgs/image-removebg-preview.png` (parece não ser usado — confirmar antes de apagar).

**Por quê:** nome com espaço e parênteses quebra em URLs e em alguns servidores, e não diz o que é.
**Verificação:** logo aparece nos 6 lugares; favicon na aba. `grep -c "logo.png" index.html` → 6.

### Etapa 3 — Extrair a config do Tailwind
- [ ] Criar `js/tailwind.config.js` com o conteúdo do `<script>` das linhas 17–39 (apenas o `tailwind.config = {...}`).
- [ ] No HTML, substituir o bloco por `<script src="js/tailwind.config.js"></script>` **logo após** o `<script src="https://cdn.tailwindcss.com">`. **Sem `defer`.**

**Por quê:** as cores da marca viram um arquivo que o time pode abrir e ler isolado.
**Verificação:** cores (`bg-leather`, `text-bronze`...) e fontes continuam aplicadas. Se a página ficar sem cor da marca, a ordem ou o `defer` estão errados.

### Etapa 4 — Extrair o CSS em 4 arquivos
Uma sub-etapa por arquivo, um commit cada:

- [ ] 4a. `css/base.css` ← scrollbar (42–44), `:focus-visible` (123), os dois blocos `prefers-reduced-motion` (117–121, 124) **unificados em um só**.
- [ ] 4b. `css/texturas.css` ← `.leather-texture`, `.marble-texture`, `.stitch`, `.stitch-dark` (46–66).
- [ ] 4c. `css/componentes.css` ← gradientes bronze (68–75), nav (77–88), `.card-lift` (110–111), `.divider` (113–115).
- [ ] 4d. `css/animacoes.css` ← `@keyframes` e classes de animação (91–108).
- [ ] Ao fim, o `<style>` do HTML fica vazio → remover a tag e deixar 4 `<link rel="stylesheet" href="css/...">` no lugar, **na mesma ordem** (base, texturas, componentes, animacoes).

**Por quê:** cada pergunta ("cadê a textura?") tem um arquivo. Unificar o `reduced-motion` é a única mudança de código permitida aqui, porque o resultado é o mesmo.
**Verificação:** cada sub-etapa: página idêntica + console sem 404 de CSS. Atenção especial em 4d: os `.reveal` precisam continuar aparecendo ao rolar.

### Etapa 5 — Extrair o JS em 4 arquivos
Uma sub-etapa por arquivo, um commit cada:

- [ ] 5a. `js/menu-mobile.js` ← linhas 499–509.
- [ ] 5b. `js/nav-ativa.js` ← linhas 512–537.
- [ ] 5c. `js/revelar-scroll.js` ← linhas 541–556 (seleção de alvos + observer de reveal).
- [ ] 5d. `js/barra-progresso.js` ← linhas 558–562 (o handler do `#scrollBar`). Hoje está no mesmo `DOMContentLoaded` do reveal; separar é seguro porque um não usa nada do outro.
- [ ] Cada arquivo começa com comentário de 2–4 linhas (o que faz, que elementos usa, por quê).
- [ ] No HTML, cada trecho extraído vira `<script src="js/nome.js" defer></script>` no `<head>`, logo após os `<link>` de CSS. Padrão decidido: **`defer` no `<head>`**. Durante 5a–5d é normal o `<script>` inline restante conviver com os externos no fim do `<body>`; ao fim da 5d, a tag inline some.

**Por quê:** cada comportamento vira legível e testável sozinho. `defer` no `<head>` deixa todas as dependências visíveis num lugar só.
**Verificação:** 5a: menu abre/fecha. 5b: link ativo muda ao rolar, inclusive no topo e no fim. 5c: cards animam uma vez só. 5d: barra cresce. Console sem erro.

### Etapa 6 — Comentários de seção no HTML
- [ ] Padronizar os comentários que já existem para um formato único, ex.: `<!-- ===== Seção: Serviços (#servicos) ===== -->`.
- [ ] Adicionar onde falta (barra de progresso, WhatsApp flutuante).

**Por quê:** navegar 400 linhas de HTML fica mais fácil com marcos visuais.
**Verificação:** só comentários mudaram (`git diff` mostra apenas linhas `<!-- -->`).

### Etapa 7 — Atualizar a documentação
- [ ] `docs/MAPA.md`: trocar as linhas por arquivo + linha novos.
- [ ] `docs/MAPA.md`: adicionar um diagrama Mermaid "quem toca em quem" — cada arquivo `js/*.js` ligado aos `id`s/classes do HTML que usa, e cada `css/*.css` às classes que define. O GitHub renderiza Mermaid sem ferramenta nenhuma; é o grafo de dependências que importa para este projeto.
- [ ] `AGENTS.md`: atualizar "Mapa rápido" e "Pegadinhas".
- [ ] `README.md`: atualizar a árvore de arquivos.

**Verificação:** nenhuma referência a `barbearia_wm_landing_page.html` ou a linhas antigas sobra.

## O que NÃO vai ser refatorado (e por quê)

- **Os 4 cards de serviço repetidos.** Sem build ou framework, não há como criar um "componente" reutilizável em HTML puro sem JavaScript gerando HTML — e isso mudaria a arquitetura, não só a organização. A repetição fica e vira **tema de estudo** (ver `docs/MAPA.md › Padrões que se repetem`).
- **A URL do WhatsApp repetida 7 vezes.** Mesmo motivo. Se um dia o número mudar, usar "localizar e substituir".
- **Classes Tailwind → CSS próprio.** Seria trocar de tecnologia, não separar.
- **Tailwind Play CDN → CSS compilado.** Exigiria build. Decisão do projeto: ficar sem build.

Se o time mudar de ideia sobre algum destes, é uma decisão nova, discutida fora da IA.
