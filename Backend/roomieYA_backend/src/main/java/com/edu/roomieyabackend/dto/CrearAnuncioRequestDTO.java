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
    private TipoAnuncio tipo;

    private LocalDateTime fechaProgramada;
}