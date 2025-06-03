package com.edu.roomieyabackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class NotificacionCorreoService {

    @Autowired
    private JavaMailSender mailSender;
    private static final Logger logger = LoggerFactory.getLogger(NotificacionCorreoService.class);
    public NotificacionCorreoService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    public void enviarCorreoCancelacion(String to, String nombre, String fecha, String hora) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Cancelación de cita");
        message.setText("Hola " + nombre + ", tu cita para el " + fecha + " a las " + hora + " ha sido cancelada.");

        logger.info("Intentando enviar correo de cancelación a {}", to); // <--- LOG IMPORTANTE

        mailSender.send(message);

        logger.info("Correo enviado a {}", to); // <--- LOG IMPORTANTE
    }

    public void enviarCorreoRecordatorio(String emailDestino, String nombre, String fecha, String hora) {
        System.out.println(">>>> Va a enviar correo a: " + emailDestino);
        logger.info("Intentando enviar correo de recordatorio a {}", emailDestino);
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(emailDestino);
        mensaje.setSubject("Recordatorio de cita");
        mensaje.setText("Hola " + nombre + ",\n\nTe recordamos que tienes una cita programada para el día " + fecha + " a las " + hora + ".\n\nSaludos,\nEquipo RoomieYa");
        mailSender.send(mensaje);
        logger.info("Correo de recordatorio enviado a {}", emailDestino);
    }
}
