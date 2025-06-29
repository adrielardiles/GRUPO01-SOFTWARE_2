package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "provincias")
@Data
public class Provincia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
}
