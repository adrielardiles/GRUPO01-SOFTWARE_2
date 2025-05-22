package com.edu.roomieyabackend.model.interfaces;

import com.edu.roomieyabackend.model.entities.Anuncio;
import com.edu.roomieyabackend.model.entities.Usuario;

import java.util.List;

public interface DestinatarioService {
    List<Usuario> obtenerPara(Anuncio anuncio);
}
