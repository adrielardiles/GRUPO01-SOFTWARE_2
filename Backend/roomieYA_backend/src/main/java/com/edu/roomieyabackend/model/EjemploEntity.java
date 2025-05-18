package com.edu.roomieyabackend.model;

import jakarta.persistence.*;

/**
 * Esta clase representa una entidad persistente en la base de datos.
 * Se usará la tabla "ejemplo" en PostgreSQL.
 */
@Entity
@Table(name = "ejemplo") // Nombre explícito de la tabla en la BD
public class EjemploEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generación automática incremental (PostgreSQL)
    private Long id;

    @Column(name = "titulo", nullable = false, length = 100)
    private String titulo;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "activo", nullable = false)
    private Boolean activo;

    // Constructores
    public EjemploEntity() {
    }

    public EjemploEntity(String titulo, String descripcion, Boolean activo) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.activo = activo;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    @Override
    public String toString() {
        return "EjemploEntity{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", activo=" + activo +
                '}';
    }
}
