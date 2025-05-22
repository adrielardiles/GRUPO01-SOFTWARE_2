package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.ObserverAnuncio;

import java.util.List;

public class NotificacionObserver implements ObserverAnuncio {

    private final NotificacionService notificacionService;

    public NotificacionObserver(NotificacionService notificacionService) {
        this.notificacionService = notificacionService;
    }

    @Override
    public void actualizar(Anuncio anuncio) {
        List<Usuario> roomies = anuncio.getInmueble().getRoomies(); // o mediante servicio
        for (Usuario roomie : roomies) {
            notificacionService.enviar(roomie, "Nuevo anuncio: " + anuncio.getTitulo());
        }
    }
}
