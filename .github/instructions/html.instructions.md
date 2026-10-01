---
applyTo: "**/*.html"
---

# Regras ao editar HTML

- Mantenha as classes Tailwind exatamente como estão. Não as converta em CSS próprio.
- Não altere textos, preços, horários, telefones, links ou atributos `aria-*`.
- Ao extrair o conteúdo de um `<style>` para um arquivo, substitua o bloco por `<link rel="stylesheet" href="css/nome.css">` **no mesmo lugar** do `<head>`.
- Ao extrair um `<script>` do fim do `<body>` para um arquivo, substitua por `<script src="js/nome.js" defer></script>`. Exceção: a config do Tailwind **não** leva `defer` e fica logo após o CDN.
- Mantenha os comentários de seção (`<!-- Hero -->`, `<!-- Serviços -->` etc.). Pode torná-los mais descritivos, não removê-los.
- Caminhos relativos, sem barra inicial: `css/base.css`, não `/css/base.css` (a página abre direto do disco).
