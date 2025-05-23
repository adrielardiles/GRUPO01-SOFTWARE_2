package com.edu.roomieyabackend.controller;

import jakarta.mail.internet.MimeMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestEmailController {

    private final JavaMailSender mailSender;

    public TestEmailController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @GetMapping("/test-email")
    public ResponseEntity<String> enviarCorreoPrueba() {
        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");
            helper.setTo("20211617@aloe.ulima.edu.pe");
            helper.setFrom("8da294001@smtp-brevo.com");
            helper.setSubject("Prueba RoomieYA");
            helper.setText("Esto es una prueba de envío de correo desde Spring Boot.");
            mailSender.send(mensaje);
            return ResponseEntity.ok("Correo enviado");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al enviar: " + e.getMessage());
        }
    }
}
