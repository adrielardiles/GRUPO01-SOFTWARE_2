package com.edu.roomieyabackend.model.entities.AnunciosTipos;


import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.DestinatarioService;
import com.edu.roomieyabackend.model.interfaces.NotificacionService;
import com.edu.roomieyabackend.model.interfaces.ObserverAnuncio;

import java.util.List;

public class NotificacionObserver implements ObserverAnuncio {
    private final DestinatarioService destinatarioService;
    private final NotificacionService notificacionService;

    public NotificacionObserver(DestinatarioService destinatarioService, NotificacionService notificacionService) {
        this.destinatarioService = destinatarioService;
        this.notificacionService = notificacionService;
    }

    @Override
    public void actualizar(Anuncio anuncio) {
        List<Usuario> destinatarios = destinatarioService.obtenerPara(anuncio);
        for (Usuario u : destinatarios) {
            notificacionService.enviar(u, "Nuevo anuncio: " + anuncio.getTitulo());
        }
    }

}

