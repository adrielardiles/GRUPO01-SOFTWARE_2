package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.model.entities.LecturaAnuncio;
import com.edu.roomieyabackend.model.interfaces.Command;
import com.edu.roomieyabackend.repository.LecturaAnuncioRepository;

public class ConfirmarLecturaUrgenteCommand implements Command<Void> {

    private final Long anuncioId;
    private final Long usuarioId;
    private final LecturaAnuncioRepository lecturaAnuncioRepository;

    public ConfirmarLecturaUrgenteCommand(Long anuncioId, Long usuarioId, LecturaAnuncioRepository lecturaAnuncioRepository) {
        this.anuncioId = anuncioId;
        this.usuarioId = usuarioId;
        this.lecturaAnuncioRepository = lecturaAnuncioRepository;
    }

    @Override
    public Void ejecutar() {
        LecturaAnuncio lectura = lecturaAnuncioRepository
                .findByAnuncioIdAndUsuarioId(anuncioId, usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Lectura no encontrada"));

        lectura.setLeido(true);
        lectura.setConfirmacionLectura(true);
        lectura.setFechaLectura(java.time.LocalDateTime.now());

        lecturaAnuncioRepository.save(lectura);

        return null;
    }

}