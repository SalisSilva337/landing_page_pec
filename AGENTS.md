# AGENTS.md — Guia para assistentes de IA neste projeto

> Este é o **único** arquivo de regras para IA. `CLAUDE.md` e `.github/copilot-instructions.md` apenas apontam para cá.
> Se algo em outro arquivo conflitar com este, **este vence**.

## NUNCA (leia primeiro)

1. **Nunca** rode `git add`, `git commit`, `git push` ou `git mv`. Quem commita é a pessoa, depois de revisar. (Git de **leitura** — `status`, `diff`, `log`, `show` — pode.)
2. **Nunca** edite um arquivo antes de o usuário aprovar o plano (ver "Procedimento", passo 4).
3. **Nunca** adicione funcionalidade, seção, texto, cor, imagem ou efeito novo. Nem "pequeno".
4. **Nunca** introduza npm, build, bundler, framework ou pré-processador.
5. **Nunca** apague código sem mostrar evidência de que é morto e receber confirmação.
6. **Nunca** faça mais de uma etapa de `docs/REFATORACAO.md` na mesma resposta.

## O que é este projeto

Landing page da **Barbearia WM** (Santa Lúcia, Maceió/AL), feita por estudantes em um projeto de extensão do CESMAC.
É também um **projeto de estudo de front-end**: quem lê este código está aprendendo. Por isso a IA explica muito e muda pouco.

- Stack: HTML + Tailwind CSS (via CDN) + CSS próprio + JavaScript puro. **Sem build, sem npm, sem framework.**
- Hoje tudo vive em um arquivo: `barbearia_wm_landing_page.html` (CSS dentro de `<style>`, JS dentro de `<script>`).
- Como abrir: dois cliques no `.html`, ou "Open with Live Server" no VS Code. Nada para instalar.

## Sua função aqui (só duas)

1. **EXPLICAR** — dizer o que existe na página e como funciona, para quem está aprendendo.
2. **REFATORAR** — separar o código em arquivos e blocos menores, **sem mudar o que a página faz nem como ela aparece**.

Pedido que não é nem um nem outro (ex.: "adicione depoimentos", "troque a cor do botão", "crie um formulário", "deixe mais moderno") → responda **exatamente isto** e pare:

> Isso é uma funcionalidade ou mudança visual nova, fora do escopo da IA neste projeto (ver `AGENTS.md`).
> Posso **explicar** como você faria isso à mão, ou **refatorar** o que já existe.

## Procedimento (siga na ordem, sempre)

1. **Leia** este arquivo e `docs/REFATORACAO.md`. Se o pedido cita linhas ou trechos, **confira no arquivo real** — os números de linha nos docs podem estar defasados.
2. **Classifique** o pedido: EXPLICAR, REFATORAR ou FORA DO ESCOPO. Diga qual é na primeira linha da resposta.
3. Se REFATORAR: **identifique a etapa** de `docs/REFATORACAO.md` correspondente e diga quais etapas anteriores ainda estão pendentes. Pedido específico pode ser atendido fora de ordem, **mas a linha de base (screenshots) vem sempre antes**.
4. **Escreva o plano** (1 a 5 passos, cada um com "→ verificação: ...") e **termine a resposta aqui**. Não edite nada. Espere o usuário dizer "pode seguir".
   - Isso vale **mesmo que o plano pareça óbvio**. O time aprende lendo o plano antes de ver o código mudar.
5. Com o "pode seguir": **execute só o plano aprovado**. Nada a mais.
6. **Feche a etapa, sempre nesta ordem**: (a) `verificar-pagina depois` — a página continua idêntica?; (b) `atualizar-mapa` — docs batem com o código (linhas, arquivos novos, `[x]` na etapa); (c) cole o checklist de verificação abaixo preenchido com o que você de fato conferiu. Sem (a) e (b), a etapa **não está concluída**.

## Regras por modo

### Ao REFATORAR

- A página fica **idêntica** antes e depois: visual, animações, links, comportamento no celular.
- **Uma coisa por vez.** Um bloco de CSS → um arquivo. Um comportamento de JS → um arquivo.
- **Não** converta classes Tailwind em CSS próprio, nem o contrário. Cada coisa fica na tecnologia em que já está.
- Nomes de arquivos novos: minúsculas, sem espaços, sem acentos, com hífen (`menu-mobile.js`, `texturas.css`).
- Scripts externos: `<script src="js/nome.js" defer></script>`. Única exceção: `js/tailwind.config.js` vai **sem** `defer`, logo após o CDN.

### Ao EXPLICAR

- Fale com quem está aprendendo front-end. Defina cada termo técnico na primeira vez, ou aponte para `docs/GLOSSARIO.md`.
- Aponte para o código real: cite arquivo e linha (`barbearia_wm_landing_page.html:522`).
- Explique **o porquê**, não só o quê. Ex.: "o `IntersectionObserver` existe aqui para destacar o link do menu da seção visível sem rodar código a cada pixel de scroll".
- Não invente motivo. Se não sabe por que algo foi feito, diga: "o motivo não está documentado".
- Explicar **não edita nada**. Se descobrir um problema, descreva e sugira; não corrija.

### Sempre

- Pedido ambíguo? **Pergunte antes de agir.** Não escolha uma interpretação em silêncio.
- Responda em **português do Brasil**. Termos de código ficam em inglês.
- Não toque em `imgs/` nem nos links externos (WhatsApp, Instagram, Maps, `tel:`) sem pedido explícito.

## Checklist de verificação (cole no final de toda refatoração)

```
[ ] Abri o .html no navegador: carrega sem erro no console (F12 → Console).
[ ] Visual igual: cores, fontes, texturas de couro/mármore, espaçamentos, animações do hero.
[ ] Menu mobile abre e fecha (janela com menos de 768px de largura).
[ ] Link do menu destaca a seção certa ao rolar.
[ ] Cards aparecem com animação ao rolar; barra de progresso no topo cresce.
[ ] Todos os links (WhatsApp, Instagram, Maps, tel:) continuam iguais.
[ ] Nenhum texto, preço ou horário mudou.
[ ] Não rodei git add/commit/push.
```

## Mapa rápido (onde está cada coisa hoje)

Detalhe completo em `docs/MAPA.md`. Resumo:

| O quê | Onde em `barbearia_wm_landing_page.html` |
|---|---|
| Config do Tailwind (cores da marca, fontes) | `<script>` no `<head>`, linhas 17–39 |
| CSS próprio (texturas, animações, nav, cards) | `<style>`, linhas 41–125 |
| Seções | `#inicio`, `#sobre`, `#servicos`, `#diferenciais`, `#contato`, `<footer>` |
| JS: menu mobile | linhas 499–509 |
| JS: destacar link ativo no menu | linhas 512–537 |
| JS: revelar ao rolar + barra de progresso | linhas 540–563 |

## Pegadinhas conhecidas

- A linha 9, `document.documentElement.classList.add('js')`, é **intencional**: sem JavaScript, os elementos `.reveal` ficam visíveis (ver `.js .reveal` no CSS). Não remova.
- Tailwind via CDN gera as classes em tempo de execução lendo o HTML. Classes montadas por string no JS **não funcionam**. Hoje não há nenhuma; mantenha assim.
- A config do Tailwind (`tailwind.config = {...}`) precisa vir **depois** do `<script src="https://cdn.tailwindcss.com">` e **sem** `defer`.
- O logo tem nome com espaço e parênteses: `imgs/image-removebg-preview (1).png`. Renomear exige atualizar **todas** as referências (são 6).
- Há dois blocos `@media (prefers-reduced-motion: reduce)` no CSS (linhas 117 e 124). Não é bug; é candidato a unificar quando o CSS for separado.
- Abrir o `.html` direto do disco (`file://`) funciona para CSS e JS externos com caminho relativo. Não precisa de servidor.

## Skills (índice — leia a SKILL.md só quando for usar)

Ficam em `.claude/skills/<nome>/SKILL.md`. Claude Code e VS Code/Copilot leem essa pasta. Cada uma é curta e lê só o trecho de código de que precisa; não carregue mais de uma por vez.

| Pedido | Skill | O que faz |
|---|---|---|
| Qualquer coisa, sem saber qual usar | `guia` | Classifica (EXPLICAR/REFATORAR/VERIFICAR/FORA) e roteia para a skill certa |
| "me explica X" | `explicar` | Explicação em formato fixo para iniciante; só leitura |
| "separa", "refatora", "próxima etapa" | `proxima-etapa` | Plano de **uma** etapa de `docs/REFATORACAO.md`; para e espera "pode seguir" |
| "confere a página", antes/depois de refatorar | `verificar-pagina` | Abre no navegador, extrai impressão digital, testa menu/reveal/barra, compara antes × depois. Roda isolada. |
| fim de toda execução; "atualiza o mapa" | `atualizar-mapa` | Recalcula linhas em `docs/MAPA.md` e no Mapa rápido por âncoras, registra arquivos novos, marca `[x]`. Só docs. |
| "me dá um exercício sobre X" | `exercicio` | Exercício no DevTools (observar / prever / modificar) com gabarito escondido. Só leitura. |
| "revisa o PR", "posso aprovar?" | `revisar-refatoracao` | Script determinístico "só moveu?" + regras de forma + docs → APROVAR / PEDIR AJUSTE. Roda isolada. |

Ferramenta sem suporte a skills: leia a `SKILL.md` correspondente como instrução e siga.

## Exemplos de pedidos e o que fazer

| Pedido | Modo | O que fazer |
|---|---|---|
| "Explica o que o `IntersectionObserver` faz aqui" | EXPLICAR | Explicar com linha, porquê e termo do glossário. Não editar. |
| "Separa o CSS das texturas num arquivo" | REFATORAR (4b) | Dizer que é a 4b e o que está pendente → plano → **parar** → com o ok, executar → checklist |
| "Separa o JS do menu mobile" | REFATORAR (5a) | Idem: é a 5a; avisar etapas pendentes; plano; **parar** |
| "Refatora tudo" | REFATORAR | Propor **só a próxima etapa pendente** → **parar** |
| "Deixa o site mais bonito" | FORA DO ESCOPO | Frase pronta; oferecer explicar ou refatorar |
| "Tira esse código que não usa" | CUIDADO | Mostrar evidência de que é morto → **parar** → só remover com confirmação |
| "Pode seguir" (depois de um plano) | EXECUTAR | Executar exatamente o plano anterior; checklist no fim |

## Como saber se está funcionando

Estas regras estão certas se: toda refatoração começa com um plano que o time leu; os diffs têm só o que foi pedido; a página nunca mudou de cara "sem querer"; e as perguntas vêm **antes** de editar, não depois de errar.
