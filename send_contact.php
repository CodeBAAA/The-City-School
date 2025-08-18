<?php
// send_contact.php
declare(strict_types=1);

// Composer autoload (PHPMailer)
require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ---------- VALIDACIÓN BÁSICA ----------
$honeypot = trim($_POST['website'] ?? '');
$name     = trim($_POST['name'] ?? '');
$email    = trim($_POST['email'] ?? '');
$subject  = trim($_POST['subject'] ?? '');
$message  = trim($_POST['message'] ?? '');

// Honeypot: si está relleno, es bot
if ($honeypot !== '') {
  http_response_code(200);
  exit('OK'); // Silencioso
}

// Validaciones
if ($name === '' || $subject === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  exit('Datos inválidos.');
}

// Sanitizar (defensa XSS en el cuerpo HTML)
$h = fn($s) => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

// ---------- CONFIG SMTP (HOSTINGER) ----------
$SMTP_HOST = 'smtp.hostinger.com';
$SMTP_USER = 'admisiones@thecityschool.edu.pa';     // <-- cambia a tu buzón
$SMTP_PASS = 'Gg9&7ycby!';            // <-- cambia a tu clave
$PORT_SSL  = 465;                           // SSL recomendado
$PORT_TLS  = 587;                           // Alternativa (STARTTLS)
$USE_TLS   = false;                         // true => 587 (STARTTLS). false => 465 (SSL)

$TO_EMAIL  = 'admisiones@thecityschool.edu.pa';     // <-- destinatario (tu misma bandeja)
$TO_NAME   = 'Admisiones The City School';  // opcional

try {
  $mail = new PHPMailer(true);
  $mail->CharSet   = 'UTF-8';
  $mail->isSMTP();
  $mail->Host      = $SMTP_HOST;
  $mail->SMTPAuth  = true;
  $mail->Username  = $SMTP_USER;
  $mail->Password  = $SMTP_PASS;

  if ($USE_TLS) {
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $PORT_TLS;
  } else {
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = $PORT_SSL;
  }

  // Remitente: SIEMPRE de tu dominio para evitar bloqueos SPF/DKIM
  $mail->setFrom($SMTP_USER, 'Formulario Web');
  // Para responder al visitante
  $mail->addReplyTo($email, $name);

  // Destinatario
  $mail->addAddress($TO_EMAIL, $TO_NAME);

  // Contenido
  $mail->isHTML(true);
  $mail->Subject = 'Contacto Web: ' . $subject;
  $mail->Body = '
    <h2>Nuevo mensaje desde el sitio web</h2>
    <p><strong>Nombre:</strong> ' . $h($name) . '</p>
    <p><strong>Correo:</strong> ' . $h($email) . '</p>
    <p><strong>Asunto:</strong> ' . $h($subject) . '</p>
    <p><strong>Mensaje:</strong><br>' . nl2br($h($message)) . '</p>
    <hr>
    <small>Enviado el ' . date('Y-m-d H:i:s') . '</small>
  ';
  $mail->AltBody = "Nombre: $name\nCorreo: $email\nAsunto: $subject\nMensaje:\n$message";

  $mail->send();

  // Redirección a página de gracias (opcional)
  header('Location: /gracias.html'); // crea esta página si quieres
  exit;
} catch (Exception $e) {
  http_response_code(500);
  echo 'No se pudo enviar el correo. Error: ' . $mail->ErrorInfo;
}
