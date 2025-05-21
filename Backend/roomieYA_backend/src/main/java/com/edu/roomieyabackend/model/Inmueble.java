package com.edu.roomieyabackend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "inmueble")
public class Inmueble {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;
    private String ubicacion;
    private Integer tamano;
    private Double precio;
    private String servicios;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private Boolean privado = true;

    // Getters y setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getUbicacion() { return ubicacion; }
    public void setUbicacion(String ubicacion) { this.ubicacion = ubicacion; }

    public Integer getTamano() { return tamano; }
    public void setTamano(Integer tamano) { this.tamano = tamano; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public String getServicios() { return servicios; }
    public void setServicios(String servicios) { this.servicios = servicios; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Boolean getPrivado() { return privado; }
    public void setPrivado(Boolean privado) { this.privado = privado; }
}

