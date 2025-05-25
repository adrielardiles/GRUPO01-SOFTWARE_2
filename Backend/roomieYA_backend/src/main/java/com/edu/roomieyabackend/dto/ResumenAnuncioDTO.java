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


}