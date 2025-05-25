package com.edu.roomieyabackend.model.entities;
import com.edu.roomieyabackend.model.Enums.EstadoAnuncio;
import com.edu.roomieyabackend.model.Enums.TipoAnuncio;
import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "anuncios")
public class Anuncio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "tipo", columnDefinition = "varchar(255)")
    @Enumerated(EnumType.STRING)
    private TipoAnuncio tipo;

    private LocalDateTime fechaPublicacion;

    private boolean requiereConfirmacion;

    private String archivoAdjuntoUrl;


    @Column(name = "estado", nullable = false)
    @Enumerated(EnumType.STRING)
    private EstadoAnuncio estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inmueble_id")
    private Inmueble inmueble;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creador_id")
    private Usuario creador;

    public String getNombreCompletoCreador() {
        return creador != null ? creador.getNombreCompleto() : null;
    }

}
