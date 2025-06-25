package com.edu.roomieyabackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "votaciones")
public class VotacionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pregunta;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private String estado;

    @OneToMany(mappedBy = "votacion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OpcionVotoEntity> opciones = new ArrayList<>();
    // Getters and Setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPregunta() { return pregunta; }
    public void setPregunta(String pregunta) { this.pregunta = pregunta; }
    public LocalDateTime getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDateTime fechaInicio) { this.fechaInicio = fechaInicio; }
    public LocalDateTime getFechaFin() { return fechaFin; }
    public void setFechaFin(LocalDateTime fechaFin) { this.fechaFin = fechaFin; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public List<OpcionVotoEntity> getOpciones() { return opciones; }
    public void setOpciones(List<OpcionVotoEntity> opciones) { this.opciones = opciones; }
}