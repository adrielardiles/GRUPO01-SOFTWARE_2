package com.edu.roomieyabackend.model.interfaces;

import com.edu.roomieyabackend.model.Enums.TipoEventoAnuncio;
import com.edu.roomieyabackend.model.entities.Anuncio;

public interface ObserverAnuncio {
    void actualizar(Anuncio anuncio, TipoEventoAnuncio tipo);
}

