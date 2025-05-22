package com.edu.roomieyabackend.model.interfaces;

import com.edu.roomieyabackend.dto.CrearAnuncioRequestDTO;
import com.edu.roomieyabackend.model.Inmueble;
import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Usuario;

public interface AnuncioTipoStrategy {
    Anuncio inicializar(CrearAnuncioRequestDTO dto, Usuario creador, Inmueble inmueble);
}
