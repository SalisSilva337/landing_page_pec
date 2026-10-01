---
applyTo: "**/*.css"
---

# Regras ao editar CSS

- Copie as regras **sem alterar valores**: cores, tempos de animação, `rootMargin`, opacidades, tudo igual.
- Mantenha os comentários originais em português (`/* Textura sutil de couro */`). Adicione um comentário de 1 linha no topo do arquivo dizendo o que ele agrupa.
- Um arquivo por tema: `base.css` (reset, scrollbar, foco, reduced-motion), `texturas.css` (couro, mármore, costura), `componentes.css` (nav, cards, divider, gradientes), `animacoes.css` (`@keyframes` e classes que os usam).
- Se a mesma regra aparecer em dois arquivos, pare e pergunte onde ela deve ficar. Não duplique.
- Não use `!important` novo. Os que já existem ficam.
