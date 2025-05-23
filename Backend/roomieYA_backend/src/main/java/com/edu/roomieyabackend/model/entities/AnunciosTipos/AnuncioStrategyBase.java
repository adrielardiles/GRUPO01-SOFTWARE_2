package com.edu.roomieyabackend.model.entities.AnunciosTipos;

import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.model.entities.Usuario;
import com.edu.roomieyabackend.model.interfaces.AnuncioTipoStrategy;

public abstract class AnuncioStrategyBase implements AnuncioTipoStrategy {

    protected Anuncio crearBase(CrearAnuncioRequestDTO dto, Usuario c, Inmueble i) {
        Anuncio a = new Anuncio();
        a.setTitulo(dto.getTitulo());
        a.setDescripcion(dto.getDescripcion());
        a.setTipo(TipoAnuncio.valueOf(dto.getTipo()));
        a.setArchivoAdjuntoUrl(dto.getArchivoAdjuntoUrl());
        a.setCreador(c);
        a.setInmueble(i);
        return a;
    }
}
