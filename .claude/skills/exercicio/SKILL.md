---
name: exercicio
description: Gera um exercício curto de front-end a partir de um trecho real da landing page da Barbearia WM, para o estudante fazer no DevTools (F12) sem editar arquivo — em três níveis (observar, prever, modificar), com gabarito escondido e ligação ao glossário. Só leitura no código. Use em "me dá um exercício sobre X", "quero praticar o IntersectionObserver", "cria um desafio da seção de serviços".
---

# /exercicio — praticar com o código real

Alvo e nível: `$ARGUMENTS` (ex.: "menu mobile, prever"; "texturas"; vazio = escolha um trecho do `docs/MAPA.md` que ainda não tem exercício em `docs/exercicios/`).

Esta skill **não edita código**. O estudante também não: tudo acontece no DevTools e é desfeito com F5.

## Como localizar sem encher o contexto

Igual à skill `explicar`: `Grep` em `docs/MAPA.md` → linhas → `Read` do HTML/CSS/JS **só com `offset`/`limit`** (±5). Termos: `Grep` por `### <termo>` em `docs/GLOSSARIO.md`.

## Níveis (escolha um; se não informado, use **observar** para iniciante)

| Nível | O que o estudante faz | Exemplo |
|---|---|---|
| **observar** | Abre o DevTools, inspeciona, descreve o que vê | "Inspecione o card 'Corte e barba'. Quais classes ele tem a mais que os outros 3? O que cada uma faz?" |
| **prever** | Lê o código, escreve o que vai acontecer **antes** de testar, depois testa | "Se o `rootMargin` fosse `'0px'`, quando o link 'Serviços' ficaria dourado? Escreva sua previsão, depois mude no Console e role." |
| **modificar** | Altera no Console/Elements e observa, depois explica | "No Console: `document.querySelector('.float-y').style.animationDuration = '1s'`. O que mudou? Por que a `glow` também acelerou?" |

## Formato (siga exatamente)

```
## Exercício — <alvo> — nível <observar|prever|modificar>

**Contexto.** 2–3 frases: o que esse trecho faz na página. Aponte `arquivo:linha–linha`.

**Antes de começar.** Abra `barbearia_wm_landing_page.html` no navegador, F12, aba <Elements|Console|...>.

**Tarefa.**
1. <passo concreto>
2. <passo concreto>
3. <pergunta que exige entender, não só olhar>

**Dica.** 1 frase. Aponte um termo: `ver docs/GLOSSARIO.md › <Termo>`.

<details><summary>Gabarito</summary>

<resposta completa, com o porquê; se for "prever", diga o que acontece e por quê>

</details>

**O que você levou daqui.** 1–2 frases: o conceito, nomeado.

**Para desfazer.** F5. (Ou: "nada foi alterado em arquivo".)
```

## Regras

- Um exercício por chamada. Pedido genérico → escolha **um** trecho e diga por que ele.
- Toda mudança proposta é no DevTools; nunca "edite o arquivo". Se o estudante quiser mudar o arquivo de verdade, é decisão do time, fora da IA.
- Gabarito **sempre** dentro de `<details>`.
- Não invente comportamento: se não tem certeza do resultado, teste com `/verificar-pagina`-style no navegador ou diga "confira você".
- Se o usuário pedir "salva": `Write` em `docs/exercicios/<slug-do-alvo>-<nivel>.md` com o mesmo conteúdo. Só nesse caso escreve arquivo.
