package com.edu.roomieyabackend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "gastos_compartidos")
public class GastoCompartido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Usamos la estrategia de generación de ID para bases SQL
    private Long id;

    private Double monto;
    private String descripcion;
    private String fecha;
    
    @ElementCollection
    private List<String> participantes;  // Lista de nombres de participantes

    private String categoria;

    // Constructor sin argumentos
    public GastoCompartido() {
    }

    // Constructor con argumentos
    public GastoCompartido(Double monto, String descripcion, String fecha, List<String> participantes, String categoria) {
        this.monto = monto;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.participantes = participantes;
        this.categoria = categoria;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public List<String> getParticipantes() {
        return participantes;
    }

    public void setParticipantes(List<String> participantes) {
        this.participantes = participantes;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}
