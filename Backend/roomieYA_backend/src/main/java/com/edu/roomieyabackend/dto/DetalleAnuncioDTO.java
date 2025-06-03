package com.edu.roomieyabackend.dto;

public class DetalleAnuncioDTO {

    private Long id;
    private String titulo;
    private String mensaje;
    private String tipo; // Ej: "URGENTE", "COMUNICADO"
    private String fechaPublicacion; // Formato: dd-MM-yyyy
    private String nombreCreador;
    private boolean isRead;

    public DetalleAnuncioDTO(Long id, String titulo, String mensaje, String tipo, String fechaPublicacion, String nombreCreador, boolean isRead) {
        this.id = id;
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.tipo = tipo;
        this.fechaPublicacion = fechaPublicacion;
        this.nombreCreador = nombreCreador;
        this.isRead = isRead;
    }


    private boolean confirmacionLectura;

    public boolean isConfirmacionLectura() {
        return confirmacionLectura;
    }

    public void setConfirmacionLectura(boolean confirmacionLectura) {
        this.confirmacionLectura = confirmacionLectura;
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

    public String getTipo() {
        return tipo;
    }

    public String getFechaPublicacion() {
        return fechaPublicacion;
    }

    public String getNombreCreador() {
        return nombreCreador;
    }

    public boolean isRead() {
        return isRead;
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

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setFechaPublicacion(String fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    public void setNombreCreador(String nombreCreador) {
        this.nombreCreador = nombreCreador;
    }

    public void setRead(boolean read) {
        isRead = read;
    }
}
