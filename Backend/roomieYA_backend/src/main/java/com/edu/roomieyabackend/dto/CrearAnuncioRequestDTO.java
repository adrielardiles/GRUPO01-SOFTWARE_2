package com.edu.roomieyabackend.dto;

import com.edu.roomieyabackend.model.Enums.TipoAnuncio;

import java.time.LocalDateTime;

public class CrearAnuncioRequestDTO {
    public String titulo;
    public String descripcion;
    public TipoAnuncio tipo;
    public boolean requiereConfirmacion;
    public String archivoAdjuntoUrl;
    public Long inmuebleId;
    public Long creadorId;
    public LocalDateTime fechaProgramada; // opcional
}