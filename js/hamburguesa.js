document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            hamburger.classList.toggle('active'); // Opcional: para animar el icono de hamburguesa
        });
    }

    // Cerrar el menú al hacer clic en un enlace (opcional)
    const navLinks = document.querySelectorAll('.nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                hamburger.classList.remove('active');
            }
        });
    });
});