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
        a.setTitulo(dto.titulo);
        a.setDescripcion(dto.descripcion);
        a.setTipo(TipoAnuncio.valueOf(dto.tipo));
        a.setArchivoAdjuntoUrl(dto.archivoAdjuntoUrl);
        a.setCreador(c);
        a.setInmueble(i);
        return a;
    }
}
