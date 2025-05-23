package com.edu.roomieyabackend.model.entities.AnunciosTipos;


import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.LecturaAnuncio;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.DestinatarioService;
import com.edu.roomieyabackend.model.interfaces.NotificacionService;
import com.edu.roomieyabackend.model.interfaces.ObserverAnuncio;
import com.edu.roomieyabackend.repository.LecturaAnuncioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;


import java.util.List;

@Component
public class NotificacionObserver implements ObserverAnuncio {
    private final DestinatarioService destinatarioService;
    private final NotificacionService notificacionService;
    private final LecturaAnuncioRepository lecturaAnuncioRepository;

    public NotificacionObserver(DestinatarioService destinatarioService, NotificacionService notificacionService, LecturaAnuncioRepository lecturaAnuncioRepository) {
        this.destinatarioService = destinatarioService;
        this.notificacionService = notificacionService;
        this.lecturaAnuncioRepository = lecturaAnuncioRepository;
    }

    @Transactional
    @Override
    public void actualizar(Anuncio anuncio) {
        List<Usuario> destinatarios = destinatarioService.obtenerPara(anuncio);

        for (Usuario u : destinatarios) {
            // Crear entrada en lectura_anuncio si no existe
            if (!lecturaAnuncioRepository.existsByAnuncioIdAndUsuarioId(anuncio.getId(), u.getId())) {
                LecturaAnuncio lectura = new LecturaAnuncio();
                lectura.setAnuncio(anuncio);
                lectura.setUsuario(u);
                lectura.setLeido(false);
                lectura.setConfirmacionLectura(false);
                lectura.setFechaLectura(null);
                lecturaAnuncioRepository.save(lectura);
            }

            // Enviar notificación
            notificacionService.enviar(u, "Nuevo anuncio: " + anuncio.getTitulo());
        }



        Usuario creador = anuncio.getCreador();
        if (!lecturaAnuncioRepository.existsByAnuncioIdAndUsuarioId(anuncio.getId(), creador.getId())) {
            LecturaAnuncio lecturaArrendador = new LecturaAnuncio();
            lecturaArrendador.setAnuncio(anuncio);
            lecturaArrendador.setUsuario(creador);
            lecturaArrendador.setLeido(true); // ya lo ha leído
            lecturaArrendador.setConfirmacionLectura(false); // no aplica
            lecturaArrendador.setFechaLectura(java.time.LocalDateTime.now());
            lecturaAnuncioRepository.save(lecturaArrendador);
            System.out.println("Lectura creada para arrendador: " + creador.getNombreCompleto());
        }
    }


}

