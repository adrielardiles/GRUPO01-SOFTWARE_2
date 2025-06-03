package com.edu.roomieyabackend.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class CrearPublicacionTRDTO {
    private String arrendatario;
    private Double precio;
    private List<String> servicios;
    private String serviciosExtra;
    private String referenciasExtra;
    private Long inmuebleId;
}
