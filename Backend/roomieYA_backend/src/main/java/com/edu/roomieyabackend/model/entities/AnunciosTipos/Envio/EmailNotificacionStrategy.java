package com.edu.roomieyabackend.model.entities.AnunciosTipos.Envio;


import com.edu.roomieyabackend.model.Enums.CanalNotificacion;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.RegistrableCanalStrategy;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
            System.err.println("❌ Usuario sin correo electrónico");
            return;
        }

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(destinatario.getCorreo());
        email.setSubject("📢 Notificación de RoomieYA");
        email.setText(mensaje);
        email.setFrom("noreply@roomieya.com"); // Cambia por tu remitente real

        mailSender.send(email);
        System.out.println("✅ Email REAL enviado a " + destinatario.getCorreo());
    }

    @Override
    public CanalNotificacion getCanal() {
        return CanalNotificacion.EMAIL;
    }
}
