package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.Inmueble;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/inmuebles")
@CrossOrigin(origins = "*")
public class InmuebleController {

    @Autowired
    private InmuebleRepository inmuebleRepository;

    @PostMapping
    public Inmueble crearInmueble(@RequestBody Inmueble inmueble) {
        inmueble.setPrivado(true);
        return inmuebleRepository.save(inmueble);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inmueble> obtenerInmueblePorId(@PathVariable Long id) {
        Optional<Inmueble> inmuebleOptional = inmuebleRepository.findById(id);
        if (!inmuebleOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(inmuebleOptional.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inmueble> actualizarInmueble(@PathVariable Long id, @RequestBody Inmueble inmuebleDetalles) {
        Optional<Inmueble> inmuebleOptional = inmuebleRepository.findById(id);
        if (!inmuebleOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Inmueble inmueble = inmuebleOptional.get();

        inmueble.setTipo(inmuebleDetalles.getTipo());
        inmueble.setUbicacion(inmuebleDetalles.getUbicacion());
        inmueble.setTamano(inmuebleDetalles.getTamano());
        inmueble.setPrecio(inmuebleDetalles.getPrecio());
        inmueble.setServicios(inmuebleDetalles.getServicios());
        inmueble.setDescripcion(inmuebleDetalles.getDescripcion());

        Inmueble inmuebleActualizado = inmuebleRepository.save(inmueble);
        return ResponseEntity.ok(inmuebleActualizado);
    }
}
