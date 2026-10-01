---
name: verificar-pagina
description: Abre a landing page no navegador embutido, extrai uma "impressão digital" (textos, preços, links, cores das seções, fontes, contagem de animações), testa menu mobile, link ativo, reveal e barra de progresso, e salva em .claude/verificacao/<rotulo>.json. Com rótulo "depois", compara com "antes" e lista diferenças. Roda isolado (context fork) para não encher o contexto com screenshots. Use em "confere a página", "linha de base", "ficou igual?", e sempre antes e depois de uma etapa de refatoração.
context: fork
allowed-tools: Read, Write, Glob, Bash, mcp__Claude_Browser__preview_start, mcp__Claude_Browser__navigate, mcp__Claude_Browser__javascript_tool, mcp__Claude_Browser__read_console_messages, mcp__Claude_Browser__resize_window, mcp__Claude_Browser__computer, mcp__Claude_Browser__find
---

# /verificar-pagina — a página está idêntica?

Rótulo: `$ARGUMENTS` (use `antes` se vazio; os válidos são `antes` e `depois`).

Você roda **isolado**. Só o seu relatório final volta para a conversa principal — então ele precisa ser completo e curto. Screenshots ficam aqui, não vão no relatório.

## Passos

1. **Suba o servidor**: `preview_start` com `name: landing` (definido em `.claude/launch.json`). Navegue para a página. Hoje o arquivo é `barbearia_wm_landing_page.html`; se existir `index.html`, use ele. Confirme qual com `Glob`.
2. **Desktop**: `resize_window` com `width: 1280, height: 800`. Espere 2s (fontes e Tailwind CDN).
3. **Console**: `read_console_messages` com `onlyErrors: true`. Anote cada erro (o aviso do Tailwind CDN "should not be used in production" é esperado; ignore).
4. **Impressão digital**: leia `references/fingerprint.js` desta skill e execute o conteúdo com `javascript_tool`. Guarde o JSON retornado.
5. **Testes funcionais**: leia `references/testes-funcionais.js` (tem 3 blocos e explica por quê) e execute:
   - **Bloco 1, menu mobile**: `resize_window` `preset: mobile`, espere 1s, execute o bloco. Clica no botão, confere `hidden`/`aria-expanded`, clica num link e confere que fechou.
   - **Bloco 2, barra + link ativo**: volte para `width: 1280, height: 800`, execute o bloco. Ele dispara `scroll` manualmente — funciona mesmo com o painel oculto.
   - **Bloco 3, reveal**: ainda em 1280×800, faça um `browser_batch` alternando `javascript_tool` (`window.scrollTo({top: y, behavior: 'instant'})`) e `computer` screenshot com `scale: 0.1`, para y = 0, 400, 800, … até passar de `scrollHeight` (último: 99999). O screenshot força um frame; sem ele o `IntersectionObserver` não dispara com o painel oculto. Depois execute o passo B do bloco 3 e espere `revealVisiveis === revealTotal`.
   - Ao final, `resize_window` `preset: desktop`.
6. **Salve**: `Write` em `.claude/verificacao/<rotulo>.json` com `{ fingerprint, funcionais, errosConsole, data, arquivo }`.
7. **Compare** (só se rótulo = `depois`): `Read` `antes.json` e `depois.json`; liste **toda** chave que difere. Ignore diferenças só de ordem em arrays se o conjunto for igual.

## Relatório final (cole exatamente neste formato)

```
## Verificação — <rotulo> — <arquivo> — <data/hora>

Console: <"sem erros" | lista>
Funcionais: menu mobile <ok|FALHOU: ...> · link ativo <ok|...> · reveal <N/N ok|...> · barra <ok|...>
Fingerprint salvo em .claude/verificacao/<rotulo>.json
  seções: <N> · títulos: <N> · preços: <lista> · links: <N> · imagens: <N> · fontes: <título>/<corpo>

<se depois:>
Comparação com `antes`:
  <"IDÊNTICA" | lista de diferenças: chave → antes / depois>
Veredito: <"página idêntica" | "DIFERENTE — não marque a etapa como concluída">
```

## Regras

- Não edite nenhum arquivo do projeto. Só `.claude/verificacao/`.
- Não tente "corrigir" uma diferença: reporte. Quem decide é a conversa principal.
- Se o navegador não abrir ou o servidor falhar, relate o erro exato e pare — não invente resultado.
- Se um teste falhar, rode-o **uma segunda vez** antes de reportar FALHOU (o primeiro frame após redimensionar às vezes atrasa). Falhou duas vezes → reporte com os `detalhes` do JSON.
- `window.scrollTo` sempre com `behavior: 'instant'`: o `<html>` tem `scroll-smooth`, e a animação atrapalha a leitura dos valores.
