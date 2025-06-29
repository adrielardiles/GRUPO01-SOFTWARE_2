package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "caracteristicas")
@Data
public class Caracteristica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
}
