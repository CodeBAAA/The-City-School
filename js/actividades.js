document.addEventListener('DOMContentLoaded', () => {
    const activities = [
        {
            id: "1",
            title: "Etnia negra",

// Ahora, utilizando un template literal (con backticks ` `):
description: `En nuestra escuela, celebramos el Día de la Etnia Negra en Panamá, un momento especial para aprender y reconocer los valiosos aportes de la comunidad afrodescendiente a nuestra cultura y sociedad. Durante la jornada, los niños disfrutaron de una deliciosa variedad de comidas típicas que reflejan la rica gastronomía afroantillana, como las torrejitas de bacalao, los patacones, las carimañolas y muchas ricuras más!

Además, vimos películas que nos ayudaron a comprender mejor la historia y las tradiciones de la etnia negra en Panamá, ampliando nuestros conocimientos y apreciación por su legado. A través de actividades interactivas y charlas, los estudiantes aprendieron sobre la música, la danza y las costumbres que han enriquecido nuestra identidad panameña.

Fue un día lleno de aprendizaje, diversión y orgullo, donde celebramos la diversidad y la importancia de cada cultura en nuestro país. ¡Juntos, seguimos construyendo un futuro inclusivo y respetuoso!`,            date: "2025-06-14",
            time: "09:00 AM",
            location: "Laboratorio Principal",
            participants: 120,
            images: [
                { type: "image", src: "../images/Etnianegra/Etnia1.jpg" },
                { type: "image", src: "../images/Etnianegra/Etnia2.jpg" }, // Asumiendo que esta también es local
                { type: "image", src: "../images/Etnianegra/Etnia3.jpg" },
                { type: "image", src: "../images/Etnianegra/Etnia4.jpg" },
                { type: "image", src: "../images/Etnianegra/Etnia5.jpg" },
                { type: "image", src: "../images/Etnianegra/Etnia6.jpg" },
                { type: "image", src: "../images/Etnianegra/Etnia7.jpg" },
                { type: "image", src: "../images/Etnianegra/Etnia8.jpg" },

            ],
            category: "Académico",
        },
        {
            id: "2",
            title: "Docencias para Maestros",
            description: "Competencia deportiva entre todas las aulas de la institución. Incluyó fútbol, básquet, vóley y atletismo. Gran participación y espíritu deportivo.",
            date: "2025-06-21",
            time: "02:00 PM",
            location: "Cancha Deportiva",
            participants: 200,
            images: [
                { type: "image", src: "../images/Docencias/Docencia1.jpg" },
                { type: "image", src: "../images/Docencias/Docencia2.jpg"},
                { type: "image", src: "../images/Docencias/Docencia3.jpg" },
                { type: "image", src: "../images/Docencias/Docencia4.jpg" },
            ],
            category: "Deportivo",
        },
        {
            id: "3",
            title: "Día del Arte y Creatividad",
            description: "Exhibición de obras de arte, manualidades y presentaciones de talentos artísticos de los estudiantes. Un espacio para la expresión y la imaginación.",
            date: "2024-04-20",
            time: "10:00 AM",
            location: "Salón de Usos Múltiples",
            participants: 80,
            images: [
                { type: "image", src: "https://via.placeholder.com/600x400?text=Art+Day+1" },
                { type: "image", src: "https://via.placeholder.com/600x400?text=Art+Day+2" },
                { type: "image", src: "https://via.placeholder.com/600x400?text=Art+Day+3" },
            ],
            category: "Cultural",
        },
        {
            id: "4",
            title: "Cierre de la semana de la educación inicial",
            description: "Una caminata por senderos naturales para promover la conciencia ambiental y el ejercicio al aire libre. Aprendizaje sobre flora y fauna local.",
            date: "2024-05-05",
            time: "08:00 AM",
            location: "The City School",
            participants: 5,
            images: [
                { type: "image", src: "../images/cierre de semana/cierre1.jpg" },
                { type: "image", src: "../images/cierre de semana/cierre2.jpg" },
                { type: "image", src: "../images/cierre de semana/cierre3.jpg" },
                { type: "image", src: "../images/cierre de semana/cierre4.jpg" },
                { type: "image", src: "../images/cierre de semana/cierre5.jpg" },
                { type: "image", src: "../images/cierre de semana/cierre6.jpg" },
                { type: "video", src: "../videos/cierre video1.mp4" }, // ¡Ruta del video corregida!
            ],
            category: "Social",
        },
    ];

    let currentActivities = [...activities];
    const currentImageIndex = {}; // To store the current image/video index for each activity
    const activitiesList = document.getElementById('activitiesList');
    const newActivityForm = document.getElementById('newActivityForm');
    const toggleFormButton = document.getElementById('toggleFormButton');
    const activityForm = document.getElementById('activityForm');
    const cancelFormButton = document.getElementById('cancelFormButton');
    const imageFieldsContainer = document.getElementById('imageFieldsContainer'); // Renombrado a 'mediaFieldsContainer' sería más preciso pero mantenemos el nombre por compatibilidad
    const addImageFieldButton = document.getElementById('addImageFieldButton'); // Renombrado a 'addMediaFieldButton' sería más preciso
    const noActivitiesMessage = document.getElementById('noActivitiesMessage');

    // Función para precargar medios (solo imágenes, videos se manejan al crear el elemento)
    function preloadMedia(mediaItems) {
        mediaItems.forEach(media => {
            if (media.type === "image") {
                const img = new Image();
                img.src = media.src;
            }
            // Los videos no se "precargan" de la misma manera que las imágenes
        });
    }

    // Precargar medios iniciales al cargar la página
    activities.forEach(activity => {
        preloadMedia(activity.images);
    });

    // Function to get category color class
    function getCategoryColor(category) {
        const colors = {
            Académico: "bg-blue-100 text-blue-800",
            Deportivo: "bg-green-100 text-green-800",
            Cultural: "bg-purple-100 text-purple-800",
            Social: "bg-orange-100 text-orange-800",
            Tecnológico: "bg-cyan-100 text-cyan-800",
        };
        return colors[category] || "bg-gray-100 text-gray-800";
    }

    // Function to render activities
    function renderActivities() {
        activitiesList.innerHTML = '';
        if (currentActivities.length === 0) {
            noActivitiesMessage.style.display = 'block';
        } else {
            noActivitiesMessage.style.display = 'none';
            currentActivities.forEach(activity => {
                const activityCard = document.createElement('div');
                activityCard.classList.add('card', 'overflow-hidden', 'shadow-lg', 'hover:shadow-xl', 'transition-shadow');
                activityCard.setAttribute('data-id', activity.id);

                // Initialize media index if not already set
                if (currentImageIndex[activity.id] === undefined) {
                    currentImageIndex[activity.id] = 0;
                }
                const currentMedia = activity.images[currentImageIndex[activity.id]];

                // Determina si es imagen o video y genera el HTML correspondiente
                let mediaHTML = '';
                if (currentMedia.type === "image") {
                    mediaHTML = `<img src="${currentMedia.src}" alt="${activity.title}" class="object-cover activity-media" data-activity-id="${activity.id}" style="width: 100%; height: 100%; object-fit: cover;">`;
                } else if (currentMedia.type === "video") {
                    mediaHTML = `<video src="${currentMedia.src}" controls loop muted autoplay class="object-cover activity-media" data-activity-id="${activity.id}" style="width: 100%; height: 100%; object-fit: cover;"></video>`;
                }


                activityCard.innerHTML = `
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        <div class="relative h-64 lg:h-auto">
                            ${mediaHTML}

                            ${activity.images.length > 1 ? `
                                <button class="btn btn-outline btn-icon absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white carousel-nav-prev" data-activity-id="${activity.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m15 18-6-6 6-6"/></svg>
                                </button>
                                <button class="btn btn-outline btn-icon absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white carousel-nav-next" data-activity-id="${activity.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m9 18 6-6-6-6"/></svg>
                                </button>

                                <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 image-indicators">
                                    ${activity.images.map((_, index) => `
                                        <div class="w-2 h-2 rounded-full ${index === currentImageIndex[activity.id] ? 'bg-white' : 'bg-white/50'}"></div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>

                        <div class="p-6">
                            <div class="flex items-start justify-between mb-4">
                                <div>
                                    <span class="badge ${getCategoryColor(activity.category)}">${activity.category}</span>
                                    <h3 class="text-2xl font-bold text-gray-900 mt-2">${activity.title}</h3>
                                </div>
                            </div>

                            <p class="text-gray-600 mb-6 leading-relaxed">${activity.description}</p>

                            <div class="space-y-3">
                                <div class="flex items-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 mr-3"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    <span>
                                        ${new Date(activity.date).toLocaleDateString("es-ES", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>

                                <div class="flex items-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 mr-3"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    <span>${activity.time}</span>
                                </div>

                                <div class="flex items-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 mr-3"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                    <span>${activity.location}</span>
                                </div>

                                <div class="flex items-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 mr-3"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                    <span>${activity.participants} participantes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                activitiesList.appendChild(activityCard);
            });
        }
    }

    // Función para actualizar solo el medio (imagen/video) y los indicadores de una actividad específica
    function updateActivityImage(activityId, newIndex) {
        const activityCard = activitiesList.querySelector(`[data-id="${activityId}"]`);
        if (!activityCard) return;

        const activity = currentActivities.find(act => act.id === activityId);
        if (!activity) return;

        const mediaContainer = activityCard.querySelector('.relative.h-64.lg\\:h-auto');
        const oldMediaElement = mediaContainer.querySelector('.activity-media');
        const indicatorsContainer = activityCard.querySelector('.image-indicators');

        const newMedia = activity.images[newIndex];

        // Eliminar el elemento de medio antiguo
        if (oldMediaElement) {
            oldMediaElement.remove();
        }

        // Crear el nuevo elemento de medio (imagen o video)
        let newMediaElement;
        if (newMedia.type === "image") {
            newMediaElement = document.createElement('img');
            newMediaElement.src = newMedia.src;
            newMediaElement.alt = activity.title;
        } else if (newMedia.type === "video") {
            newMediaElement = document.createElement('video');
            newMediaElement.src = newMedia.src;
            newMediaElement.controls = true;
            newMediaElement.loop = true;
            newMediaElement.muted = true;
            newMediaElement.autoplay = true; // Autoplay, pero puede ser bloqueado por el navegador
        }

        newMediaElement.classList.add('object-cover', 'activity-media');
        newMediaElement.setAttribute('data-activity-id', activity.id);
        newMediaElement.style.width = '100%';
        newMediaElement.style.height = '100%';
        newMediaElement.style.objectFit = 'cover';

        // Insertar el nuevo elemento de medio
        const firstButton = mediaContainer.querySelector('.carousel-nav-prev, .carousel-nav-next');
        if (firstButton) {
            mediaContainer.insertBefore(newMediaElement, firstButton);
        } else {
            mediaContainer.appendChild(newMediaElement);
        }

        // Actualizar indicadores
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = activity.images.map((_, index) => `
                <div class="w-2 h-2 rounded-full ${index === newIndex ? 'bg-white' : 'bg-white/50'}"></div>
            `).join('');
        }
    }

    // Carousel navigation logic
    activitiesList.addEventListener('click', (e) => {
        const target = e.target;
        let activityId, activity;

        if (target.closest('.carousel-nav-next')) {
            const button = target.closest('.carousel-nav-next');
            activityId = button.dataset.activityId;
            activity = currentActivities.find(act => act.id === activityId);
            if (activity) {
                const newIndex = ((currentImageIndex[activityId] || 0) + 1) % activity.images.length;
                currentImageIndex[activityId] = newIndex;
                updateActivityImage(activityId, newIndex);
            }
        } else if (target.closest('.carousel-nav-prev')) {
            const button = target.closest('.carousel-nav-prev');
            activityId = button.dataset.activityId;
            activity = currentActivities.find(act => act.id === activityId);
            if (activity) {
                const newIndex = ((currentImageIndex[activityId] || 0) - 1 + activity.images.length) % activity.images.length;
                currentImageIndex[activityId] = newIndex;
                updateActivityImage(activityId, newIndex);
            }
        }
    });

    // Toggle form visibility
    toggleFormButton.addEventListener('click', () => {
        if (activityForm.style.display === 'none' || activityForm.style.display === '') {
            activityForm.style.display = 'block';
        } else {
            activityForm.style.display = 'none';
        }
    });

    // Cancel form button
    cancelFormButton.addEventListener('click', () => {
        activityForm.style.display = 'none';
        newActivityForm.reset();
        // Restablece el contenedor de campos de medios
        imageFieldsContainer.innerHTML = `
            <div class="flex gap-2 mt-2 items-center">
                <select class="media-type-select p-2 border border-gray-300 rounded-md">
                    <option value="image">Imagen</option>
                    <option value="video">Video</option>
                </select>
                <input type="url" class="media-url-input flex-grow p-2 border border-gray-300 rounded-md" placeholder="URL del medio (imagen o video)">
            </div>
        `;
    });

    // Add media field
    addImageFieldButton.addEventListener('click', () => {
        const newMediaField = document.createElement('div');
        newMediaField.classList.add('flex', 'gap-2', 'mt-2', 'items-center');
        newMediaField.innerHTML = `
            <select class="media-type-select p-2 border border-gray-300 rounded-md">
                <option value="image">Imagen</option>
                <option value="video">Video</option>
            </select>
            <input type="url" class="media-url-input flex-grow p-2 border border-gray-300 rounded-md" placeholder="URL del medio (imagen o video)">
            <button type="button" class="btn btn-outline remove-media-field p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200">
                Eliminar
            </button>
        `;
        imageFieldsContainer.appendChild(newMediaField);
    });

    // Remove media field
    imageFieldsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-media-field')) {
            e.target.closest('.flex.gap-2.mt-2').remove();
        }
    });

    // Handle form submission
    newActivityForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const location = document.getElementById('location').value;
        const participants = document.getElementById('participants').value;
        const category = document.getElementById('category').value;

        const mediaInputs = document.querySelectorAll('#imageFieldsContainer > div');
        const images = Array.from(mediaInputs)
            .map(div => {
                const type = div.querySelector('.media-type-select').value;
                const src = div.querySelector('.media-url-input').value.trim();
                return src ? { type, src } : null;
            })
            .filter(media => media !== null);

        if (images.length === 0) {
            images.push({ type: "image", src: "https://via.placeholder.com/600x400?text=No+Media" });
        }

        const newActivity = {
            id: Date.now().toString(),
            title,
            description,
            date,
            time,
            location,
            participants: parseInt(participants),
            images, // Ahora images es un array de objetos {type, src}
            category,
        };

        currentActivities.push(newActivity);
        preloadMedia(newActivity.images); // Precargar medios de la nueva actividad
        renderActivities();
        newActivityForm.reset();
        activityForm.style.display = 'none';
        // Restablece el contenedor de campos de medios
        imageFieldsContainer.innerHTML = `
            <div class="flex gap-2 mt-2 items-center">
                <select class="media-type-select p-2 border border-gray-300 rounded-md">
                    <option value="image">Imagen</option>
                    <option value="video">Video</option>
                </select>
                <input type="url" class="media-url-input flex-grow p-2 border border-gray-300 rounded-md" placeholder="URL del medio (imagen o video)">
            </div>
        `;
    });

    // Initial render
    renderActivities();
});