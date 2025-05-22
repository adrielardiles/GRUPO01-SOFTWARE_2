package com.edu.roomieyabackend.model.entities.AnunciosTipos.Envio;

import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.CanalNotificacionStrategy;
import org.springframework.stereotype.Component;

@Component("EMAIL")
public class EmailNotificacionStrategy implements CanalNotificacionStrategy {

    @Override
    public void enviar(Usuario destinatario, String mensaje) {
        // Aquí iría la integración real con JavaMail o un servicio externo
        System.out.println("✉️ Email enviado a " + destinatario.getCorreo() + ": " + mensaje);
    }
}
