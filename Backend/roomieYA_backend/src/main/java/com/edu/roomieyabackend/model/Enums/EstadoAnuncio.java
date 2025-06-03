package com.edu.roomieyabackend.model.Enums;

public enum EstadoAnuncio {
    ACTIVO,
    PROGRAMADO,
    ELIMINADO,
    PUBLICADO;


    public boolean esPublicado() {
        return this == PUBLICADO;
    }

}
