package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;
import java.util.List;
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreCompleto;

    @Column(unique = true, nullable = false)
    private String correo;

    private String contrasena;

    private boolean activo;

    // Anuncios creados
    @OneToMany(mappedBy = "creador")
    private List<Anuncio> anunciosCreados;

    // Anuncios leídos
    @OneToMany(mappedBy = "roomie")
    private List<LecturaAnuncio> lecturas;
}

