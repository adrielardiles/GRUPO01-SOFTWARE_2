package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "distritos")
@Data
public class Distrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @ManyToOne
    @JoinColumn(name = "provincia_id")
    private Provincia provincia;
}
