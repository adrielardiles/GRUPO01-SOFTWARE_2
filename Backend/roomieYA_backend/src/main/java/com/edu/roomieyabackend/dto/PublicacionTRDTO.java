package com.edu.roomieyabackend.dto;

import com.edu.roomieyabackend.model.PublicacionTREntity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PublicacionTRDTO {
    private Long id;
    private String arrendatario;
    private Double precio;
    private List<String> servicios;
    private String serviciosExtra;
    private String referenciasExtra;
    private String nombreInmueble;
    private String ubicacion;

    public static PublicacionTRDTO fromEntity(PublicacionTREntity entity) {
        PublicacionTRDTO dto = new PublicacionTRDTO();
        dto.setId(entity.getId());
        dto.setArrendatario(entity.getArrendatario());
        dto.setPrecio(entity.getPrecio());
        dto.setServicios(entity.getServicios());
        dto.setServiciosExtra(entity.getServiciosExtra());
        dto.setReferenciasExtra(entity.getReferenciasExtra());
        if (entity.getInmueble() != null) {
            dto.setNombreInmueble(entity.getInmueble().getNombre());
            dto.setUbicacion(entity.getInmueble().getUbicacion());
        }
        return dto;
    }
}
