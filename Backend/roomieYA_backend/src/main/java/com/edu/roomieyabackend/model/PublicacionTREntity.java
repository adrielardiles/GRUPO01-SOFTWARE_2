package com.edu.roomieyabackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.edu.roomieyabackend.model.entities.Inmueble;
import java.util.List;

@Entity
@Table(name = "publicaciones_tr")
@Getter
@Setter
public class PublicacionTREntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String arrendatario;

    private Double precio;

    private String estado;

    @ElementCollection
    private List<String> servicios;
    
    @Column(columnDefinition = "TEXT")
    private String motivoRechazo;

    @Column(columnDefinition = "TEXT")
    private String serviciosExtra;

    @Column(columnDefinition = "TEXT")
    private String referenciasExtra;

    @ManyToOne
    @JoinColumn(name = "inmueble_id")
    private Inmueble inmueble;
}
