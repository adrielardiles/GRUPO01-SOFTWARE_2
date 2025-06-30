package com.edu.roomieyabackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "notificaciones_pago")
public class NotificacionPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mensaje;
    private String fecha;
    private boolean leida = false;

    // Constructor vacío
    public NotificacionPago() {}

    // Constructor con valores y leída en false por defecto
    public NotificacionPago(String mensaje, String fecha) {
        this.mensaje = mensaje;
        this.fecha = fecha;
        this.leida = false;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public boolean isLeida() {
        return leida;
    }

    public void setLeida(boolean leida) {
        this.leida = leida;
    }
}
