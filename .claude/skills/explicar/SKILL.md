---
name: explicar
description: Explica uma seção, classe CSS, trecho de JavaScript ou termo da landing page da Barbearia WM para quem está aprendendo front-end, em formato fixo (o que é → onde está → por quê → termo do glossário → experimente). Só leitura; nunca edita. Use em "me explica X", "o que faz Y", "por que tem Z aqui".
---

# /explicar — o que existe e por quê

Alvo: `$ARGUMENTS`

Modo **EXPLICAR** de `AGENTS.md`. Esta skill **não edita nada**. Se achar um problema no código, descreva e sugira; não corrija.

## Como localizar sem encher o contexto

1. **Não leia o HTML inteiro.** Use `Grep` em `docs/MAPA.md` pelo nome da seção/classe/termo para achar as linhas; depois `Read` no HTML **só com `offset`/`limit`** cobrindo essas linhas (margem de ±5).
2. Se o MAPA não tiver o alvo, `Grep` direto no HTML pelo `id`, classe ou palavra-chave e leia só o trecho.
3. Para cada termo técnico que for usar, `Grep` por `### <termo>` em `docs/GLOSSARIO.md`. Se existir, **aponte** em vez de redefinir. Se não existir, defina em 1 frase e diga: "sugiro adicionar ao glossário".
4. Os números de linha nos docs podem estar defasados: **confira** no arquivo e cite a linha real.

## Formato da resposta (siga esta ordem)

```
## <Nome do alvo>

**O que é.** 1–2 frases em português simples.

**Onde está.** `barbearia_wm_landing_page.html:<linha>` – `<linha>`. Cole o trecho relevante (máx. 15 linhas).

**Como funciona.** Passo a passo do que acontece, na ordem em que o navegador executa. Para CSS: o que cada regra muda. Para JS: o que dispara, o que muda no DOM.

**Por quê.** O motivo de existir. Se não estiver documentado, escreva: "o motivo não está documentado; uma hipótese é...".

**Termos.** `ver docs/GLOSSARIO.md › <Termo>` para cada um usado. Novos: definição em 1 frase.

**Experimente.** 1 mudança segura para a pessoa testar no DevTools (F12) e ver o efeito — sem editar o arquivo. Ex.: "no Console, rode `document.querySelector('#mobileMenu').classList.toggle('hidden')`".

**Relacionado.** Até 3 outras partes da página que conversam com esta (por `id`/classe).
```

## Regras

- Público: iniciante. Zero jargão sem definição.
- Não invente motivo nem comportamento. Se precisar ver rodando, diga: "use `/verificar-pagina` ou abra no navegador".
- Não sugira refatoração aqui. Se o alvo for candidato a extração, diga só: "é a etapa N de `docs/REFATORACAO.md`".
- Português do Brasil; código em inglês.
