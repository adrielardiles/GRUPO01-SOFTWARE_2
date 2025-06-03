package com.edu.roomieyabackend.dto;

public class ModificarAnuncioRequestDTO {

    private Long usuarioId; // ID del arrendador que solicita la modificación
    private String titulo;
    private String mensaje;
    private String tipo; // Ej: "URGENTE", "COMUNICADO", "EVENTO"

    public ModificarAnuncioRequestDTO() {
    }

    public ModificarAnuncioRequestDTO(Long usuarioId, String titulo, String mensaje, String tipo) {
        this.usuarioId = usuarioId;
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.tipo = tipo;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
