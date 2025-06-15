// js/forms.js

// --- CONFIGURACIÓN E INICIALIZACIÓN DE EMAILJS ---
// **¡MUY IMPORTANTE: VERIFICA ESTOS VALORES CON TUS CREDENCIALES REALES DE EMAILJS!**
const EMAILJS_PUBLIC_KEY = "qLizEGQkzKl_9cxdh"; // Tu Public Key
const EMAILJS_SERVICE_ID_PREMATRICULA = "service_yatm0wt"; // ID del servicio para pre-matrícula
const EMAILJS_TEMPLATE_ID_PREMATRICULA = "template_92ashal"; // ID de la plantilla para pre-matrícula

const EMAILJS_SERVICE_ID_MATRICULA = "service_yatm0wt"; // Puedes usar el mismo servicio si lo deseas
const EMAILJS_TEMPLATE_ID_MATRICULA = "ID_DE_TU_NUEVA_PLANTILLA_DE_MATRICULA"; // ¡Asegúrate de que este ID sea el de tu plantilla para matrícula!

// Inicializa EmailJS solo si la librería ya está cargada
document.addEventListener('DOMContentLoaded', () => {
    if (typeof emailjs !== 'undefined') { // Verifica si la librería emailjs está disponible
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log("EmailJS inicializado con Public Key:", EMAILJS_PUBLIC_KEY);
    } else {
        console.error("La librería EmailJS no está cargada. Los envíos de formularios no funcionarán.");
    }
});

// Función para enviar email usando EmailJS
function sendEmail(formData, formType, serviceID, templateID) {
    console.log(`Intentando enviar ${formType} con EmailJS...`, formData);

    if (typeof emailjs === 'undefined' || !emailjs.send) {
        console.error('EmailJS no está inicializado o no está cargado correctamente. Asegúrate de que emailjs.min.js se carga ANTES de script.js');
        alert('Hubo un problema al inicializar el servicio de correo. Por favor, inténtalo de nuevo más tarde.');
        return;
    }

    alert(`Enviando tu formulario de ${formType}... Por favor, espera.`);

    emailjs.send(serviceID, templateID, formData)
        .then(function(response) {
            console.log(`${formType} enviada con éxito!`, response.status, response.text);
            alert(`¡Formulario de ${formType} enviado exitosamente! Te contactaremos pronto.`);
            // No reseteamos el formulario aquí, se hará en el event listener específico
        }, function(error) {
            console.error(`Error al enviar ${formType}:`, error);
            alert(`Hubo un error al enviar tu formulario de ${formType}. Por favor, inténtalo de nuevo. Detalles: ${error.text || JSON.stringify(error)}`);
        });
}

// --- Manejo del Formulario de Pre-matrícula ---
document.addEventListener('DOMContentLoaded', () => {
    const prematriculaForm = document.getElementById('prematricula-form');
    if (prematriculaForm) { // Solo si el formulario existe en la página actual
        prematriculaForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita el envío tradicional de la página

            const formData = {
                // Asegúrate de que estos nombres de campo coincidan con los de tu plantilla EmailJS
                'nombre-estudiante': document.getElementById('nombre-estudiante').value,
                'apellido-estudiante': document.getElementById('apellido-estudiante').value,
                'fecha-nacimiento': document.getElementById('fecha-nacimiento').value,
                'grado-solicita': document.getElementById('grado-solicita').value,
                'nombre-padre': document.getElementById('nombre-padre').value,
                'telefono': document.getElementById('telefono').value,
                'email': document.getElementById('email').value,
                'direccion': document.getElementById('direccion').value,
                'comentarios': document.getElementById('comentarios').value,
            };
            
            sendEmail(formData, 'Pre-matrícula', EMAILJS_SERVICE_ID_PREMATRICULA, EMAILJS_TEMPLATE_ID_PREMATRICULA);
            this.reset(); // Limpia el formulario después del envío exitoso
        });
    }

    // --- Manejo del Formulario de Matrícula ---
    const matriculaForm = document.getElementById('matricula-form');
    if (matriculaForm) { // Solo si el formulario existe en la página actual
        matriculaForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita el envío tradicional de la página
            
            const formData = {
                'nombre-completo': document.getElementById('nombre-completo').value,
                'cedula': document.getElementById('cedula').value,
                'fecha-nac': document.getElementById('fecha-nac').value,
                'genero': document.getElementById('genero').value,
                'grado-matricula': document.getElementById('grado-matricula').value,
                'nombre-acudiente': document.getElementById('nombre-acudiente').value,
                'parentesco': document.getElementById('parentesco').value,
                'cedula-acudiente': document.getElementById('cedula-acudiente').value,
                'telefono-acudiente': document.getElementById('telefono-acudiente').value,
                'email-acudiente': document.getElementById('email-acudiente').value,
                'direccion-completa': document.getElementById('direccion-completa').value,
                'colegio-anterior': document.getElementById('colegio-anterior').value,
                'observaciones': document.getElementById('observaciones').value
            };
            
            sendEmail(formData, 'Matrícula', EMAILJS_SERVICE_ID_MATRICULA, EMAILJS_TEMPLATE_ID_MATRICULA);
            this.reset(); // Limpia el formulario después del envío exitoso
        });
    }
});