package com.edu.roomieyabackend.dto;

import lombok.Data;

@Data
public class InmuebleAnunciosDTO {

    private Long propertyId;
    private String propertyName;
    private String role; // "roomie" o "arrendador"
    private boolean hasUnread;

    public InmuebleAnunciosDTO(Long propertyId, String propertyName, String role, boolean hasUnread) {
        this.propertyId = propertyId;
        this.propertyName = propertyName;
        this.role = role;
        this.hasUnread = hasUnread;
    }

}