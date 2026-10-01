# Instruções para o GitHub Copilot / VS Code

**Leia e siga `AGENTS.md` na raiz do repositório antes de qualquer tarefa.** Ele é a única fonte de regras; este arquivo é só um lembrete.

O que não pode ser esquecido:

1. **Nunca** rode `git add`, `git commit` ou `git push`. Quem commita é a pessoa.
2. **Nunca** edite arquivo antes de o usuário aprovar o plano. Escreva o plano, termine a resposta, espere "pode seguir".
3. A IA aqui só faz duas coisas: **EXPLICAR** o código para quem aprende e **REFATORAR** para separar em arquivos menores. Funcionalidade nova ou mudança visual → recusar com a frase pronta de `AGENTS.md`.
4. Refatorar = página **idêntica** antes e depois. Nenhum texto, cor, preço, horário, link ou animação muda.
5. **Uma etapa de `docs/REFATORACAO.md` por vez.** Diga qual é e quais anteriores estão pendentes.
6. **Sem** npm, build, bundler, framework ou pré-processador.
7. Termine toda refatoração colando o checklist de verificação de `AGENTS.md`.
8. Português do Brasil; termos de código em inglês.
9. Há skills em `.claude/skills/` (o VS Code as lê como Agent Skills): `guia` roteia qualquer pedido; `explicar`, `proxima-etapa`, `verificar-pagina`, `atualizar-mapa`, `exercicio` e `revisar-refatoracao` fazem o trabalho. Em dúvida, use `guia`.
10. Toda execução de etapa termina com `verificar-pagina depois` **e** `atualizar-mapa`. Sem os dois, a etapa não está concluída.
