package com.edu.roomieyabackend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class AgendarCitaRequestDTO {
    private Long inmuebleId;
    private LocalDate fecha;
    private LocalTime hora;

    public Long getInmuebleId() { return inmuebleId; }
    public void setInmuebleId(Long inmuebleId) { this.inmuebleId = inmuebleId; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public LocalTime getHora() { return hora; }
    public void setHora(LocalTime hora) { this.hora = hora; }
}
