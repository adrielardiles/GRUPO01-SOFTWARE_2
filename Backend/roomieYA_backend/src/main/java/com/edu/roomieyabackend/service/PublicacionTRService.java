package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.dto.CrearPublicacionTRDTO;
import com.edu.roomieyabackend.dto.PublicacionTRDTO;
import com.edu.roomieyabackend.model.PublicacionTREntity;
import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import com.edu.roomieyabackend.repository.PublicacionTRRepository;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
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

    public List<PublicacionTRDTO> filtrarPublicaciones(
            String provincia,
            List<String> distrito,
            List<String> tipo,
            Double precioMin,
            Double precioMax,
            List<String> caracteristicas) {

        return publicacionRepository.findAll().stream()
                .filter(p -> {
                    Inmueble i = p.getInmueble();
                    if (i == null) return false;

                    boolean matchProvincia = provincia == null || provincia.equalsIgnoreCase(i.getProvincia());
                    boolean matchDistrito = distrito == null || distrito.isEmpty() || distrito.contains(i.getDistrito());
                    boolean matchTipo = tipo == null || tipo.isEmpty() || tipo.contains(i.getTipo());
                    boolean matchPrecioMin = precioMin == null || p.getPrecio() >= precioMin;
                    boolean matchPrecioMax = precioMax == null || p.getPrecio() <= precioMax;

                    boolean matchCaracteristicas = caracteristicas == null || caracteristicas.isEmpty() ||
                            (p.getServicios() != null && caracteristicas.stream()
                                    .allMatch(filtro -> p.getServicios().stream()
                                            .anyMatch(s -> normalizar(s).equals(normalizar(filtro)))
                                    )
                            );

                    return matchProvincia && matchDistrito && matchTipo && matchPrecioMin && matchPrecioMax && matchCaracteristicas;
                })
                .map(PublicacionTRDTO::fromEntity)
                .collect(Collectors.toList());
    }

    private String normalizar(String input) {
        if (input == null) return "";
        return Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .toLowerCase()
                .trim();
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

    public Optional<PublicacionTREntity> buscarPorId(Long id) {
        return publicacionRepository.findById(id);
    }

    public void guardar(PublicacionTREntity pub) {
        publicacionRepository.save(pub);
    }

    // ✅ NUEVO MÉTODO para actualizar estado y guardar motivo
    public void actualizarEstado(Long id, String nuevoEstado, String motivo) {
        PublicacionTREntity publicacion = publicacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Publicación no encontrada con ID: " + id));

        publicacion.setEstado(nuevoEstado.toUpperCase());

        if ("RECHAZADO".equalsIgnoreCase(nuevoEstado) || "ELIMINADO".equalsIgnoreCase(nuevoEstado)) {
            publicacion.setMotivoRechazo(motivo);
        } else {
            publicacion.setMotivoRechazo(null);
        }

        publicacionRepository.save(publicacion);
    }
}
