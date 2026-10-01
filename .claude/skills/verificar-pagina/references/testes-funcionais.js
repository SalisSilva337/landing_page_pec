// Testes funcionais — três blocos. Execute cada um no javascript_tool na viewport indicada.
// Cada bloco retorna { ok: boolean, detalhes: {...} }.
//
// POR QUE OS BLOCOS SÃO ASSIM: o painel do navegador costuma estar OCULTO enquanto a IA trabalha
// (document.visibilityState === 'hidden'). Aba oculta não renderiza, e sem renderização o navegador
// NÃO dispara eventos de `scroll` nem callbacks de IntersectionObserver. Então:
//   - Bloco 2 dispara o evento `scroll` manualmente (dispatchEvent) — roda os handlers sem precisar renderizar.
//   - Bloco 3 (reveal) depende do IntersectionObserver, que só acorda com um frame renderizado.
//     Um screenshot minúsculo (scale 0.1) força esse frame. Por isso o bloco 3 é um LOOP de
//     [scrollTo → screenshot] feito pelo modelo via browser_batch, e só o fim é JS.

// ===== BLOCO 1: menu mobile (viewport mobile, < 768px) =====
await (async () => {
  const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return { ok: false, detalhes: { erro: 'botão ou menu não encontrado' } };

  const fechadoAntes = menu.classList.contains('hidden');
  btn.click(); await esperar(100);
  const abriu = !menu.classList.contains('hidden');
  const ariaAberto = btn.getAttribute('aria-expanded') === 'true';

  const link = menu.querySelector('a[href^="#"]');
  link?.click(); await esperar(100);
  const fechouAoClicar = menu.classList.contains('hidden');

  window.scrollTo({ top: 0, behavior: 'instant' }); // desfaz o scroll que o clique no link causou

  return {
    ok: fechadoAntes && abriu && ariaAberto && fechouAoClicar,
    detalhes: { fechadoAntes, abriu, ariaAberto, fechouAoClicar },
  };
})();

// ===== BLOCO 2: barra de progresso + fallback do link ativo (viewport desktop 1280x800) =====
// Usa dispatchEvent: funciona com o painel oculto.
await (async () => {
  const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
  const ir = (y) => { window.scrollTo({ top: y, behavior: 'instant' }); window.dispatchEvent(new Event('scroll')); };
  const fim = document.documentElement.scrollHeight;

  ir(fim); await esperar(200);
  const barra = parseFloat(document.getElementById('scrollBar')?.style.width || '0');
  const ativoNoFim = document.querySelector('nav .nav-link.active-nav')?.dataset.section ?? null;

  ir(0); await esperar(200);
  const ativoNoTopo = document.querySelector('nav .nav-link.active-nav')?.dataset.section ?? null;

  return {
    ok: barra > 95 && ativoNoFim === 'contato' && ativoNoTopo === 'inicio',
    detalhes: { barraPercent: barra, ativoNoFim, ativoNoTopo, visibilityState: document.visibilityState },
  };
})();

// ===== BLOCO 3: reveal ao rolar (viewport desktop 1280x800) =====
// Passo A (modelo, via browser_batch): para y em 0, 400, 800, ... até scrollHeight (use 99999 no último):
//     javascript_tool: window.scrollTo({ top: y, behavior: 'instant' })
//     computer: { action: 'screenshot', scale: 0.1 }        ← força um frame; o observer dispara
// Passo B (JS, depois do loop):
({
  ok: document.querySelectorAll('.reveal.visible').length === document.querySelectorAll('.reveal').length
      && document.querySelectorAll('.reveal').length > 0,
  detalhes: {
    revealTotal: document.querySelectorAll('.reveal').length,
    revealVisiveis: document.querySelectorAll('.reveal.visible').length,
    visibilityState: document.visibilityState,
  },
});
