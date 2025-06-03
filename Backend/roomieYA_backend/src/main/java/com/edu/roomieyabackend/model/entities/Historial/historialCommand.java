package com.edu.roomieyabackend.model.entities.Historial;

import com.edu.roomieyabackend.model.interfaces.Command;
import com.edu.roomieyabackend.repository.LecturaAnuncioRepository;

public class historialCommand implements Command {
    private final LecturaAnuncioRepository lecturaAnuncioRepository;
    private final Long anuncioId;

    public historialCommand(LecturaAnuncioRepository lecturaAnuncioRepository, Long anuncioId) {
        this.lecturaAnuncioRepository = lecturaAnuncioRepository;
        this.anuncioId = anuncioId;
    }

    @Override
    public Object ejecutar() {
        return lecturaAnuncioRepository.obtenerHistorialPorAnuncioId(anuncioId);
    }
}
