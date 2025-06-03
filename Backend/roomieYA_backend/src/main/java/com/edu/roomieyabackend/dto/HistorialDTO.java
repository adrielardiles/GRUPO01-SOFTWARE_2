package com.edu.roomieyabackend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HistorialDTO {
    private String usuario;
    private LocalDateTime fechaLectura;
    private boolean leido;
    private String confirmacionLectura;

    public HistorialDTO(String usuario, LocalDateTime fechaLectura, boolean leido, String confirmacionLectura) {
        this.usuario = usuario;
        this.fechaLectura = fechaLectura;
        this.leido = leido;
        this.confirmacionLectura = confirmacionLectura;
    }

    // Getters y setters
}
