---
applyTo: "**/*.js"
---

# Regras ao editar JavaScript

- JavaScript puro (vanilla). Sem bibliotecas, sem `import`/`export`, sem TypeScript.
- Um comportamento por arquivo: `menu-mobile.js`, `nav-ativa.js`, `revelar-scroll.js`, `barra-progresso.js`.
- Cada arquivo começa com um comentário de 2–4 linhas: o que faz, quais elementos do HTML usa (por `id` ou classe), e o porquê.
- Mantenha os nomes de variáveis e funções que já existem (`setActiveSection`, `revealObs`). Só renomeie se o pedido for esse.
- Os arquivos vão com `defer`, então o DOM já existe quando rodam. Trecho que já usa `DOMContentLoaded` mantém; trecho que não usa (ex.: menu mobile) **não ganha** um. Não adicione nem remova.
- Não altere seletores (`'#mobileMenu a'`, `'section[id]'`), `rootMargin`, `threshold` ou os `0.12` de delay. São comportamento, não estilo.
- Se um arquivo precisar de algo definido em outro, pare e pergunte. Hoje nenhum precisa.
