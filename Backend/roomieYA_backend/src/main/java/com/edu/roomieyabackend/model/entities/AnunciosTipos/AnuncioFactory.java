package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
import com.edu.roomieyabackend.model.Inmueble;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Usuario;
import org.springframework.stereotype.Component;

@Component
public class AnuncioFactory {

    private final AnuncioStrategyRegistry registry;

    public AnuncioFactory(AnuncioStrategyRegistry registry) {
        this.registry = registry;
    }

    public Anuncio crearDesdeDTO(CrearAnuncioRequestDTO dto, Usuario creador, Inmueble inmueble) {
        return registry.getStrategy(dto.tipo).inicializar(dto, creador, inmueble);
    }
}

