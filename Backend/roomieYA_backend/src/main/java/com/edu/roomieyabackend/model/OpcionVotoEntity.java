package com.edu.roomieyabackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "opciones_voto")
public class OpcionVotoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descripcion;

    @Column(name = "cantidad_votos", nullable = false)
    @ColumnDefault("0")
    private int cantidadVotos = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "votacion_id", nullable = false)
    @JsonIgnore
    private VotacionEntity votacion;

    // Getters and Setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public int getCantidadVotos() { return cantidadVotos; }
    public void setCantidadVotos(int cantidadVotos) { this.cantidadVotos = cantidadVotos; }
    public void incrementarVotos() { this.cantidadVotos++; }
    public VotacionEntity getVotacion() { return votacion; }
    public void setVotacion(VotacionEntity votacion) { this.votacion = votacion; }
}