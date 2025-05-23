package com.edu.roomieyabackend.dto;

import com.edu.roomieyabackend.model.Enums.TipoAnuncio;

import java.time.LocalDateTime;

public class AnuncioModificadoDTO {

    private Long id;
    private String titulo;
    private String mensaje;
    private TipoAnuncio tipo;
    private LocalDateTime fechaPublicacion;
    private String nombreCreador;

    public AnuncioModificadoDTO() {}

    public AnuncioModificadoDTO(Long id, String titulo, String mensaje, TipoAnuncio tipo, LocalDateTime fechaPublicacion, String nombreCreador) {
        this.id = id;
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.tipo = tipo;
        this.fechaPublicacion = fechaPublicacion;
        this.nombreCreador = nombreCreador;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getMensaje() {
        return mensaje;
    }

    public TipoAnuncio getTipo() {
        return tipo;
    }

    public LocalDateTime getFechaPublicacion() {
        return fechaPublicacion;
    }

    public String getNombreCreador() {
        return nombreCreador;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public void setTipo(TipoAnuncio tipo) {
        this.tipo = tipo;
    }

    public void setFechaPublicacion(LocalDateTime fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    public void setNombreCreador(String nombreCreador) {
        this.nombreCreador = nombreCreador;
    }
}
