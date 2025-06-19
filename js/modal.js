 document.addEventListener('DOMContentLoaded', function() {
            // Inicializar Flickity en los carruseles
            var carousels = document.querySelectorAll('.main-carousel');
            carousels.forEach(function(carousel) {
                new Flickity(carousel, {
                    wrapAround: true,
                    autoPlay: 3000,
                    imagesLoaded: true,
                    prevNextButtons: true,
                    pageDots: true
                });
            });

            // --- Lógica del Modal para Imágenes y Videos ---
            const mediaModal = document.getElementById('mediaModal');
            const closeMediaModal = document.getElementById('closeMediaModal');
            const modalContentWrapper = mediaModal.querySelector('.modal-content-wrapper');
            const mediaItems = document.querySelectorAll('.gallery-cell .media-item');

            mediaItems.forEach(item => {
                // Escuchamos el clic en el elemento padre (.gallery-cell) para que el área de clic sea más grande
                item.parentElement.addEventListener('click', function(e) {
                    // Evitar que el clic en los propios controles del video (play, pause, etc.) abra el modal sobre el video mismo
                    if (e.target.tagName === 'VIDEO' || e.target.tagName === 'SOURCE') {
                        return; // Si el clic fue directamente en el video o su source, no abrimos el modal
                    }

                    e.preventDefault(); // Previene cualquier acción por defecto (como seguir un enlace si la celda fuera un <a>)
                    e.stopPropagation(); // Detiene la propagación del evento para no interferir con el arrastre de Flickity

                    const dataType = item.dataset.type; // Obtiene si es 'image' o 'video'
                    let contentElement;

                    // Limpiar cualquier contenido previo en el modal
                    modalContentWrapper.innerHTML = '';

                    if (dataType === 'image') {
                        contentElement = document.createElement('img');
                        contentElement.src = item.src;
                        contentElement.alt = item.alt;
                    } else if (dataType === 'video') {
                        contentElement = document.createElement('video');
                        contentElement.controls = true; // Mostrar controles del video
                        contentElement.autoplay = true; // Reproducir automáticamente
                        contentElement.loop = true; // Reproducir en bucle
                        contentElement.setAttribute('playsinline', ''); // Importante para reproducción en iOS

                        const videoSource = document.createElement('source');
                        videoSource.src = item.dataset.src; // Usar data-src para la URL del video original
                        videoSource.type = 'video/mp4'; // Asumimos MP4, ajusta si es necesario
                        contentElement.appendChild(videoSource);
                    }

                    modalContentWrapper.appendChild(contentElement);
                    mediaModal.style.display = 'flex'; // Mostrar el modal
                });
            });

            // Cerrar el modal al hacer clic en la "X"
            closeMediaModal.addEventListener('click', () => {
                mediaModal.style.display = 'none';
                // Pausar cualquier video que se esté reproduciendo en el modal al cerrarlo
                const videoInModal = modalContentWrapper.querySelector('video');
                if (videoInModal) {
                    videoInModal.pause();
                    videoInModal.currentTime = 0; // Opcional: Reiniciar el video al inicio
                }
            });

            // Cerrar el modal al hacer clic en el fondo oscuro
            mediaModal.addEventListener('click', (e) => {
                // Solo cierra si el clic fue directamente sobre el fondo del modal, no sobre la imagen/video
                if (e.target === mediaModal) {
                    mediaModal.style.display = 'none';
                    const videoInModal = modalContentWrapper.querySelector('video');
                    if (videoInModal) {
                        videoInModal.pause();
                        videoInModal.currentTime = 0;
                    }
                }
            });

            // Cerrar con la tecla Escape (opcional, pero buena práctica)
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mediaModal.style.display === 'flex') {
                    mediaModal.style.display = 'none';
                    const videoInModal = modalContentWrapper.querySelector('video');
                    if (videoInModal) {
                        videoInModal.pause();
                        videoInModal.currentTime = 0;
                    }
                }
            });
        });