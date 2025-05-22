package com.edu.roomieyabackend.dto;

import com.edu.roomieyabackend.model.Enums.EstadoAnuncio;
import com.edu.roomieyabackend.model.Enums.TipoAnuncio;

import java.time.LocalDateTime;

public class AnuncioDTO {
    public Long id;
    public String titulo;
    public String descripcion;
    public TipoAnuncio tipo;
    public boolean leido;
    public boolean requiereConfirmacion;
    public LocalDateTime fechaPublicacion;
    public String archivoAdjuntoUrl;
    public String nombreCreador;
    public EstadoAnuncio estado;
}
