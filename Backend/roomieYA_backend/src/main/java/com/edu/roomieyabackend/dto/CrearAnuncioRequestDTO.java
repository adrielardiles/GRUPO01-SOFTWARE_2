package com.edu.roomieyabackend.dto;

import com.edu.roomieyabackend.model.Enums.TipoAnuncio;

import java.time.LocalDateTime;

public class CrearAnuncioRequestDTO {
    public Long creadorId;
    public Long inmuebleId;
    public String titulo;
    public String descripcion;
    public String tipo; // Enum (ej. GENERAL, URGENCIA...)
    public String archivoAdjuntoUrl;
}
