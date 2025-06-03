package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.Command;
import com.edu.roomieyabackend.repository.AnuncioRepository;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import com.edu.roomieyabackend.repository.UsuarioRepository;


public class CrearAnuncioCommand implements Command<Anuncio> {

    private final CrearAnuncioRequestDTO dto;
    private final UsuarioRepository usuarioRepository;
    private final InmuebleRepository inmuebleRepository;
    private final AnuncioRepository anuncioRepository;
    private final AnuncioFacade anuncioFacade;

    public CrearAnuncioCommand(
            CrearAnuncioRequestDTO dto,
            UsuarioRepository usuarioRepository,
            InmuebleRepository inmuebleRepository,
            AnuncioRepository anuncioRepository,
            AnuncioFacade anuncioFacade
    ) {
        this.dto = dto;
        this.usuarioRepository = usuarioRepository;
        this.inmuebleRepository = inmuebleRepository;
        this.anuncioRepository = anuncioRepository;
        this.anuncioFacade = anuncioFacade;
    }


    @Override
    public Anuncio ejecutar() {
        Usuario creador = usuarioRepository.findById(dto.getCreadorId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        Inmueble inmueble = inmuebleRepository.findById(dto.getInmuebleId())
                .orElseThrow(() -> new IllegalArgumentException("Inmueble no encontrado"));

        Anuncio anuncio = anuncioFacade.crearDesdeDTO(dto, creador, inmueble);
        Anuncio anuncioGuardado = anuncioRepository.save(anuncio);

        return anuncioGuardado;
    }
}