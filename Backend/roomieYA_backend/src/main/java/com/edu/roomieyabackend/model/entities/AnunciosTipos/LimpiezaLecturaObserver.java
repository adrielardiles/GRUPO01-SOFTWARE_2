package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.model.Enums.TipoEventoAnuncio;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.interfaces.ObserverAnuncio;
import com.edu.roomieyabackend.repository.LecturaAnuncioRepository;
import org.springframework.stereotype.Component;

@Component
public class LimpiezaLecturaObserver implements ObserverAnuncio {

    private final LecturaAnuncioRepository lecturaAnuncioRepository;

    public LimpiezaLecturaObserver(LecturaAnuncioRepository lecturaAnuncioRepository) {
        this.lecturaAnuncioRepository = lecturaAnuncioRepository;
    }

    @Override
    public void actualizar(Anuncio anuncio, TipoEventoAnuncio tipoEvento) {
        if (tipoEvento != TipoEventoAnuncio.ELIMINACION) return;

        lecturaAnuncioRepository.deleteByAnuncioId(anuncio.getId());
        System.out.println("🧹 Registros de lectura eliminados para el anuncio ID: " + anuncio.getId());
    }
}
