<?php
// Carga las clases de PHPMailer.
// Como lo instalamos manualmente en la carpeta 'phpmailer/src/', usamos esta ruta:
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Establece el encabezado para indicar que la respuesta será JSON.
header('Content-Type: application/json');

// Verifica que la solicitud sea POST (cuando el formulario se envía).
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoge y limpia los datos del formulario.
    $nombre = htmlspecialchars(trim($_POST['nombreContacto']));
    $email = htmlspecialchars(trim($_POST['emailContacto']));
    $asunto = htmlspecialchars(trim($_POST['asuntoContacto']));
    $mensaje = htmlspecialchars(trim($_POST['mensajeContacto']));

    // Pequeña validación: verifica que los campos no estén vacíos.
    if (empty($nombre) || empty($email) || empty($asunto) || empty($mensaje)) {
        echo json_encode(['success' => false, 'message' => 'Por favor, completa todos los campos del formulario.']);
        exit; // Detiene la ejecución del script.
    }

    $mail = new PHPMailer(true); // Crea una nueva instancia de PHPMailer; 'true' habilita las excepciones.

    try {
        // **Configuración del Servidor SMTP de Hostinger (¡TUS DATOS AQUÍ!)**
        $mail->isSMTP();                                       // Usa SMTP para enviar.
        $mail->Host       = 'smtp.hostinger.com';              // Servidor SMTP de Hostinger.
        $mail->SMTPAuth   = true;                              // Habilita la autenticación SMTP.
        $mail->Username   = 'admisiones@thecityschool.edu.pa'; // TU EMAIL COMPLETO DE HOSTINGER.
        $mail->Password   = 'Gg9&7ycby!';                      // TU CONTRASEÑA DEL EMAIL DE HOSTINGER.
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;    // Usa cifrado TLS (recomendado por Hostinger para el puerto 587).
        $mail->Port       = 587;                               // Puerto SMTP de Hostinger.
        // Para depuración (comenta o quita en producción):
        // $mail->SMTPDebug = 2; // Muestra salida de depuración SMTP.
        // $mail->Debugoutput = 'html'; // Formato de la salida de depuración.

        // **Configuración de los Correos (Quién envía y quién recibe)**
        $mail->setFrom('admisiones@thecityschool.edu.pa', 'Formulario de Contacto The City School'); // El remitente del correo que verás (tu cuenta de Hostinger).
        $mail->addAddress('admisiones@thecityschool.edu.pa', 'Admisiones The City School');         // La dirección a la que llegarán los mensajes del formulario.
        // Si quieres que una copia llegue a otro correo, añade otra línea:
        // $mail->addAddress('tu_otro_correo@ejemplo.com', 'Nombre del Otro Destinatario');

        $mail->addReplyTo($email, $nombre); // Permite que, al responder al correo recibido, respondas directamente al que llenó el formulario.

        // **Contenido del Correo**
        $mail->isHTML(true); // Habilita el formato HTML para el cuerpo del mensaje.
        $mail->Subject = 'Nuevo Contacto desde The City School: ' . $asunto; // Asunto del correo.
        $mail->Body    = "
            <html>
            <head>
                <title>Mensaje de Contacto</title>
            </head>
            <body>
                <h2>Nuevo mensaje del formulario de contacto</h2>
                <p><strong>Nombre:</strong> {$nombre}</p>
                <p><strong>Correo Electrónico:</strong> {$email}</p>
                <p><strong>Asunto:</strong> {$asunto}</p>
                <p><strong>Mensaje:</strong></p>
                <p style='white-space: pre-wrap;'>{$mensaje}</p>
            </body>
            </html>
        ";
        $mail->AltBody = "Nuevo mensaje del formulario de contacto:\n\nNombre: {$nombre}\nCorreo Electrónico: {$email}\nAsunto: {$asunto}\nMensaje: {$mensaje}"; // Versión de texto plano.

        $mail->send(); // Envía el correo.
        echo json_encode(['success' => true, 'message' => '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.']);

    } catch (Exception $e) {
        // Si hay un error, registra el mensaje en los logs del servidor (no se muestra al usuario directamente en la web).
        error_log("Error al enviar correo desde formulario: " . $e->getMessage() . " - PHPMailer Error: " . $mail->ErrorInfo);
        echo json_encode(['success' => false, 'message' => 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde o contáctanos directamente.']);
    }
} else {
    // Si alguien intenta acceder al script directamente sin enviar el formulario.
    echo json_encode(['success' => false, 'message' => 'Acceso inválido. Este script solo acepta envíos de formulario POST.']);
}
?>