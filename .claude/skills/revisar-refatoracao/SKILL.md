---
name: revisar-refatoracao
description: Revisa uma refatoração da landing page (árvore de trabalho, branch ou commit) e responde "só MOVEU código, ou mudou alguma coisa?" — roda um script determinístico que compara linhas removidas × adicionadas, confere nomes de arquivo, defer, verificação antes/depois e docs sincronizados, e entrega veredito APROVAR / PEDIR AJUSTE com evidência. Só leitura. Roda isolado (context fork). Use em "revisa essa refatoração", "revisa o PR", "posso aprovar?", "o diff só moveu?".
context: fork
allowed-tools: Bash, Read, Grep, Glob
---

# /revisar-refatoracao — só moveu?

Alvo: `$ARGUMENTS` (vazio = árvore de trabalho + stage contra `HEAD`; ou `main..docs/x`; ou um SHA).

Você roda isolado: só o veredito volta. **Nunca edite nada.** Git só de leitura (`diff`, `log`, `status`, `show`).

## Passos

1. **Escopo.** `git diff --stat <alvo>` (e `git status --short` se alvo = HEAD). Se o diff de código passar de 400 linhas, revise **por arquivo** e diga que o PR está grande demais para uma etapa.
2. **Movimento puro — script.** Rode:
   ```
   py -3 .claude/skills/revisar-refatoracao/scripts/comparar-movimento.py <alvo>
   ```
   Ele normaliza espaços, ignora linhas de "fiação" (`<link rel="stylesheet">`, `<script src>`, abertura/fechamento de `<style>`/`<script>`, comentários) e docs `.md`, e lista:
   - **removidas sem destino** = conteúdo apagado;
   - **adicionadas sem origem** = conteúdo novo.
   Lista vazia nos dois = só moveu. Qualquer item = leia o trecho (`Read` com `offset`/`limit`) e julgue: comentário de cabeçalho em arquivo novo é aceitável (a skill `js.instructions` exige); texto/cor/preço/seletor diferente **não** é.
3. **Regras de forma** (`Grep`, não `Read`):
   - arquivos novos: minúsculas, sem espaço/acento, hífen → `git diff --name-only --diff-filter=A`.
   - `<script src="js/...">` tem `defer`, exceto `tailwind.config.js` → `Grep -n 'script src="js/' ` no HTML.
   - `<link rel="stylesheet" href="css/...">` na ordem base, texturas, componentes, animacoes.
   - nenhum `npm`, `package.json`, `node_modules`, `.scss`, bundler → `Glob`.
   - `git log <alvo> --format=%an` não contém "Claude" como autor (a IA não commita; co-autoria é ok).
4. **Verificação feita?** `Glob .claude/verificacao/depois.json`. Se existe, `Read` e procure o veredito; se não existe, anote "sem verificação antes/depois registrada".
5. **Docs sincronizados?** `git diff --name-only <alvo>` inclui `docs/MAPA.md` quando o HTML mudou de linhas? A etapa está `[x]` em `docs/REFATORACAO.md`? Nomes antigos (`Grep` pelo nome anterior de arquivo renomeado) sobraram em algum `.md`?
6. **Uma etapa só?** Compare os arquivos mudados com a etapa marcada. Mais de uma etapa no mesmo diff → PEDIR AJUSTE (dividir).

## Veredito (cole exatamente)

```
## Revisão — <alvo> — <N> arquivos, +<a>/−<r>

| Critério | Resultado | Evidência |
|---|---|---|
| Só moveu código | ✅/❌ | <saída do script, resumida> |
| Nomes de arquivo | ✅/❌ | |
| defer / ordem dos <link> | ✅/❌/n.a. | |
| Sem build/npm/framework | ✅/❌ | |
| Verificação antes/depois | ✅/⚠ ausente | |
| Docs sincronizados | ✅/❌ | |
| Uma etapa por PR | ✅/❌ | etapa <N> |
| IA não commitou | ✅/❌ | |

**Veredito: APROVAR | PEDIR AJUSTE**
<se PEDIR AJUSTE: lista numerada, cada item com arquivo:linha e o que fazer>
```

## Regras

- ❌ em "Só moveu código" ou "Sem build" = PEDIR AJUSTE, sem exceção.
- ⚠ em verificação = APROVAR **com ressalva** pedindo para rodar `/verificar-pagina depois` antes do merge.
- Não opine sobre estilo, nomes de variáveis ou "melhorias". Fora do escopo desta revisão e do projeto.
