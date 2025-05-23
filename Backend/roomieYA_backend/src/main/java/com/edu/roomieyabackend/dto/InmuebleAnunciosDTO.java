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

    public Long getPropertyId() {
        return propertyId;
    }

    public String getPropertyName() {
        return propertyName;
    }

    public String getRole() {
        return role;
    }

    public boolean isHasUnread() {
        return hasUnread;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public void setPropertyName(String propertyName) {
        this.propertyName = propertyName;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setHasUnread(boolean hasUnread) {
        this.hasUnread = hasUnread;
    }
}