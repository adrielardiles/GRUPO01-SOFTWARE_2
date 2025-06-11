package com.edu.roomieyabackend.service;

import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import org.springframework.stereotype.Service;
import java.util.List;

import java.util.Optional;

@Service
public class InmuebleService {

    private final InmuebleRepository inmuebleRepository;

    public InmuebleService(InmuebleRepository inmuebleRepository) {
        this.inmuebleRepository = inmuebleRepository;
    }

    public Inmueble actualizarInmueble(Long id, Inmueble datosActualizados) {
        Inmueble inmueble = inmuebleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inmueble no encontrado"));

        inmueble.setNombre(datosActualizados.getNombre());
        inmueble.setDireccion(datosActualizados.getDireccion());
        inmueble.setTipo(datosActualizados.getTipo());
        inmueble.setTamano(datosActualizados.getTamano());
        inmueble.setPrecio(datosActualizados.getPrecio());
        inmueble.setServicios(datosActualizados.getServicios());
        inmueble.setDescripcion(datosActualizados.getDescripcion());
        inmueble.setImagenurl(datosActualizados.getImagenurl());

        return inmuebleRepository.save(inmueble);
    }

    public Inmueble guardarInmueble(Inmueble inmueble){
        return inmuebleRepository.save(inmueble);
    }


    public Optional<Inmueble> obtenerInmueblePorId(Long id) {
        return inmuebleRepository.findById(id);
    }

    // 🔍 Lógica de filtrado por parámetros dinámicos
    public List<Inmueble> filtrarInmuebles(
            String provincia,
            List<String> distrito,
            List<String> tipo,
            Integer precioMin,
            Integer precioMax,
            List<String> servicios) {

        return inmuebleRepository.findAll().stream()
                .filter(i -> provincia == null || provincia.equalsIgnoreCase(i.getProvincia()))
                .filter(i -> distrito == null || distrito.isEmpty() || distrito.contains(i.getDistrito()))
                .filter(i -> tipo == null || tipo.isEmpty() || tipo.contains(i.getTipo()))
                .filter(i -> precioMin == null || i.getPrecio() >= precioMin)
                .filter(i -> precioMax == null || i.getPrecio() <= precioMax)
                .filter(i -> servicios == null || servicios.isEmpty() ||
                        servicios.stream().allMatch(s -> i.getServicios().contains(s)))
                .toList();
    }
}
