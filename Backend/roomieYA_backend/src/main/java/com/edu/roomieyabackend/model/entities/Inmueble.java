package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;
import lombok.Data;

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
    private String ubicacion;
    private Integer tamano;
    private Double precio;
    private String servicios;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private Boolean privado = true;

    @OneToMany(mappedBy = "inmueble")
    private List<Anuncio> anuncios;

    @OneToMany(mappedBy = "inmueble")
    private List<UsuarioInmueble> usuariosAsociados;
}
