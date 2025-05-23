package com.edu.roomieyabackend.dto;

import lombok.Data;

@Data
public class ResumenAnuncioDTO {

    private Long id;
    private String title;
    private String createdAt;
    private String tipo;
    private boolean isRead;

    public ResumenAnuncioDTO(Long id, String title, String createdAt, String tipo, boolean isRead) {
        this.id = id;
        this.title = title;
        this.createdAt = createdAt;
        this.tipo = tipo;
        this.isRead = isRead;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getTipo() {
        return tipo;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setRead(boolean read) {
        isRead = read;
    }
}