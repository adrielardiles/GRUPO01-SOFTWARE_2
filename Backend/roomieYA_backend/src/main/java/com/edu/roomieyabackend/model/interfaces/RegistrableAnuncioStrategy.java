package com.edu.roomieyabackend.model.interfaces;

import com.edu.roomieyabackend.model.Enums.TipoAnuncio;

public interface RegistrableAnuncioStrategy extends AnuncioTipoStrategy {
    TipoAnuncio tipo(); // clave para el registry
}