package com.edu.roomieyabackend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class AgendarCitaRequestDTO {
    private String nombre;
    private LocalDate fecha;
    private LocalTime hora;
    private String direccion;

    // Getters y setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public LocalTime getHora() { return hora; }
    public void setHora(LocalTime hora) { this.hora = hora; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
}
