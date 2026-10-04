// Revelar elementos ao rolar
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll(
        '#sobre .grid > div, #servicos .text-center, #servicos .grid > div, ' +
        '#diferenciais .text-center, #diferenciais .grid > div, #contato .grid > div'
    );
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
        });
    }, { threshold: 0.15 });

    targets.forEach(el => {
        const idx = Array.from(el.parentElement.children).indexOf(el);
        el.style.setProperty('--d', (idx * 0.12) + 's');
        el.classList.add('reveal');
        revealObs.observe(el);
    });
});
