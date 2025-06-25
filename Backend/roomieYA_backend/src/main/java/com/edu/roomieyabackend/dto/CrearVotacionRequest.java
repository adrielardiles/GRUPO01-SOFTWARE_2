package com.edu.roomieyabackend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class CrearVotacionRequest {
    private String pregunta;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private List<OpcionDTO> opciones;
    // Getters and Setters
    public String getPregunta() { return pregunta; }
    public void setPregunta(String pregunta) { this.pregunta = pregunta; }
    public LocalDateTime getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDateTime fechaInicio) { this.fechaInicio = fechaInicio; }
    public LocalDateTime getFechaFin() { return fechaFin; }
    public void setFechaFin(LocalDateTime fechaFin) { this.fechaFin = fechaFin; }
    public List<OpcionDTO> getOpciones() { return opciones; }
    public void setOpciones(List<OpcionDTO> opciones) { this.opciones = opciones; }
}
