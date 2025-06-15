document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar modal elementos
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  // Seleccionar todas las imágenes dentro del carrusel de eventos
  const images = document.querySelectorAll('.event-carousel .carousel-cell img');

  images.forEach(img => {
    img.style.cursor = 'pointer';  // Cambiar cursor para indicar clickeable
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    });
  });

  // Cerrar modal al hacer clic en la X
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar modal si hacen clic fuera de la imagen
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
