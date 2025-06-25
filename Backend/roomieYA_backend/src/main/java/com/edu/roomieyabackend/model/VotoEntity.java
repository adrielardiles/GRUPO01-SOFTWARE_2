package com.edu.roomieyabackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "votos",
    uniqueConstraints = @UniqueConstraint(columnNames = {"usuario_id","votacion_id"})
)
public class VotoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "votacion_id", nullable = false)
    private VotacionEntity votacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "opcion_id", nullable = false)
    private OpcionVotoEntity opcion;

    private LocalDateTime fechaVoto;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public VotacionEntity getVotacion() {
        return votacion;
    }

    public void setVotacion(VotacionEntity votacion) {
        this.votacion = votacion;
    }

    public OpcionVotoEntity getOpcion() {
        return opcion;
    }

    public void setOpcion(OpcionVotoEntity opcion) {
        this.opcion = opcion;
    }

    public LocalDateTime getFechaVoto() {
        return fechaVoto;
    }

    public void setFechaVoto(LocalDateTime fechaVoto) {
        this.fechaVoto = fechaVoto;
    }
}