package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreCompleto;

    private String telefono;

    @Column(unique = true)
    private String correo;

    private boolean activo;

    // Anuncios que ha creado (solo para relación inversa opcional)
    @OneToMany(mappedBy = "creador")
    private List<Anuncio> anunciosCreados;

    @OneToMany(mappedBy = "usuario")
    private List<UsuarioInmueble> inmueblesAsociados;

    // Getters y setters
}