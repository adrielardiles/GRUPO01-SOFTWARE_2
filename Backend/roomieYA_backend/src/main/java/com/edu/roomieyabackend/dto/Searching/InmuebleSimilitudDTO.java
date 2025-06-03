package com.edu.roomieyabackend.dto.Searching;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class InmuebleSimilitudDTO {
    // Datos del inmueble
    private Long id;
    private String nombre;
    private String direccion;
    private String tipoInmueble;  // tipo textual, como "departamento"
    private Integer tamano;
    private Double precio;
    private String servicios;
    private String descripcion;
    private Double similitud;
    private String imagenUrl;
    private Double latitud;
    private Double longitud;

    // Datos de explicación del match
    private Boolean tipo;                // ¿Coincide tipo?
    private Boolean precioE;             // ¿Coincide precio?
    private Boolean ubicacionExacta;    // ¿Ubicación exacta?
    private Boolean ubicacionCercana;   // ¿Ubicación cercana (< 2km)?
    private List<String> serviciosCoincidentes; // Servicios que coincidieron

}
