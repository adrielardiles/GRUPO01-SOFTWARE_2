package com.edu.roomieyabackend.model.entities.AnunciosTipos.Envio;

import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.CanalNotificacionStrategy;
import org.springframework.stereotype.Component;

@Component("WHATSAPP")
public class WhatsappNotificacionStrategy implements CanalNotificacionStrategy {

    @Override
    public void enviar(Usuario destinatario, String mensaje) {
        // Aquí iría la integración real con Twilio API, Meta Graph API, etc.
        System.out.println("📱 WhatsApp enviado a " + destinatario.getTelefono() + ": " + mensaje);
    }
}
