//package com.edu.roomieyabackend.service;
//
//import com.edu.roomieyabackend.model.entities.Anuncio;
//import com.edu.roomieyabackend.model.entities.Usuario;
//import org.springframework.stereotype.Service;
//
//@Service
//public class NotificacionService {
//
//    public void enviar(Usuario destinatario, String mensaje) {
//        // Aquí puedes reemplazar esto con lógica real de notificación (correo, push, etc.)
//        System.out.println("🔔 Notificación para " + destinatario.getNombreCompleto() + ": " + mensaje);
//    }
//
//    public void enviarAnuncio(Usuario destinatario, Anuncio anuncio) {
//        String msg = "Nuevo anuncio publicado: '" + anuncio.getTitulo() + "' en el inmueble " +
//                anuncio.getInmueble().getNombre();
//        enviar(destinatario, msg);
//    }
//}