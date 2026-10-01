// Impressão digital da página — execute inteiro no javascript_tool (viewport desktop).
// Só coleta o que define "a página está igual": conteúdo, links, cores, fontes e contagens.
// Não coleta alturas/posições (variam com fonte carregando) nem timestamps.
(() => {
  const q = (s) => Array.from(document.querySelectorAll(s));
  const cs = (el, p) => (el ? getComputedStyle(el)[p] : null);
  const txt = (el) => el.textContent.replace(/\s+/g, ' ').trim();

  return {
    titulo: document.title,
    descricao: document.querySelector('meta[name="description"]')?.content ?? null,
    lang: document.documentElement.lang,
    classesHtml: document.documentElement.className,

    secoes: q('header, section[id], footer').map((s) => ({
      id: s.id || s.tagName.toLowerCase(),
      bg: cs(s, 'backgroundColor'),
      cor: cs(s, 'color'),
      classes: s.className,
    })),

    titulos: q('h1, h2, h3, h4').map((h) => `${h.tagName}: ${txt(h)}`),
    precos: q('#servicos .grid .text-3xl').map(txt), // só os cards; o h2 da seção também é text-3xl
    paragrafos: q('p').map(txt),

    links: q('a[href]').map((a) => a.getAttribute('href')),
    linksExternos: q('a[target="_blank"]').map((a) => ({
      href: a.getAttribute('href'),
      rel: a.getAttribute('rel'),
    })),
    imagens: q('img').map((i) => ({ src: i.getAttribute('src'), alt: i.alt })),
    icones: q('i[class*="fa-"]').length,

    fontes: {
      titulo: cs(document.querySelector('h1'), 'fontFamily'),
      corpo: cs(document.body, 'fontFamily'),
    },
    coresMarca: ['bg-leather', 'bg-leatherDeep', 'bg-leatherCard', 'bg-sand', 'bg-marble', 'text-bronze']
      .map((c) => ({ classe: c, exemplo: cs(document.querySelector('.' + c), c.startsWith('bg') ? 'backgroundColor' : 'color') })),

    contagens: {
      reveal: q('.reveal').length,
      navLinks: q('.nav-link').length,
      mobileNavLinks: q('.mobile-nav-link').length,
      cardsServico: q('#servicos .grid > div').length,
      cardsDiferenciais: q('#diferenciais .grid > div').length,
      stitch: q('.stitch, .stitch-dark').length,
      heroIn: q('.hero-in, .hero-pop').length,
    },

    estilosExternos: q('link[rel="stylesheet"]').map((l) => l.getAttribute('href')),
    scripts: q('script[src]').map((s) => ({ src: s.getAttribute('src'), defer: s.defer })),
    scriptsInline: q('script:not([src])').length,
  };
})();
