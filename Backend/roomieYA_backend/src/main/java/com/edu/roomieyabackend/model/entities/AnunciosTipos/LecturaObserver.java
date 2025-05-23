package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.LecturaAnuncio;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.ObserverAnuncio;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import com.edu.roomieyabackend.repository.LecturaAnuncioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LecturaObserver implements ObserverAnuncio {

    private final InmuebleRepository inmuebleRepository;
    private final LecturaAnuncioRepository lecturaAnuncioRepository;

    public LecturaObserver(InmuebleRepository inmuebleRepository, LecturaAnuncioRepository lecturaAnuncioRepository) {
        this.inmuebleRepository = inmuebleRepository;
        this.lecturaAnuncioRepository = lecturaAnuncioRepository;
    }

    @Transactional
    @Override
    public void actualizar(Anuncio anuncio) {
        System.out.println("LecturaObserver invocado para anuncio: " + anuncio.getId());

        Long inmuebleId = anuncio.getInmueble().getId();
        List<Usuario> destinatarios = inmuebleRepository.obtenerRoomiesPorInmueble(inmuebleId);
        System.out.println("Roomies encontrados: " + destinatarios.size());
        for (Usuario usuario : destinatarios) {
            LecturaAnuncio lectura = new LecturaAnuncio();
            lectura.setAnuncio(anuncio);
            lectura.setUsuario(usuario);
            lectura.setLeido(false);
            lectura.setConfirmacionLectura(false);
            lecturaAnuncioRepository.save(lectura);
        }
    }
}