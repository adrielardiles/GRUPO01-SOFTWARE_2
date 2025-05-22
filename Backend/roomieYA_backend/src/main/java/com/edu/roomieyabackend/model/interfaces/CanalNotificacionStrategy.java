package com.edu.roomieyabackend.model.interfaces;

import com.edu.roomieyabackend.model.entities.Usuario;

public interface CanalNotificacionStrategy {
    void enviar(Usuario destinatario, String mensaje);
}
