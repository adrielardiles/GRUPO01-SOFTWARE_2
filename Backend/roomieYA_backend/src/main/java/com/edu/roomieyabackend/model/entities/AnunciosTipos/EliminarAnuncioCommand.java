package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.interfaces.Command;
import com.edu.roomieyabackend.repository.AnuncioRepository;
import com.edu.roomieyabackend.repository.LecturaAnuncioRepository;
import jakarta.transaction.Transactional;

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

        boolean haSidoLeidoPorOtros = lecturaAnuncioRepository
                .existsByAnuncioIdAndUsuarioIdNotAndLeidoTrue(anuncio.getId(), anuncio.getCreador().getId());

        if (haSidoLeidoPorOtros) {
            throw new IllegalStateException("No se puede eliminar el anuncio porque ya ha sido leído por al menos un roomie.");
        }

        // 🔥 Este paso es obligatorio si no tienes cascade
        lecturaAnuncioRepository.deleteByAnuncioId(anuncio.getId());

        // Ahora puedes eliminar el anuncio
        anuncioRepository.delete(anuncio);

        return null;
    }


}
