package com.edu.roomieyabackend.dto;

import com.edu.roomieyabackend.model.Enums.TipoAnuncio;

import java.time.LocalDateTime;

public class CrearAnuncioRequestDTO {
    public Long creadorId;
    public Long inmuebleId;
    public String titulo;
    public String descripcion;
    public String tipo; // o TipoAnuncio si ya hiciste el cambio
    public String archivoAdjuntoUrl;

    public LocalDateTime fechaProgramada;         // ✅ Campo nuevo
    public boolean requiereConfirmacion;
}
