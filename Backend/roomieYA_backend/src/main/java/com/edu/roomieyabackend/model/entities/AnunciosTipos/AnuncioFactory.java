package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.AnuncioTipoStrategy;
import org.springframework.stereotype.Component;

@Component
public class AnuncioFactory {

    private final AnuncioStrategyRegistry strategyRegistry;

    public AnuncioFactory(AnuncioStrategyRegistry strategyRegistry) {
        this.strategyRegistry = strategyRegistry;
    }

    public Anuncio crearDesdeDTO(CrearAnuncioRequestDTO dto, Usuario creador, Inmueble inmueble) {
        TipoAnuncio tipo = TipoAnuncio.valueOf(dto.tipo.toUpperCase());
        AnuncioTipoStrategy strategy = strategyRegistry.getStrategy(tipo);

        if (strategy == null) {
            throw new IllegalArgumentException("No hay estrategia registrada para el tipo: " + tipo);
        }

        return strategy.inicializar(dto, creador, inmueble);
    }
}