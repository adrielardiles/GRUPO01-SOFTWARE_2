package com.edu.roomieyabackend.dto;

import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CrearAnuncioRequestDTO {
    private Long creadorId;
    private Long inmuebleId;
    private String titulo;
    private String descripcion;
    private String tipo; // o TipoAnuncio si ya hiciste el cambio
    private String archivoAdjuntoUrl;

    private LocalDateTime fechaProgramada;
    private boolean requiereConfirmacion;
}