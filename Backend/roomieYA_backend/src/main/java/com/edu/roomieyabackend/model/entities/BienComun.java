package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "bienes_comunes")
public class BienComun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String descripcion;

    @Enumerated(EnumType.STRING)
    private EstadoBien estado; // Por ejemplo, DISPONIBLE, EN_USO, EN_REPARACION

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario; // Relación con el Usuario

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public EstadoBien getEstado() {
        return estado;
    }

    public void setEstado(EstadoBien estado) {
        this.estado = estado;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
