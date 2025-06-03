package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.LecturaAnuncio;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.Command;
import com.edu.roomieyabackend.repository.AnuncioRepository;
import com.edu.roomieyabackend.repository.LecturaAnuncioRepository;
import com.edu.roomieyabackend.repository.UsuarioRepository;

public class MarcarAnuncioComoLeidoCommand implements Command<Void> {

    private final Long anuncioId;
    private final Long usuarioId;
    private final AnuncioRepository anuncioRepository;
    private final UsuarioRepository usuarioRepository;
    private final LecturaAnuncioRepository lecturaAnuncioRepository;

    public MarcarAnuncioComoLeidoCommand(
            Long anuncioId,
            Long usuarioId,
            AnuncioRepository anuncioRepository,
            UsuarioRepository usuarioRepository,
            LecturaAnuncioRepository lecturaAnuncioRepository
    ) {
        this.anuncioId = anuncioId;
        this.usuarioId = usuarioId;
        this.anuncioRepository = anuncioRepository;
        this.usuarioRepository = usuarioRepository;
        this.lecturaAnuncioRepository = lecturaAnuncioRepository;
    }

    @Override
    public Void ejecutar() {
        Anuncio anuncio = anuncioRepository.findById(anuncioId)
                .orElseThrow(() -> new IllegalArgumentException("Anuncio no encontrado"));

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        LecturaAnuncio lectura = lecturaAnuncioRepository
                .findByAnuncioIdAndUsuarioId(anuncioId, usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Lectura no encontrada"));

        // Solo actualizar si aún no está marcado
        if (!lectura.isLeido()) {
            lectura.setLeido(true);
            lectura.setFechaLectura(java.time.LocalDateTime.now());

            if (anuncio.getTipo() == TipoAnuncio.URGENTE) {
                lectura.setConfirmacionLectura(true);
            }

            lecturaAnuncioRepository.save(lectura);
        }

        return null;
    }


}