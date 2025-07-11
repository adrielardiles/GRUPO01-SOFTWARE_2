package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "cita_visita")
public class CitaVisita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String email;

    private LocalDate fecha;

    private LocalTime hora;

    private String direccion;

    private String estado;

    private Boolean recordatorioEnviado24h;
    private Boolean recordatorioEnviado48h;

    private Long publicacionId; // ✅ OK

    private Long usuarioId; // ✅ Esto es lo que falta

    // Constructores
    public CitaVisita() { }

    public CitaVisita(String nombre, String email, LocalDate fecha, LocalTime hora, String direccion) {
        this.nombre = nombre;
        this.email = email;
        this.fecha = fecha;
        this.hora = hora;
        this.direccion = direccion;
        this.estado = "PENDIENTE";
    }
    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public LocalTime getHora() { return hora; }
    public void setHora(LocalTime hora) { this.hora = hora; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Boolean getRecordatorioEnviado24h() { return recordatorioEnviado24h; }
    public void setRecordatorioEnviado24h(Boolean recordatorioEnviado24h) { this.recordatorioEnviado24h = recordatorioEnviado24h; }
    public Boolean getRecordatorioEnviado48h() { return recordatorioEnviado48h; }
    public void setRecordatorioEnviado48h(Boolean recordatorioEnviado48h) { this.recordatorioEnviado48h = recordatorioEnviado48h; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Long getPublicacionId() { return publicacionId; }
    public void setPublicacionId(Long publicacionId) { this.publicacionId = publicacionId; }
}
