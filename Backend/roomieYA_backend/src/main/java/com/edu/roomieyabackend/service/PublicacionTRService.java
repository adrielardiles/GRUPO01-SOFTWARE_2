package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.dto.CrearPublicacionTRDTO;
import com.edu.roomieyabackend.dto.PublicacionTRDTO;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.model.PublicacionTREntity;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import com.edu.roomieyabackend.repository.PublicacionTRRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PublicacionTRService {

    private final PublicacionTRRepository publicacionRepository;
    private final InmuebleRepository inmuebleRepository;

    public PublicacionTRService(PublicacionTRRepository publicacionRepository, InmuebleRepository inmuebleRepository) {
        this.publicacionRepository = publicacionRepository;
        this.inmuebleRepository = inmuebleRepository;
    }

    public List<PublicacionTRDTO> obtenerTodas() {
        return publicacionRepository.findAll()
                .stream()
                .map(PublicacionTRDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public void crear(CrearPublicacionTRDTO dto) {
        PublicacionTREntity publicacion = new PublicacionTREntity();
        publicacion.setArrendatario(dto.getArrendatario());
        publicacion.setPrecio(dto.getPrecio());
        publicacion.setServicios(dto.getServicios());
        publicacion.setServiciosExtra(dto.getServiciosExtra());
        publicacion.setReferenciasExtra(dto.getReferenciasExtra());

        if (dto.getInmuebleId() != null) {
            Inmueble inmueble = inmuebleRepository.findById(dto.getInmuebleId())
                    .orElseThrow(() -> new RuntimeException("Inmueble no encontrado con ID: " + dto.getInmuebleId()));
            publicacion.setInmueble(inmueble);
        } else {
            throw new RuntimeException("InmuebleId es obligatorio");
        }

        publicacionRepository.save(publicacion);
    }

}
