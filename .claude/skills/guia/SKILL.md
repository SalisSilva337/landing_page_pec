---
name: guia
description: Porta única da IA neste projeto. Recebe qualquer pedido em português ("me explica o menu", "separa o css", "confere a página", "refatora tudo"), classifica em EXPLICAR / REFATORAR / VERIFICAR / FORA DO ESCOPO e roteia para a skill certa. Use quando o pedido for sobre a landing page e não estiver claro qual skill chamar.
---

# /guia — orquestrador

Pedido do usuário: `$ARGUMENTS`

Você é o roteador. **Não leia** `docs/MAPA.md`, `docs/GLOSSARIO.md` nem o HTML aqui — a sub-skill lê só o trecho de que precisa. Seu trabalho cabe em 3 passos.

## 1. Classifique (uma palavra, na primeira linha da resposta)

| Classe | Sinais no pedido |
|---|---|
| **EXPLICAR** | "explica", "o que faz", "por que", "como funciona", "não entendi", "sou iniciante" |
| **REFATORAR** | "separa", "extrai", "move para um arquivo", "renomeia", "refatora", "próxima etapa" |
| **VERIFICAR** | "confere", "testa a página", "está igual?", "linha de base", "antes/depois" |
| **EXECUTAR** | "pode seguir", "ok, faz", "aprovado" — e existe um plano **nesta conversa** |
| **DOCS** | "atualiza o mapa", "sincroniza os docs", "o mapa está defasado" |
| **EXERCÍCIO** | "exercício", "desafio", "quero praticar", "me testa sobre" |
| **REVISAR** | "revisa", "posso aprovar", "o PR só moveu?", "confere o diff" |
| **FORA** | "adiciona", "cria uma seção", "troca a cor", "deixa mais bonito/moderno", "formulário" |

Dúvida entre duas classes → **pergunte** em uma frase e pare.

## 2. Roteie

- **EXPLICAR** → invoque a skill `explicar` passando o pedido.
- **REFATORAR** → invoque a skill `proxima-etapa` passando o pedido. Ela monta o plano e **para**.
- **VERIFICAR** → invoque a skill `verificar-pagina` com o rótulo `antes` ou `depois` (padrão: `antes`).
- **EXECUTAR** → execute **exatamente** o plano aprovado, nada a mais. Depois, **nesta ordem**: invoque `verificar-pagina depois`; se o veredito for "idêntica", invoque `atualizar-mapa <etapa>`; cole o checklist de `AGENTS.md`. Veredito "DIFERENTE" → pare, mostre as diferenças, não atualize o mapa nem marque a etapa. Nunca `git add/commit/push`.
- **DOCS** → invoque a skill `atualizar-mapa` passando o pedido.
- **EXERCÍCIO** → invoque a skill `exercicio` passando o pedido.
- **REVISAR** → invoque a skill `revisar-refatoracao` passando o alvo (branch, SHA ou vazio).
- **FORA** → responda só isto e pare:
  > Isso é uma funcionalidade ou mudança visual nova, fora do escopo da IA neste projeto (ver `AGENTS.md`). Posso **explicar** como você faria isso à mão, ou **refatorar** o que já existe.

## 3. Feche

Depois da sub-skill, **não repita** o que ela produziu. Se for REFATORAR, lembre em uma linha: "Responda *pode seguir* para eu executar."
