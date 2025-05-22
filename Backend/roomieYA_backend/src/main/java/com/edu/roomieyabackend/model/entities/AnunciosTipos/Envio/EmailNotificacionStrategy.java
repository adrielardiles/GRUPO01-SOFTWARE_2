package com.edu.roomieyabackend.model.entities.AnunciosTipos.Envio;


import com.edu.roomieyabackend.model.Enums.CanalNotificacion;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.RegistrableCanalStrategy;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component("EMAIL")
public class EmailNotificacionStrategy implements RegistrableCanalStrategy {

    private final JavaMailSender mailSender;

    public EmailNotificacionStrategy(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void enviar(Usuario destinatario, String mensaje) {
        if (destinatario.getCorreo() == null || destinatario.getCorreo().isBlank()) {
            System.err.println("Usuario sin correo electrónico");
            return;
        }

        try {
            MimeMessage mimeMessage = construirCorreo(destinatario, mensaje);
            mailSender.send(mimeMessage);
            System.out.println("Email HTML enviado a " + destinatario.getCorreo());
        } catch (MessagingException e) {
            System.err.println("Error al enviar correo HTML: " + e.getMessage());
        }
    }

    private MimeMessage construirCorreo(Usuario destinatario, String mensaje) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(destinatario.getCorreo());
        helper.setSubject("Notificación de RoomieYA");
        helper.setFrom("8da294001@smtp-brevo.com"); // O correo verificado como noreply@roomieya.com
        helper.setText(generarContenidoHtml(mensaje), true);

        return mimeMessage;
    }

    private String generarContenidoHtml(String mensaje) {
        return """
            <html>
              <body style='font-family: Arial, sans-serif;'>
                <h2 style='color: #2D9CDB;'>¡Nueva notificación!</h2>
                <p style='font-size: 16px;'>%s</p>
                <hr>
                <p style='font-size: 12px; color: #888;'>Este mensaje fue enviado automáticamente por RoomieYA.</p>
              </body>
            </html>
        """.formatted(mensaje);
    }

    @Override
    public CanalNotificacion getCanal() {
        return CanalNotificacion.EMAIL;
    }
}

