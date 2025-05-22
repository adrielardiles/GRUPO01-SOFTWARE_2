package com.edu.roomieyabackend.model.entities;

import com.edu.roomieyabackend.model.Enums.RolPorInmueble;
import jakarta.persistence.*;

@Entity
@Table(name = "usuario_inmueble")
public class UsuarioInmueble {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Usuario usuario;

    @ManyToOne(optional = false)
    private Inmueble inmueble;

    @Enumerated(EnumType.STRING)
    private RolPorInmueble rol;
}
