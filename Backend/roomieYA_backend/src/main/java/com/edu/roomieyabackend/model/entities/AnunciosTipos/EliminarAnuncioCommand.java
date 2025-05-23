package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.interfaces.Command;
import com.edu.roomieyabackend.repository.AnuncioRepository;
import com.edu.roomieyabackend.repository.LecturaAnuncioRepository;

public class EliminarAnuncioCommand implements Command<Void> {

    private final Long anuncioId;
    private final AnuncioRepository anuncioRepository;
    private final LecturaAnuncioRepository lecturaAnuncioRepository;

    public EliminarAnuncioCommand(
            Long anuncioId,
            AnuncioRepository anuncioRepository,
            LecturaAnuncioRepository lecturaAnuncioRepository
    ) {
        this.anuncioId = anuncioId;
        this.anuncioRepository = anuncioRepository;
        this.lecturaAnuncioRepository = lecturaAnuncioRepository;
    }

    @Override
    public Void ejecutar() {
        Anuncio anuncio = anuncioRepository.findById(anuncioId)
                .orElseThrow(() -> new IllegalArgumentException("Anuncio no encontrado"));

        boolean haSidoLeido = lecturaAnuncioRepository.existsByAnuncioId(anuncio.getId());

        if (haSidoLeido) {
            throw new IllegalStateException("No se puede eliminar el anuncio porque ya ha sido leído por al menos un usuario.");
        }

        anuncioRepository.delete(anuncio);
        return null;
    }
}
