package com.edu.roomieyabackend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pagos")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double monto;

    private String metodoPago;

    private LocalDate fecha;

    private Long usuarioId;

    // Constructor sin argumentos
    public Pago() {
        this.fecha = LocalDate.now();
    }

    // Constructor con argumentos
    public Pago(Double monto, String metodoPago, Long usuarioId) {
        this.monto = monto;
        this.metodoPago = metodoPago;
        this.usuarioId = usuarioId;
        this.fecha = LocalDate.now();
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

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
}
