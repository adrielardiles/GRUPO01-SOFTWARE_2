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

    // Atributos del Inmueble asociado
    private Long inmuebleId;
    private String nombreInmueble;
    private String direccion;
    private String tipo;
    private String provincia;
    private String distrito;
    private String imagenurl;

    public static PublicacionTRDTO fromEntity(PublicacionTREntity entity) {
        PublicacionTRDTO dto = new PublicacionTRDTO();
        dto.setId(entity.getId());
        dto.setArrendatario(entity.getArrendatario());
        dto.setPrecio(entity.getPrecio());
        dto.setServicios(entity.getServicios());
        dto.setServiciosExtra(entity.getServiciosExtra());
        dto.setReferenciasExtra(entity.getReferenciasExtra());

        if (entity.getInmueble() != null) {
            dto.setInmuebleId(entity.getInmueble().getId());
            dto.setNombreInmueble(entity.getInmueble().getNombre());
            dto.setDireccion(entity.getInmueble().getDireccion());
            dto.setTipo(entity.getInmueble().getTipo());
            dto.setProvincia(entity.getInmueble().getProvincia());
            dto.setDistrito(entity.getInmueble().getDistrito());
            dto.setImagenurl(entity.getInmueble().getImagenurl());
        }
        return dto;
    }
}
