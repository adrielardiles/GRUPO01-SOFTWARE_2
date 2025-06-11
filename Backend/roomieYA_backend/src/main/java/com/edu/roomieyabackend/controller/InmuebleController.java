package com.edu.roomieyabackend.controller;

import com.edu.roomieyabackend.model.entities.Inmueble;
import com.edu.roomieyabackend.repository.InmuebleRepository;
import com.edu.roomieyabackend.service.InmuebleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inmuebles")
public class InmuebleController {

    private final InmuebleRepository inmuebleRepository;
    private final InmuebleService inmuebleService;

    @Autowired
    public InmuebleController(InmuebleRepository inmuebleRepository,
                              InmuebleService inmuebleService) {
        this.inmuebleRepository = inmuebleRepository;
        this.inmuebleService = inmuebleService;
    }

    // POST: crear nuevo inmueble
    @PostMapping
    public ResponseEntity<Inmueble> crearInmueble(@RequestBody Inmueble inmueble) {
        Inmueble guardado = inmuebleService.guardarInmueble(inmueble);
        return ResponseEntity.ok(guardado);
    }

    // GET: obtener inmueble por ID
    @GetMapping("/{id}")
    public ResponseEntity<Inmueble> obtenerInmueblePorId(@PathVariable Long id) {
        Optional<Inmueble> inmuebleOptional = inmuebleRepository.findById(id);
        return inmuebleOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // PUT: actualizar inmueble por ID
    @PutMapping("/{id}")
    public ResponseEntity<Inmueble> actualizarInmueble(
            @PathVariable Long id,
            @RequestBody Inmueble inmueble) {
        Inmueble actualizado = inmuebleService.actualizarInmueble(id, inmueble);
        return ResponseEntity.ok(actualizado);
    }

    // GET: listar todos con paginación
    @GetMapping
    public ResponseEntity<List<Inmueble>> obtenerTodosConPaginacion(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("fechaCreacion").descending());
        Page<Inmueble> pageResult = inmuebleRepository.findAll(pageable);
        return ResponseEntity.ok(pageResult.getContent());
    }

    // GET: buscar inmuebles por filtros
    @GetMapping("/filtrar")
    public ResponseEntity<List<Inmueble>> filtrarInmuebles(
            @RequestParam(required = false) String provincia,
            @RequestParam(required = false) List<String> distrito,
            @RequestParam(required = false) List<String> tipo,
            @RequestParam(required = false) Integer precioMin,
            @RequestParam(required = false) Integer precioMax,
            @RequestParam(required = false) List<String> servicios) {

        List<Inmueble> resultado = inmuebleService.filtrarInmuebles(
                provincia, distrito, tipo, precioMin, precioMax, servicios);

        return ResponseEntity.ok(resultado);
    }

}
