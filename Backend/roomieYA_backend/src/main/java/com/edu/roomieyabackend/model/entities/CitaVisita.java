package com.edu.roomieyabackend.model.entities;

import com.edu.roomieyabackend.model.Enums.EstadoCita;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class CitaVisita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;
    private LocalTime hora;

    @ManyToOne
    @JoinColumn(name = "inmueble_id")
    private Inmueble inmueble;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    private EstadoCita estado = EstadoCita.PENDIENTE; // Valor por defecto

    private Boolean recordatorioEnviado24h = false;
    private Boolean recordatorioEnviado48h = false;

    // --- Getters y setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public LocalTime getHora() { return hora; }
    public void setHora(LocalTime hora) { this.hora = hora; }

    public Inmueble getInmueble() { return inmueble; }
    public void setInmueble(Inmueble inmueble) { this.inmueble = inmueble; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public EstadoCita getEstado() { return estado; }
    public void setEstado(EstadoCita estado) { this.estado = estado; }

    public Boolean getRecordatorioEnviado24h() { return recordatorioEnviado24h; }
    public void setRecordatorioEnviado24h(Boolean recordatorioEnviado24h) { this.recordatorioEnviado24h = recordatorioEnviado24h; }

    public Boolean getRecordatorioEnviado48h() { return recordatorioEnviado48h; }
    public void setRecordatorioEnviado48h(Boolean recordatorioEnviado48h) { this.recordatorioEnviado48h = recordatorioEnviado48h; }
}
