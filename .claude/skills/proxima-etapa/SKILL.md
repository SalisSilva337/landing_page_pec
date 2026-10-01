---
name: proxima-etapa
description: Prepara UMA etapa de refatoração da landing page (docs/REFATORACAO.md) — a próxima pendente, ou a que o pedido nomear — e entrega o plano com verificação por passo, depois PARA e espera "pode seguir". Nunca edita nem roda git. Use em "refatora", "separa o css/js", "próxima etapa", "renomeia para index.html".
---

# /proxima-etapa — plano de uma etapa, depois pare

Pedido: `$ARGUMENTS`

Modo **REFATORAR** de `AGENTS.md`. Esta skill **só lê e planeja**. Proibido aqui: `Edit`, `Write`, qualquer `git`. Quem executa é o modo EXECUTAR, depois do "pode seguir".

## Passos

1. **Ache a etapa.** `Grep` por `- \[ \]` em `docs/REFATORACAO.md`.
   - Pedido genérico ("refatora", "próxima") → a **primeira** pendente.
   - Pedido específico ("separa o JS do menu", "renomeia o logo") → a etapa que casa. Leia **só** essa seção do arquivo (`Read` com `offset`/`limit`).
   - Não casa com nenhuma → diga isso e ofereça a próxima pendente.
2. **Liste o que ficou para trás.** Etapas anteriores ainda `[ ]`, em uma linha cada. Isso é aviso, não bloqueio.
3. **Confira a linha de base.** `Glob` por `.claude/verificacao/antes.json`. Se não existir, o passo 1 do plano é obrigatoriamente: "rodar `/verificar-pagina antes`".
4. **Leia só o trecho afetado** do HTML (`Read` com `offset`/`limit`, margem ±5) para confirmar que as linhas citadas no doc ainda batem. Se não baterem, use as reais.
5. **Escreva o plano** no formato abaixo e **termine a resposta**. Não execute. Não pergunte "quer que eu faça?" — a última linha já diz como aprovar.

## Formato do plano

```
**REFATORAR — Etapa <N><letra> — <título da etapa>**

Pendentes antes desta: <lista ou "nenhuma">.

Plano:
1. <ação concreta: arquivo, linhas de origem, destino> → verificação: <como saber que deu certo>
2. ...
(máx. 5 passos; o último é sempre "colar o checklist de AGENTS.md preenchido e marcar [x] em docs/REFATORACAO.md")

Arquivos que vão mudar: <lista>.
O que NÃO muda: textos, cores, links, animações, classes Tailwind.

Responda **pode seguir** para eu executar exatamente isto.
```

## Regras

- **Uma etapa por plano.** "Refatora tudo" vira a próxima pendente, e só.
- Cada passo mexe em **um** arquivo. Criar arquivo novo + editar o HTML para apontar para ele = 2 passos.
- Scripts externos levam `defer`; `js/tailwind.config.js` não (ver `AGENTS.md › Pegadinhas`).
- Renomear arquivo é renomear no disco, **não** `git mv`.
- Se o pedido pedir algo que não é separação (mudar visual, adicionar, "melhorar") → responda com a frase de FORA DO ESCOPO de `AGENTS.md` e pare.
