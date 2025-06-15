// js/carousel.js

// Variables globales del carrusel
let currentSlide = 0;
// Asegúrate de que estas variables solo se inicialicen si los elementos existen en la página
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

// Función para actualizar el carrusel (mostrar slide y dot)
function updateCarousel() {
    // Salir si no hay carrusel en la página actual
    if (slides.length === 0 || dots.length === 0) return; 

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Función para cambiar slides del carrusel
function changeSlide(direction) {
    if (slides.length === 0) return; // Salir si no hay carrusel
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateCarousel();
}

// Función para cambiar slide manualmente desde los puntos
function currentSlideManual(n) {
    if (slides.length === 0) return; // Salir si no hay carrusel
    currentSlide = n;
    updateCarousel();
}

// Auto-slide del carrusel
// Solo se ejecuta si hay un carrusel en la página de inicio
setInterval(() => {
    // Verificar si estamos en la página de inicio y si hay slides
    // Consideramos que la página de inicio es la que tiene el carrusel
    if (slides.length > 0) { 
        changeSlide(1);
    }
}, 5000);

// Exportar funciones si fuera necesario, aunque para este caso simple, no es estrictamente requerido
// Las funciones están disponibles globalmente una vez que el script se carga.
// window.changeSlide = changeSlide;
// window.currentSlideManual = currentSlideManual;

// Inicializar el carrusel cuando el DOM esté cargado (solo en páginas con carrusel)
document.addEventListener('DOMContentLoaded', () => {
    // Si hay slides, entonces estamos en una página que usa el carrusel, inicializarlo
    if (slides.length > 0) {
        updateCarousel();
    }
});