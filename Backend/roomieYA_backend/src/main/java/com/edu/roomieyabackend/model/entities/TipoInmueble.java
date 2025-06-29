package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tipos_inmueble")
@Data
public class TipoInmueble {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
}