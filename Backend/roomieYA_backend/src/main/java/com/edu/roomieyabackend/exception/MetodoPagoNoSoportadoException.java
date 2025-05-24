package com.edu.roomieyabackend.exception;

public class MetodoPagoNoSoportadoException extends RuntimeException {
    public MetodoPagoNoSoportadoException(String mensaje) {
        super(mensaje);
    }
}
