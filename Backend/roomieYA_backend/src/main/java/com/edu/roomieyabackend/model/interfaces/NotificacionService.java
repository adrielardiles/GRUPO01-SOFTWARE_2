package com.edu.roomieyabackend.model.interfaces;

import com.edu.roomieyabackend.model.entities.Usuario;

public interface NotificacionService {
    void enviar(Usuario destinatario, String mensaje);
}
