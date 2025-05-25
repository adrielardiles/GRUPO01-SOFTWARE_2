package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.dto.ModificarAnuncioRequestDTO;
import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.Command;
import com.edu.roomieyabackend.repository.AnuncioRepository;
import com.edu.roomieyabackend.repository.UsuarioRepository;

public class ModificarAnuncioCommand implements Command<Anuncio> {

    private final Long anuncioId;
    private final ModificarAnuncioRequestDTO dto;
    private final AnuncioRepository anuncioRepository;
    private final UsuarioRepository usuarioRepository;

    public ModificarAnuncioCommand(
            Long anuncioId,
            ModificarAnuncioRequestDTO dto,
            AnuncioRepository anuncioRepository,
            UsuarioRepository usuarioRepository
    ) {
        this.anuncioId = anuncioId;
        this.dto = dto;
        this.anuncioRepository = anuncioRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Anuncio ejecutar() {
        Anuncio anuncio = anuncioRepository.findById(anuncioId)
                .orElseThrow(() -> new IllegalArgumentException("Anuncio no encontrado"));

        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));


        anuncio.setTitulo(dto.getTitulo());
        anuncio.setDescripcion(dto.getMensaje());

        try {
            anuncio.setTipo(TipoAnuncio.valueOf(dto.getTipo().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Tipo de anuncio inválido");
        }

        return anuncioRepository.save(anuncio);
    }
}