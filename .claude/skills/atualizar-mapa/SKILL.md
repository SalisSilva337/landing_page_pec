---
name: atualizar-mapa
description: Sincroniza a documentação com o código depois de uma refatoração ou de qualquer mudança no HTML/CSS/JS da landing page — recalcula números de linha em docs/MAPA.md e no "Mapa rápido" de AGENTS.md usando âncoras (Grep -n), registra arquivos novos na árvore do README e no MAPA, e marca a etapa em docs/REFATORACAO.md. Só edita docs; nunca código. Último passo obrigatório de toda execução de etapa. Use em "atualiza o mapa", "sincroniza os docs", ou automaticamente após EXECUTAR.
---

# /atualizar-mapa — os docs batem com o código?

Contexto: `$ARGUMENTS` (opcional: etapa concluída, ex. "5a", ou lista de arquivos mudados; vazio = descobrir pelo git).

Edita **somente**: `docs/MAPA.md`, `AGENTS.md` (só a seção "Mapa rápido" e "Pegadinhas"), `README.md` (só a árvore em "O que tem aqui"), `docs/REFATORACAO.md` (só marcar `[x]`). Nunca toca em `.html`, `.css`, `.js`, `imgs/`.

## Passos

1. **O que mudou.** `git status --short` e `git diff --name-only HEAD` (git de **leitura** é permitido). Separe: arquivos de código alterados, criados, renomeados.
2. **Âncoras, não leitura.** Leia `references/ancoras.md` desta skill: cada linha do MAPA tem um padrão de `Grep -n`. Para cada arquivo de código mudado, rode `Grep -n` com os padrões das linhas afetadas **no arquivo onde o trecho está agora**. Não use `Read` no HTML inteiro; se precisar confirmar um trecho, `Read` com `offset`/`limit` ≤ 20 linhas.
3. **Atualize as tabelas.** Em `docs/MAPA.md` e em `AGENTS.md › Mapa rápido`, troque `linhas X–Y` pelos números reais e, se o trecho saiu do HTML, pelo novo caminho (`css/texturas.css:1–21`). Use `Edit` cirúrgico, uma linha de tabela por vez.
4. **Arquivos novos.** Para cada `css/*.css` ou `js/*.js` criado:
   - `README.md`: adicione na árvore, com descrição de 1 linha, na ordem alfabética dentro da pasta.
   - `docs/MAPA.md`: se ainda não existe a seção `## Arquivos`, crie-a logo após o título com uma tabela `arquivo | o que agrupa | usado por`. Adicione a linha.
5. **Renomeações** (ex.: `index.html`, `imgs/logo.png`): `Grep` pelo nome antigo em `README.md`, `AGENTS.md`, `docs/*.md`, `.claude/skills/*/SKILL.md` e `.claude/skills/*/references/*`; troque todas as ocorrências. Confirme com novo `Grep` que sobrou zero.
6. **Pegadinhas.** Se a mudança resolveu uma pegadinha de `AGENTS.md` (ex.: logo renomeado, `reduced-motion` unificado), remova a linha dela. Se criou uma nova (ex.: "o `defer` em `tailwind.config.js` quebra as cores"), adicione em 1 linha.
7. **Etapa.** Se `$ARGUMENTS` nomeia uma etapa, ou se o diff corresponde claramente a uma, marque `[x]` em `docs/REFATORACAO.md`. Em dúvida, não marque e diga.
8. **Mermaid** (só quando existir pelo menos um `js/*.js` **e** um `css/*.css`): atualize ou crie o bloco `## Quem toca em quem` no fim do `docs/MAPA.md`, ver `references/ancoras.md › Mermaid`.

## Relatório final

```
## Mapa atualizado
Código mudado: <lista>
Docs editados: <arquivo: o que mudou, 1 linha cada>
Etapa marcada: <N | nenhuma>
Pendente para humano: <algo que não deu para resolver só com grep, ou "nada">
```

## Regras

- Zero mudanças fora dos 4 arquivos de docs listados. Se perceber um bug no código, **relate**; não corrija.
- Não reescreva o MAPA inteiro com `Write`. `Edit` por linha. O MAPA tem prosa que o time escreveu; só os números e caminhos mudam.
- Linha de tabela cujo trecho **sumiu** do código (não foi movido, foi apagado): não remova em silêncio. Marque como `⚠ removido em <commit/etapa>` e cite no relatório.
