package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
import com.edu.roomieyabackend.model.Enums.EstadoAnuncio;
import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.AnuncioTipoStrategy;

import java.time.LocalDateTime;

public abstract class AnuncioStrategyBase implements AnuncioTipoStrategy {

    protected Anuncio crearBase(CrearAnuncioRequestDTO dto, Usuario c, Inmueble i) {
        Anuncio a = new Anuncio();
        a.setTitulo(dto.getTitulo());
        a.setDescripcion(dto.getDescripcion());
        a.setTipo(TipoAnuncio.valueOf(String.valueOf(dto.getTipo())));
        a.setCreador(c);
        a.setEstado(EstadoAnuncio.PUBLICADO);
        a.setFechaPublicacion(LocalDateTime.now());
        a.setFechaPublicacion(LocalDateTime.now());
        a.setInmueble(i);
        return a;
    }
}
