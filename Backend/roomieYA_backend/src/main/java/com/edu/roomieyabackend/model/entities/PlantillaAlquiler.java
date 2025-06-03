package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class PlantillaAlquiler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String arrendatario;

    private Double precio;

    @Column(columnDefinition = "TEXT")
    private String servicios;

    @Column(columnDefinition = "TEXT")
    private String serviciosExtra;

    @Column(columnDefinition = "TEXT")
    private String referenciasExtra;

    private Long inmuebleId;
}
