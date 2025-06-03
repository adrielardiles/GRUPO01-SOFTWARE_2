package com.edu.roomieyabackend.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "inmuebles")
@Data
public class Inmueble {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String direccion;
    private String tipo;
    private Integer tamano;
    private Double precio;
    private String servicios;
    private Double latitud;
    private Double longitud;


    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @OneToMany(mappedBy = "inmueble")
    @JsonIgnore
    private List<Anuncio> anuncios;

    @OneToMany(mappedBy = "inmueble")
    @JsonIgnore
    private List<UsuarioInmueble> usuariosAsociados;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(columnDefinition = "TEXT")
    private String embeddingJson;

    @Column(name = "imagen")
    private String imagenurl;
}
