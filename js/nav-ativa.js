// Destaque do menu conforme a seção visível (section[id], .nav-link, .mobile-nav-link)
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav .nav-link, #mobileMenu .mobile-nav-link');

    function setActiveSection(id) {
        navLinks.forEach(link => {
            link.classList.toggle('active-nav', link.getAttribute('data-section') === id);
        });
    }

    const visiveis = new Set();   // Set = lista sem repetição

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) visiveis.add(entry.target);
            else visiveis.delete(entry.target);
        });
        const atual = [...sections].reverse().find(s => visiveis.has(s));  // a mais de baixo (findLast seria mais curto, mas só existe em navegador de 2022+)
        if (atual) setActiveSection(atual.id);
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    sections.forEach(s => observer.observe(s));

    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
            setActiveSection('inicio');
        } else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            setActiveSection('contato');
        }
    });
});
