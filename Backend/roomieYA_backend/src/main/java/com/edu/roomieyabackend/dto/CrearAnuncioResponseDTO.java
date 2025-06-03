package com.edu.roomieyabackend.dto;

import com.edu.roomieyabackend.model.Enums.EstadoAnuncio;
import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CrearAnuncioResponseDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private TipoAnuncio tipo;
    private EstadoAnuncio estado;
    private LocalDateTime fechaPublicacion;
    private String nombreCreador;
}