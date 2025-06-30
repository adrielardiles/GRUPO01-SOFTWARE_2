package com.edu.roomieyabackend.model.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreCompleto;

    private String telefono;

    @Column(unique = true)
    private String correo;

    private String contrasena;

    private boolean activo;

    @OneToMany(mappedBy = "creador")
    private List<Anuncio> anunciosCreados;

    @OneToMany(mappedBy = "usuario")
    private List<UsuarioInmueble> inmueblesAsociados;

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

    public List<Anuncio> getAnunciosCreados() {
        return anunciosCreados;
    }

    public void setAnunciosCreados(List<Anuncio> anunciosCreados) {
        this.anunciosCreados = anunciosCreados;
    }

    public List<UsuarioInmueble> getInmueblesAsociados() {
        return inmueblesAsociados;
    }

    public void setInmueblesAsociados(List<UsuarioInmueble> inmueblesAsociados) {
        this.inmueblesAsociados = inmueblesAsociados;
    }
}
