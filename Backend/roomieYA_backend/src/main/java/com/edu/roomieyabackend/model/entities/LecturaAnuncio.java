package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class LecturaAnuncio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Usuario roomie;

    @ManyToOne(fetch = FetchType.LAZY)
    private Anuncio anuncio;

    private boolean leido;

    private LocalDateTime fechaLectura;
}
