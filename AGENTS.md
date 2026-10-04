# AGENTS.md — Guia para assistentes de IA

Orientações de comportamento para reduzir os erros mais comuns de IA ao codar. Adaptado de [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CLAUDE.md).

**Tradeoff:** estas orientações preferem cautela a velocidade. Para tarefas triviais, use o bom senso.

## 1. Pense antes de codar

**Não assuma. Não esconda confusão. Exponha os tradeoffs.**

Antes de implementar:
- Diga suas premissas explicitamente. Se estiver em dúvida, pergunte.
- Se existem várias interpretações, apresente-as. Não escolha uma em silêncio.
- Se existe um caminho mais simples, diga. Discorde quando fizer sentido.
- Se algo não está claro, pare. Nomeie o que está confuso. Pergunte.

## 2. Simplicidade primeiro

**O mínimo de código que resolve o problema. Nada especulativo.**

- Nenhuma funcionalidade além do que foi pedido.
- Nenhuma abstração para código usado uma vez só.
- Nenhuma "flexibilidade" ou "configurabilidade" que ninguém pediu.
- Nenhum tratamento de erro para cenário impossível.
- Se escreveu 200 linhas e dava para fazer em 50, reescreva.

Pergunte-se: "um engenheiro sênior diria que isso está complicado demais?" Se sim, simplifique.

## 3. Mudanças cirúrgicas

**Toque só no que precisa. Limpe só a própria bagunça.**

Ao editar código existente:
- Não "melhore" código, comentários ou formatação ao redor.
- Não refatore o que não está quebrado.
- Siga o estilo existente, mesmo que você fizesse diferente.
- Se notar código morto sem relação com a tarefa, mencione. Não apague.

Quando sua mudança deixa órfãos:
- Remova imports, variáveis e funções que **a sua** mudança tornou inúteis.
- Não remova código morto pré-existente sem que peçam.

O teste: toda linha alterada deve apontar diretamente para o pedido do usuário.

## 4. Execução guiada por objetivo

**Defina o critério de sucesso. Itere até verificar.**

Transforme tarefas em objetivos verificáveis:
- "Adicionar validação" → "escrever testes para entradas inválidas e fazê-los passar"
- "Corrigir o bug" → "escrever um teste que reproduz o bug e fazê-lo passar"
- "Refatorar X" → "garantir que a página se comporta igual antes e depois"

Para tarefas com vários passos, escreva um plano curto:
```
1. [Passo] → verificar: [checagem]
2. [Passo] → verificar: [checagem]
3. [Passo] → verificar: [checagem]
```

Critérios fortes permitem iterar sozinho. Critérios fracos ("faz funcionar") exigem esclarecimento constante.

---

## Contexto deste projeto

- Landing page da **Barbearia WM** (Maceió/AL), feita por estudantes em um projeto de extensão do CESMAC. Também é um projeto de estudo de front-end, então explicações didáticas são bem-vindas.
- Stack atual: HTML + Tailwind CSS via CDN + CSS próprio + JavaScript puro. HTML em `index.html`, CSS em `css/`, JS em `js/` (scripts clássicos, sem `type="module"`, para abrir com dois cliques). Sem build, sem npm. Mudar isso é uma decisão do time, listada no to-do do `README.md`.
- Para abrir: dois cliques no `.html`, ou `.claude/launch.json` sobe um servidor local na porta 8765.
- Onde está cada coisa: `docs/MAPA.md`. Termos explicados: `docs/GLOSSARIO.md`. Números de linha nos docs podem estar defasados; confira no arquivo.
- To-do e dívidas técnicas: `README.md`. Ao concluir um item, marque lá.
- Idioma: português do Brasil nas respostas, commits e comentários. Código e termos técnicos em inglês.
- Commits: uma mudança por commit, mensagem em português no imperativo (`Extrai CSS de texturas para css/texturas.css`). Commite só quando o usuário pedir, depois que ele revisar o diff.

**Estas orientações estão funcionando se:** os diffs têm menos mudanças desnecessárias, há menos reescritas por complicação excessiva, e as perguntas vêm antes da implementação, não depois dos erros.
