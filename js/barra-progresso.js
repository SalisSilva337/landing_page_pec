// Barra de progresso de 3px no topo (#scrollBar)
document.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('scrollBar');
    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }, { passive: true });
});
