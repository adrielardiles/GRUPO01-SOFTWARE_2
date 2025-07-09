package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "reglas")
@Data
public class Regla {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String texto;

    private String categoria;  // puede ser opcional

    private boolean aceptada = false; // default false, para saber si fue aceptada o no
}

