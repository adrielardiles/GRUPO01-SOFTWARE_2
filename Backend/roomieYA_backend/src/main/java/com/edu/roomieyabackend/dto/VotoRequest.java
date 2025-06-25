package com.edu.roomieyabackend.dto;

public class VotoRequest {
    private Long usuarioId;
    private Long opcionId;

    // Getters and Setters
    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getOpcionId() {
        return opcionId;
    }

    public void setOpcionId(Long opcionId) {
        this.opcionId = opcionId;
    }
}